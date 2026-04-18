import { prisma } from '../utils/prisma'

// دالة صغيرة لتوليد كود مثل: STU-8492
function generateStudentCode() {
  const randomNum = Math.floor(1000 + Math.random() * 9000) // رقم من 4 خانات
  return `STU-${randomNum}`
}
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // توليد الكود الفريد
    const newCode = generateStudentCode()

    return await prisma.student.create({
      data: {
        fullName: body.fullName,
        parentPhone: body.parentPhone,
        gradeLevel: body.gradeLevel,
        schoolName: body.schoolName,
        studentCode: newCode, // <--- حفظ الكود في قاعدة البيانات
        groupId: body.groupId
      }

    })
  } catch (error) {
    console.error('Error creating student:', error)
    throw createError({ statusCode: 500, statusMessage: 'Error creating student' })
  }
})
