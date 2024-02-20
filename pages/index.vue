<script setup lang="ts">
import { isAfter, parseISO } from 'date-fns'

definePageMeta({
  layout: 'main',
})

useHead({
  meta: [
    { name: 'keywords', content: 'blog, portfolio, tech, dev, web' },
  ],
})

useSeoMeta({
  title: 'Hui Beom',
  ogTitle: 'Hui Beom',
  description: 'Hi, I\'m Hui Beom. I\'m software developer from South Korea. I\'m using this site to document my learnings and share with the world what I have learnt.',
  ogDescription: 'Hi, I\'m Hui Beom. I\'m software developer from South Korea. I\'m using this site to document my learnings and share with the world what I have learnt.',
})

// defineOgImageStatic({
//   component: 'MyOgImage',
//   title: 'Welcome to my site 👋',
//   description: '',
//   background: '#27272a',
// })

const { data: posts } = await useAsyncData('main-blog', async () => (await queryContent('blog')
  .find())
  .sort((a, b) => {
    return isAfter(parseISO(a.date), parseISO(b.date)) ? -1 : 0
  })
  .slice(0, 4))

const { data: projects } = await useAsyncData('main-project', async () => (await queryContent('project')
  .find())
  .sort((a, b) => {
    return isAfter(parseISO(a.from_date), parseISO(b.from_date)) ? -1 : 0
  })
  .slice(0, 3))
</script>

<template>
  <section class="flex flex-col w-full mt-14 sm:mt-16 md:mt-20">
    <h1 data-cy="home-title">
      Hi, I'm
      <span class="whitespace-nowrap">Hui Beom</span>
    </h1>
    <p class="mt-6 max-w-[450px]">
      Welcome to my site. 👋<br><br>
      I aim to use this site to share and document what I have learnt. Hope you enjoy!
    </p>
    <div class="flex flex-wrap mt-8 gap-y-2 gap-x-4">
      <LinkButton to="/about" label="about">
        Learn more about me
      </LinkButton>
      <LinkButton to="/blog" label="blog">
        Blog
      </LinkButton>
    </div>
  </section>
  <section class="flex flex-col w-full mt-14 sm:mt-16 md:mt-20">
    <div class="flex items-center justify-between">
      <h2>
        Latest Posts
      </h2>
      <LinkButton to="/blog" label="blog">
        View All
      </LinkButton>
    </div>
    <div class="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
      <CardPost
        v-for="(post, index) in posts"
        :key="post.slug"
        :tags="post.tags"
        :categories="post.categories"
        :title="post.title"
        :description="post.description"
        :date="post.date"
        :time="post.time"
        :banner="post.banner"
        :icon="post.icon"
        :link="post.slug"
        :class="`translate-x-[${index * 50}px]`"
      />
    </div>
  </section>
  <section class="flex flex-col w-full mt-14 sm:mt-16 md:mt-20">
    <div class="flex items-center justify-between">
      <h2>
        Projects
      </h2>
      <LinkButton to="/project" label="project">
        View All
      </LinkButton>
    </div>
    <div class="grid w-full grid-cols-1 gap-2 mt-6 sm:grid-cols-2 lg:grid-cols-3">
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
    </div>
  </section>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
