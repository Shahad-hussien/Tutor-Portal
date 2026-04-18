<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    dir: 'rtl',
    lang: 'ar'
  }
})

const title = 'إدارة الخصوصي'
const description = 'برنامج لإدارة الطلاب لمدرّسي الخصوصي.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <UApp>
    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator icon="i-solar-diploma-bold" />

    <UFooter>
      <template #left>
        <p class="text-sm text-gray-500">
          Built for Education • © {{ new Date().getFullYear() }}
        </p>
      </template>
    </UFooter>
  </UApp>
</template>
