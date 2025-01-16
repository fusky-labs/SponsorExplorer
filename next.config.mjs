import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/v/:id",
        destination: "/video/:id",
        permanent: true
      },
      {
        source: "/video/https\\:/youtu.be/:id",
        destination: "/video/:id",
        permanent: true
      },
      {
        source: "/c/:id",
        destination: "/channel/:id",
        permanent: true
      },
      {
        source: "/p/:id",
        destination: "/playlist/:id",
        permanent: true
      }
    ]
  }
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
