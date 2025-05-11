import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { 
  handleRequest, 
  successResponse, 
  createdResponse, 
  errorResponse, 
  handleOptionsRequest 
} from '@/lib/api-utils';
import { createEventSchema } from '@/lib/validations';
import { EventType } from '@prisma/client';

export const dynamic = 'force-dynamic';

// GET /api/events - Get all events with optional filtering
export async function GET(req) {
  return handleRequest(req, async () => {
    const { searchParams } = new URL(req.url);
    
    // Parse filters
    const type = searchParams.get('type') as EventType | null;
    const startAfter = searchParams.get('startAfter') ? parseInt(searchParams.get('startAfter')!) : null;
    const endBefore = searchParams.get('endBefore') ? parseInt(searchParams.get('endBefore')!) : null;
    
    // Build where clause dynamically
    const where: any = {};
    
    if (type) {
      where.type = type;
    }
    
    if (startAfter) {
      where.startTime = { gte: startAfter };
    }
    
    if (endBefore) {
      where.endTime = { ...(where.endTime || {}), lte: endBefore };
    }
    
    const events = await prisma.event.findMany({
      where,
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      },
      orderBy: { startTime: 'asc' }
    });
    
    return successResponse(events);
  });
}

// POST /api/events - Create a new event
export async function POST(req) {
  return handleRequest(req, async () => {
    const json = await req.json();
    const validatedData = createEventSchema.parse(json);
    
    // Create event data with proper structure for Prisma
    const data = {
      title: validatedData.title,
      description: validatedData.description,
      location: validatedData.location,
      type: validatedData.type,
      startTime: Math.floor(new Date(validatedData.startDateTime).getTime() / 1000),
      endTime: Math.floor(new Date(validatedData.endDateTime).getTime() / 1000),
      createdAt: validatedData.createdAt ?? Math.floor(Date.now() / 1000),
      updatedAt: validatedData.updatedAt ?? Math.floor(Date.now() / 1000),
      // Properly format organizer relationship
      organizer: validatedData.organizerId ? {
        connect: { id: validatedData.organizerId }
      } : undefined
    };
    
    // Convert timestamps to integers and add createdAt/updatedAt
    const now = Math.floor(Date.now() / 1000);
    const eventData = {
      ...data,
      startTime: data.startTime,
      endTime: data.endTime,
      createdAt: now,
      updatedAt: now
    };
    
    // Check if organizer exists when an organizer is specified
    if (validatedData.organizerId) {
      const organizerExists = await prisma.user.findUnique({
        where: { id: validatedData.organizerId }
      });
      
      if (!organizerExists) {
        return errorResponse('Organizer not found');
      }
    }
    

    
    const event = await prisma.event.create({
      data: eventData,
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
    
    return createdResponse(event);
  });
}

// OPTIONS for CORS
export function OPTIONS() {
  return handleOptionsRequest();
}
