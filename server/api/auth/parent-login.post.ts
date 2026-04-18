import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // التحقق من وجود البيانات المُرسلة
    if (!body.phone || !body.code) {
      throw createError({
        statusCode: 400,
        statusMessage: 'الرجاء إدخال رقم الهاتف وكود الدخول'
      })
    }

    // --- الحل السحري: تنظيف البيانات من الفراغات المزعجة ---
    const cleanPhone = body.phone.trim()
    const cleanCode = body.code.trim()

    // طباعة البيانات في السيرفر لكي نتأكد أن الواجهة ترسل أرقاماً صحيحة
    console.log(`[Login Attempt] Phone: "${cleanPhone}", Code: "${cleanCode}"`)

    // البحث عن الطالب باستخدام البيانات النظيفة
    const student = await prisma.student.findFirst({
      where: {
        parentPhone: cleanPhone,
        studentCode: cleanCode
      },
      include: {
        group: true
      }
    })

    // إذا لم يتطابق الهاتف أو الكود
    if (!student) {
      // طباعة تحذيرية في السيرفر للمبرمج
      console.warn(`[Login Failed] No match found for Phone: ${cleanPhone}`)

      throw createError({
        statusCode: 401,
        statusMessage: 'رقم الهاتف أو كود الدخول غير صحيح'
      })
    }

    // إذا نجح الدخول
    console.log(`[Login Success] Student: ${student.fullName}`)

    return {
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      student: {
        id: student.id,
        fullName: student.fullName,
        groupId: student.groupId
      }
    }
  } catch (error) {
    console.error('Login Error:', error)

    const err = error as { statusCode?: number, statusMessage?: string }

    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || 'حدث خطأ في السيرفر'
    })
  }
})
