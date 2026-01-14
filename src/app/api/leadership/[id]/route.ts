import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }
) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session) {
      return NextResponse.json(
        { error: 'You must be signed in to view leadership team member details.' },
        { status: 401 }
      );
    }

    // Extract id from params (must await in Next.js 15+)
    const { id } = await params;

    // Fetch leadership team member by ID
    const leadershipMember = await prisma.leadershipTeam.findUnique({
      where: { id },
    });

    if (!leadershipMember) {
      return NextResponse.json(
        { error: 'Leadership team member not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: leadershipMember });
  } catch (error) {
    console.error('Error fetching leadership team member:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leadership team member' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }
) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and has admin role
    if (!session) {
      return NextResponse.json(
        { error: 'You must be signed in to update leadership team members.' },
        { status: 401 }
      );
    }

    if (session.user.role !== 'ADMIN' && session.user.role !== 'PASTOR') {
      return NextResponse.json(
        { error: 'You must be an admin to update leadership team members.' },
        { status: 403 }
      );
    }

    // Extract id from params (must await in Next.js 15+)
    const { id } = await params;
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.role || !body.image) {
      return NextResponse.json(
        { error: 'Name, role, and image are required.' },
        { status: 400 }
      );
    }

    // Check if leadership team member exists
    const existingMember = await prisma.leadershipTeam.findUnique({
      where: { id },
    });

    if (!existingMember) {
      return NextResponse.json(
        { error: 'Leadership team member not found' },
        { status: 404 }
      );
    }

    // Update leadership team member
    const updatedMember = await prisma.leadershipTeam.update({
      where: { id },
      data: {
        name: body.name,
        role: body.role,
        image: body.image,
        description: body.description || null,
        email: body.email || null,
        order: body.order || 0,
        updatedAt: Math.floor(Date.now() / 1000),
      },
    });

    return NextResponse.json({ data: updatedMember });
  } catch (error) {
    console.error('Error updating leadership team member:', error);
    return NextResponse.json(
      { error: 'Failed to update leadership team member' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }
) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and has admin role
    if (!session) {
      return NextResponse.json(
        { error: 'You must be signed in to delete leadership team members.' },
        { status: 401 }
      );
    }

    if (session.user.role !== 'ADMIN' && session.user.role !== 'PASTOR') {
      return NextResponse.json(
        { error: 'You must be an admin to delete leadership team members.' },
        { status: 403 }
      );
    }

    // Extract id from params (must await in Next.js 15+)
    const { id } = await params;

    // Check if leadership team member exists
    const existingMember = await prisma.leadershipTeam.findUnique({
      where: { id },
    });

    if (!existingMember) {
      return NextResponse.json(
        { error: 'Leadership team member not found' },
        { status: 404 }
      );
    }

    // Delete leadership team member
    await prisma.leadershipTeam.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting leadership team member:', error);
    return NextResponse.json(
      { error: 'Failed to delete leadership team member' },
      { status: 500 }
    );
  }
}
