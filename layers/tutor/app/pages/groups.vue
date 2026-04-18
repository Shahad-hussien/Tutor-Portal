<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

definePageMeta({ layout: 'tutor' })


interface Group {
  id: string
  name: string
  timeSlot?: string 
  _count?: { students: number }
}

const { data: groups, refresh, pending } = useFetch<Group[]>('/api/groups')


const isCreateModalOpen = ref(false)
const isEditModalOpen = ref(false)
const isPreviewModalOpen = ref(false)

const groupToDeleteId = ref('')


const selectedGroup = ref<Group | null>(null)


const form = ref({
  name: '',
  time: '',        
  period: 'صباحاً' 
})

const { execute: executeDelete } = useApiCall(
  () => {
   
    const url = `/api/groups/${groupToDeleteId.value}` as string
    
    return $fetch<any>(url, { 
      method: 'DELETE' 
    })
  },
  { successMessage: 'تم حذف المجموعة بنجاح' }
)


const { execute: executeCreate, isLoading: isCreating } = useApiCall(
  () => $fetch<any>('/api/groups', { 
    method: 'POST', 
    body: { 
      name: form.value.name,
      timeSlot: form.value.time ? `${form.value.time} ${form.value.period}`.trim() : ''
    } 
  }),
  { successMessage: 'تم إنشاء المجموعة بنجاح' }
)
const openCreate = () => {
  form.value.name = ''
  form.value.time = ''
  form.value.period = 'صباحاً'
  isCreateModalOpen.value = true
}
async function addGroup() {
  if (!form.value.name) return
  await executeCreate()
  
  form.value.name = ''
  form.value.time = ''
  form.value.period = 'صباحاً'
  isCreateModalOpen.value = false
  refresh()
}


const openPreview = (group: Group) => {
  selectedGroup.value = group
  isPreviewModalOpen.value = true
}

const openEdit = (group: Group) => {
  selectedGroup.value = group
  form.value.name = group.name
  
  // تفكيك الوقت القادم من قاعدة البيانات ليتناسب مع الحقلين في الفورم
  if (group.timeSlot) {
    const hasEvening = group.timeSlot.includes('مساءً')
    form.value.period = hasEvening ? 'مساءً' : 'صباحاً'
    form.value.time = group.timeSlot.replace('صباحاً', '').replace('مساءً', '').trim()
  } else {
    form.value.time = ''
    form.value.period = 'صباحاً'
  }
  
  isEditModalOpen.value = true
}

const { execute: executeEdit, isLoading: isEditing } = useApiCall(
  () => $fetch<any>(`/api/groups/${selectedGroup.value?.id}`, { 
    method: 'PUT', 
    body: { 
      name: form.value.name,
      timeSlot: form.value.time ? `${form.value.time} ${form.value.period}`.trim() : ''
    } 
  }),
  { successMessage: 'تم تحديث بيانات المجموعة بنجاح' }
)


const saveEdit = async () => {
  if (!selectedGroup.value?.id) return
  
  await executeEdit()
  
  isEditModalOpen.value = false
  refresh()
}
const deleteGroup = async (id: string) => {
  const isConfirmed = confirm('Are you sure?')
  if (!isConfirmed) return
  
  
  groupToDeleteId.value = id
  await executeDelete()
  refresh()
}
const columns: TableColumn<Group>[] = [
  { accessorKey: 'name', header: 'اسم المجموعة' },
  { accessorKey: '_count.students', header: 'عدد الطلاب' },
  { id: 'schedule', header: 'موعد المجموعة' },
  { id: 'actions', header: 'الإجراءات' }
]
</script>

