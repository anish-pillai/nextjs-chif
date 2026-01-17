import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { 
  handleRequest, 
  successResponse, 
  createdResponse, 
  errorResponse, 
  handleOptionsRequest 
} from '@/lib/api-utils';
import { createSiteSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

// GET /api/sites - Get all sites
export async function GET(req) {
  return handleRequest(req, async () => {
    const { searchParams } = new URL(req.url);
    const includeInactive = searchParams.get('includeInactive') === 'true';
    
    const sites = await prisma.site.findMany({
      where: includeInactive ? {} : { isActive: true },
      orderBy: [
        { isDefault: 'desc' },
        { domain: 'asc' }
      ]
    });

    return successResponse(sites);
  });
}

// POST /api/sites - Create a new site
export async function POST(req) {
  return handleRequest(req, async () => {
    const body = await req.json();
    
    // Validate request body
    const validatedData = createSiteSchema.parse(body);
    
    // Check if domain already exists
    const existingSite = await prisma.site.findUnique({
      where: { domain: validatedData.domain }
    });
    
    if (existingSite) {
      return errorResponse('Site with this domain already exists', 409);
    }
    
    // If this is set as default, unset any existing default
    if (validatedData.isDefault) {
      await prisma.site.updateMany({
        where: { isDefault: true },
        data: { isDefault: false }
      });
    }
    
    const site = await prisma.site.create({
      data: validatedData
    });

    return createdResponse(site);
  });
}

// OPTIONS /api/sites - Handle CORS preflight
export async function OPTIONS() {
  return handleOptionsRequest();
}
