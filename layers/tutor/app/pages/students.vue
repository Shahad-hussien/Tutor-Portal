<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui' 

definePageMeta({ layout: 'tutor' })

interface Student {
  id: string
  fullName: string
  gradeLevel: string
  schoolName: string
  parentPhone: string
  studentCode?: string
  group?: { 
    name: string 
  } | null
}

const { data: students, pending, refresh } = useFetch<Student[]>('/api/students')

const columns: TableColumn<Student>[] = [
  { accessorKey: 'fullName', header: 'اسم الطالب' },
  { accessorKey: 'gradeLevel', header: 'المرحلة' },
  { id: 'groupName', header: 'المجموعة' }, 
  { accessorKey: 'schoolName', header: 'المدرسة' },
  { accessorKey: 'parentPhone', header: 'الهاتف' },
  { accessorKey: 'studentCode', header: 'كود الدخول' },
  { id: 'actions', header: 'إجراءات' }
]

const isModalOpen = ref(false)

const deleteStudent = (student: Student) => {
  console.log('حذف:', student.fullName)
}
</script>

<template>
  <UContainer class="py-4 lg:py-10" dir="rtl">
    <UCard>
      <template #header>
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 class="text-xl lg:text-2xl font-bold text-primary">إدارة الطلاب</h1>
          
          <UButton 
            class="w-full sm:w-auto"
            icon="i-solar-user-plus-bold" 
            @click="isModalOpen = true"
          >
            إضافة طالب جديد
          </UButton>
        </div>
      </template>

      <div class="overflow-x-auto">
        <UTable 
          :data="students || []" 
          :columns="columns" 
          :loading="pending"
          class="min-w-150 lg:w-full"
        >
          <template #groupName-cell="{ row }">
            <UBadge v-if="row.original.group?.name" color="info" variant="subtle" class="rounded-full">
              {{ row.original.group.name }}
            </UBadge>
            <span v-else class="text-gray-400 text-sm">-- غير محدد --</span>
          </template>

          <template #studentCode-cell="{ row }">
            <UBadge color="neutral" variant="soft" class="font-mono text-sm" dir="ltr">
              {{ row.original.studentCode || 'N/A' }}
            </UBadge>
          </template>

          <template #actions-cell="{ row }">
            <div class="flex gap-2 justify-center">
              <UButton icon="i-solar-pen-new-square-linear" color="info" variant="ghost" />
              <UButton 
                icon="i-solar-trash-bin-trash-linear" 
                color="error" 
                variant="ghost" 
                @click="deleteStudent(row.original as Student)" 
              />
            </div>
          </template>
        </UTable>
      </div>
    </UCard>
    
    <CustomModal v-model="isModalOpen" title="إضافة طالب جديد">
       <StudentForm @success="isModalOpen = false; refresh()" />
    </CustomModal>
  </UContainer>
</template>