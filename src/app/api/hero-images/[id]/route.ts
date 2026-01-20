import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentTimestamp } from '@/lib/utils';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, isActive, order } = body;

    const heroImage = await prisma.heroImage.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(isActive !== undefined && { isActive }),
        ...(order !== undefined && { order }),
        updatedAt: getCurrentTimestamp(),
      },
    });

    return NextResponse.json(heroImage);
  } catch (error) {
    console.error('Error updating hero image:', error);
    return NextResponse.json(
      { error: 'Failed to update hero image' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.heroImage.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Hero image deleted successfully' });
  } catch (error) {
    console.error('Error deleting hero image:', error);
    return NextResponse.json(
      { error: 'Failed to delete hero image' },
      { status: 500 }
    );
  }
}
