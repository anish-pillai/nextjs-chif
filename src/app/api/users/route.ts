import { NextRequest } from 'next/server';
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
export async function GET(req: NextRequest) {
  return handleRequest(req, async () => {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    return successResponse(users);
  });
}

// POST /api/users - Create a new user
export async function POST(req: NextRequest) {
  return handleRequest(req, async () => {
    const json = await req.json();
    const data = createUserSchema.parse(json);
    
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
