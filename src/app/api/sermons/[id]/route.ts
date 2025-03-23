import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { 
  handleRequest, 
  successResponse, 
  notFoundResponse, 
  handleOptionsRequest
} from '@/lib/api-utils';
import { updateSermonSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

// GET /api/sermons/[id] - Get sermon by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return handleRequest(req, async () => {
    const id = params.id;
    
    const sermon = await prisma.sermon.findUnique({
      where: { id },
      include: {
        preacher: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    });
    
    if (!sermon) {
      return notFoundResponse('Sermon');
    }
    
    return successResponse(sermon);
  });
}

// PUT /api/sermons/[id] - Update sermon
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return handleRequest(req, async () => {
    const id = params.id;
    const json = await req.json();
    const data = updateSermonSchema.parse(json);
    
    // Check if sermon exists
    const existingSermon = await prisma.sermon.findUnique({
      where: { id }
    });
    
    if (!existingSermon) {
      return notFoundResponse('Sermon');
    }
    
    // If preacher is being updated, check if the new preacher exists
    if (data.preacherId) {
      const preacherExists = await prisma.user.findUnique({
        where: { id: data.preacherId }
      });
      
      if (!preacherExists) {
        return notFoundResponse('Preacher');
      }
    }
    
    const updatedSermon = await prisma.sermon.update({
      where: { id },
      data,
      include: {
        preacher: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    });
    
    return successResponse(updatedSermon);
  });
}

// DELETE /api/sermons/[id] - Delete sermon
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return handleRequest(req, async () => {
    const id = params.id;
    
    // Check if sermon exists
    const existingSermon = await prisma.sermon.findUnique({
      where: { id }
    });
    
    if (!existingSermon) {
      return notFoundResponse('Sermon');
    }
    
    await prisma.sermon.delete({
      where: { id }
    });
    
    return successResponse({ deleted: true });
  });
}

// OPTIONS for CORS
export function OPTIONS() {
  return handleOptionsRequest();
}
