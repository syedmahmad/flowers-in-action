import { siteConfig } from "@/data/config";

/** Google Maps embed — pins the shop using its Plus Code location */
export function getMapEmbedUrl(): string {
  return siteConfig.mapEmbedUrl;
}

export function getMapOpenUrl(): string {
  return siteConfig.mapDirectionsUrl;
}
