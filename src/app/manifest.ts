import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SponsorExplorer",
    short_name: "SponsorExplorer",
    description: "Browse SponsorBlock segments",
    start_url: "/",
    display: "standalone",
    background_color: "#546dd2",
    theme_color: "#546dd2",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  }
}
