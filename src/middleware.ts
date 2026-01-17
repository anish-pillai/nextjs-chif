import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Get the hostname from the request and remove port if present
  const rawHostname = request.headers.get('host') || '';
  const hostname = rawHostname.split(':')[0]; // Remove port number if present
  
  // Find site configuration from API
  let siteConfig = null;
  
  try {
    // Fetch all sites from API (no auth required)
    const sitesResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/sites-config`);
    if (sitesResponse.ok) {
      const sitesData = await sitesResponse.json();
      if (sitesData.success && sitesData.data) {
        const sites = sitesData.data;
        
        // Try to find exact domain match first
        const exactMatch = sites.find(site => site.domain === hostname);
        
        if (exactMatch) {
          siteConfig = exactMatch;
        } else {
          // Try to find partial match for subdomains
          const matchedSite = sites.find(site => 
            hostname.includes(site.domain) || site.domain.includes(hostname)
          );
          if (matchedSite) {
            siteConfig = matchedSite;
          } else {
            // Fall back to default site
            const defaultSite = sites.find(site => site.isDefault);
            siteConfig = defaultSite;
          }
        }
      }
    }
  } catch (error) {
    console.error('Error fetching site configuration:', error);
    // Continue with null siteConfig, will use fallbacks
  }
  
  // Fallback configuration if API fails
  if (!siteConfig) {
    siteConfig = {
      name: 'CHIF',
      titleHeader: 'City Harvest',
      titleSubHeader: 'International Fellowship',
      description: 'A welcoming Christian community in the heart of the city.',
      logo: '/images/logo.png'
    };
  }

  // Create a new response with site configuration in headers
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Add site configuration to response headers
  response.headers.set('x-site-name', siteConfig.name);
  response.headers.set('x-site-title-header', siteConfig.titleHeader);
  response.headers.set('x-site-title-subheader', siteConfig.titleSubHeader);
  response.headers.set('x-site-description', siteConfig.description);
  response.headers.set('x-site-logo', siteConfig.logo);
  
  // Add site ID if available
  if (siteConfig.id) {
    response.headers.set('x-site-id', siteConfig.id);
  }

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

  return response;
}

// Configure the middleware to run on all paths for site detection
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
