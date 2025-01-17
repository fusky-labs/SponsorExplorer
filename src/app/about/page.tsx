import type { Metadata } from "next"
import AboutMDX from "../../content/about.mdx"

export const metadata: Metadata = {
  title: "About",
}

export default function AboutPage() {
  return (
    <article className="max-w-screen-lg mt-2 mx-auto px-4 *:leading-relaxed prose-headings:font-bold first:prose-headings:mt-0 prose-headings:my-3.5 prose-p:mb-2.5 prose-h2:text-3xl lg:text-base prose-ul:list-disc prose-ul:list-inside prose-ul:my-1.5">
      <AboutMDX />
    </article>
  )
}
