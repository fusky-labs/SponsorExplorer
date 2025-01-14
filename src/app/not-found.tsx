import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "404",
}

export default function NotFound() {
  return (
    <div className="w-full grid place-items-center mt-2 space-y-3">
      <h1 className="text-3xl">Page not found</h1>
      <p className="text-base">
        The page you we're trying to look for, doesn't exist
      </p>
    </div>
  )
}
