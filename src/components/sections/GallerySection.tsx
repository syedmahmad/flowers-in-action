import Image from "next/image";
import { images } from "@/data/images";

const galleryAlt = [
  "Hand-tied red rose bouquet with premium wrapping",
  "Elegant pink and white floral arrangement",
  "Premium floral box with seasonal blooms",
  "Bridal bouquet with soft romantic flowers",
  "Cheerful sunflower bouquet arrangement",
  "Floral and chocolate gift combination",
];

export function GallerySection() {
  return (
    <section id="gallery" className="section-padding bg-blush/30">
      <div className="container-narrow">
        <div className="mb-10 text-center">
          <h2 className="heading-serif mb-3 text-3xl font-bold text-maroon-deep sm:text-4xl">
            Fresh From Our Studio
          </h2>
          <p className="text-charcoal/80">
            A glimpse of our floral creations. Replace these placeholders with your own shop
            photography before launch.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {images.gallery.map((src, i) => (
            <div
              key={src}
              className="relative aspect-square overflow-hidden rounded-2xl"
            >
              <Image
                src={src}
                alt={galleryAlt[i] ?? "Phool Pattiyan studio floral arrangement Lahore"}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
