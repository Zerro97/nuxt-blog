<script setup lang="ts">
import { format, parseISO } from 'date-fns'
import { withoutTrailingSlash } from 'ufo'

definePageMeta({
  layout: 'main',
})

const route = useRoute()
const path = withoutTrailingSlash(route.path)

const { data: page } = await useAsyncData(`blog ${route.path}`, async () => await queryContent('blog').where({ _path: path }).findOne())

if (page.value) {
  const keywords = [...page.value?.tags, ...page.value.categories].join(',')

  useHead({
    meta: [
      { name: 'keywords', content: keywords },
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
  //   title: 'Blog',
  //   description: '',
  //   background: '#27272a',
  // })
}
</script>

<template>
  <article>
    <ContentDoc>
      <template #default="{ doc }">
        <section v-if="doc.title" class="flex flex-col mb-6">
          <div class="relative mb-6">
            <nuxt-img
              v-if="doc.banner"
              provider="cloudinary"
              :placeholder="[30, 10]"
              :src="doc.banner"
              width="900px"
              height="300px"
              :alt="doc.title"
              class="w-full aspect-[3/1] object-cover rounded"
            />
            <div v-else class="w-full h-[300px] bg-violet-500 rounded mb-4" />
            <CardIcon size="lg" :logo="doc.icon" class="absolute bottom-0 left-4 translate-y-1/4" />
          </div>
          <h1 class="text-3xl sm:text-4xl">
            {{ doc.title }}
          </h1>
          <p class="text-zinc-400">
            {{ doc.date && format(parseISO(doc.date), 'MMMM dd, yyyy') }}
          </p>
          <div class="flex items-center mt-4 mb-2 gap-x-4">
            <div class="flex items-center gap-x-2">
              <Icon name="mdi:clock-time-two-outline" />
              <p class="text-base text-zinc-200">
                {{ doc.time }} min read
              </p>
            </div>
            <div v-for="category in doc.categories" :key="category" class="flex items-center gap-x-2">
              <Icon name="mdi:tag-outline" />
              <p class="text-base text-zinc-200">
                {{ category }}
              </p>
            </div>
          </div>
          <LineBreak class="mt-1" />
        </section>
        <div class="relative flex gap-x-6 document-article">
          <ContentRenderer class="w-full renderer shrink" :value="doc">
            <template #empty>
              <div class="flex flex-col items-center justify-center w-full py-20">
                <h1>404</h1>
                <p>Page Not Found</p>
              </div>
            </template>
          </ContentRenderer>
          <TableOfContent v-if="doc.title" class="hidden md:block" />
        </div>
      </template>
      <template #not-found>
        <div class="flex flex-col items-center w-full">
          <h1>404</h1>
          <p>Page Not Found</p>
        </div>
      </template>
    </ContentDoc>
  </article>
</template>

<style>
.renderer h2:first-of-type {
  @apply mt-0;
}
</style>
