import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Debug: Log what's available in prisma
console.log('Prisma client keys:', Object.keys(prisma));

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('Fetching branch with ID:', id);
    
    const branch = await prisma.churchBranch.findUnique({
      where: { id },
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

    if (!branch) {
      console.log('Branch not found with ID:', id);
      return NextResponse.json(
        { error: 'Church branch not found' },
        { status: 404 }
      );
    }

    console.log('Branch found successfully:', branch.id);
    return NextResponse.json({ data: branch });
  } catch (error) {
    console.error('Error fetching church branch:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json(
      { error: `Failed to fetch church branch: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const json = await request.json();
    
    console.log('Updating branch with ID:', id);
    console.log('Request data:', JSON.stringify(json, null, 2));
    
    // First, delete existing services and branch sites if provided
    if (json.services !== undefined) {
      await prisma.service.deleteMany({
        where: { branchId: id }
      });
    }
    
    if (json.siteIds !== undefined) {
      await prisma.branchSite.deleteMany({
        where: { branchId: id }
      });
    }
    
    // Update branch with services and sites
    const updateData: any = {
      name: json.name,
      address: json.address,
      phone: json.phone,
      order: json.order,
      isActive: json.isActive,
      country: json.country || null,
    };
    
    // Add services if provided
    if (json.services && json.services.length > 0) {
      updateData.services = {
        create: json.services
      };
    }
    
    // Add sites if provided
    if (json.siteIds && json.siteIds.length > 0) {
      updateData.branchSites = {
        create: json.siteIds.map((siteId: string) => ({
          siteId
        }))
      };
    }
    
    const branch = await prisma.churchBranch.update({
      where: { id },
      data: updateData,
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

    console.log('Branch updated successfully:', branch);

    return NextResponse.json({ data: branch });
  } catch (error) {
    console.error('Error updating church branch:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json(
      { error: `Failed to update church branch: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await prisma.churchBranch.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Church branch deleted successfully' });
  } catch (error) {
    console.error('Error deleting church branch:', error);
    return NextResponse.json(
      { error: 'Failed to delete church branch' },
      { status: 500 }
    );
  }
}
