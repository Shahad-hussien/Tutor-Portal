<script setup lang="ts">
definePageMeta({ 
  middleware: ['auth'],
  layout: false 
})

const route = useRoute()
const { studentAuth } = useAuth()


if (studentAuth.value && studentAuth.value.id !== route.params.id) {

  navigateTo(`/parent/${studentAuth.value.id}`)
}

const logout = () => {
  studentAuth.value = null
  navigateTo('/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans" dir="rtl">
    
    <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div class="max-w-4xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-4">
          <UAvatar icon="i-solar-user-bold" color="primary" size="lg" />
          <div>
            <h1 class="font-bold text-lg text-gray-900 dark:text-white">بوابة ولي الأمر</h1>
            <p class="text-sm text-gray-500">متابعة الطالب: {{ studentAuth?.fullName }}</p>
          </div>
        </div>
        
        <UButton color="neutral" variant="ghost" icon="i-solar-logout-2-bold" @click="logout">
          تسجيل خروج
        </UButton>
      </div>
    </header>

    <UContainer class="py-8 max-w-4xl">
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <UCard class="md:col-span-1">
          <div class="text-center py-4">
            <UIcon name="i-solar-users-group-rounded-bold-duotone" class="text-4xl text-primary mb-2" />
            <h3 class="text-gray-500 text-sm">المجموعة الحالية</h3>
            <p class="text-xl font-bold mt-1">تم التسجيل بنجاح</p> 
          </div>
        </UCard>

        <UCard class="md:col-span-2 flex items-center justify-center min-h-37.5">
          <div class="text-center text-gray-400">
            <UIcon name="i-solar-calendar-bold-duotone" class="text-3xl mb-2" />
            <p>سجل الحضور والغياب سيظهر هنا قريباً</p>
          </div>
        </UCard>
      </div>

    </UContainer>
  </div>
</template>