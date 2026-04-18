import { prisma } from '../utils/prisma'

export default defineEventHandler(async () => {
  try {
    return await prisma.student.findMany({
      // This is the magic part that fetches the linked Group name
      include: {
        group: {
          select: { name: true }
        }
      },
      orderBy: { fullName: 'asc' } // Good practice to order them alphabetically
    })
  } catch (error) {
    console.error('Error fetching students:', error)
    throw createError({ statusCode: 500, statusMessage: 'Error fetching students' })
  }
})
