import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { 
  handleRequest, 
  successResponse, 
  deletedResponse, 
  errorResponse, 
  handleOptionsRequest 
} from '@/lib/api-utils';
import { updateSiteSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

// GET /api/sites/[id] - Get a specific site
export async function GET(req, { params }) {
  return handleRequest(req, async () => {
    const { id } = await params;
    const site = await prisma.site.findUnique({
      where: { id }
    });

    if (!site) {
      return errorResponse('Site not found', 404);
    }

    return successResponse(site);
  });
}

// PUT /api/sites/[id] - Update a site
export async function PUT(req, { params }) {
  return handleRequest(req, async () => {
    const { id } = await params;
    const body = await req.json();
    
    // Validate request body
    const validatedData = updateSiteSchema.parse(body);
    
    // Check if site exists
    const existingSite = await prisma.site.findUnique({
      where: { id }
    });
    
    if (!existingSite) {
      return errorResponse('Site not found', 404);
    }
    
    // If domain is being updated, check if it's already taken by another site
    if (validatedData.domain && validatedData.domain !== existingSite.domain) {
      const domainExists = await prisma.site.findUnique({
        where: { domain: validatedData.domain }
      });
      
      if (domainExists) {
        return errorResponse('Site with this domain already exists', 409);
      }
    }
    
    // If this is set as default, unset any existing default
    if (validatedData.isDefault && !existingSite.isDefault) {
      await prisma.site.updateMany({
        where: { isDefault: true },
        data: { isDefault: false }
      });
    }
    
    const site = await prisma.site.update({
      where: { id },
      data: validatedData
    });

    return successResponse(site);
  });
}

// DELETE /api/sites/[id] - Delete a site
export async function DELETE(req, { params }) {
  return handleRequest(req, async () => {
    const { id } = await params;
    
    // Check if site exists
    const existingSite = await prisma.site.findUnique({
      where: { id }
    });
    
    if (!existingSite) {
      return errorResponse('Site not found', 404);
    }
    
    // Prevent deletion of default site
    if (existingSite.isDefault) {
      return errorResponse('Cannot delete the default site', 400);
    }
    
    await prisma.site.delete({
      where: { id }
    });

    return deletedResponse('Site deleted successfully');
  });
}

// OPTIONS /api/sites/[id] - Handle CORS preflight
export async function OPTIONS() {
  return handleOptionsRequest();
}
