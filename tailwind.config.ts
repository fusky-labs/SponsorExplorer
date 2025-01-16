import type { Config } from "tailwindcss"
import typographyPlugin from "@tailwindcss/typography"

export default {
  experimental: {
    optimizeUniversalDefaults: true
  },
  darkMode: ["variant", [
    "html.dark &",
    "@media (prefers-color-scheme: dark) { & }"
  ]],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // A specific file where SponBlock classes are stored here
    "./src/utils/constants.ts"
  ],
  theme: {
    extend: {
      colors: {
        sb: {
          sponsor: "var(--sb-sponsor)",
          selfpromo: "var(--sb-selfpromo)",
          "exclusive-access": "var(--sb-exclusive-access)",
          interaction: "var(--sb-interaction)",
          highlight: "var(--sb-highlight)",
          intermission: "var(--sb-intermission)",
          endcards: "var(--sb-endcards)",
          preview: "var(--sb-preview)",
          filler: "var(--sb-filler)",
          "non-music": "var(--sb-non-music)"
        }
      }
    }
  },
  plugins: [typographyPlugin]
} satisfies Config
