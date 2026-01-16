import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and has admin or pastor role
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'PASTOR')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch all branches (both active and inactive) for admin
    const branches = await prisma.churchBranch.findMany({
      orderBy: { order: 'asc' },
      include: {
        services: {
          orderBy: { day: 'asc' }
        }
      }
    });

    return NextResponse.json({ data: branches });
  } catch (error) {
    console.error('Error fetching church branches for admin:', error);
    return NextResponse.json(
      { error: 'Failed to fetch church branches' },
      { status: 500 }
    );
  }
}
