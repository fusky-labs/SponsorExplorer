import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64")

  const csp = `
    script-src 'self' 'unsafe-eval' www.youtube.com 'nonce-${nonce}';
    connect-src 'self' youtube.googleapis.com *.youtube.com sponsor.ajay.app;
    frame-ancestors 'self' www.youtube-nocookie.com;
    upgrade-insecure-requests;
  `

  const parsedCsp = csp.replace(/\s{2,}/g, " ").trim()

  const headers = new Headers(request.headers)

  headers.set("Content-Security-Policy", parsedCsp)
  headers.set("x-nonce", nonce)

  const { protocol, host, searchParams } = request.nextUrl

  // Some headers for other workarounds following the use of routes
  // requiring to be async and need to be used with `(await headers()).get("x-url-*")`
  headers.set("x-url-origin", `${protocol}//${host}`)
  headers.set("x-url-params", searchParams.toString())

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
