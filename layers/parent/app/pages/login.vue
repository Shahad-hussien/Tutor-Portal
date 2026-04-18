<script setup lang="ts">
definePageMeta({ layout: false })

const { studentAuth } = useAuth()

const form = ref({
  phone: '',
  code: ''
})

const isLoading = ref(false)
const errorMessage = ref('')

// 1. تعريف الواجهة (Interface) لإخبار TypeScript بشكل البيانات القادمة من السيرفر
interface AuthResponse {
  success: boolean
  message: string
  student: {
    id: string
    fullName: string
    groupId: string | null
  }
}

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    const response = await $fetch<AuthResponse>('/api/auth/parent-login', {
      method: 'POST',
      body: form.value
    })
    

    studentAuth.value = response.student 
    
    navigateTo(`/parent/${response.student.id}`)
  } catch (error: any) {
    errorMessage.value = "رقم الهاتف أو كود الدخول غير صحيح"
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8" dir="rtl">
    
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <div class="mx-auto h-20 w-20 bg-primary/10 text-primary flex items-center justify-center rounded-3xl mb-6">
        <UIcon name="i-solar-diploma-verified-bold-duotone" class="text-5xl" />
      </div>
      <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white">بوابة الطالب</h2>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        قم بتسجيل الدخول لمتابعة درجاتك وحضورك
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
      <div class="bg-white dark:bg-gray-900 py-8 px-6 shadow-xl border border-gray-100 dark:border-gray-800 rounded-3xl sm:px-10">
        
        <form class="space-y-6" @submit.prevent="handleLogin">
          
          <UAlert 
            v-if="errorMessage" 
            color="error" 
            variant="soft" 
            icon="i-solar-danger-triangle-bold" 
            :title="errorMessage" 
          />

          <UFormGroup label="رقم هاتف ولي الأمر">
            <UInput 
              v-model="form.phone" 
              type="tel" 
              placeholder="07XXXXXXXX" 
              size="xl" 
              icon="i-solar-phone-bold-duotone" 
            />
          </UFormGroup>

          <UFormGroup label="كود الطالب">
            <template #help>
              <span class="text-xs text-gray-500">الكود الخاص بك يبدأ بـ STU (مثال: STU-1234)</span>
            </template>
            <UInput 
              v-model="form.code" 
              type="text" 
              placeholder="STU-XXXX" 
              size="xl" 
              icon="i-solar-lock-keyhole-bold-duotone" 
              dir="ltr"
              class="text-left"
            />
          </UFormGroup>

          <div class="pt-2">
            <UButton 
              type="submit" 
              block 
              size="xl" 
              color="primary" 
              class="rounded-xl shadow-lg shadow-primary/20"
              :loading="isLoading"
            >
              تسجيل الدخول
            </UButton>
          </div>
          
        </form>

      </div>
      
      <p class="mt-6 text-center text-xs text-gray-400">
        إذا فقدت كود الطالب، يرجى التواصل مع الأستاذ.
      </p>
    </div>
  </div>
</template>