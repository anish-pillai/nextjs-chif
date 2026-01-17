import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const siteId = searchParams.get('siteId');
    const includeInactive = searchParams.get('includeInactive') === 'true';
    
    let whereClause: any = {};
    
    if (!includeInactive) {
      whereClause.isActive = true;
    }
    
    // If siteId is provided, filter branches by site
    if (siteId) {
      whereClause.siteId = siteId;
    }
    
    const branches = await prisma.churchBranch.findMany({
      where: whereClause,
      orderBy: { order: 'asc' },
      include: {
        services: {
          orderBy: { day: 'asc' }
        },
        branchSites: {
          include: {
            site: {
              select: {
                id: true,
                name: true,
                domain: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json({ data: branches });
  } catch (error) {
    console.error('Error fetching church branches:', error);
    return NextResponse.json(
      { error: 'Failed to fetch church branches' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    
    const branch = await prisma.churchBranch.create({
      data: {
        name: json.name,
        address: json.address,
        phone: json.phone,
        order: json.order || 0,
        country: json.country || null,
        services: {
          create: json.services || []
        },
        branchSites: json.siteIds && json.siteIds.length > 0 ? {
          create: json.siteIds.map((siteId: string) => ({
            siteId
          }))
        } : undefined
      } as any,
      include: {
        services: {
          orderBy: { day: 'asc' }
        },
        branchSites: {
          include: {
            site: {
              select: {
                id: true,
                name: true,
                domain: true
              }
            }
          }
        }
      } as any
    });

    return NextResponse.json({ data: branch }, { status: 201 });
  } catch (error) {
    console.error('Error creating church branch:', error);
    return NextResponse.json(
      { error: 'Failed to create church branch' },
      { status: 500 }
    );
  }
}
