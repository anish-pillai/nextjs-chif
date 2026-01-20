import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentTimestamp } from '@/lib/utils';
import sharp from 'sharp';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('includeInactive') === 'true';
    
    const heroImages = await prisma.heroImage.findMany({
      where: includeInactive ? {} : { isActive: true },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        title: true,
        imageUrl: true,
        width: true,
        height: true,
        order: true,
        isActive: includeInactive, // Only include isActive field if requested
      },
    });

    return NextResponse.json(heroImages);
  } catch (error) {
    console.error('Error fetching hero images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero images' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const title = formData.get('title') as string;

    if (!file || !title) {
      return NextResponse.json(
        { error: 'Image file and title are required' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Get image dimensions using sharp
    const buffer = Buffer.from(await file.arrayBuffer());
    const metadata = await sharp(buffer).metadata();

    // Validate dimensions (3840x2160)
    if (metadata.width !== 3840 || metadata.height !== 2160) {
      return NextResponse.json(
        { 
          error: `Image dimensions must be exactly 3840x2160 pixels. Received: ${metadata.width}x${metadata.height}` 
        },
        { status: 400 }
      );
    }

    // Convert to base64 for storage
    const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Get the highest current order value
    const lastImage = await prisma.heroImage.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const newOrder = lastImage ? lastImage.order + 1 : 0;

    // Create hero image record
    const heroImage = await prisma.heroImage.create({
      data: {
        title,
        imageUrl: base64Image,
        width: metadata.width,
        height: metadata.height,
        order: newOrder,
        createdAt: getCurrentTimestamp(),
        updatedAt: getCurrentTimestamp(),
      },
    });

    return NextResponse.json(heroImage, { status: 201 });
  } catch (error) {
    console.error('Error creating hero image:', error);
    return NextResponse.json(
      { error: 'Failed to create hero image' },
      { status: 500 }
    );
  }
}
