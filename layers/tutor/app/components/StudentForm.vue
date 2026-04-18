<script setup lang="ts">
const emit = defineEmits(['success'])


interface Group { id: string, name: string }
const { data: groups, pending: loadingGroups } = useFetch<Group[]>('/api/groups')


const form = ref({
  fullName: '',
  parentPhone: '',
  gradeLevel: '',
  schoolName: '',
  groupId: '' 
})

const { execute, isLoading, validationErrors } = useApiCall(
  () => $fetch<any>('/api/students', { method: 'POST', body: form.value }),
  { successMessage: 'تم إضافة الطالب بنجاح' }
)

async function submit() {
  if (!form.value.fullName || !form.value.parentPhone) {
    throw new ValidationError("يرجى ملء الحقول المطلوبة (الاسم ورقم الهاتف)")
  }
  

  if (!form.value.groupId) {
    throw new ValidationError("يرجى اختيار مجموعة للطالب")
  }
  
  await execute()
  
  if (!validationErrors.value) {
    emit('success')
  }
}
</script>

<template>
  <div class="space-y-6 py-2" dir="rtl">
    
    <UAlert 
      v-if="validationErrors" 
      color="error" 
      variant="subtle" 
      icon="i-solar-danger-triangle-bold-duotone"
      :title="validationErrors" 
      class="rounded-xl"
    />

    <div class="space-y-5">
      <UFormGroup label="اسم الطالب الكامل" required help="يرجى كتابة الاسم الثلاثي">
        <UInput v-model="form.fullName" placeholder="مثال: أحمد علي حسن" icon="i-solar-user-bold-duotone" size="xl" class="mt-1" />
      </UFormGroup>

      <UFormGroup label="رقم هاتف ولي الأمر" required>
        <UInput v-model="form.parentPhone" placeholder="07XXXXXXXX" icon="i-solar-phone-bold-duotone" size="xl" type="tel" class="mt-1" />
      </UFormGroup>

      <UFormGroup label="تعيين مجموعة (الكروب)" required>
        <div class="relative w-full mt-1">
          <select
            v-model="form.groupId"
            :disabled="loadingGroups"
            class="w-full h-11 appearance-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer transition-all"
            dir="rtl"
          >
            <option value="" disabled>
              {{ loadingGroups ? 'جاري تحميل المجموعات...' : '-- اختر المجموعة --' }}
            </option>
            
            <option v-for="group in groups" :key="group.id" :value="group.id">
              {{ group.name }}
            </option>
          </select>
          
          <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <UIcon name="i-solar-alt-arrow-down-bold" class="text-gray-400" />
          </div>
        </div>
      </UFormGroup>
    </div>

    <div class="flex items-center gap-4 py-2">
      <div class="h-px flex-1 bg-gray-100 dark:bg-gray-800"></div>
      <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">معلومات الدراسة</span>
      <div class="h-px flex-1 bg-gray-100 dark:bg-gray-800"></div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <UFormGroup label="المرحلة الدراسية">
        <UInput v-model="form.gradeLevel" placeholder="السادس الإعدادي" icon="i-solar-ranking-bold-duotone" size="lg" />
      </UFormGroup>
      <UFormGroup label="اسم المدرسة">
        <UInput v-model="form.schoolName" placeholder="إعدادية بغداد" icon="i-solar-minimalistic-magnifer-bold-duotone" size="lg" />
      </UFormGroup>
    </div>

    <div class="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
      <UButton 
        color="primary" 
        size="xl"
        block 
        :loading="isLoading" 
        icon="i-solar-check-read-bold"
        class="rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        @click="submit"
      >
        حفظ البيانات
      </UButton>
    </div>
  </div>
</template>