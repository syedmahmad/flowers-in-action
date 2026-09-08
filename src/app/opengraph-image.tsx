import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/data/config";

export const runtime = "nodejs";
export const alt = siteConfig.seoTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const bouquetPath = join(
    process.cwd(),
    "public/images/bouquets/web/crimson-ivory-tuberose-bouquet.jpg",
  );
  const bouquetBase64 = (await readFile(bouquetPath)).toString("base64");
  const bouquetSrc = `data:image/jpeg;base64,${bouquetBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #0f2922 0%, #1b4332 48%, #163d30 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "52%",
            padding: "56px 52px",
            color: "#fffdf8",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 28,
              fontSize: 14,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#c9a962",
            }}
          >
            <div style={{ width: 32, height: 1, background: "#c9a962" }} />
            Lahore&apos;s Premium Florist
          </div>

          <div
            style={{
              fontSize: 64,
              lineHeight: 1.05,
              fontWeight: 700,
              marginBottom: 18,
            }}
          >
            {siteConfig.name}
          </div>

          <div
            style={{
              fontSize: 26,
              lineHeight: 1.35,
              color: "rgba(255,253,248,0.88)",
              marginBottom: 36,
              maxWidth: 480,
            }}
          >
            {siteConfig.tagline}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "16px 22px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(201,169,98,0.35)",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                background: "#25D366",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              WA
            </div>
            Order on WhatsApp {siteConfig.phoneDisplay}
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            width: "48%",
            alignItems: "center",
            justifyContent: "center",
            padding: "36px 36px 36px 0",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 36,
              borderRadius: 28,
              border: "2px solid rgba(201,169,98,0.28)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bouquetSrc}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 24,
              boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
