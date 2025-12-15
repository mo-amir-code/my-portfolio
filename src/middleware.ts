import { NextResponse, type NextRequest } from 'next/server'
import {
    // adminMiddleware,
    authMiddleware
} from './middlewares'


export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    console.log(`[DEBUG] Middleware running: ${pathname} - ${request.method}`)

    if (pathname.startsWith("/api")) {
        await authMiddleware(request)
        return NextResponse.next()
    }

    // if (pathname.startsWith("/admin")) {
    //     return adminMiddleware(request)
    // }

    return NextResponse.next()
}


export const config = {
    matcher: ['/api/blog', '/api/blog/:slug/check', '/api/blog/image/upload'],
}