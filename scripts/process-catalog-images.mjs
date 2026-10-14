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

const PINNED_BOUQUET_SLUG = "red-rose-tuberose-pink-black-wrap";

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
    price: 2000,
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
    price: 2000,
    discount: 10,
  },
  {
    src: "red-rose-tuberose-pink-black-wrap.png",
    name: "Red Rose Tuberose Pink Black Wrap",
    description:
      "Deep red roses with white tuberoses in pink and black layered wrap and blush ribbon — soft yet striking.",
    price: 2000,
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
    price: 2700,
    discount: 10,
  },
  {
    src: "burgundy-tulle-rose-bouquet.png",
    name: "Burgundy Tulle Rose Bouquet",
    description:
      "Red roses with white chrysanthemums and tuberoses in burgundy wrap with white tulle and red ribbon — lush, romantic and gift-ready.",
    price: 5000,
    discount: 10,
  },
  {
    src: "blush-peach-satin-bouquet.png",
    name: "Blush Peach Satin Bouquet",
    description:
      "Pink and cream roses with white chrysanthemums in peach fan wrap and blush satin ribbon — soft, romantic and effortlessly elegant.",
    price: 3500,
    discount: 10,
  },
  {
    src: "sky-blue-blush-chrysanthemum-bouquet.png",
    name: "Sky Blue Blush Chrysanthemum Bouquet",
    description:
      "Pink and white chrysanthemums with cream roses in sky-blue wrap and matching ribbon — fresh, colourful and gift-ready.",
    price: 5000,
    discount: 10,
  },
  {
    src: "pink-chocolate-treat-bouquet.png",
    name: "Pink Chocolate Treat Bouquet",
    description:
      "Fresh pink roses and white blooms with your choice of chocolates (KitKat, Snickers, Dairy Milk, Bounty or similar) in blush pink wrap — chocolates are personalised to your preference, or you may provide your own.",
    price: 5000,
    discount: 10,
  },
  {
    src: "sky-blue-daisy-meadow-bouquet.png",
    name: "Sky Blue Daisy Meadow Bouquet",
    description:
      "White daisies and pink chrysanthemums with baby's breath in sky-blue scalloped wrap — bright, cheerful and perfect for any occasion.",
    price: 5000,
    discount: 10,
  },
  {
    src: "midnight-gala-rose-bouquet.png",
    name: "Midnight Gala Rose Bouquet",
    description:
      "Red roses with white chrysanthemums and baby's breath in bold black fan wrap and white satin ribbon — modern, dramatic and gift-ready.",
    price: 2500,
    discount: 10,
  },
  {
    src: "white-hot-air-balloon-gift-box.png",
    name: "White Hot Air Balloon Gift Box",
    description:
      "Red and white roses with mixed blooms in a white gift box, topped with a clear balloon filled with white mini balloons — elegant hot-air-balloon styling.",
    price: 3000,
    discount: 10,
  },
  {
    src: "white-rose-teddy-chocolate-basket.png",
    gallerySrcs: ["white-rose-teddy-chocolate-basket-2.png"],
    name: "White Rose Teddy Chocolate Hamper",
    description:
      "Cream teddy bear with white roses, Snickers and KitKat bars in a gold ribbon basket with black tulle backdrop — a premium flowers-and-chocolates gift hamper.",
    price: 6800,
    discount: 10,
  },
  {
    src: "sunflower-garden-mix-bouquet.png",
    name: "Sunflower Garden Mix Bouquet",
    description:
      "Bright sunflower with red roses, white chrysanthemums and pink accent blooms in scalloped pink wrap and satin ribbon — cheerful, colourful and gift-ready.",
    price: 2800,
    discount: 10,
  },
  {
    src: "lavender-sunflower-mixed-bouquet.png",
    name: "Lavender Sunflower Mixed Bouquet",
    description:
      "White and purple chrysanthemums with sunflowers, tuberoses and baby's breath in lavender scalloped wrap and satin ribbon — lush, fragrant and beautifully layered.",
    price: 4000,
    discount: 10,
  },
  {
    src: "pink-birthday-hot-air-balloon-gift-box.png",
    name: "Pink Birthday Hot Air Balloon Gift Box",
    description:
      "Pink and white roses in a pink ribbon gift box with a clear balloon top and rose-gold Happy Birthday star foil — festive hot-air-balloon styling.",
    price: 3500,
    discount: 10,
  },
  {
    src: "pink-rose-scallop-wrap-bouquet.png",
    name: "Pink Rose Scallop Wrap Bouquet",
    description:
      "Pink roses with white chrysanthemums and baby's breath in pink scalloped wrap and satin ribbon — soft, elegant and gift-ready.",
    price: 4500,
    discount: 10,
  },
  {
    src: "red-rose-tuberose-honeycomb-wrap-bouquet.png",
    name: "Red Rose Tuberose Honeycomb Wrap",
    description:
      "Deep red roses with white tuberoses and baby's breath in white honeycomb wrap and burgundy satin ribbon — classic, romantic and gift-ready.",
    price: 2500,
    discount: 10,
  },
  {
    src: "twin-sunflower-black-ribbon-bouquet.png",
    name: "Twin Sunflower Black Ribbon Bouquet",
    description:
      "Twin sunflowers with baby's breath and greenery in layered brown kraft wrap and black satin ribbon — bold, cheerful and gift-ready.",
    price: 2800,
    discount: 10,
  },
  {
    src: "red-rose-black-box-bouquet.png",
    name: "Red Rose Black Box Bouquet",
    description:
      "Lush deep red roses in a matte black square gift box with red satin ribbon — dramatic, romantic and presentation-ready.",
    price: 5000,
    discount: 10,
  },
  {
    src: "five-sunflower-glass-vase-bouquet.png",
    name: "Five Sunflower Glass Vase Bouquet",
    description:
      "Five bright sunflowers with baby's breath in a clear glass vase, wrapped in burgundy fabric with black and white accents and white satin ribbon — bold, cheerful and gift-ready.",
    price: 3500,
    discount: 10,
  },
  {
    src: "magenta-chrysanthemum-periwinkle-wrap-bouquet.png",
    name: "Magenta Chrysanthemum Periwinkle Wrap",
    description:
      "Magenta and white chrysanthemums with tuberoses and baby's breath in periwinkle scalloped wrap with white tulle and satin ribbon — lush, colourful and gift-ready.",
    price: 2700,
    discount: 10,
  },
  {
    src: "luxury-wedding-car-decoration.png",
    name: "Luxury Wedding Car Decoration",
    description:
      "Fresh pink and peach florals with tulle draping on bonnet, roof and side mirrors — elegant barat car styling for wedding departures across Lahore.",
    price: 10000,
    discount: 10,
  },
  {
    src: "sunflower-purple-white-honeycomb-bouquet.png",
    name: "Sunflower Purple White Honeycomb Bouquet",
    description:
      "Twin sunflowers with purple and white chrysanthemums, tuberoses and baby's breath in white honeycomb wrap and black satin ribbon — bold, colourful and gift-ready.",
    price: 3000,
    discount: 10,
  },
  {
    src: "pink-rose-chocolate-deluxe-bouquet.png",
    name: "Pink Rose Chocolate Deluxe Bouquet",
    description:
      "Fresh pink roses with white chrysanthemums and baby's breath, plus branded chocolates (KitKat, Bounty, Snickers, Dairy Milk or similar) in pink scalloped wrap — PKR 5,000 bouquet + PKR 2,500 chocolates.",
    price: 7500,
    discount: 10,
  },
  {
    src: "crimson-ivory-black-fan-bouquet.png",
    name: "Crimson Ivory Black Fan Bouquet",
    description:
      "Deep red roses with white chrysanthemums and baby's breath in layered black fan wrap and white satin ribbon — dramatic, romantic and gift-ready.",
    price: 3000,
    discount: 10,
  },
  {
    src: "white-red-hot-air-balloon-gift-box.png",
    name: "White Red Hot Air Balloon Gift Box",
    description:
      "Red and white roses with mixed blooms in a white gift box, topped with a clear balloon filled with white mini balloons — elegant hot-air-balloon styling.",
    price: 3300,
    discount: 10,
  },
  {
    src: "white-birthday-hot-air-balloon-gift-box.png",
    name: "White Birthday Hot Air Balloon Gift Box",
    description:
      "Pink and cream roses in a white gift box with white ribbon, topped with a clear balloon and rose-gold Happy Birthday star foil — festive hot-air-balloon styling.",
    price: 3500,
    discount: 10,
  },
  {
    src: "five-sunflower-black-wrap-bouquet.png",
    name: "Five Sunflower Black Wrap Bouquet",
    description:
      "Five bright sunflowers with baby's breath and greenery in textured black wrap and white satin ribbon — bold, cheerful and gift-ready.",
    price: 3500,
    discount: 10,
  },
  {
    src: "baby-boy-hot-air-balloon-gift-box.png",
    name: "Baby Boy Hot Air Balloon Gift Box",
    description:
      "Blue and cream roses in a lavender gift box with blue ribbon, topped with a clear balloon filled with blue mini balloons — perfect baby boy welcome gift.",
    price: 3500,
    discount: 10,
  },
  {
    src: "pink-rose-sky-blue-wrap-bouquet.jpg",
    name: "Pink Rose Sky Blue Wrap Bouquet",
    description:
      "Pink and white roses with chrysanthemums and baby's breath in sky-blue scalloped wrap and satin ribbon — soft, romantic and gift-ready.",
    price: 5000,
    discount: 10,
    video: "/videos/bouquets/pink-rose-sky-blue-wrap-bouquet.mp4",
  },
  {
    src: "red-rose-white-gladiolus-lavender-wrap.png",
    name: "Red Rose White Gladiolus Lavender Wrap",
    description:
      "Deep red roses with white gladiolus and purple accent blooms in lavender scalloped wrap and satin ribbon — lush, dramatic and gift-ready.",
    price: 4500,
    discount: 10,
  },
  {
    src: "white-chrysanthemum-mini-aster-bouquet.png",
    name: "White Chrysanthemum Mini Aster Bouquet",
    description:
      "White chrysanthemums with purple mini asters and tuberose buds in aqua scalloped wrap and satin ribbon — fresh, elegant and gift-ready.",
    price: 5000,
    discount: 10,
  },
  {
    src: "sunflower-rose-gladiolus-mint-wrap.png",
    name: "Sunflower Rose Gladiolus Mint Wrap",
    description:
      "Twin sunflowers with red roses, white gladiolus and chrysanthemums in mint-green scalloped wrap and white satin ribbon — bold, fresh and gift-ready.",
    price: 4000,
    discount: 10,
  },
  {
    src: "red-cream-spray-rose-white-wrap.png",
    name: "Red Cream Spray Rose White Wrap",
    description:
      "Deep red and cream spray roses with baby's breath in white scalloped lace wrap and red satin ribbon — romantic, elegant and gift-ready.",
    price: 4000,
    discount: 10,
  },
  {
    src: "pink-chrysanthemum-scallop-wrap-bouquet.png",
    name: "Pink Chrysanthemum Scallop Wrap Bouquet",
    description:
      "Soft pink chrysanthemums with baby's breath in hot-pink scalloped wrap and satin ribbon — lush, feminine and gift-ready.",
    price: 5000,
    discount: 10,
  },
  {
    src: "white-chrysanthemum-purple-aster-blue-wrap.png",
    name: "White Chrysanthemum Purple Aster Blue Wrap",
    description:
      "White chrysanthemums with purple asters in baby-blue scalloped wrap and satin ribbon — fresh, elegant and gift-ready.",
    price: 4500,
    discount: 10,
  },
  {
    src: "pink-rose-chrysanthemum-scallop-wrap.png",
    name: "Pink Rose Chrysanthemum Scallop Wrap",
    description:
      "Pink roses and chrysanthemums with baby's breath in blush-pink scalloped wrap and satin ribbon — lush, romantic and gift-ready.",
    price: 5000,
    discount: 10,
  },
  {
    src: "sunflower-grey-wrap-glass-vase-bouquet.png",
    name: "Sunflower Grey Wrap Glass Vase Bouquet",
    description:
      "Bright sunflowers with baby's breath in charcoal-grey striped wrap and black satin ribbon, presented in a clear glass vase — bold, cheerful and gift-ready.",
    price: 3500,
    discount: 10,
  },
  {
    src: "purple-chrysanthemum-pink-wrap-bouquet.jpg",
    name: "Purple Chrysanthemum Pink Wrap Bouquet",
    description:
      "Deep purple chrysanthemums with baby's breath in blush-pink scalloped wrap and lavender satin ribbon — lush, feminine and gift-ready.",
    price: 5000,
    discount: 10,
    video: "/videos/bouquets/purple-chrysanthemum-pink-wrap-bouquet.mp4",
  },
  {
    src: "money-bouquet-pink-wrap-roses.png",
    gallerySrcs: ["money-bouquet-pink-wrap-roses-2.png"],
    name: "Pink Wrap Money Rose Bouquet",
    description:
      "Currency notes fan-arranged with white roses in blush-pink scalloped wrap and satin ribbon — PKR 2,800 arrangement fee; banknotes are supplied separately by the customer.",
    price: 2800,
    discount: 10,
  },
  {
    src: "sunflower-tuberose-lavender-scallop-bouquet.png",
    name: "Sunflower Tuberose Lavender Scallop Bouquet",
    description:
      "Sunflowers with white and purple chrysanthemums, tuberoses and baby's breath in lavender scalloped wrap and satin ribbon — lush, fragrant and gift-ready.",
    price: 5500,
    discount: 10,
  },
  {
    src: "imported-red-rose-babys-breath-bouquet.png",
    name: "Imported Red Rose Baby's Breath Bouquet",
    description:
      "Premium imported red roses with imported baby's breath in white gold-trim wrap, Happy Birthday card and red satin ribbon — classic, romantic and gift-ready.",
    price: 8000,
    discount: 10,
    origin: "imported",
  },
  {
    src: "boy-hbd-hot-air-balloon-gift-box.png",
    name: "Boy HBD",
    description:
      "Blue and lavender roses in a white gift box with blue ribbon, topped with a clear balloon and light-blue Happy Birthday star foil — festive hot-air-balloon styling for boys.",
    price: 3500,
    discount: 10,
  },
  {
    src: "girl-hbd-hot-air-balloon-gift-box.png",
    name: "Girl HBD",
    description:
      "Pink and cream roses in a blush-pink gift box with pink ribbon, topped with a clear balloon and rose-gold Happy Birthday star foil — festive hot-air-balloon styling for girls.",
    price: 3500,
    discount: 10,
  },
  {
    src: "six-imported-chrysanthemum-vase-set.png",
    name: "Six Imported Chrysanthemum Vase Set",
    description:
      "Six clear glass vases with imported magenta and white chrysanthemums and imported baby's breath — versatile table styling for mehndi, birthdays, openings and events across Lahore.",
    price: 14000,
    discount: 10,
    origin: "imported",
  },
  {
    src: "birthday-package-red-rose-heart-balloons.png",
    name: "Birthday Package",
    description:
      "Deep red roses in a black gift box with red ribbon, Happy Birthday card and heart foil balloons — a ready-made birthday surprise in Lahore.",
    price: 7000,
    discount: 10,
  },
  {
    src: "white-rose-magenta-chrysanthemum-pink-scallop-bouquet.png",
    name: "White Rose Magenta Chrysanthemum Pink Scallop Bouquet",
    description:
      "White roses with magenta chrysanthemums and purple accent blooms in blush-pink scalloped wrap and satin ribbon — soft, lush and gift-ready.",
    price: 5000,
    discount: 10,
  },
  {
    src: "red-rose-peach-scallop-wrap-bouquet.png",
    name: "Red Rose Peach Scallop Wrap Bouquet",
    description:
      "Deep red roses with white gerberas, chrysanthemums and baby's breath in peach scalloped wrap and white satin ribbon — warm, fresh and gift-ready.",
    price: 5000,
    discount: 10,
  },
  {
    src: "white-rose-pink-chrysanthemum-scallop-bouquet.png",
    name: "White Rose Pink Chrysanthemum Scallop Bouquet",
    description:
      "White roses with pink chrysanthemums in white scalloped wrap and blush satin ribbon — soft, elegant and gift-ready.",
    price: 4000,
    discount: 10,
    video: "/videos/bouquets/white-rose-pink-chrysanthemum-scallop-bouquet.mp4",
  },
  {
    src: "red-rose-yellow-chrysanthemum-peach-scallop-bouquet.png",
    name: "Red Rose Yellow Chrysanthemum Peach Scallop Bouquet",
    description:
      "Deep red roses with white and yellow chrysanthemums and baby's breath in peach scalloped wrap and burgundy satin ribbon — warm, lush and gift-ready.",
    price: 5500,
    discount: 10,
    video: "/videos/bouquets/red-rose-yellow-chrysanthemum-peach-scallop-bouquet.mp4",
  },
  {
    src: "cream-teddy-rose-celebration-basket.png",
    name: "Cream Teddy Rose Celebration Basket",
    description:
      "Cream teddy bears with deep red roses, gold-marble wrapped treats and feather accents in a ribbon-trimmed gift basket — a premium flowers, plush and treats hamper.",
    price: 7000,
    discount: 10,
    video: "/videos/bouquets/cream-teddy-rose-celebration-basket.mp4",
  },
  {
    src: "artificial-ivory-red-black-fan-bouquet.png",
    gallerySrcs: ["artificial-ivory-red-black-fan-bouquet-2.png"],
    name: "Ivory Red Black Fan Artificial Bouquet",
    description:
      "Artificial ivory roses with a red bloom centre in black fan wrap and white satin ribbon — lasting, dramatic and one of our best gift-ready artificial bouquets.",
    price: 3500,
    discount: 10,
  },
  {
    src: "peach-teddy-pink-rose-gift-basket.png",
    name: "Peach Teddy Pink Rose Gift Basket",
    description:
      "Peach and pink teddy bears with blush roses, fabric blooms, pink wrapped treats and white feather accents in a gold ribbon gift basket — sweet, premium and gift-ready.",
    price: 7000,
    discount: 10,
  },
  {
    src: "red-heart-anniversary-hot-air-balloon-gift-box.png",
    name: "Red Heart Anniversary Hot Air Balloon Box",
    description:
      "Red and white roses in a black gift box with red ribbon, topped with a clear balloon and red heart foil — a romantic hot-air-balloon gift for anniversaries and loved ones.",
    price: 4000,
    discount: 10,
  },
  {
    src: "sunflower-rose-chrysanthemum-cream-wrap-bouquet.png",
    name: "Sunflower Rose Chrysanthemum Cream Wrap Bouquet",
    description:
      "Sunflowers with pink roses, white and purple chrysanthemums in textured cream wrap and white satin ribbon — bright, colourful and gift-ready.",
    price: 6000,
    discount: 10,
  },
  {
    src: "pink-white-chrysanthemum-lace-wrap-bouquet.png",
    name: "Pink White Chrysanthemum Lace Wrap Bouquet",
    description:
      "Pink and white chrysanthemums with baby's breath in blush-pink lace-trim wrap and satin ribbon — soft, lush and gift-ready.",
    price: 6000,
    discount: 10,
  },
  {
    src: "blue-white-chrysanthemum-sky-blue-wrap-bouquet.png",
    name: "Blue White Chrysanthemum Sky Blue Wrap Bouquet",
    description:
      "Blue and white chrysanthemums with baby's breath in sky-blue scalloped wrap and matching ribbon — fresh, cheerful and gift-ready.",
    price: 6000,
    discount: 10,
  },
  {
    src: "doraemon-white-rose-gift-basket.png",
    name: "Doraemon White Rose Gift Basket",
    description:
      "Doraemon plush with white roses, Love teddy accents, black-wrapped treats and feather styling in a floral ribbon gift box — playful, premium and gift-ready.",
    price: 6000,
    discount: 10,
  },
  {
    src: "green-rose-teddy-treat-gift-box.png",
    name: "Green Rose Teddy Treat Gift Box",
    description:
      "Green roses with a white teddy bear and mint-wrapped treat bars in a green velvet lace-trim gift box — fresh, elegant and gift-ready.",
    price: 5000,
    discount: 10,
  },
  {
    src: "cream-rose-blue-bloom-white-fan-wrap-bouquet.png",
    name: "Cream Rose Blue Bloom White Fan Wrap Bouquet",
    description:
      "Cream roses with vivid blue accent blooms and baby's breath in white pleated fan wrap and satin ribbon — soft, elegant and gift-ready.",
    price: 4000,
    discount: 10,
  },
  {
    src: "white-blue-tint-chrysanthemum-blue-trim-wrap-bouquet.png",
    name: "White Blue Tint Chrysanthemum Blue Trim Wrap Bouquet",
    description:
      "White chrysanthemums with soft blue-tinted blooms in layered white wrap with sky-blue trim and matching satin ribbon — fresh, elegant and gift-ready.",
    price: 5000,
    discount: 10,
  },
  {
    src: "red-rose-babys-breath-black-wrap-bouquet.png",
    name: "Red Rose Baby's Breath Black Wrap Bouquet",
    description:
      "Deep red roses with baby's breath and greenery in layered black fan wrap and white satin ribbon — classic, romantic and gift-ready.",
    price: 3500,
    discount: 10,
  },
  {
    src: "red-teddy-wifey-balloon-gift-bouquet.png",
    name: "Red Teddy Wifey Balloon Gift Bouquet",
    description:
      "Deep red blooms with plush teddy bears, I Love Wifey sign, star and message balloons in black scalloped wrap and burgundy satin ribbon — romantic, premium and gift-ready.",
    price: 10000,
    discount: 10,
    videos: [
      "/videos/bouquets/red-teddy-wifey-balloon-gift-bouquet-1.mp4",
      "/videos/bouquets/red-teddy-wifey-balloon-gift-bouquet-2.mp4",
    ],
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
    price: 28000,
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
    price: 30000,
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
    price: 30000,
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
    price: 25000,
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
    price: 20000,
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
    price: 22000,
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
    price: 25000,
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
    price: 35000,
    discount: 10,
    files: ["WhatsApp Image 2026-08-23 at 06.56.14.jpeg"],
    includedItems: ["Backdrop & balloons", "Personalised name display", "Theme styling"],
  },
  {
    name: "Princess Baby Celebration",
    description:
      "Soft pink and cream moon theme for baby welcome and first celebrations.",
    price: 27000,
    discount: 10,
    files: ["WhatsApp Image 2026-08-23 at 06.56.18.jpeg"],
    includedItems: ["Moon backdrop", "Balloon styling", "Personalised name display"],
  },
  {
    name: "Mehndi & Haldi Décor",
    description:
      "Traditional marigold styling with bride-to-be neon and festive floor décor.",
    price: 80000,
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
    price: 5000,
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
    price: 20000,
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
    price: 18000,
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
    price: 90000,
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
    price: 15000,
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
    price: 20000,
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
    price: 20000,
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
    price: 18000,
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
    price: 25000,
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
    price: 24000,
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
  {
    name: "Golden Marigold Wedding Stage",
    description:
      "Traditional golden stage with yellow marigold drapes, ornate seating and warm festive lighting — ideal for mehndi and mayun celebrations.",
    price: 40000,
    discount: 10,
    files: ["golden-marigold-wedding-stage.png"],
    includedItems: [
      "Golden stage seating",
      "Marigold drape canopy",
      "Warm festive lighting",
      "Setup in Lahore",
    ],
  },
  {
    name: "Radiant Harlequin Floral Stage",
    description:
      "Colourful diamond-pattern floral wall with ornate silver seating — a vibrant budget-friendly wedding and engagement stage.",
    price: 150000,
    discount: 10,
    files: ["radiant-harlequin-floral-stage.png"],
    includedItems: [
      "Harlequin floral backdrop",
      "Ornate stage seating",
      "Stage uplighting",
      "Setup in Lahore",
    ],
  },
  {
    name: "Classic Marigold Mehndi Canopy",
    description:
      "Circular marigold canopy with yellow seating, floral pillars and fairy lights — perfect for traditional mehndi and mayun events.",
    price: 80000,
    discount: 10,
    files: ["classic-marigold-mehndi-canopy.png"],
    includedItems: [
      "Marigold canopy arch",
      "Yellow stage seating",
      "Floral pillars & fairy lights",
      "Setup in Lahore",
    ],
  },
  {
    name: "Festive Mehndi Glow Setup",
    description:
      "Warm red and yellow drapes with fairy-light canopy, low seating and green vine pillars — cosy traditional mehndi styling.",
    price: 45000,
    discount: 10,
    files: ["festive-mehndi-glow-setup.png"],
    includedItems: [
      "Draped backdrop & fairy lights",
      "Low floor seating",
      "Green vine pillars",
      "Setup in Lahore",
    ],
  },
  {
    name: "Royal Pink Mehndi Marquee",
    description:
      "Pink dance floor with glowing floral pillars, floor seating and festive lighting — a bold mehndi marquee setup.",
    price: 100000,
    discount: 10,
    files: ["royal-pink-mehndi-marquee.png"],
    includedItems: [
      "Glowing floral pillars",
      "Pink dance floor",
      "Floor seating area",
      "Festive marquee lighting",
    ],
  },
  {
    name: "Traditional Marigold Stage Décor",
    description:
      "Yellow marigold arch with patterned floral screen, ornate seating and garland pillars — classic wedding stage décor.",
    price: 180000,
    discount: 10,
    files: ["traditional-marigold-stage-decor.png"],
    includedItems: [
      "Marigold floral arch",
      "Patterned backdrop screen",
      "Ornate stage seating",
      "Garland pillar styling",
    ],
  },
  {
    name: "Vibrant Mehndi Celebration Stage",
    description:
      "Yellow and magenta drapes with floral pedestals, low seating and fresh gladioli accents — festive mehndi stage package.",
    price: 40000,
    discount: 10,
    files: ["vibrant-mehndi-celebration-stage.png"],
    includedItems: [
      "Yellow & magenta draping",
      "Floral pedestal arrangements",
      "Low seating with cushions",
      "Setup in Lahore",
    ],
  },
  {
    name: "Elegant Pastel Nikah Backdrop",
    description:
      "Soft pink and white floral backdrop with side arrangements — a beautiful budget-friendly home nikah and engagement setup.",
    price: 12000,
    discount: 10,
    files: ["elegant-pastel-nikah-backdrop.png"],
    includedItems: [
      "Floral header backdrop",
      "Side floral arrangements",
      "Draped curtain styling",
      "Home setup in Lahore",
    ],
  },
  {
    name: "Sunlit Marble Photo Wall",
    description:
      "Yellow and white floral border with marble panel and fairy-light glow — modern photo booth and engagement backdrop.",
    price: 18000,
    discount: 10,
    files: ["sunlit-marble-photo-wall.png"],
    includedItems: [
      "Marble photo panel",
      "Floral L-frame border",
      "Fairy-light curtain glow",
      "Setup in Lahore",
    ],
  },
  {
    name: "Vibrant Mehndi Mandala Setup",
    description:
      "Colourful mandala backdrop with kite accents, floor cushions and traditional umbrellas — lively mehndi celebration décor.",
    price: 50000,
    discount: 10,
    files: ["vibrant-mehndi-mandala-setup.png"],
    includedItems: [
      "Mandala centre backdrop",
      "Floor cushion seating",
      "Kite & umbrella accents",
      "Patterned floor mat",
    ],
  },
  {
    name: "Gold Forest 1st Birthday & Aqeeqa",
    description:
      "Gold, green and grey balloon arch with circular backdrop, marquee letters and gold pedestals — for 1st birthday and aqeeqa.",
    price: 18000,
    discount: 10,
    files: ["gold-forest-first-birthday-aqeeqa.png"],
    includedItems: [
      "Circular personalised backdrop",
      "Gold & green balloon arch",
      "Marquee name letters",
      "Gold pedestal plinths",
    ],
  },
  {
    name: "All-Star Sports Birthday Décor",
    description:
      "Multi-sport balloon column with themed backdrop, soccer pedestal and gold age foil — fun budget birthday package.",
    price: 16000,
    discount: 10,
    files: ["all-star-sports-birthday-decor.png"],
    includedItems: [
      "Sports themed backdrop",
      "Tiered balloon column",
      "Soccer field pedestal",
      "Personalised age foil",
    ],
  },
  {
    name: "Blush Safari Birthday Celebration",
    description:
      "Outdoor pink safari birthday with toile floor wrap, floral arches, crystal chandelier and personalised name backdrop.",
    price: 28000,
    discount: 10,
    files: ["blush-safari-birthday-celebration.png"],
    includedItems: [
      "Personalised name backdrop",
      "Safari-pattern floor wrap",
      "Floral arch styling",
      "Outdoor setup in Lahore",
    ],
  },
  {
    name: "Rainbow Balloon Floor Installation",
    description:
      "Full-hall rainbow balloon floor scatter with long garland pathways and colour-block clusters — bold celebration styling for schools, openings and large indoor venues in Lahore.",
    price: 30000,
    discount: 10,
    files: [
      "rainbow-balloon-floor-installation-1.png",
      "rainbow-balloon-floor-installation-2.png",
    ],
    videos: [
      "/videos/events/rainbow-balloon-floor-installation-1.mp4",
      "/videos/events/rainbow-balloon-floor-installation-2.mp4",
    ],
    includedItems: [
      "Rainbow latex balloon floor styling",
      "Long balloon garland pathways",
      "Colour-block balloon clusters",
      "Setup in Lahore",
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
    const gallery = [];
    for (const [i, gallerySrc] of (item.gallerySrcs || []).entries()) {
      const galleryInput = path.join(bouquetDir, gallerySrc);
      if (!fs.existsSync(galleryInput)) continue;
      const galleryOutName = `${slug}-${i + 2}.jpg`;
      const galleryOutput = path.join(bouquetWeb, galleryOutName);
      processBouquet(galleryInput, galleryOutput, item);
      gallery.push(`/images/bouquets/web/${galleryOutName}`);
    }
    bouquetManifest.push({
      ...item,
      slug,
      origin: item.origin || "local",
      image: `/images/bouquets/web/${outName}`,
      ...(gallery.length ? { gallery } : {}),
      ...withDiscount(item.price, item.discount),
    });
  }

  cleanupWebDir(
    bouquetWeb,
    new Set(
      bouquetManifest.flatMap((b) => [
        path.basename(b.image),
        ...(b.gallery || []).map((g) => path.basename(g)),
      ])
    )
  );

  bouquetManifest.sort(
    (a, b) => a.price - b.price || a.name.localeCompare(b.name)
  );

  const pinnedIndex = bouquetManifest.findIndex((b) => b.slug === PINNED_BOUQUET_SLUG);
  if (pinnedIndex > 0) {
    bouquetManifest.unshift(...bouquetManifest.splice(pinnedIndex, 1));
  }

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
      ...(group.videos?.length ? { videos: group.videos } : {}),
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
