import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { 
  handleRequest, 
  successResponse, 
  createdResponse, 
  errorResponse, 
  handleOptionsRequest 
} from '@/lib/api-utils';
import { createUserSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

// GET /api/users - Get all users
export async function GET(req) {
  return handleRequest(req, async () => {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    return successResponse(users);
  });
}

// POST /api/users - Create a new user
export async function POST(req) {
  return handleRequest(req, async () => {
    const json = await req.json();
    const validatedData = createUserSchema.parse(json);
    // Ensure all required fields are present with their correct types
    const data = {
      email: validatedData.email,
      name: validatedData.name,
      role: validatedData.role,
      createdAt: validatedData.createdAt ?? Math.floor(Date.now() / 1000),
      updatedAt: validatedData.updatedAt ?? Math.floor(Date.now() / 1000),
    };
    
    // Check if user with email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });
    
    if (existingUser) {
      return errorResponse('User with this email already exists');
    }
    
    const user = await prisma.user.create({
      data
    });
    
    return createdResponse(user);
  });
}

// OPTIONS for CORS
export function OPTIONS() {
  return handleOptionsRequest();
}
