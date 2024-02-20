<script setup lang="ts">
definePageMeta({
  layout: 'main',
})

useServerSeoMeta({
  title: '404',
  description: 'Sorry! This page does not exist.',
})

// defineOgImageStatic({
//   component: 'MyOgImage',
//   title: '404',
//   background: '#27272a',
// })
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full py-20">
    <h1>404</h1>
    <p>Page Not Found</p>
  </div>
</template>
