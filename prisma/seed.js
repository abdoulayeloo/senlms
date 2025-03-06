import { PrismaClient, Role } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.payment.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.textbook.deleteMany();
  await prisma.course.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const admin = await prisma.user.create({
    data: {
      email: 'admin@lms.com',
      password: 'admin123', // In production, this should be hashed
      name: 'Admin User',
      role: Role.ADMIN,
      profile: {
        create: {
          bio: 'System Administrator',
          phoneNumber: '123-456-7890',
        },
      },
    },
  });

  const teacher = await prisma.user.create({
    data: {
      email: 'teacher@lms.com',
      password: 'teacher123',
      name: 'John Doe',
      role: Role.TEACHER,
      profile: {
        create: {
          bio: 'Experienced Web Development Instructor',
          phoneNumber: '123-456-7891',
        },
      },
    },
  });

  const student = await prisma.user.create({
    data: {
      email: 'student@lms.com',
      password: 'student123',
      name: 'Jane Smith',
      role: Role.STUDENT,
      profile: {
        create: {
          bio: 'Aspiring Web Developer',
          phoneNumber: '123-456-7892',
        },
      },
    },
  });

  // Create courses
  const webDevCourse = await prisma.course.create({
    data: {
      title: 'Web Development Fundamentals',
      description: 'Learn the basics of web development',
      code: 'WD101',
      credits: 3,
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-05-15'),
      schedule: {
        create: [
          {
            dayOfWeek: 1, // Monday
            startTime: new Date('2024-01-15T09:00:00'),
            endTime: new Date('2024-01-15T10:30:00'),
            room: 'Room 101',
          },
          {
            dayOfWeek: 3, // Wednesday
            startTime: new Date('2024-01-17T09:00:00'),
            endTime: new Date('2024-01-17T10:30:00'),
            room: 'Room 101',
          },
        ],
      },
    },
  });

  // Create enrollment
  await prisma.enrollment.create({
    data: {
      userId: student.id,
      courseId: webDevCourse.id,
      status: 'active',
      grade: 95.5,
    },
  });

  // Create assignments
  await prisma.assignment.create({
    data: {
      title: 'HTML & CSS Project',
      description: 'Create a responsive website using HTML and CSS',
      courseId: webDevCourse.id,
      dueDate: new Date('2024-02-01'),
      maxScore: 100,
    },
  });

  // Create attendance records
  await prisma.attendance.create({
    data: {
      userId: student.id,
      date: new Date('2024-01-15'),
      status: 'present',
    },
  });

  // Create payment record
  await prisma.payment.create({
    data: {
      userId: student.id,
      amount: 1500.00,
      description: 'Spring 2024 Tuition',
      status: 'paid',
      dueDate: new Date('2024-01-01'),
      paidDate: new Date('2023-12-15'),
    },
  });

  // Create resource
  await prisma.resource.create({
    data: {
      title: 'Web Development Slides',
      description: 'Course materials for Web Development Fundamentals',
      fileUrl: 'https://example.com/slides.pdf',
      fileType: 'pdf',
      creatorId: teacher.id,
      courseId: webDevCourse.id,
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });