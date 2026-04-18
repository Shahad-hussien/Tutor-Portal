import { prisma } from '../../utils/prisma'

export default defineEventHandler(async () => {
  try {
    return await prisma.group.findMany({
      include: {
        _count: {
          select: { students: true }
        }
      },
      // This tells the database to sort alphabetically by name
      orderBy: {
        name: 'asc'
      }
    })
  } catch (error) {
    console.error('Database Error [GET Groups]:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching groups'
    })
  }
})
