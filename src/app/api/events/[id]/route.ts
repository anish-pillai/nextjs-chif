import { NextRequest } from 'next/server';

interface RouteParams {
  id: string;
}
import { prisma } from '@/lib/db';
import { 
  handleRequest, 
  successResponse, 
  notFoundResponse, 
  handleOptionsRequest
} from '@/lib/api-utils';
import { updateEventSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

// GET /api/events/[id] - Get event by ID
export async function GET(
  request: NextRequest,
  { params }: { params: RouteParams }
): Promise<Response> {
  const { id } = params;
  return handleRequest(request, async () => {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    });
    
    if (!event) {
      return notFoundResponse('Event');
    }
    
    return successResponse(event);
  });
}

// PUT /api/events/[id] - Update event
export async function PUT(
  request: NextRequest,
  { params }: { params: RouteParams }
): Promise<Response> {
  const { id } = params;
  return handleRequest(request, async () => {
    const json = await request.json();
    const data = updateEventSchema.parse(json);
    
    // Check if event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id }
    });
    
    if (!existingEvent) {
      return notFoundResponse('Event');
    }
    
    // If organizer is being updated, check if the new organizer exists
    if (data.organizerId) {
      const organizerExists = await prisma.user.findUnique({
        where: { id: data.organizerId }
      });
      
      if (!organizerExists) {
        return notFoundResponse('Organizer');
      }
    }
    
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
        location: data.location,
        organizerId: data.organizerId,
        updatedAt: Math.floor(Date.now() / 1000)
      },
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    });
    
    return successResponse(updatedEvent);
  });
}

// DELETE /api/events/[id] - Delete event
export async function DELETE(
  request: NextRequest,
  { params }: { params: RouteParams }
): Promise<Response> {
  const { id } = params;
  return handleRequest(request, async () => {
    // Check if event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id }
    });
    
    if (!existingEvent) {
      return notFoundResponse('Event');
    }
    
    await prisma.event.delete({
      where: { id }
    });
    
    return successResponse({ deleted: true });
  });
}

// OPTIONS for CORS
export function OPTIONS() {
  return handleOptionsRequest();
}
