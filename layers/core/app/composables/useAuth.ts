export const useAuth = () => {
  // 1. تعريف شكل البيانات التي سنحفظها في الكوكي
  interface StudentAuthData {
    id: string
    fullName: string
    groupId: string | null
  }

  // 2. إخبار useCookie بأنها ستستقبل إما هذه البيانات أو ستكون فارغة (null)
  const studentAuth = useCookie<StudentAuthData | null>('student_auth', { 
    maxAge: 60 * 60 * 24 * 7 // 7 أيام
  })
  
  return { studentAuth }
}