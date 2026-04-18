export default defineNuxtRouteMiddleware((to, from) => {
  const { studentAuth } = useAuth()

  // إذا لم يكن هناك بيانات دخول (Cookie فارغ) وكان المستخدم يحاول الدخول لصفحة غير صفحة الدخول
  if (!studentAuth.value) {
    // اطرد المستخدم فوراً وأعد توجيهه إلى شاشة الدخول
    return navigateTo('/login')
  }
})