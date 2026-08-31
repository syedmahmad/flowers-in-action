#!/usr/bin/env node
/**
 * Process Phool Pattiyan catalogue images:
 * - Web filenames match published product/event titles (kebab-case)
 * - Center-crop bouquet photos (reduces edge people/hands)
 * - Resize event photos (original Phool Pattiyan work only — no watermark editing)
 * - Light enhance shop photos
 * Original WhatsApp filenames are preserved; only used web outputs are renamed.
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const ROOT = path.resolve("public/images");
const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

function slugFromName(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const BOUQUET_CURATED = [
  {
    src: "WhatsApp Image 2026-08-21 at 18.45.09.jpeg",
    name: "Crimson Love",
    description:
      "Deep red roses with white chrysanthemums and tuberoses in a rich burgundy wrap — our signature romantic bouquet.",
    price: 5000,
    discount: 10,
  },
  {
    src: "WhatsApp Image 2026-08-20 at 21.08.56 (1).jpeg",
    name: "Sunflower Bouquet",
    description:
      "Bright sunflowers with white accent blooms in textured black wrap and white satin ribbon — a bold birthday favourite.",
    price: 3500,
    discount: 10,
  },
  {
    src: "WhatsApp Image 2026-08-15 at 18.51.08 (1).jpeg",
    name: "Phool Pattiyan Pink",
    description:
      "White chrysanthemums and blush roses with tuberoses in soft pink wrap — handcrafted with our signature styling.",
    price: 5000,
    discount: 10,
  },
  {
    src: "WhatsApp Image 2026-08-18 at 20.29.35.jpeg",
    name: "Premium Blush Wrap",
    description:
      "Fresh pink roses, white mums and tuberoses with rose-gold trimmed wrap — dew-kissed and elegantly tied.",
    price: 6000,
    discount: 10,
  },
  {
    src: "WhatsApp Image 2026-08-15 at 18.10.06 (1).jpeg",
    name: "White Rose Classic",
    description:
      "Creamy white roses and chrysanthemums in gold-veined marble wrap with a satin red ribbon.",
    price: 5000,
    discount: 10,
  },
  {
    src: "WhatsApp Image 2026-08-15 at 18.10.10.jpeg",
    name: "Peach Serenity",
    description:
      "Soft peach roses and white chrysanthemums in elegant layered wrap — calm, feminine and beautifully balanced.",
    price: 5000,
    discount: 10,
  },
  {
    src: "WhatsApp Image 2026-08-15 at 18.51.07.jpeg",
    name: "Luxury Mixed Blooms",
    description:
      "Vibrant chrysanthemums and roses in lavender-pink wrap with black satin ribbon — a bold premium arrangement.",
    price: 5000,
    discount: 10,
  },
  {
    src: "WhatsApp Image 2026-08-15 at 18.10.08 (1).jpeg",
    name: "Red Velvet Wrap",
    description:
      "Velvet red roses and white tuberoses in deep maroon architectural wrap — dramatic and romantic.",
    price: 2500,
    discount: 10,
  },
  {
    src: "WhatsApp Image 2026-08-18 at 20.29.34 (1).jpeg",
    name: "Pink Marble Wrap",
    description:
      "Pink roses and white chrysanthemums in gold-veined marble wrap — soft, premium and beautifully balanced.",
    price: 5000,
    discount: 10,
  },
  {
    src: "WhatsApp Image 2026-08-21 at 21.42.07.jpeg",
    name: "Regal Garden Roses",
    description:
      "Magenta chrysanthemums and white daisies in lavender-pink wrap with black satin bow — rich and luxurious.",
    price: 5500,
    discount: 10,
  },
  {
    src: "WhatsApp Image 2026-08-15 at 18.10.09 (2).jpeg",
    name: "Soft Pink Bloom",
    description:
      "Blush roses and white mums in rose-gold trimmed frosted wrap — airy, feminine and beautifully layered.",
    price: 5000,
    discount: 10,
  },
  {
    src: "WhatsApp Image 2026-08-21 at 18.45.10.jpeg",
    name: "Purple White Chrysanthemum",
    description:
      "White and purple chrysanthemums with baby's breath in crisp white wrap and black ribbon — soft and elegant.",
    price: 5000,
    discount: 10,
    cropRegion: { width: 900, height: 1050, x: 300, y: 0 },
  },
  {
    src: "WhatsApp Image 2026-08-15 at 18.10.02 (2).jpeg",
    name: "Golden Rose Tuberose",
    description:
      "Deep red roses with white tuberoses in luminous gold wrap and satin ribbon — a classic romantic gift.",
    price: 2500,
    discount: 10,
  },
  {
    src: "artificial-love-teddy-bouquet.png",
    name: "Forever Love Artificial Bouquet",
    description:
      "Artificial red roses with teddy bear and I Love You heart in cream wrap — a lasting romantic gift that never fades.",
    price: 7000,
    discount: 10,
  },
  {
    src: "artificial-ruby-carnations-bouquet.png",
    name: "Ruby Radiance Artificial Bouquet",
    description:
      "Vibrant artificial red carnations with white filler in frosted wrap and rose-gold trim — bold, lasting and gift-ready.",
    price: 4500,
    discount: 10,
  },
  {
    src: "artificial-sunflower-marble-bouquet.png",
    name: "Sunshine Marble Artificial Bouquet",
    description:
      "Artificial sunflowers and blush carnations in layered black, newsprint and gold-marble wrap — bold, modern and lasting.",
    price: 4800,
    discount: 10,
  },
  {
    src: "talking-peach-cat.png",
    name: "Peach Talking Cat",
    description:
      "Soft peach plush talking cat with red ribbon — press to hear cute miaowo sounds. Batteries (cells) included.",
    price: 3300,
    discount: 10,
  },
  {
    src: "talking-pink-cat.png",
    name: "Pink Talking Cat",
    description:
      "Fluffy pink plush talking cat with Love ribbon — press to hear cute miaowo sounds. Batteries (cells) included.",
    price: 3300,
    discount: 10,
  },
  {
    src: "look-heart-teddy.png",
    name: "Look Heart Teddy",
    description:
      "Creamy white plush teddy with red hat and Look heart pillow — a sweet gift-ready keepsake.",
    price: 3500,
    discount: 10,
  },
  {
    src: "single-imported-rose-babys-breath.png",
    name: "Single Imported Rose with Baby's Breath",
    description:
      "One premium imported red rose with baby's breath in frosted chevron wrap and red ribbon — a classic romantic gesture.",
    price: 1200,
    discount: 10,
    origin: "imported",
  },
  {
    src: "sunflower-red-rose-bouquet.png",
    name: "Sunflower Red Rose Bouquet",
    description:
      "Bright sunflower with deep red roses and greenery in soft peach-pink wrap — bold, fresh and beautifully balanced.",
    price: 1800,
    discount: 10,
  },
  {
    src: "imported-rose-chrysanthemum-babys-breath.png",
    name: "Imported Rose White Chrysanthemum Bouquet",
    description:
      "Premium imported red rose with white chrysanthemums and baby's breath in gold-marble wrap and black ribbon — elegant and romantic.",
    price: 4500,
    discount: 10,
    origin: "imported",
  },
  {
    src: "sunflower-babys-breath-bouquet.png",
    name: "Sunflower Baby's Breath Bouquet",
    description:
      "Bright sunflowers with baby's breath and greenery in kraft paper wrap and satin ribbon — warm, cheerful and gift-ready.",
    price: 3500,
    discount: 10,
  },
  {
    src: "bridal-gajray-pink-rose-chrysanthemum.png",
    name: "Special Bridal Gajray Set",
    description:
      "Pair of lush bridal gajray with imported pink roses, white chrysanthemums and baby's breath — elegant for mehndi and shadi functions.",
    price: 5000,
    discount: 10,
    origin: "imported",
  },
  {
    src: "luxury-red-rose-tuberose.png",
    name: "Luxury Red Rose Tuberose",
    description:
      "Lush deep red roses with white tuberoses in textured gold wrap and satin ribbon — a generous romantic statement.",
    price: 4000,
    discount: 10,
  },
  {
    src: "red-rose-tuberose-black-wrap.png",
    name: "Red Rose Tuberose Black Wrap",
    description:
      "Deep red roses with white tuberoses in dramatic black wrap and white satin ribbon — bold and romantic.",
    price: 2500,
    discount: 10,
  },
  {
    src: "red-rose-tuberose-pink-black-wrap.png",
    name: "Red Rose Tuberose Pink Black Wrap",
    description:
      "Deep red roses with white tuberoses in pink and black layered wrap and blush ribbon — soft yet striking.",
    price: 2500,
    discount: 10,
  },
  {
    src: "red-white-rose-bouquet.png",
    name: "Red White Rose Bouquet",
    description:
      "Deep red and cream roses with tuberose accents in white rose-gold wrap and black ribbon — lush and elegant.",
    price: 4500,
    discount: 10,
  },
  {
    src: "white-imported-rose-chrysanthemum.png",
    name: "White Imported Rose Chrysanthemum Bouquet",
    description:
      "White imported roses and chrysanthemums with a single red rose accent in frosted rose-gold wrap and black ribbon — elegant and striking.",
    price: 4000,
    discount: 10,
    origin: "imported",
  },
  {
    src: "baby-boy-balloon-bouquet.png",
    name: "Baby Boy Balloon Bouquet",
    description:
      "It's A Boy themed foil balloon bouquet with baby bottle and star balloons in gold marble wrap and blue ribbon — perfect for baby showers and welcome home gifts.",
    price: 3800,
    discount: 10,
  },
  {
    src: "doraemon-azure-dream-basket.png",
    name: "Doraemon Azure Dream Basket",
    description:
      "Gift basket with Doraemon plush, blue and white roses, tulle-wrapped blue balloons and scalloped blue backdrop in a ribbon-trimmed wicker basket.",
    price: 5800,
    discount: 10,
  },
  {
    src: "hello-kitty-lavender-treat-basket.png",
    name: "Hello Kitty Lavender Treat Basket",
    description:
      "Hello Kitty plush with cream roses, purple paper fans and lavender-wrapped treat bars in a purple ribbon gift box.",
    price: 5500,
    discount: 10,
  },
  {
    src: "doraemon-sky-balloon-gift-box.png",
    name: "Doraemon Sky Balloon Gift Box",
    description:
      "Doraemon plush with navy rose bouquet and clear balloon top filled with blue mini balloons — a playful hot-air-balloon style gift box.",
    price: 3000,
    discount: 10,
  },
  {
    src: "crimson-love-teddy-basket.png",
    name: "Crimson Love Teddy Basket",
    description:
      "Red Love teddy with white and red carnations, white lily, berries and a wrapped treat in a round basket with red satin ribbon.",
    price: 5200,
    discount: 10,
  },
  {
    src: "monochrome-panda-luxe-basket.png",
    name: "Monochrome Panda Luxe Basket",
    description:
      "Panda mom and cub plush with white roses, black tulle balloons and black-wrapped gold-bow treats in an elegant white gift box.",
    price: 6000,
    discount: 10,
  },
  {
    src: "blush-tulle-teddy-celebration-basket.png",
    name: "Blush Tulle Teddy Celebration Basket",
    description:
      "Pink teddy with blush-tipped roses and pink tulle-wrapped balloons in a gold woven rectangular basket — sweet and festive.",
    price: 5400,
    discount: 10,
  },
  {
    src: "golden-i-love-you-teddy-basket.png",
    name: "Golden I Love You Teddy Basket",
    description:
      "Tan teddy with I Love You heart, pink roses, gold-marble wrapped treats and pink fan backdrop in a ribbon-trimmed round basket.",
    price: 5600,
    discount: 10,
  },
  {
    src: "pink-bunny-celebration-basket.png",
    name: "Pink Bunny Celebration Basket",
    description:
      "Gift basket with pink plush bunny, white lilies, carnations, blush roses, mini balloons and greenery in a white woven basket — perfect for birthdays and baby celebrations.",
    price: 8000,
    discount: 10,
  },
  {
    src: "purple-harmony-gift-basket.png",
    name: "Purple Harmony Gift Basket",
    description:
      "Gift basket with Cadbury chocolates, scented candle, illuminated flower gift box, pink and white roses, purple heart balloons and greenery — perfect for birthdays and thank-you gifts.",
    price: 7000,
    discount: 10,
  },
  {
    src: "magenta-white-chrysanthemum-blush.png",
    name: "Blush Magenta Chrysanthemum Bouquet",
    description:
      "Magenta and white chrysanthemums with tulle accents in blush pink wrap and black ribbon — lush and celebratory.",
    price: 6000,
    discount: 10,
  },
  {
    src: "lavender-peach-chrysanthemum-bouquet.png",
    name: "Lavender Peach Chrysanthemum Bouquet",
    description:
      "Lavender chrysanthemums with baby's breath in layered peach and white wrap with pink ribbon — soft, elegant and gift-ready.",
    price: 6000,
    discount: 10,
    webImage: "lavender-peach-chrysanthemum-bouquet-main.jpg",
  },
  {
    src: "plum-noir-chrysanthemum-bouquet.png",
    name: "Plum Noir Chrysanthemum Bouquet",
    description:
      "Deep plum chrysanthemums with baby's breath in layered black wrap and red satin ribbon — bold, dramatic and gift-ready.",
    price: 6000,
    discount: 10,
  },
  {
    src: "violet-snow-chrysanthemum-bouquet.png",
    name: "Violet Snow Chrysanthemum Bouquet",
    description:
      "White and deep purple chrysanthemums with baby's breath in black wrap and white satin ribbon — crisp, elegant and gift-ready.",
    price: 5500,
    discount: 10,
  },
  {
    src: "ivory-tuberose-chrysanthemum-bouquet.png",
    name: "Ivory Tuberose Chrysanthemum Bouquet",
    description:
      "White chrysanthemums and tuberoses with baby's breath in scalloped white wrap and burgundy satin ribbon — classic, fresh and elegant.",
    price: 5500,
    discount: 10,
  },
  {
    src: "local-red-rose-tuberose-bouquet.png",
    name: "Local Red Rose Tuberose Bouquet",
    description:
      "Fresh local red roses with white tuberoses in pink or purple wrap — classic, romantic and beautifully gift-ready.",
    price: 1800,
    discount: 10,
  },
  {
    src: "sunflower-imported-rose-bouquet.png",
    name: "Sunflower Imported Rose Bouquet",
    description:
      "Bright sunflowers with white imported roses and baby's breath in kraft paper wrap and white satin ribbon — warm, cheerful and gift-ready.",
    price: 7000,
    discount: 10,
    origin: "imported",
  },
  {
    src: "crimson-ivory-tuberose-bouquet.png",
    name: "Crimson Ivory Tuberose Bouquet",
    description:
      "Red and white roses with chrysanthemums and tuberoses in frosted rose-gold wrap and red satin ribbon — lush and romantic.",
    price: 5800,
    discount: 10,
  },
  {
    src: "amethyst-stripe-chrysanthemum-bouquet.png",
    name: "Amethyst Stripe Chrysanthemum Bouquet",
    description:
      "Deep purple chrysanthemums with baby's breath in white-striped wrap and pink satin ribbon — elegant and eye-catching.",
    price: 5500,
    discount: 10,
  },
  {
    src: "blush-mesh-romance-bouquet.png",
    name: "Blush Mesh Romance Bouquet",
    description:
      "Pink and white roses with chrysanthemums and baby's breath in mesh and layered pink-lavender wrap — soft and romantic.",
    price: 5400,
    discount: 10,
  },
  {
    src: "crimson-sky-balloon-bouquet.png",
    name: "Crimson Sky Balloon Bouquet",
    description:
      "White carnations with red mini balloons in a clear bubble top and black ribbon gift bag — a whimsical hot-air-balloon style arrangement.",
    price: 3000,
    discount: 10,
  },
  {
    src: "plum-peach-rose-bouquet.png",
    name: "Plum Peach Rose Bouquet",
    description:
      "Purple chrysanthemums with a pink rose centre and baby's breath in peach striped wrap and pink ribbon — rich yet feminine.",
    price: 5600,
    discount: 10,
  },
  {
    src: "scarlet-lily-tuberose-bouquet.png",
    name: "Scarlet Lily Tuberose Bouquet",
    description:
      "Red roses with white lilies, tuberoses and baby's breath in frosted rose-gold wrap and red ribbon — dramatic and luxurious.",
    price: 6000,
    discount: 10,
  },
  {
    src: "indigo-daisy-bouquet.png",
    name: "Indigo Daisy Bouquet",
    description:
      "White chrysanthemums with baby's breath in indigo scalloped wrap — crisp, fresh and beautifully structured.",
    price: 5200,
    discount: 10,
  },
  {
    src: "turquoise-sunshine-bouquet.png",
    name: "Turquoise Sunshine Bouquet",
    description:
      "Sunflowers with pink and white roses, tuberoses and baby's breath in bright turquoise wrap — bold, cheerful and fresh.",
    price: 5800,
    discount: 10,
  },
  {
    src: "burgundy-solo-rose-bouquet.png",
    name: "Burgundy Solo Rose Bouquet",
    description:
      "Single red rose with white chrysanthemums and baby's breath in burgundy fan wrap and white ribbon — classic and refined.",
    price: 5000,
    discount: 10,
  },
  {
    src: "classic-red-tuberose-tower.png",
    name: "Classic Red Tuberose Tower",
    description:
      "Red roses with white tuberoses in white architectural wrap and satin ribbon — tall, timeless and romantic.",
    price: 2000,
    discount: 10,
  },
  {
    src: "ebony-crimson-chrysanthemum-bouquet.png",
    name: "Ebony Crimson Chrysanthemum Bouquet",
    description:
      "Red roses with white chrysanthemums in black scalloped wrap and black ribbon — striking, modern and gift-ready.",
    price: 2400,
    discount: 10,
  },
];

/** Source files that are baskets, boxes, balloons or hampers — never publish */
const BOUQUET_EXCLUDE_SOURCES = new Set([
  "WhatsApp Image 2026-08-19 at 12.18.46.jpeg",
  "WhatsApp Image 2026-08-15 at 18.10.04.jpeg",
  "WhatsApp Image 2026-08-15 at 18.09.02.jpeg",
  "WhatsApp Image 2026-08-19 at 15.19.53.jpeg",
  "WhatsApp Image 2026-08-22 at 23.49.39.jpeg",
]);

