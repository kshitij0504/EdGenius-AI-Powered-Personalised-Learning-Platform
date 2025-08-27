// prisma/cleanupAll.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning up recently seeded dummy data...');

  // Adjust the cutoff date if needed
  const cutoffDate = new Date();
  cutoffDate.setMinutes(cutoffDate.getMinutes() - 30); // last 30 mins

  // Find courses created recently
  const courses = await prisma.course.findMany({
    where: {
      createdAt: {
        gte: cutoffDate
      }
    },
    include: {
      modules: {
        include: {
          lessons: true
        }
      }
    }
  });

  for (const course of courses) {
    for (const module of course.modules) {
      // Delete lesson progress first
      for (const lesson of module.lessons) {
        await prisma.lessonProgress.deleteMany({
          where: { lessonId: lesson.id }
        });
      }

      // Delete lessons
      await prisma.lesson.deleteMany({
        where: { moduleId: module.id }
      });
    }

    // Delete modules
    await prisma.module.deleteMany({
      where: { courseId: course.id }
    });

    // Delete enrollments
    await prisma.enrollment.deleteMany({
      where: { courseId: course.id }
    });

    // Delete payments
    await prisma.payment.deleteMany({
      where: { courseId: course.id }
    });

    // Delete cart items
    await prisma.cartItem.deleteMany({
      where: { courseId: course.id }
    });

    // Finally delete the course
    await prisma.course.delete({
      where: { id: course.id }
    });
  }

  console.log(`Deleted ${courses.length} courses and all related modules/lessons.`);

  // Delete instructors created recently
  const instructors = await prisma.user.findMany({
    where: {
      role: 'INSTRUCTOR',
      createdAt: {
        gte: cutoffDate
      }
    }
  });

  for (const instructor of instructors) {
    await prisma.user.delete({
      where: { id: instructor.id }
    });
  }

  console.log(`Deleted ${instructors.length} instructors.`);
  console.log('✅ Full cleanup completed!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
