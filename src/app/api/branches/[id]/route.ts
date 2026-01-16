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
    
    const branch = await prisma.churchBranch.findUnique({
      where: { id },
      include: {
        services: {
          orderBy: { day: 'asc' }
        }
      }
    });

    if (!branch) {
      return NextResponse.json(
        { error: 'Church branch not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: branch });
  } catch (error) {
    console.error('Error fetching church branch:', error);
    return NextResponse.json(
      { error: 'Failed to fetch church branch' },
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
    
    // First update: branch basic info only (no services)
    const branch = await prisma.churchBranch.update({
      where: { id },
      data: {
        name: json.name,
        address: json.address,
        phone: json.phone,
        order: json.order,
        isActive: json.isActive,
      },
      include: {
        services: true
      }
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
