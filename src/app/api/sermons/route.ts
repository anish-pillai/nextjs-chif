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
    const series = searchParams.get('series');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // Build where clause dynamically
    const where: any = {};
    
    if (preacherId) {
      where.preacherId = preacherId;
    }
    
    if (series) {
      where.series = series;
    }
    
    const [sermons, total] = await Promise.all([
      prisma.sermon.findMany({
        where,
        include: {
          preacher: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          }
        },
        orderBy: { date: 'desc' },
        take: limit,
        skip: offset
      }),
      prisma.sermon.count({ where })
    ]);
    
    return successResponse({
      sermons,
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
    const validatedData = createSermonSchema.parse(json);
    
    // Create sermon data with proper structure for Prisma
    const data = {
      title: validatedData.title,
      description: validatedData.description,
      videoUrl: validatedData.videoUrl,
      audioUrl: validatedData.audioUrl,
      date: validatedData.date instanceof Date ? Math.floor(validatedData.date.getTime() / 1000) : validatedData.date,
      scripture: validatedData.scripture,
      series: validatedData.series,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000),
      // Properly format preacher relationship
      preacher: validatedData.preacherId ? {
        connect: { id: validatedData.preacherId }
      } : undefined
    };
    
    // Check if preacher exists when a preacher is specified
    if (validatedData.preacherId) {
      const preacherExists = await prisma.user.findUnique({
        where: { id: validatedData.preacherId }
      });
    
      if (!preacherExists) {
        return errorResponse('Preacher not found');
      }
    }
    
    const sermon = await prisma.sermon.create({
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
    
    return createdResponse(sermon);
  });
}

// OPTIONS for CORS
export function OPTIONS() {
  return handleOptionsRequest();
}
