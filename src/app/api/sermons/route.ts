import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { 
  handleRequest, 
  successResponse, 
  createdResponse, 
  errorResponse, 
  handleOptionsRequest 
} from '@/lib/api-utils';
import { createSermonSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

// GET /api/sermons - Get all sermons with optional filtering
export async function GET(req) {
  return handleRequest(req, async () => {
    const { searchParams } = new URL(req.url);
    
    // Parse filters
    const preacherId = searchParams.get('preacherId');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // Build where clause dynamically
    const where: any = {};
    
    if (preacherId) {
      where.preacherId = preacherId;
    }
    
    const [sermons, total] = await Promise.all([
      prisma.sermon.findMany({
        where,
        include: {
          preacher: {
            select: {
              id: true,
              name: true,
              role: true,
              email: true
            }
          }
        },
        orderBy: { date: 'desc' },
        take: limit,
        skip: offset
      }),
      prisma.sermon.count({ where })
    ]);
    
    // Return sermons in a format that matches what the admin page expects
    return NextResponse.json({
      data: sermons,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });
  });
}

// POST /api/sermons - Create a new sermon
export async function POST(req) {
  return handleRequest(req, async () => {
    const json = await req.json();
    
    // Log the incoming data for debugging
    console.log('API - Incoming data:', json);
    
    const validatedData = createSermonSchema.parse(json);
    
    // Create sermon data with proper structure for Prisma
    // After Zod validation, date is already a Unix timestamp (number)
    // Just ensure it's in seconds not milliseconds if for some reason it's very large
    const dateTimestamp = typeof validatedData.date === 'number' && validatedData.date > 9999999999
      ? Math.floor(validatedData.date / 1000) // Convert from milliseconds to seconds if needed
      : validatedData.date; // Already in seconds
    
    // Log for debugging
    console.log('API - Date value:', validatedData.date);
    console.log('API - Processed timestamp:', dateTimestamp);
    
    const data = {
      title: validatedData.title,
      videoUrl: validatedData.videoUrl,
      date: dateTimestamp,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000),
      // Properly format preacher relationship
      preacher: validatedData.preacherId ? {
        connect: { id: validatedData.preacherId }
      } : undefined
    };
    
    // Check if preacher exists when a preacher is specified
    if (validatedData.preacherId) {
      console.log('API - Checking for preacher with ID:', validatedData.preacherId);
      const preacherExists = await prisma.leadershipTeam.findUnique({
        where: { id: validatedData.preacherId }
      });
    
      console.log('API - Preacher found:', !!preacherExists);
      
      if (!preacherExists) {
        return errorResponse(`Preacher with ID ${validatedData.preacherId} not found`);
      }
    }
    
    const sermon = await prisma.sermon.create({
      data,
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
    
    return createdResponse(sermon);
  });
}

// OPTIONS for CORS
export function OPTIONS() {
  return handleOptionsRequest();
}