<template>
  <UContainer class="py-10" dir="rtl">
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-primary">إدارة المجموعات</h1>
          <UButton icon="i-solar-add-circle-bold" @click="openCreate">
        إنشاء مجموعة جديدة
      </UButton>
        </div>
      </template>

      <UTable :data="groups || []" :columns="columns" :loading="pending">
        
        <template #schedule-cell="{ row }">
          <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <UIcon name="i-solar-clock-circle-bold-duotone" class="text-lg text-primary" />
            <span dir="ltr">{{ row.original.timeSlot || '09:00 AM - 11:00 AM' }}</span>
          </div>
        </template>

        <template #actions-cell="{ row }">
          <div class="flex gap-2 items-center">
            <UTooltip text="عرض مبدئي">
              <UButton 
                icon="i-solar-eye-bold-duotone" 
                color="neutral" 
                variant="ghost" 
                @click="openPreview(row.original as Group)" 
              />
            </UTooltip>

            <UTooltip text="تعديل البيانات">
              <UButton 
                icon="i-solar-pen-new-square-linear" 
                color="info" 
                variant="ghost" 
                @click="openEdit(row.original as Group)" 
              />
            </UTooltip>

            <UTooltip text="حذف المجموعة">
              <UButton 
                icon="i-solar-trash-bin-trash-linear" 
                color="error" 
                variant="ghost" 
                @click="deleteGroup((row.original as Group).id)" 
              />
            </UTooltip>
          </div>
        </template>

      </UTable>
    </UCard>

    <CustomModal v-model="isCreateModalOpen" title="إنشاء مجموعة جديدة">
  <div class="space-y-6 py-4">
    
    <UFormGroup label="اسم المجموعة">
      <UInput 
        v-model="form.name" 
        placeholder="مثال: المجموعة A" 
        size="xl" 
        icon="i-solar-users-group-rounded-bold-duotone" 
      />
    </UFormGroup>

    <UFormGroup label="موعد المحاضرة (الوقت والفترة)">
      <div class="flex gap-3" dir="ltr">
        
        <div class="relative w-36">
          <select
            v-model="form.period"
            class="w-full h-full appearance-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer transition-all font-bold text-center"
            dir="rtl"
          >
            <option value="صباحاً">صباحاً ☀️</option>
            <option value="مساءً">مساءً 🌙</option>
          </select>
          
          <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <UIcon name="i-solar-alt-arrow-down-bold" class="text-gray-400" />
          </div>
        </div>

        <UInput 
          v-model="form.time" 
          placeholder="09:00 - 11:00" 
          size="xl" 
          icon="i-solar-clock-circle-bold-duotone" 
          class="flex-1"
        />

      </div>
    </UFormGroup>

    <div class="pt-2">
      <UButton block size="xl" :loading="isCreating" @click="addGroup">
        حفظ وإنشاء
      </UButton>
    </div>
    
  </div>
</CustomModal>

   <CustomModal v-model="isEditModalOpen" title="تعديل بيانات المجموعة">
  <div class="space-y-5 py-4">
    
    <UFormGroup label="اسم المجموعة">
      <UInput v-model="form.name" size="xl" icon="i-solar-pen-bold" class="m-2" />
    </UFormGroup>

    <UFormGroup label="موعد المحاضرة (الوقت والفترة)">
      <div class="flex gap-3 m-2" dir="ltr">
        
        <div class="relative w-36">
          <select
            v-model="form.period"
            class="w-full h-full appearance-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer transition-all font-bold text-center"
            dir="rtl"
          >
            <option value="صباحاً">صباحاً ☀️</option>
            <option value="مساءً">مساءً 🌙</option>
          </select>
          <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <UIcon name="i-solar-alt-arrow-down-bold" class="text-gray-400" />
          </div>
        </div>

        <UInput 
          v-model="form.time" 
          placeholder="09:00 - 11:00" 
          size="xl" 
          icon="i-solar-clock-circle-bold" 
          class="flex-1"
        />

      </div>
    </UFormGroup>

    <div class="flex gap-3 mt-4">
      <UButton color="neutral" variant="soft" block class="flex-1" @click="isEditModalOpen = false">إلغاء</UButton>
     <UButton color="primary" block class="flex-1" :loading="isEditing" @click="saveEdit">
  حفظ التعديلات
</UButton>
    </div>
    
  </div>
</CustomModal>

    <CustomModal v-model="isPreviewModalOpen" :title="`تفاصيل: ${selectedGroup?.name}`">
      <div v-if="selectedGroup" class="space-y-6 py-4">
        
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl flex flex-col items-center justify-center border border-gray-100 dark:border-gray-800">
            <UIcon name="i-solar-users-group-two-rounded-bold-duotone" class="text-3xl text-primary mb-2" />
            <span class="text-sm text-gray-500">عدد الطلاب</span>
            <span class="font-bold text-xl">{{ selectedGroup._count?.students || 0 }}</span>
          </div>
          <div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl flex flex-col items-center justify-center border border-gray-100 dark:border-gray-800">
            <UIcon name="i-solar-clock-circle-bold-duotone" class="text-3xl text-blue-500 mb-2" />
            <span class="text-sm text-gray-500">الموعد الثابت</span>
            <span class="font-bold text-md" dir="ltr">{{ selectedGroup.timeSlot || '09:00 AM' }}</span>
          </div>
        </div>

        <UButton 
          block 
          size="xl" 
          color="neutral" 
          variant="solid" 
          icon="i-solar-arrow-left-bold" 
          :to="`/groups/${selectedGroup.id}`"
        >
          الدخول للصفحة الكاملة للمجموعة
        </UButton>
      </div>
    </CustomModal>

  </UContainer>
</template>