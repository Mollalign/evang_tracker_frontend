import { NextRequest, NextResponse } from 'next/server'

export default function proxy(request: NextRequest) {
    const token = request.cookies.get('accessToken') ||
        request.headers.get('authorization')?.replace('Bearer ', '')

    // Protected routes
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // Redirect authenticated users away from auth pages
    if (token && (
        request.nextUrl.pathname === '/login' ||
        request.nextUrl.pathname === '/register'
    )) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/login',
        '/register',
    ],
}
