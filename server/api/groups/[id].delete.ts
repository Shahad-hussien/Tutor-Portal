import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw createError({ statusCode: 400, statusMessage: 'Missing Group ID' })
    }

    // Deletes the group matching the ID
    return await prisma.group.delete({
      where: { id: id }
    })
  } catch (error) {
    console.error('Database Error [DELETE Group]:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error deleting group'
    })
  }
})
