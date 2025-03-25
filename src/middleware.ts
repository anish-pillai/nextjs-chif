import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const { pathname } = new URL(request.url);

  // Get the session token from the request
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // Define protected routes and required roles
  const adminRoutes = ['/admin'];
  const authRoutes = ['/api/events', '/api/sermons', '/api/users'];
  
  // Check if the path is an admin route
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  
  // Check if the path is an auth route that requires authentication
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route)) && 
    (pathname.includes('/create') || pathname.includes('/update') || pathname.includes('/delete'));

  // If it's an admin route, check if the user is an admin
  if (isAdminRoute) {
    if (!token || token.role !== 'ADMIN') {
      const signInUrl = new URL('/auth/signin', request.url);
      signInUrl.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // If it's an auth route, check if the user is authenticated
  if (isAuthRoute) {
    if (!token) {
      const signInUrl = new URL('/auth/signin', request.url);
      signInUrl.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(signInUrl);
    }
    
    // For write operations, check if user has appropriate role
    if (token.role !== 'ADMIN' && token.role !== 'PASTOR' && token.role !== 'STAFF') {
      return NextResponse.json(
        { error: 'You do not have permission to perform this action' },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/events/:path*',
    '/api/sermons/:path*',
    '/api/users/:path*',
  ],
};
