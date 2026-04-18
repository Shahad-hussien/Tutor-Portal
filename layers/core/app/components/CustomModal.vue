<script setup lang="ts">
defineProps<{
  modelValue: boolean
  title: string
}>()

const emit = defineEmits(['update:modelValue'])

const close = () => emit('update:modelValue', false)
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="relative z-100" dir="rtl">
      <Transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        appear
      >
        <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-md" @click="close" />
      </Transition>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <Transition
            enter-active-class="duration-300 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="duration-200 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 translate-y-4 sm:translate-y-0"
            appear
          >
            <div 
              v-if="modelValue"
              class="w-full max-w-lg transform overflow-hidden rounded-3xl bg-white dark:bg-gray-950 p-6 text-right align-middle shadow-2xl transition-all border border-gray-100 dark:border-gray-800 ring-1 ring-black/5"
            >
              <div class="flex items-center justify-between mb-6">
                <div class="flex flex-col gap-1">
                  <h3 class="text-xl font-extrabold text-gray-900 dark:text-white leading-tight">
                    {{ title }}
                  </h3>
                  <div class="h-1 w-8 bg-primary rounded-full"></div>
                </div>
                
                <UButton
                  icon="i-solar-close-square-linear"
                  color="neutral"
                  variant="ghost"
                  size="xl"
                  class="rounded-full"
                  @click="close"
                />
              </div>
              
              <div class="relative">
                <slot />
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* Ensure the modal is always above everything */
.z-100 {
  z-index: 100;
}
</style>