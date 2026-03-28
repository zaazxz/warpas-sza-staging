import { NextRequest, NextResponse } from "next/server"
import { decrypt } from "@/lib/auth"

export async function proxy(request: NextRequest) {
  const session = request.cookies.get("session")?.value

  // Admin routes protection
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (request.nextUrl.pathname === "/admin/login") {
      if (session) {
        try {
          await decrypt(session)
          return NextResponse.redirect(new URL("/admin", request.url))
        } catch (e) {
          // If session is invalid, allow access to login page
          return NextResponse.next()
        }
      }
      return NextResponse.next()
    }

    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    try {
      await decrypt(session)
      return NextResponse.next()
    } catch (e) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  // API protection (except for login and public data fetching if needed)
  if (request.nextUrl.pathname.startsWith("/api")) {
    // Only protect mutate methods or specific admin APIs
    const isPublicGet = request.method === 'GET' && 
                       (request.nextUrl.pathname.startsWith('/api/business') || 
                        request.nextUrl.pathname.startsWith('/api/menu') || 
                        request.nextUrl.pathname.startsWith('/api/testimonials'))

    if (request.nextUrl.pathname.startsWith("/api/auth/login") || isPublicGet) {
      return NextResponse.next()
    }

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
      await decrypt(session)
      return NextResponse.next()
    } catch (e) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
}
