import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64")

  const csp = `
    script-src 'self' 'unsafe-eval' https://www.youtube.com/ 'nonce-${nonce}';
    connect-src 'self' https://youtube.googleapis.com https://www.youtube.com/iframe_api/ https://sponsor.ajay.app;
    frame-src https://www.youtube-nocookie.com;
    upgrade-insecure-requests;
  `

  const parsedCsp = csp.replace(/\s{2,}/g, " ").trim()

  const headers = new Headers(request.headers)

  headers.set("Content-Security-Policy", parsedCsp)
  headers.set("x-nonce", nonce)

  const { protocol, host } = request.nextUrl

  headers.set("x-url-origin", `${protocol}//${host}`)

  const res = NextResponse.next({
    request: {
      headers,
    },
  })

  res.headers.set("Content-Security-Policy", parsedCsp)

  return res
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
}
