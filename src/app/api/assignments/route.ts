import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const assignments = await prisma.assignment.findMany({
      include: {
        course: {
          select: {
            title: true,
            code: true,
            description: true
          }
        },
        submissions: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    });

    return NextResponse.json({ assignments });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assignments' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, courseId, dueDate, maxScore } = await request.json();

    const assignment = await prisma.assignment.create({
      data: {
        title,
        description,
        courseId,
        dueDate: new Date(dueDate),
        maxScore
      },
      include: {
        course: {
          select: {
            title: true,
            code: true
          }
        }
      }
    });

    return NextResponse.json({ assignment });
  } catch (error) {
    console.error('Error creating assignment:', error);
    return NextResponse.json(
      { error: 'Failed to create assignment' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}