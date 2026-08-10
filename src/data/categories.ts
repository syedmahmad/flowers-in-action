import type { ProductCategory } from "@/types/product";
import { categoryImage } from "@/data/images";

export const categories: {
  slug: ProductCategory;
  label: string;
  intro: string;
  image: string;
}[] = [
  {
    slug: "floral-bouquets",
    label: "Floral Bouquets",
    intro:
      "Hand-tied fresh flower bouquets designed in Lahore for birthdays, anniversaries, shadi gifts, congratulations and everyday gifting. Phool Pattiyan prepares each bouquet with seasonal blooms — roses, lilies, chrysanthemums, sunflowers and mixed flowers — wrapped in premium paper with ribbon finishing.",
    image: categoryImage("floral-bouquets"),
  },
  {
    slug: "floral-chocolate-bouquets",
    label: "Floral & Chocolate Bouquets",
    intro:
      "Combine fresh flowers with premium chocolates in a gift that feels joyful, generous and personal. Our floral and chocolate bouquets are popular for birthdays, Valentine's Day, anniversaries and Eid gifting across Lahore. Select a ready design or request specific flower colours, chocolate brands and wrapping styles through WhatsApp.",
    image: categoryImage("floral-chocolate-bouquets"),
  },
  {
    slug: "floral-boxes",
    label: "Floral Boxes",
    intro:
      "Floral boxes bring fresh blooms together in a polished, presentation-ready design ideal for birthdays, anniversaries, office celebrations and elegant home gifting in Lahore. Each box is arranged with attention to colour harmony, flower freshness and unboxing experience. Add a greeting card or personalised note at checkout via WhatsApp.",
    image: categoryImage("floral-boxes"),
  },
  {
    slug: "floral-chocolate-boxes",
    label: "Floral & Chocolate Boxes",
    intro:
      "Beautiful blooms and premium chocolates arranged in carefully designed gift boxes for Lahore delivery. Floral and chocolate boxes work beautifully for Eid, Ramadan host gifts, corporate appreciation, anniversaries and romantic surprises. Customise the flower selection, chocolate brands, colour palette and personal message for your occasion.",
    image: categoryImage("floral-chocolate-boxes"),
  },
  {
    slug: "baskets",
    label: "Gift Baskets",
    intro:
      "Floral and gift baskets filled with fresh blooms, chocolates, treats and personalised additions. A practical and memorable option for family visits, corporate gifting, graduation celebrations and housewarming gifts across Lahore. Share your budget and preferences on WhatsApp for a tailored basket recommendation.",
    image: categoryImage("baskets"),
  },
  {
    slug: "money-bouquets",
    label: "Money Bouquets",
    intro:
      "Celebrate milestones with a personalised money bouquet arranged with fresh flowers, decorative wrapping and thoughtful presentation. Popular for graduations, birthdays, Eid and wedding gifts in Lahore. Currency is provided or confirmed by the customer, and final pricing depends on note quantity, denomination and selected design — confirmed on WhatsApp before preparation.",
    image: categoryImage("money-bouquets"),
  },
  {
    slug: "crochet-flowers",
    label: "Crochet Flowers",
    intro:
      "Long-lasting crochet flowers bring handmade character to birthdays, keepsakes, room décor and thoughtful gifts that stay beautiful beyond the occasion. Choose colours and bouquet size to create a unique floral gift. Crochet arrangements are ideal when you want something lasting, personal and different from fresh-cut flowers.",
    image: categoryImage("crochet-flowers"),
  },
];

export const quickCategories = [
  ...categories,
  {
    slug: "bridal-bouquets" as const,
    label: "Wedding Flowers",
    intro: "",
    image: categoryImage("wedding"),
    isWedding: true,
  },
];
