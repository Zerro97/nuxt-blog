<script setup lang="ts">
import { format, parseISO } from 'date-fns'
import { withoutTrailingSlash } from 'ufo'

definePageMeta({
  layout: 'main',
})

const route = useRoute()
const path = withoutTrailingSlash(route.path)

const { data: page } = await useAsyncData(`blog ${route.path}`, async () => await queryContent('project').where({ _path: path }).findOne())

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
  //   title: 'Project',
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
            <div v-else class="w-full aspect-[3/1] bg-violet-500 rounded" />
            <CardIcon size="lg" :logo="doc.icon" class="absolute bottom-0 left-4 translate-y-1/4" />
          </div>
          <NuxtLink v-if="doc.livelink" target="_blank" :to="doc.livelink" class="flex items-center gap-x-2">
            <h1 class="text-3xl sm:text-4xl">
              {{ doc.title }}
            </h1>
            <Icon name="uil:external-link-alt" class="text-2xl" />
          </NuxtLink>
          <h1 v-else class="text-3xl sm:text-4xl">
            {{ doc.title }}
          </h1>
          <p class="text-zinc-400">
            {{ format(parseISO(doc.from_date), 'MMMM yyyy') }}
            ~
            {{ doc.to_date.toLowerCase() === 'present' ? doc.to_date : format(parseISO(doc.to_date), 'MMMM yyyy') }}
          </p>
          <div class="flex items-center gap-x-4">
            <div class="flex items-center mt-1 mb-2 gap-x-1">
              <Icon name="mdi:human-male-male" />
              <p class="text-base text-zinc-200">
                {{ doc.team }} contributor
              </p>
            </div>
            <div v-if="doc.repo">
              <NuxtLink :to="doc.repo" target="_blank" class="flex items-center mt-1 mb-2 gap-x-1">
                <Icon name="mdi:github" />
                <p class="underline decoration-violet-400 decoration-2 text-violet-300">
                  Source Code
                </p>
              </NuxtLink>
            </div>
          </div>
          <LineBreak class="mt-1" />
        </section>
        <div class="flex gap-x-6 document-article">
          <ContentRenderer class="w-full renderer first:m-0" :value="doc">
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
