import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const branches = await prisma.churchBranch.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        services: {
          orderBy: { day: 'asc' }
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
        services: {
          create: json.services || []
        }
      },
      include: {
        services: true
      }
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