const EVENT_GROUPS = [
  {
    name: "Safari Kids Birthday",
    description:
      "Themed safari birthday setup with balloon arch, animal cutouts and personalised name styling.",
    price: 38000,
    discount: 10,
    files: [
      "WhatsApp Image 2026-08-16 at 19.49.48.jpeg",
      "WhatsApp Image 2026-08-16 at 19.49.48 (1).jpeg",
      "WhatsApp Image 2026-08-16 at 19.49.49.jpeg",
    ],
    includedItems: [
      "Balloon arch & backdrop",
      "Theme cutouts",
      "Personalised name styling",
      "Setup in Lahore",
    ],
  },
  {
    name: "Cocomelon First Birthday",
    description:
      "Colourful Cocomelon theme with balloon arch, character cutouts and personalised name display.",
    price: 45000,
    discount: 10,
    files: ["WhatsApp Image 2026-08-23 at 06.56.19.jpeg"],
    includedItems: [
      "Theme backdrop",
      "Balloon arch & columns",
      "Character cutouts",
      "Personalised name styling",
    ],
  },
  {
    name: "Butterfly Birthday Celebration",
    description:
      "Elegant butterfly theme with floral pedestals, balloon garland and personalised birthday panels.",
    price: 58000,
    discount: 10,
    files: ["WhatsApp Image 2026-08-23 at 06.56.13.jpeg"],
    includedItems: [
      "Butterfly props",
      "Floral pedestals",
      "Balloon garland",
      "Personalised panels",
    ],
  },
  {
    name: "Purple Gold Birthday",
    description:
      "Luxury purple and gold birthday styling with neon signage, floral cart and balloon cascade.",
    price: 52000,
    discount: 10,
    files: ["WhatsApp Image 2026-08-23 at 06.56.16.jpeg"],
    includedItems: [
      "Neon Happy Birthday sign",
      "Decor cart styling",
      "Balloon cascade",
      "Floral accents",
    ],
  },
  {
    name: "Pastel First Birthday",
    description:
      "Soft pastel balloon arch with floral-topped pedestals and personalised name board for first birthdays.",
    price: 40000,
    discount: 10,
    files: ["WhatsApp Image 2026-08-23 at 06.56.15.jpeg"],
    includedItems: [
      "Pastel balloon arch",
      "Name backdrop",
      "Pedestal styling",
      "Floor balloon clusters",
    ],
  },
  {
    name: "Unicorn Birthday Party",
    description:
      "Dreamy unicorn theme with pink, gold and blue pedestals, floral accents and balloon garland.",
    price: 48000,
    discount: 10,
    files: ["WhatsApp Image 2026-08-23 at 06.56.17.jpeg"],
    includedItems: [
      "Unicorn backdrop",
      "Balloon garland",
      "Themed pedestals",
      "Floral styling",
    ],
  },
  {
    name: "Luxury Pink Birthday",
    description:
      "Grand outdoor pink birthday stage with floral columns, chandelier canopy and custom floor styling.",
    price: 60000,
    discount: 10,
    files: ["WhatsApp Image 2026-08-23 at 06.56.19 (2).jpeg"],
    includedItems: [
      "Stage backdrop panels",
      "Floral columns",
      "Chandelier canopy",
      "Custom floor wrap",
    ],
  },
  {
    name: "Aqiqah & Naming Ceremony",
    description:
      "Elegant blue, white and gold setup for aqiqah and naming celebrations.",
    price: 55000,
    discount: 10,
    files: ["WhatsApp Image 2026-08-23 at 06.56.14.jpeg"],
    includedItems: ["Backdrop & balloons", "Personalised name display", "Theme styling"],
  },
  {
    name: "Princess Baby Celebration",
    description:
      "Soft pink and cream moon theme for baby welcome and first celebrations.",
    price: 42000,
    discount: 10,
    files: ["WhatsApp Image 2026-08-23 at 06.56.18.jpeg"],
    includedItems: ["Moon backdrop", "Balloon styling", "Personalised name display"],
  },
  {
    name: "Mehndi & Haldi Décor",
    description:
      "Traditional marigold styling with bride-to-be neon and festive floor décor.",
    price: 90000,
    discount: 10,
    files: ["WhatsApp Image 2026-08-23 at 06.56.40.jpeg"],
    includedItems: [
      "Marigold garlands",
      "Neon signage",
      "Traditional props",
      "Floor styling",
    ],
  },
  {
    name: "Grand Opening Décor",
    description:
      "Fresh flower opening arrangements and balloon styling for shop and business launches.",
    price: 15000,
    discount: null,
    files: [],
    includedItems: [
      "Entrance balloon arch",
      "Fresh flower arrangements",
      "Ribbon styling",
    ],
    useShopPhoto: "WhatsApp Image 2026-08-17 at 18.17.35.jpeg",
  },
  {
    name: "Oh Baby Peach Birthday",
    description:
      "Outdoor Oh Baby birthday setup with peach and cream balloon garlands, arched backdrop, golden teddy bear and pedestal props.",
    price: 30000,
    discount: 10,
    files: ["oh-baby-peach-birthday.png"],
    includedItems: [
      "Oh Baby arched backdrop",
      "Peach & cream balloon garlands",
      "Golden teddy bear prop",
      "Pedestal & cube styling",
      "Outdoor lawn setup",
    ],
  },
  {
    name: "Luxury Gold Rose Balloon Birthday",
    description:
      "Gold and blush pink balloon arch with mosaic backdrop, neon signage, floral accents and gold pedestal plinths — elegant for birthdays and celebrations.",
    price: 25000,
    discount: 10,
    files: ["luxury-gold-rose-balloon-birthday.png"],
    includedItems: [
      "Gold & pink balloon arch",
      "Mosaic backdrop with neon sign",
      "Gold pedestal plinths",
      "Floral balloon accents",
      "Floor balloon clusters",
    ],
  },
  {
    name: "Traditional Mehndi Floor Setup",
    description:
      "Yellow floor seating with cushions, floral vine arch, fairy lights, circular floral wreath backdrop and gold pedestal candles — perfect for intimate mehndi celebrations.",
    price: 100000,
    discount: 10,
    files: ["traditional-mehndi-floor-setup.png"],
    includedItems: [
      "Yellow floor seating with cushions",
      "Floral vine arch & fairy lights",
      "Circular floral wreath backdrop",
      "Gold pedestal candle styling",
      "Green drapery backdrop",
    ],
  },
  {
    name: "Gold Mint Birthday Balloon Arch",
    description:
      "Gold, mint green and white balloon arch with Happy Birthday neon sign, greenery accents and gold pedestal — elegant indoor birthday styling.",
    price: 25000,
    discount: 10,
    files: ["gold-mint-birthday-balloon-arch.png"],
    includedItems: [
      "Gold, mint & white balloon arch",
      "Happy Birthday neon sign",
      "Greenery accents",
      "Gold pedestal plinth",
      "Indoor setup in Lahore",
    ],
  },
  {
    name: "Luxury Gold Rose Birthday Setup",
    description:
      "Gold, rose gold, red and white balloon garland with circular Happy Birthday backdrop, curtain styling and gold pedestal plinths — elegant indoor birthday décor.",
    price: 30000,
    discount: 10,
    files: ["luxury-gold-rose-birthday-setup.png"],
    includedItems: [
      "Gold & rose gold balloon garland",
      "Circular Happy Birthday backdrop",
      "Personalised name styling",
      "Gold pedestal plinths",
      "Indoor setup in Lahore",
    ],
  },
  {
    name: "Black Silver Gold Birthday Setup",
    description:
      "Black and chrome silver balloon arch with sequin backdrop, Happy Birthday sign, floral pedestal styling and floor balloon clusters — sleek modern birthday décor.",
    price: 30000,
    discount: 10,
    files: ["black-silver-gold-birthday-setup.png"],
    includedItems: [
      "Black & silver balloon arch",
      "Sequin Happy Birthday backdrop",
      "Floral pedestal arrangements",
      "Gold vase styling",
      "Floor balloon clusters",
    ],
  },
  {
    name: "Gold Purple Neon Birthday Arch",
    description:
      "Gold, silver and purple balloon arch with Happy Birthday neon sign, confetti balloons, white rose accents and gold pedestal plinths — glamorous indoor birthday styling.",
    price: 28000,
    discount: 10,
    files: ["gold-purple-neon-birthday-arch.png"],
    includedItems: [
      "Gold, silver & purple balloon arch",
      "Happy Birthday neon sign",
      "Confetti balloon accents",
      "Gold pedestal plinths",
      "Indoor setup in Lahore",
    ],
  },
  {
    name: "Boss Baby First Birthday",
    description:
      "Boss Baby themed first birthday with blue and white backdrop panels, balloon arches, character balloons, themed pedestal plinths and personalised name styling.",
    price: 44000,
    discount: 10,
    files: ["boss-baby-first-birthday.png"],
    includedItems: [
      "Themed backdrop panels",
      "Blue & white balloon arches",
      "Boss Baby character balloons",
      "Themed pedestal plinths",
      "Personalised name styling",
    ],
  },
  {
    name: "Silver Sequin Neon Birthday",
    description:
      "Silver sequin backdrop with Happy Birthday neon sign, silver, white and grey balloon arch, white rose accents and chrome pedestal plinths — elegant birthday styling.",
    price: 34000,
    discount: 10,
    files: ["silver-sequin-neon-birthday.png"],
    includedItems: [
      "Sequin backdrop wall",
      "Happy Birthday neon sign",
      "Silver & white balloon arch",
      "White rose accents",
      "Chrome pedestal plinths",
    ],
  },
];

