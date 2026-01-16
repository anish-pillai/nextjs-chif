import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { 
  handleRequest, 
  successResponse, 
  errorResponse 
} from '@/lib/api-utils';

export const dynamic = 'force-dynamic';

// GET /api/users/organizers - Get users who can be event organizers
export async function GET(req) {
  return handleRequest(req, async () => {
    const organizers = await prisma.user.findMany({
      where: {
        role: {
          in: ['ADMIN', 'PASTOR', 'STAFF']
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      },
      orderBy: { name: 'asc' }
    });
    
    return successResponse(organizers);
  });
}
