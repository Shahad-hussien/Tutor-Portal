<script setup lang="ts">
import { authClient } from '../utils/auth-client'

definePageMeta({ layout: false }) 

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''


  const { data, error } = await authClient.signIn.email({
    email: email.value,
    password: password.value,
  })

  isLoading.value = false

  if (error) {
    errorMessage.value = error.message || 'بيانات الدخول غير صحيحة'
  } else {
   
    navigateTo('/') 
  }
}


const createAdminAccount = async () => {
  isLoading.value = true
  
  const { data, error } = await authClient.signUp.email({
    email: email.value,
    password: password.value,
    name: "Shudy",
  })

  isLoading.value = false

  if (error) {
    
    console.error("Error during SignUp:", error)
    alert(`فشل الإنشاء: ${error.message}`) 
  } else {
    alert('تم إنشاء الحساب بنجاح! الآن تحقق من جدول Account')
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4" dir="rtl">
    <UCard class="w-full max-w-md shadow-xl rounded-2xl">
      <div class="text-center mb-8">
        <UIcon name="i-solar-shield-keyhole-bold-duotone" class="text-5xl text-primary mb-2" />
        <h1 class="text-2xl font-bold text-gray-900">بوابة المعلم</h1>
        <p class="text-sm text-gray-500">سجل دخولك لإدارة المركز</p>
      </div>

      <UAlert v-if="errorMessage" color="error" variant="soft" :title="errorMessage" class="mb-4" />

      <div class="space-y-4">
        <UFormGroup label="البريد الإلكتروني">
          <UInput v-model="email" type="email" icon="i-solar-letter-bold" size="xl" dir="ltr" />
        </UFormGroup>

        <UFormGroup label="كلمة المرور">
          <UInput v-model="password" type="password" icon="i-solar-lock-password-bold" size="xl" dir="ltr" />
        </UFormGroup>

        <UButton block size="xl" color="primary" :loading="isLoading" @click="handleLogin" class="mt-6">
          تسجيل الدخول
        </UButton>

        <UButton block size="sm" variant="ghost" color="neutral" @click="createAdminAccount" class="mt-2">
          (للتطوير فقط) إنشاء حساب بهذا الإيميل
        </UButton>
      </div>
    </UCard>
  </div>
</template>