function run(cmd) {
  execSync(cmd, { stdio: "pipe" });
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function withDiscount(price, pct) {
  if (!pct) return { price, originalPrice: undefined, discountPercentage: undefined };
  const originalPrice = Math.round(price / (1 - pct / 100));
  return { price, originalPrice, discountPercentage: pct };
}

/** Center crop to aspect ratio, then resize max width */
function processBouquet(input, output, options = {}) {
  if (options.cropRegion) {
    const { width, height, x, y } = options.cropRegion;
    run(
      `magick "${input}" -auto-orient -crop ${width}x${height}${x >= 0 ? "+" : ""}${x}${y >= 0 ? "+" : ""}${y} +repage -gravity North -crop 4:5 +repage -resize 1200x1500> -strip -quality 88 "${output}"`
    );
    return;
  }

  run(
    `magick "${input}" -auto-orient -gravity center -crop 4:5 +repage -resize 1200x1500> -strip -quality 88 "${output}"`
  );
}

/** Resize event photos for web — no blur or watermark editing */
function processEvent(input, output) {
  run(
    `magick "${input}" -auto-orient -resize 1400x1050> -strip -quality 88 "${output}"`
  );
}

function processShop(input, output) {
  run(
    `magick "${input}" -auto-orient -modulate 102,108,100 -brightness-contrast 2x1 -sharpen 0x0.6 -resize 1600x1200> -strip -quality 90 "${output}"`
  );
}

function listImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => IMAGE_EXT.test(f));
}

