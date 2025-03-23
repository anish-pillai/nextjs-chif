import { NextRequest, NextResponse } from 'next/server';
import { type NextApiRequest } from 'next';

type Params = { params: { id: string } };
import { prisma } from '@/lib/db';
import { 
  handleRequest, 
  successResponse, 
  notFoundResponse, 
  errorResponse, 
  handleOptionsRequest
} from '@/lib/api-utils';
import { updateUserSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

// GET /api/users/[id] - Get user by ID
export async function GET(
  request: NextRequest,
  { params }: Params
): Promise<Response> {
  return handleRequest(request, async () => {
    const { id } = params;
    
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        events: true,
        sermons: true
      }
    });
    
    if (!user) {
      return notFoundResponse('User');
    }
    
    return successResponse(user);
  });
}

// PUT /api/users/[id] - Update user
export async function PUT(
  request: NextRequest,
  { params }: Params
): Promise<Response> {
  return handleRequest(request, async () => {
    const { id } = params;
    const json = await request.json();
    const data = updateUserSchema.parse(json);
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });
    
    if (!existingUser) {
      return notFoundResponse('User');
    }
    
    const updatedUser = await prisma.user.update({
      where: { id },
      data
    });
    
    return successResponse(updatedUser);
  });
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(
  request: NextRequest,
  { params }: Params
): Promise<Response> {
  return handleRequest(request, async () => {
    const { id } = params;
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });
    
    if (!existingUser) {
      return notFoundResponse('User');
    }
    
    // Check if user has related events or sermons
    const userEvents = await prisma.event.findMany({
      where: { organizerId: id }
    });
    
    const userSermons = await prisma.sermon.findMany({
      where: { preacherId: id }
    });
    
    if (userEvents.length > 0 || userSermons.length > 0) {
      return errorResponse(
        'Cannot delete user with associated events or sermons. Remove these associations first.',
        409
      );
    }
    
    await prisma.user.delete({
      where: { id }
    });
    
    return successResponse({ deleted: true });
  });
}

// OPTIONS for CORS
export function OPTIONS() {
  return handleOptionsRequest();
}
