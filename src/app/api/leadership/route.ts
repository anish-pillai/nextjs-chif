import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session) {
      return NextResponse.json(
        { error: 'You must be signed in to view leadership team.' },
        { status: 401 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Fetch leadership team members with pagination
    const leadershipTeam = await prisma.leadershipTeam.findMany({
      orderBy: { order: 'asc' },
      skip,
      take: limit,
    });

    // Get total count for pagination
    const total = await prisma.leadershipTeam.count();

    return NextResponse.json({
      data: leadershipTeam,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching leadership team:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leadership team' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and has admin role
    if (!session) {
      return NextResponse.json(
        { error: 'You must be signed in to add leadership team members.' },
        { status: 401 }
      );
    }

    if (session.user.role !== 'ADMIN' && session.user.role !== 'PASTOR') {
      return NextResponse.json(
        { error: 'You must be an admin to add leadership team members.' },
        { status: 403 }
      );
    }

    // Get request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.role || !body.image) {
      return NextResponse.json(
        { error: 'Name, role, and image are required.' },
        { status: 400 }
      );
    }

    // Create new leadership team member
    const leadershipMember = await prisma.leadershipTeam.create({
      data: {
        name: body.name,
        role: body.role,
        image: body.image,
        description: body.description || null,
        email: body.email || null,
        order: body.order || 0,
        createdAt: Math.floor(Date.now() / 1000),
        updatedAt: Math.floor(Date.now() / 1000),
      },
    });

    return NextResponse.json({ data: leadershipMember }, { status: 201 });
  } catch (error) {
    console.error('Error creating leadership team member:', error);
    return NextResponse.json(
      { error: 'Failed to create leadership team member' },
      { status: 500 }
    );
  }
}
