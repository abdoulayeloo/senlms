import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest } from 'next';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const enrollments = await prisma.enrollment.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            role: true,
            profile: true
          }
        },
        course: {
          select: {
            title: true,
            code: true,
            description: true,
            startDate: true,
            endDate: true,
            schedule: true
          }
        }
      }
    });

    return NextResponse.json({ enrollments });
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch enrollments' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: any) {
  try {
    const { userId, courseId } = await request.json();

    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId,
        status: 'active'
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        course: {
          select: {
            title: true,
            code: true
          }
        }
      }
    });

    return NextResponse.json({ enrollment });
  } catch (error) {
    console.error('Error creating enrollment:', error);
    return NextResponse.json(
      { error: 'Failed to create enrollment' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}