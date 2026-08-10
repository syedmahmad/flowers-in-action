import { siteConfig } from "@/data/config";
import { getDiscountedPrice, formatPrice } from "@/lib/pricing";
import type { Product } from "@/types/product";

export function buildProductOrderMessage(product: Product): string {
  const discounted = getDiscountedPrice(
    product.originalPrice,
    product.discountPercentage
  );
  const categoryLabel = product.category.replace(/-/g, " ");

  return `Hello ${siteConfig.name},
I would like to order:

Product: ${product.name}
Category: ${categoryLabel}
Original Price: PKR ${formatPrice(product.originalPrice)}
Offer Price: PKR ${formatPrice(discounted)}
Preferred Delivery Date:
Preferred Delivery Time:
Delivery Area:
Customization Request:

Please confirm availability and the 10% advance-payment details.`;
}

export function buildProductWhatsAppUrl(product: Product): string {
  const message = buildProductOrderMessage(product);
  return `${siteConfig.whatsappBase}?text=${encodeURIComponent(message)}`;
}

export function buildCustomOrderUrl(): string {
  const message = `Hello ${siteConfig.name},
I would like to discuss a custom order.

Occasion:
Preferred Delivery Date:
Delivery Area:
Budget Range:
Customization Request:

Please share recommendations and the 10% advance-payment details.`;
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
