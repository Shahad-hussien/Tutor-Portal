<script setup lang="ts">

const studentName = ref('أحمد علي حسن')
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950" dir="rtl">
    <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div class="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <UAvatar src="https://api.dicebear.com/7.x/notionists/svg?seed=Ahmed" size="md" class="bg-primary/10" />
          <div>
            <p class="text-xs text-gray-500">مرحباً بك</p>
            <p class="text-sm font-bold text-gray-900 dark:text-white">{{ studentName }}</p>
          </div>
        </div>
        
        <UButton 
          icon="i-solar-logout-2-bold-duotone" 
          color="neutral" 
          variant="ghost" 
          class="rounded-full"
        />
      </div>
    </header>

    <main class="max-w-5xl mx-auto px-4 py-6 sm:py-10 pb-24">
      <slot />
    </main>
  </div>
</template>