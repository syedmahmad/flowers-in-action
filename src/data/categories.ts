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
      "Discover hand-tied floral bouquets designed in Lahore for birthdays, anniversaries, congratulations and everyday expressions of care. Each bouquet is prepared with fresh seasonal flowers, premium wrapping and thoughtful colour combinations.",
    image: categoryImage("floral-bouquets"),
  },
  {
    slug: "floral-chocolate-bouquets",
    label: "Floral & Chocolate Bouquets",
    intro:
      "Pair fresh flowers with everyone's favourite chocolates in a gift that feels joyful, generous and personal. Select a ready design or request custom flowers, chocolate brands and wrapping colours through WhatsApp.",
    image: categoryImage("floral-chocolate-bouquets"),
  },
  {
    slug: "floral-boxes",
    label: "Floral Boxes",
    intro:
      "Our floral boxes bring fresh blooms together in a polished, presentation-ready design. They are ideal for birthdays, anniversaries, office celebrations, congratulations and elegant home gifting.",
    image: categoryImage("floral-boxes"),
  },
  {
    slug: "floral-chocolate-boxes",
    label: "Floral & Chocolate Boxes",
    intro:
      "Beautiful blooms and premium chocolates come together in carefully arranged gift boxes. Customise the flowers, chocolate selection, colour palette and personal message for your occasion.",
    image: categoryImage("floral-chocolate-boxes"),
  },
  {
    slug: "baskets",
    label: "Gift Baskets",
    intro:
      "Explore floral and gift baskets filled with fresh blooms, chocolates and personalised additions. A practical and memorable option for celebrations, family visits and corporate gifting.",
    image: categoryImage("baskets"),
  },
  {
    slug: "money-bouquets",
    label: "Money Bouquets",
    intro:
      "Celebrate milestones with a personalised money bouquet arranged with flowers, wrapping and decorative details. Currency is provided or confirmed by the customer, and the final price depends on note quantity, denomination and selected design.",
    image: categoryImage("money-bouquets"),
  },
  {
    slug: "crochet-flowers",
    label: "Crochet Flowers",
    intro:
      "Long-lasting crochet flowers bring handmade character to birthdays, keepsakes, room décor and thoughtful gifts. Choose colours and bouquet size to create a floral gift that remains beautiful beyond the occasion.",
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
