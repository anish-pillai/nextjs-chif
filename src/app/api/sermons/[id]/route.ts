import { NextRequest } from 'next/server';
import type { NextApiRequest } from 'next';

type Context = {
  params: {
    id: string;
  };
}
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
  request: NextRequest,
  context: Context
): Promise<Response> {
  return handleRequest(request, async () => {
    const { id } = context.params;
    
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
  request: NextRequest,
  context: Context
): Promise<Response> {
  return handleRequest(request, async () => {
    const { id } = context.params;
    const json = await request.json();
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
      data: {
        title: data.title,
        description: data.description,
        videoUrl: data.videoUrl,
        audioUrl: data.audioUrl,
        preacherId: data.preacherId,
        date: data.date ? Math.floor(data.date.getTime() / 1000) : undefined,
        scripture: data.scripture,
        series: data.series,
        updatedAt: Math.floor(Date.now() / 1000)
      },
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
  request: NextRequest,
  context: Context
): Promise<Response> {
  return handleRequest(request, async () => {
    const { id } = context.params;
    
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
