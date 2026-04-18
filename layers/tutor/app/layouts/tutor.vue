<script setup lang="ts">
const isSidebarOpen = ref(false) 

const navLinks = [
  { label: 'الرئيسية', icon: 'i-solar-home-2-bold', to: '/' },
  { label: 'إدارة الطلاب', icon: 'i-solar-users-group-rounded-bold', to: '/students' },
]


const closeSidebar = () => {
  if (window.innerWidth < 1024) isSidebarOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col lg:flex-row" dir="rtl">
    
    <header class="lg:hidden bg-white dark:bg-gray-800 border-b p-4 flex justify-between items-center sticky top-0 z-40">
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-solar-hamburger-menu-linear"
        @click="isSidebarOpen = !isSidebarOpen"
      />
      <span class="font-bold text-primary">لوحة المعلم</span>
      <UAvatar src="https://github.com/shudy.png" size="sm" />
    </header>

    <aside 
      :class="[
        'fixed inset-y-0 right-0 z-50 w-64 bg-white dark:bg-gray-800 border-l transition-transform duration-300 transform lg:translate-x-0 lg:static lg:inset-0',
        isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
      ]"
    >
      <div class="p-4 flex justify-between items-center border-b lg:hidden">
        <span class="font-bold">القائمة</span>
        <UButton icon="i-solar-close-circle-linear" variant="ghost" @click="isSidebarOpen = false" />
      </div>

      <nav class="p-4 space-y-2">
        <UVerticalNavigation :links="navLinks" @click="closeSidebar" />
      </nav>
    </aside>

    <div 
      v-if="isSidebarOpen" 
      class="fixed inset-0 bg-black/50 z-40 lg:hidden" 
      @click="isSidebarOpen = false"
    ></div>

    <main class="flex-1 w-full overflow-x-hidden p-4 lg:p-8">
      <slot />
    </main>
  </div>
</template>