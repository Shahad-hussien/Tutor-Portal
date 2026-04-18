<script setup lang="ts">
definePageMeta({ layout: 'tutor' })
</script>

<template>
  <UHeader title="نظام إدارة المدرّس">
    <template #right>
      <UColorModeButton />
    </template>
  </UHeader>
  
  <UContainer class="py-10" dir="rtl">
    <div class="mb-8">
      <h1 class="text-3xl font-bold">أهلاً بك، أستاذ</h1>
      <p class="text-gray-500">إليك نظرة سريعة على نظام إدارة الطلاب الخاص بك.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <ULink to="/students">
        <UCard class="hover:border-primary cursor-pointer transition-colors group h-full">
          <div class="flex flex-col items-center py-6">
            <UIcon name="i-solar-users-group-rounded-bold-duotone" class="text-5xl text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 class="font-bold text-xl">إدارة الطلاب</h3>
            <p class="text-gray-400 text-sm text-center px-4">إضافة طلاب جدد، عرض القائمة، وتعديل البيانات.</p>
          </div>
        </UCard>
      </ULink>

      <ULink to="/groups">
        <UCard class="hover:border-blue-500 cursor-pointer transition-colors group h-full">
          <div class="flex flex-col items-center py-6">
            <UIcon name="i-solar-calendar-date-bold-duotone" class="text-5xl text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 class="font-bold text-xl">المجموعات والمواعيد</h3>
            <p class="text-gray-400 text-sm text-center px-4">إنشاء المجاميع، تحديد أوقات المحاضرات، وتسجيل الحضور.</p>
          </div>
        </UCard>
      </ULink>

    </div>
  </UContainer>
</template>