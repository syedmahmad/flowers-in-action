import { siteConfig } from "@/data/config";
import { products } from "@/data/products";
import { bouquets } from "@/data/bouquets";
import { events } from "@/data/events";
import { faqs } from "@/data/faqs";
import { categories } from "@/data/categories";
import { occasions } from "@/data/occasions";
import { weddingTypes } from "@/data/flowers";
import {
  getLegacySellingPrice,
  getSellingPrice,
  hasDiscount,
} from "@/lib/pricing";

export function JsonLd() {
  const absolute = (path: string) =>
    path.startsWith("http") ? path : `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["Florist", "LocalBusiness"],
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    alternateName: ["Phool Pattiyan Lahore", "Phool Pattiyan Florist"],
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: [absolute("/og-image.png"), absolute("/images/brand/logo.png")],
    logo: absolute("/images/brand/logo.png"),
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: "54000",
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: [
      { "@type": "City", name: "Lahore" },
      ...siteConfig.serviceAreas.map((area) => ({ "@type": "Place", name: area })),
    ],
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.google.reviewsUrl,
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Floral Products",
      itemListElement: categories.map((cat, i) => ({
        "@type": "OfferCatalog",
        position: i + 1,
        name: cat.label,
        url: `${siteConfig.url}/?category=${cat.slug}#shop`,
      })),
    },
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absolute("/images/brand/logo.png"),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "customer service",
      availableLanguage: ["English", "Urdu"],
      areaServed: "PK",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.seoDescription,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/?search={search_term_string}#shop`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const bouquetSchemas = bouquets.map((bouquet) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteConfig.url}/#bouquet-${bouquet.slug}`,
    name: bouquet.name,
    description: bouquet.description,
    image: absolute(bouquet.image),
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/?bouquet=${bouquet.slug}#bouquets`,
      priceCurrency: "PKR",
      price: getSellingPrice(bouquet),
      ...(hasDiscount(bouquet) && bouquet.originalPrice
        ? { priceValidUntil: undefined }
        : {}),
      availability: bouquet.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@id": `${siteConfig.url}/#localbusiness` },
    },
  }));

  const eventSchemas = events.map((event) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/#event-${event.slug}`,
    name: event.name,
    description: event.description,
    image: event.images.map(absolute),
    provider: { "@id": `${siteConfig.url}/#localbusiness` },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/?event=${event.slug}#events`,
      priceCurrency: "PKR",
      price: event.price,
      seller: { "@id": `${siteConfig.url}/#localbusiness` },
    },
  }));

  const productSchemas = products.map((product) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteConfig.url}/#product-${product.slug}`,
    name: product.name,
    description: product.fullDescription,
    sku: product.productCode,
    image: absolute(product.image),
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/?product=${product.slug}#shop`,
      priceCurrency: "PKR",
      price: getLegacySellingPrice(product),
      availability: product.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@id": `${siteConfig.url}/#localbusiness` },
    },
  }));

  const shopItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteConfig.url}/#shop-list`,
    name: `${siteConfig.name} Product Catalogue`,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteConfig.url}/?product=${product.slug}#shop`,
      name: product.name,
    })),
  };

  const occasionItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteConfig.url}/#occasions-list`,
    name: "Shop by Occasion",
    itemListElement: occasions.map((occ, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: occ.label,
      url: `${siteConfig.url}/?occasion=${occ.slug}#shop`,
    })),
  };

  const weddingItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteConfig.url}/#wedding-list`,
    name: "Wedding Flower Services",
    itemListElement: weddingTypes.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      url: `${siteConfig.url}/?wedding=${item.slug}#shop`,
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${siteConfig.url}/#shop` },
      { "@type": "ListItem", position: 3, name: "Contact", item: `${siteConfig.url}/#contact` },
    ],
  };

  const schemas = [
    localBusiness,
    organization,
    website,
    faqPage,
    shopItemList,
    occasionItemList,
    weddingItemList,
    breadcrumb,
    ...bouquetSchemas,
    ...eventSchemas,
    ...productSchemas,
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
