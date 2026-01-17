import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET /api/sites-config - Get site configuration for middleware (no auth required)
export async function GET() {
  try {
    const sites = await prisma.site.findMany({
      where: { isActive: true },
      select: {
        id: true,
        domain: true,
        name: true,
        titleHeader: true,
        titleSubHeader: true,
        description: true,
        logo: true,
        isDefault: true,
      }
    });

    return NextResponse.json({
      success: true,
      data: sites
    });
  } catch (error) {
    console.error('Error fetching sites config:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch sites' },
      { status: 500 }
    );
  }
}
