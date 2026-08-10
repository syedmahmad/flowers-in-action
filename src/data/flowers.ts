import type { FlowerType, WeddingType } from "@/types/product";

export const flowerTypes: { slug: FlowerType; label: string; intro: string }[] =
  [
    {
      slug: "roses",
      label: "Roses",
      intro:
        "Classic, expressive and timeless — fresh roses are Lahore's most requested flowers for bouquets, anniversaries, birthdays, shadi functions and romantic surprises. Choose red for love, pink for admiration, white for elegance or mixed arrangements. Phool Pattiyan delivers fresh rose bouquets across DHA, State Life and all Lahore.",
    },
    {
      slug: "sunflowers",
      label: "Sunflowers",
      intro:
        "Bright sunflowers bring warmth and energy to birthday bouquets, birthday decoration, congratulations and cheerful everyday surprises in Lahore. Their bold yellow petals create instantly uplifting fresh flower arrangements popular for kids' birthdays and joyful gifting.",
    },
    {
      slug: "chrysanthemums",
      label: "Chrysanthemums",
      intro:
        "Full, textured chrysanthemums add colour and volume to fresh flower bouquets, boxes and baskets across Lahore. A versatile choice for birthday flowers, mehndi function décor and elegant mixed arrangements.",
    },
    {
      slug: "lilies",
      label: "Lilies",
      intro:
        "Graceful lilies create a refined presentation for anniversaries, shadi functions, formal gifting and sophisticated floral arrangements in Lahore. Their elegant form makes lilies a premium choice for bridal bouquets and wedding flowers.",
    },
    {
      slug: "babys-breath",
      label: "Baby's Breath",
      intro:
        "Delicate baby's breath adds softness and romance to bouquets and gajra designs. It works beautifully paired with roses and lilies for mehndi function flowers, bridal bouquets and romantic fresh flower gifts in Lahore.",
    },
  ];

export const weddingTypes: {
  slug: WeddingType;
  label: string;
  intro: string;
}[] = [
  {
    slug: "floral-jewellery",
    label: "Floral Jewellery & Gajra",
    intro:
      "Custom floral jewellery and gajra for brides, bridesmaids, mayun, mehndi and shadi functions in Lahore. Request coordinated earrings, necklaces, bracelets, gajray, rings and hair accessories matched to your outfit colours. Share inspiration photos on WhatsApp for a personalised flower jewelry design.",
  },
  {
    slug: "bridal-bouquets",
    label: "Bridal Bouquets",
    intro:
      "Handcrafted bridal bouquets for shadi functions designed around the bride's dress, wedding colours, venue and preferred fresh flower style. From classic white roses to vibrant mehndi palettes — ideal for nikkah, barat and reception across Lahore.",
  },
  {
    slug: "groom-garlands",
    label: "Groom Garlands",
    intro:
      "Fresh groom garlands and traditional barat haar designs for shadi functions in Lahore. Customise by flower type, colour, size and style to complement the groom's sherwani. Popular for barat, nikkah and mehndi events with advance booking.",
  },
  {
    slug: "car-decoration",
    label: "Car Decoration",
    intro:
      "Elegant shadi function car floral décor customised for barat and reception vehicles in Lahore. From subtle door accents to full bonnet arrangements — coordinated on WhatsApp with timing confirmed for your wedding schedule.",
  },
  {
    slug: "room-decoration",
    label: "Room Decoration",
    intro:
      "Birthday room decoration, wedding night décor and mehndi function room setups using fresh flowers, petals, candles and personalised details. Planned according to space and budget — popular for birthdays, anniversaries, proposals and shadi celebrations across Lahore.",
  },
];

export const featuredCollections = [
  { slug: "under-5000", label: "Under PKR 5,000" },
  { slug: "romantic-favourites", label: "Romantic Favourites" },
  { slug: "birthday-bestsellers", label: "Birthday Bestsellers" },
  { slug: "wedding-essentials", label: "Wedding Essentials" },
  { slug: "chocolate-flower-gifts", label: "Chocolate & Flower Gifts" },
  { slug: "same-day-favourites", label: "Same-Day Favourites" },
  { slug: "personalised-gifts", label: "Personalised Gifts" },
  { slug: "seasonal-flowers", label: "Seasonal Flowers" },
] as const;
