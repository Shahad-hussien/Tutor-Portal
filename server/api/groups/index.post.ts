import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // تأكد من أن الاسم غير فارغ من جهة السيرفر كحماية إضافية
    if (!body.name) {
      throw createError({
        statusCode: 400, // 400 Bad Request
        statusMessage: 'Group name is required'
      })
    }

    return await prisma.group.create({
      data: { name: body.name }
    })
  } catch (error) {
    console.error('Database Error [POST Group]:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Error creating group'
    })
  }
})
