import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { 
  handleRequest, 
  successResponse, 
  notFoundResponse, 
  handleOptionsRequest
} from '@/lib/api-utils';
import { updateSermonSchema } from '@/lib/validations';

// Helper function to process date for storage as Unix timestamp
function processDateForStorage(date: number | undefined): number | undefined {
  if (!date) return undefined;
  
  // After Zod validation, date is always a number (Unix timestamp)
  // Just ensure it's in seconds not milliseconds if it's very large
  return typeof date === 'number' && date > 9999999999
    ? Math.floor(date / 1000) // Convert from milliseconds to seconds if needed
    : date; // Already in seconds
}

export const dynamic = 'force-dynamic';

// GET /api/sermons/[id] - Get sermon by ID
export async function GET(request: NextRequest, { params }) {
  return handleRequest(request, async () => {
    const { id } = await params;
    
    const sermon = await prisma.sermon.findUnique({
      where: { id },
      include: {
        preacher: {
          select: {
            id: true,
            name: true,
            role: true,
            email: true
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
export async function PUT(request: NextRequest, { params }) {
  return handleRequest(request, async () => {
    const { id } = await params;
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
      const preacherExists = await prisma.leadershipTeam.findUnique({
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
        date: processDateForStorage(data.date),
        scripture: data.scripture,
        series: data.series,
        updatedAt: Math.floor(Date.now() / 1000)
      },
      include: {
        preacher: {
          select: {
            id: true,
            name: true,
            role: true,
            email: true
          }
        }
      }
    });
    
    return successResponse(updatedSermon);
  });
}

// DELETE /api/sermons/[id] - Delete sermon
export async function DELETE(request: NextRequest, { params }) {
  return handleRequest(request, async () => {
    const { id } = await params;
    
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
