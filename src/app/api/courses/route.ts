import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        schedule: true,
        enrollments: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                role: true
              }
            }
          }
        },
        assignments: true,
        resources: true
      }
    });

    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}