#!/usr/bin/env python3
"""Remove competitor watermark text from event photos (7 star events + phone)."""

from __future__ import annotations

import sys

import cv2
import numpy as np


def _watermark_bbox(img: np.ndarray) -> tuple[int, int, int, int] | None:
    h, w = img.shape[:2]
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    white = cv2.inRange(hsv, (0, 0, 200), (180, 55, 255))

    zone = np.zeros((h, w), np.uint8)
    zone[int(h * 0.52) : int(h * 0.86), int(w * 0.18) : int(w * 0.82)] = 255

    neon_safe = np.zeros((h, w), np.uint8)
    neon_safe[: int(h * 0.42), int(w * 0.18) : int(w * 0.82)] = 255
    zone = cv2.bitwise_and(zone, cv2.bitwise_not(neon_safe))

    mask = cv2.bitwise_and(white, zone)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3)))

    num, labels, stats, _ = cv2.connectedComponentsWithStats(mask)
    text_mask = np.zeros((h, w), np.uint8)
    for i in range(1, num):
        area = stats[i, cv2.CC_STAT_AREA]
        bw = stats[i, cv2.CC_STAT_WIDTH]
        bh = stats[i, cv2.CC_STAT_HEIGHT]
        if area < 30 or area > 6000:
            continue
        if bw > int(w * 0.45) or bh > int(h * 0.18):
            continue
        text_mask[labels == i] = 255

    ys, xs = np.where(text_mask > 0)
    if len(xs) < 80:
        return None

    pad_x, pad_y = int(w * 0.035), int(h * 0.025)
    x1 = max(0, int(xs.min()) - pad_x)
    x2 = min(w - 1, int(xs.max()) + pad_x)
    y1 = max(0, int(ys.min()) - pad_y)
    y2 = min(h - 1, int(ys.max()) + pad_y)
    return x1, y1, x2, y2


def _is_panel_backdrop(img: np.ndarray, x1: int, y1: int, x2: int, y2: int) -> bool:
    h, w = img.shape[:2]
    cx = (x1 + x2) / 2
    if cx < w * 0.30 or cx > w * 0.72 or y1 < int(h * 0.48):
        return False

    ref_y2 = max(0, y1 - 6)
    ref_y1 = max(0, ref_y2 - int(h * 0.12))
    ref = img[ref_y1:ref_y2, int(w * 0.34) : int(w * 0.66)]
    if ref.size == 0:
        return False

    return float(np.var(ref.astype(np.float32))) < 1800


def _panel_fill(img: np.ndarray, x1: int, y1: int, x2: int, y2: int) -> np.ndarray:
    h, w = img.shape[:2]
    out = img.copy()
    sample_y2 = max(0, y1 - 8)
    sample_y1 = max(0, sample_y2 - int(h * 0.08))

    mask = np.zeros((h, w), np.uint8)
    cv2.rectangle(mask, (x1, y1), (x2, y2), 255, -1)
    dist = cv2.distanceTransform(mask, cv2.DIST_L2, 5)
    feather = max(18.0, min(x2 - x1, y2 - y1) * 0.08)

    for y in range(y1, y2 + 1):
        for x in range(x1, x2 + 1):
            alpha = min(1.0, dist[y, x] / feather)
            if alpha <= 0:
                continue
            t = (y - y1) / max(1, y2 - y1)
            sy = sample_y1 + int(t * max(0, sample_y2 - sample_y1 - 1))
            sy = int(np.clip(sy, sample_y1, max(sample_y1, sample_y2 - 1)))
            color = img[sy, x].astype(np.float32)
            out[y, x] = np.clip(
                img[y, x].astype(np.float32) * (1 - alpha) + color * alpha,
                0,
                255,
            ).astype(np.uint8)
    return out


def _inpaint_region(img: np.ndarray, x1: int, y1: int, x2: int, y2: int) -> np.ndarray:
    h, w = img.shape[:2]
    mask = np.zeros((h, w), np.uint8)
    tilt = int((y2 - y1) * 0.08)
    pts = np.array(
        [
            [x1, y1 + tilt],
            [x2, y1],
            [x2, y2],
            [x1, y2 + tilt],
        ],
        np.int32,
    )
    cv2.fillConvexPoly(mask, pts, 255)
    mask = cv2.dilate(mask, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7)), 1)
    return cv2.inpaint(img, mask, 7, cv2.INPAINT_TELEA)


def clean_event_photo(
    input_path: str,
    output_path: str,
    max_w: int = 1400,
    max_h: int = 1050,
    quality: int = 88,
) -> None:
    img = cv2.imread(input_path)
    if img is None:
        raise ValueError(f"Cannot read image: {input_path}")

    bbox = _watermark_bbox(img)
    if bbox is not None:
        x1, y1, x2, y2 = bbox
        if _is_panel_backdrop(img, x1, y1, x2, y2):
            img = _panel_fill(img, x1, y1, x2, y2)
        else:
            img = _inpaint_region(img, x1, y1, x2, y2)

    rh, rw = img.shape[:2]
    scale = min(max_w / rw, max_h / rh, 1.0)
    if scale < 1.0:
        img = cv2.resize(img, (int(rw * scale), int(rh * scale)), interpolation=cv2.INTER_AREA)

    cv2.imwrite(output_path, img, [cv2.IMWRITE_JPEG_QUALITY, quality])


def main() -> None:
    if len(sys.argv) != 3:
        print("Usage: remove-event-watermark.py <input> <output>", file=sys.stderr)
        sys.exit(1)
    clean_event_photo(sys.argv[1], sys.argv[2])


if __name__ == "__main__":
    main()
