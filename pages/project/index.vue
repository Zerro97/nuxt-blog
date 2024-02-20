<script setup lang="ts">
import { isAfter, parseISO } from 'date-fns'

definePageMeta({
  layout: 'main',
})

useHead({
  meta: [
    { name: 'keywords', content: 'blog, tech, project, dev, web, showcase' },
  ],
})

useSeoMeta({
  title: 'Project | Hui Beom',
  ogTitle: 'Project | Hui Beom',
  description: 'List of projects that I worked in the past',
  ogDescription: 'List of projects that I worked in the past',
})

// defineOgImageStatic({
//   component: 'MyOgImage',
//   description: '',
//   background: '#27272a',
// })

const projects = await (await queryContent('project').find()).sort((a, b) => {
  return isAfter(parseISO(a.from_date), parseISO(b.from_date)) ? -1 : 0
})
</script>

<template>
  <section>
    <h1 data-cy="project-title">
      Projects
    </h1>
    <LineBreak class="mt-4" />
  </section>
  <section class="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
    <CardProject
      v-for="project in projects"
      :key="project.slug"
      :title="project.title"
      :description="project.description"
      :year="project.year"
      :image="project.image"
      :slug="project.slug"
      :livelink="project.livelink"
      :repo="project.repo"
    />
  </section>
</template>
