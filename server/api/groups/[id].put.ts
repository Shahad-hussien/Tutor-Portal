import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: 'Missing Group ID' })
    }

    const body = await readBody(event)

    return await prisma.group.update({
      where: { id: id },
      data: {
        name: body.name,
        timeSlot: body.timeSlot
      }
    })
  } catch (error) {
    console.error('Database Error [PUT Group]:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error updating group'
    })
  }
})
