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
function processDateForStorage(date: Date | number | undefined): number | undefined {
  if (!date) return undefined;
  
  if (date instanceof Date) {
    // Create a date object at noon to avoid timezone issues
    const dateObj = new Date(date);
    dateObj.setHours(12, 0, 0, 0);
    return Math.floor(dateObj.getTime() / 1000);
  } 
  
  if (typeof date === 'number') {
    // If it's already a number, ensure it's in seconds not milliseconds
    return date > 9999999999 
      ? Math.floor(date / 1000) // Convert from milliseconds to seconds if needed
      : date; // Already in seconds
  }
  
  // Default to undefined if invalid
  return undefined;
}

export const dynamic = 'force-dynamic';

// GET /api/sermons/[id] - Get sermon by ID
export async function GET(request: NextRequest, { params }: any) {
  return handleRequest(request, async () => {
    const { id } = params;
    
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
export async function PUT(request: NextRequest, { params }: any) {
  return handleRequest(request, async () => {
    const { id } = params;
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
export async function DELETE(request: NextRequest, { params }: any) {
  return handleRequest(request, async () => {
    const { id } = params;
    
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
