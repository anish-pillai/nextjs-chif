import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types/api';
import { ZodError } from 'zod';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export function successResponse<T>(data: T): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status: 200, headers: corsHeaders }
  );
}

export function createdResponse<T>(data: T): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status: 201, headers: corsHeaders }
  );
}

export function errorResponse(error: string, status = 400): NextResponse<ApiResponse<never>> {
  return NextResponse.json(
    {
      success: false,
      error,
    },
    { status, headers: corsHeaders }
  );
}

export function notFoundResponse(resource: string): NextResponse<ApiResponse<never>> {
  return errorResponse(`${resource} not found`, 404);
}

export function handleZodError(error: ZodError): NextResponse<ApiResponse<never>> {
  const formatted = error.format();
  return errorResponse(`Validation error: ${JSON.stringify(formatted)}`, 400);
}

export async function handleRequest<T>(
  req: NextRequest,
  handler: () => Promise<NextResponse<ApiResponse<T>>>
): Promise<NextResponse<ApiResponse<T>>> {
  try {
    return await handler();
  } catch (error) {
    console.error('API error:', error);
    
    if (error instanceof ZodError) {
      return handleZodError(error);
    }
    
    return errorResponse('Internal server error', 500);
  }
}

export function handleOptionsRequest(): NextResponse {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}
