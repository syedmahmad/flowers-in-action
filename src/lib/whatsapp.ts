import { siteConfig } from "@/data/config";
import { formatPrice, getSellingPrice } from "@/lib/pricing";
import type { Bouquet } from "@/types/catalog";
import type { EventPackage } from "@/types/catalog";
import type { Product } from "@/types/product";
import { getLegacySellingPrice } from "@/lib/pricing";

function absoluteAssetUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = siteConfig.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildBouquetOrderMessage(bouquet: Bouquet): string {
  const price = getSellingPrice(bouquet);
  const url = `${siteConfig.url}/?bouquet=${bouquet.slug}#bouquets`;
  const photo = absoluteAssetUrl(bouquet.image);

  return `Hi ${siteConfig.name}, I'd like to order:

Item: ${bouquet.name}
Price: PKR ${formatPrice(price)}
Photo: ${photo}

Page: ${url}

Please confirm availability and delivery.`;
}

export function buildBouquetWhatsAppUrl(bouquet: Bouquet): string {
  return `${siteConfig.whatsappBase}?text=${encodeURIComponent(buildBouquetOrderMessage(bouquet))}`;
}

export function buildEventBookingMessage(event: EventPackage): string {
  const prefix = event.pricePrefix ? `${event.pricePrefix} ` : "";
  const url = `${siteConfig.url}/?event=${event.slug}#events`;
  const photo = event.images[0] ? absoluteAssetUrl(event.images[0]) : "";

  return `Hi ${siteConfig.name}, I'm interested in:

Item: ${event.name}
Price: ${prefix}PKR ${formatPrice(event.price)}${photo ? `\nPhoto: ${photo}` : ""}

Page: ${url}

Please share availability and customisation options.`;
}

export function buildEventWhatsAppUrl(event: EventPackage): string {
  return `${siteConfig.whatsappBase}?text=${encodeURIComponent(buildEventBookingMessage(event))}`;
}

/** @deprecated Legacy product ordering — kept for SEO product URLs */
export function buildProductOrderMessage(product: Product): string {
  const price = getLegacySellingPrice(product);

  return `Hi ${siteConfig.name}, I'd like to order "${product.name}" for PKR ${formatPrice(price)}.

Please confirm availability and delivery.`;
}

export function buildProductWhatsAppUrl(product: Product): string {
  return `${siteConfig.whatsappBase}?text=${encodeURIComponent(buildProductOrderMessage(product))}`;
}

export function buildCustomOrderUrl(): string {
  const message = `Hi ${siteConfig.name}, I have something different in mind for my occasion.

Preferred colours:
Budget range:
Delivery / event date:
Area in Lahore:

Please share ideas and availability.`;
  return `${siteConfig.whatsappBase}?text=${encodeURIComponent(message)}`;
}

export function buildContactFormUrl(data: {
  name: string;
  phone: string;
  occasion: string;
  deliveryDate: string;
  budget: string;
  message: string;
}): string {
  const message = `Hello ${siteConfig.name},
I have an enquiry:

Name: ${data.name}
Phone: ${data.phone}
Occasion: ${data.occasion}
Preferred Delivery Date: ${data.deliveryDate}
Budget Range: ${data.budget}
Message: ${data.message}

Please share availability and next steps.`;
  return `${siteConfig.whatsappBase}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralWhatsAppUrl(message?: string): string {
  const text =
    message ||
    `Hello ${siteConfig.name}, I would like to place an order. Please share details.`;
  return `${siteConfig.whatsappBase}?text=${encodeURIComponent(text)}`;
}
