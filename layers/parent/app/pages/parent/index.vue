<script setup lang="ts">
definePageMeta({ 
  middleware: ['auth'] 
})


const studentData = ref({
  groupName: 'المجموعة A',
  schedule: '09:00 ص - 11:00 ص',
  totalAbsences: 2,
  warningLevel: 'yellow', 
  nextExam: 'يوم الخميس القادم - امتحان فصل أول'
})

const notifications = ref([
  { id: 1, text: 'تم تغيير موعد محاضرة يوم السبت إلى الساعة 10 صباحاً.', type: 'info', date: 'منذ ساعتين' },
  { id: 2, text: 'إنذار غياب: لقد تغيبت عن المحاضرة السابقة.', type: 'warning', date: 'أمس' }
])

const recentGrades = ref([
  { id: 1, subject: 'امتحان الفصل الأول', score: 85, fullMark: 100, date: '12 أكتوبر' },
  { id: 2, subject: 'كويز مفاجئ', score: 9, fullMark: 10, date: '05 أكتوبر' }
])
</script>

<template>
  <div class="space-y-6">
    
    <div v-if="notifications.length > 0" class="space-y-3">
      <h2 class="text-lg font-bold flex items-center gap-2">
        <UIcon name="i-solar-bell-bing-bold-duotone" class="text-primary" />
        إشعارات المجموعة
      </h2>
      <UAlert 
        v-for="notif in notifications" 
        :key="notif.id"
        :color="notif.type === 'warning' ? 'error' : 'info'"
        :variant="notif.type === 'warning' ? 'soft' : 'subtle'"
        :icon="notif.type === 'warning' ? 'i-solar-danger-triangle-bold-duotone' : 'i-solar-info-circle-bold-duotone'"
        :title="notif.text"
        :description="notif.date"
        class="rounded-xl"
      />
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      
      <div class="col-span-2 bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-center">
        <div class="flex items-center gap-3 mb-2">
          <UIcon name="i-solar-users-group-two-rounded-bold-duotone" class="text-2xl text-blue-500" />
          <span class="text-gray-500 text-sm">مجموعتك الحالية</span>
        </div>
        <p class="font-bold text-xl">{{ studentData.groupName }}</p>
        <p class="text-sm text-gray-500 mt-1" dir="ltr">{{ studentData.schedule }}</p>
      </div>

      <div :class="[
        'col-span-1 p-5 rounded-2xl border shadow-sm flex flex-col items-center justify-center text-center transition-colors',
        studentData.totalAbsences >= 3 ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950 dark:border-red-900' : 'bg-white border-gray-100 dark:bg-gray-900 dark:border-gray-800'
      ]">
        <UIcon name="i-solar-user-cross-bold-duotone" :class="['text-3xl mb-2', studentData.totalAbsences >= 3 ? 'text-red-500' : 'text-gray-400']" />
        <span class="font-bold text-2xl">{{ studentData.totalAbsences }}</span>
        <span class="text-xs mt-1">عدد الغيابات</span>
      </div>

      <div class="col-span-1 bg-primary-50 dark:bg-primary-950 border border-primary-100 dark:border-primary-900 p-5 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center">
        <UIcon name="i-solar-calendar-mark-bold-duotone" class="text-3xl text-primary mb-2" />
        <span class="text-xs text-primary-600 dark:text-primary-400 font-bold">الامتحان القادم</span>
        <span class="text-xs mt-1 text-gray-700 dark:text-gray-300 font-medium">الخميس القادم</span>
      </div>

    </div>

    <UCard class="rounded-2xl shadow-sm mt-8">
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-bold flex items-center gap-2">
            <UIcon name="i-solar-diploma-verified-bold-duotone" class="text-primary" />
            سجل الدرجات
          </h2>
        </div>
      </template>

      <div class="divide-y divide-gray-100 dark:divide-gray-800">
        <div v-for="grade in recentGrades" :key="grade.id" class="py-4 flex justify-between items-center">
          <div>
            <p class="font-bold text-gray-900 dark:text-white">{{ grade.subject }}</p>
            <p class="text-xs text-gray-500">{{ grade.date }}</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xl font-bold" :class="grade.score >= (grade.fullMark / 2) ? 'text-green-500' : 'text-red-500'">
              {{ grade.score }}
            </span>
            <span class="text-sm text-gray-400">/ {{ grade.fullMark }}</span>
          </div>
        </div>
      </div>
    </UCard>

  </div>
</template>