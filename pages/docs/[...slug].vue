<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'

definePageMeta({
  layout: 'docs',
})

const route = useRoute()
const path = withoutTrailingSlash(route.path)

const { data: page } = await useAsyncData(`docs ${route.path}`, async () => await queryContent('docs').where({ _path: path }).findOne())

if (page.value) {
  useHead({
    meta: [
      { name: 'keywords', content: page.value.keywords },
    ],
  })

  useSeoMeta({
    title: () => `${page.value?.title} | Hui Beom`,
    ogTitle: () => `${page.value?.title} | Hui Beom`,
    description: () => page.value?.description,
    ogDescription: () => page.value?.description,
  })

  // defineOgImageStatic({
  //   component: 'MyOgImage',
  //   title: 'Documents',
  //   description: '',
  //   background: '#27272a',
  // })
}
</script>

<template>
  <ContentDoc>
    <template #default="{ doc }">
      <ContentRenderer class="" :value="doc">
        <template #empty>
          <div class="flex flex-col items-center justify-center py-20">
            <h1>404</h1>
            <p>Page Not Found</p>
          </div>
        </template>
      </ContentRenderer>
    </template>
    <template #not-found>
      <div class="flex flex-col items-center w-full">
        <h1>404</h1>
        <p>Page Not Found</p>
      </div>
    </template>
    <template #empty>
      <TheAlert class="">
        I will be working on this shortly. Stay tuned!
      </TheAlert>
    </template>
  </ContentDoc>
</template>