function cleanupWebDir(webDir, keepFilenames) {
  if (!fs.existsSync(webDir)) return;
  for (const file of fs.readdirSync(webDir)) {
    const fullPath = path.join(webDir, file);
    if (!fs.statSync(fullPath).isFile()) continue;
    if (!keepFilenames.has(file)) {
      fs.unlinkSync(fullPath);
    }
  }
}

function eventWebFilename(slug, index) {
  return index === 0 ? `${slug}.jpg` : `${slug}-${index + 1}.jpg`;
}

function main() {
  const bouquetDir = path.join(ROOT, "bouquets");
  const eventDir = path.join(ROOT, "events");
  const shopDir = path.join(ROOT, "shopPhotos");
  const bouquetWeb = path.join(bouquetDir, "web");
  const eventWeb = path.join(eventDir, "web");
  const shopWeb = path.join(shopDir, "web");

  [bouquetWeb, eventWeb, shopWeb].forEach(ensureDir);

  const bouquetManifest = [];

  for (const item of BOUQUET_CURATED) {
    if (BOUQUET_EXCLUDE_SOURCES.has(item.src)) continue;
    const input = path.join(bouquetDir, item.src);
    if (!fs.existsSync(input)) {
      console.warn("Missing bouquet:", item.src);
      continue;
    }
    const slug = slugFromName(item.name);
    const outName = item.webImage || `${slug}.jpg`;
    const output = path.join(bouquetWeb, outName);
    processBouquet(input, output, item);
    bouquetManifest.push({
      ...item,
      slug,
      origin: item.origin || "local",
      image: `/images/bouquets/web/${outName}`,
      ...withDiscount(item.price, item.discount),
    });
  }

  cleanupWebDir(bouquetWeb, new Set(bouquetManifest.map((b) => path.basename(b.image))));

  bouquetManifest.forEach((b, i) => {
    if (b.originalPrice === undefined && b.discount) {
      Object.assign(b, withDiscount(b.price, b.discount));
    }
    if (!b.description) b.description = `${b.name} — fresh flowers handcrafted in Lahore.`;
    b.featured = true;
    b.id = `bq-${String(i + 1).padStart(3, "0")}`;
    b.imageAlt = `${b.name} fresh flower bouquet by Phool Pattiyan Lahore`;
    b.available = true;
  });

  const eventManifest = [];
  const eventKeepFilenames = new Set();

  for (const group of EVENT_GROUPS) {
    const slug = slugFromName(group.name);
    const images = [];
    for (const file of group.files) {
      const input = path.join(eventDir, file);
      if (!fs.existsSync(input)) continue;
      const outName = eventWebFilename(slug, images.length);
      const output = path.join(eventWeb, outName);
      if (group.cleanWatermark) {
        run(
          `python3 "${path.resolve("scripts/remove-event-watermark.py")}" "${input}" "${output}"`
        );
      } else {
        processEvent(input, output);
      }
      images.push(`/images/events/web/${outName}`);
      eventKeepFilenames.add(outName);
    }
    if (group.useShopPhoto) {
      const input = path.join(shopDir, group.useShopPhoto);
      if (fs.existsSync(input)) {
        const outName = `${slug}.jpg`;
        const output = path.join(eventWeb, outName);
        processShop(input, output);
        images.push(`/images/events/web/${outName}`);
        eventKeepFilenames.add(outName);
      }
    }
    if (images.length === 0) continue;
    const pricing = withDiscount(group.price, group.discount);
    eventManifest.push({
      id: `ev-${eventManifest.length + 1}`,
      slug,
      name: group.name,
      description: group.description,
      images,
      imageAlt: `${group.name} by Phool Pattiyan Lahore`,
      pricePrefix: "Starting from",
      includedItems: group.includedItems,
      featured: true,
      available: true,
      ...pricing,
    });
  }

  cleanupWebDir(eventWeb, eventKeepFilenames);

  const shopManifest = [];
  const storefrontSrc = path.join(ROOT, "placeholders/storefront.jpeg");
  if (fs.existsSync(storefrontSrc)) {
    const out = path.join(shopWeb, "storefront.jpg");
    processShop(storefrontSrc, out);
    shopManifest.push({ slug: "storefront", image: `/images/shopPhotos/web/storefront.jpg` });
  }
  for (const file of listImages(shopDir)) {
    if (file === "web") continue;
    const slug = file.replace(/\.[^.]+$/, "").replace(/\W+/g, "-").toLowerCase().slice(0, 40);
    const out = path.join(shopWeb, `${slug || "shop"}.jpg`);
    try {
      processShop(path.join(shopDir, file), out);
      shopManifest.push({ slug, image: `/images/shopPhotos/web/${path.basename(out)}` });
    } catch {
      console.warn("Skip shop", file);
    }
  }

  fs.writeFileSync(
    path.join(ROOT, "catalog-manifest.json"),
    JSON.stringify({ bouquets: bouquetManifest, events: eventManifest, shop: shopManifest }, null, 2)
  );

  console.log(
    `Processed ${bouquetManifest.length} bouquets, ${eventManifest.length} events, ${shopManifest.length} shop photos`
  );
}

main();
