<script setup lang="ts">
import { isAfter, parseISO } from 'date-fns'

definePageMeta({
  layout: 'main',
  documentDriven: false,
})

useHead({
  meta: [
    { name: 'keywords', content: 'blog, tech, article, dev, web, post' },
  ],
})

useSeoMeta({
  title: 'Blog | Hui Beom',
  ogTitle: 'Blog | Hui Beom',
  description: 'Articles & Tutorials on Web Development',
  ogDescription: 'Articles & Tutorials on Web Development',
})

const {
  filter,
  extractTags,
  extractCategories,
} = useFilterPost()

// Post
const posts = usePosts()
const selectedPosts = useSelectedPosts()

// Filter
const tags = useTags()
const categories = useCategories()

// Init Lists
posts.value = await (await queryContent('blog').find()).sort((a, b) => {
  return isAfter(parseISO(a.date), parseISO(b.date)) ? -1 : 0
})
selectedPosts.value = posts.value

extractTags()
extractCategories()

// Filter Functions
const filterTag = (tag: string) => {
  tags.value[tag] = !tags.value[tag]
}

const filterCategory = (category: string) => {
  categories.value[category] = !categories.value[category]
}

// Whenever tag, category, search changes, filter the posts
watch([tags, categories], () => {
  filter()
}, { deep: true })
</script>

<template>
  <section>
    <h1 data-cy="blog-title">
      Blog
    </h1>
    <InputSearch />
    <HeadlessTabGroup>
      <HeadlessTabList class="flex mt-2 mb-3 gap-x-4">
        <HeadlessTab v-slot="{ selected }">
          <p :class="`${selected && 'text-violet-400 border-b-2 border-violet-400'} text-lg`">
            Tags
          </p>
        </HeadlessTab>
        <HeadlessTab v-slot="{ selected }">
          <p :class="`${selected && 'text-violet-400 border-b-2 border-violet-400'} text-lg`">
            Categories
          </p>
        </HeadlessTab>
      </HeadlessTabList>
      <HeadlessTabPanels>
        <HeadlessTabPanel class="flex flex-wrap gap-x-2 gap-y-2">
          <button
            v-for="(value, key) in tags"
            :key="key"
            aria-label="Tag"
            :class="`${value && 'text-violet-400'} bg-zinc-800 px-3 rounded w-max`"
            @click="filterTag(key)"
          >
            {{ key }}
          </button>
        </HeadlessTabPanel>
        <HeadlessTabPanel class="flex flex-wrap gap-x-2 gap-y-2">
          <button
            v-for="(value, key) in categories"
            :key="key"
            aria-label="Category"
            :class="`${value && 'text-violet-400'} bg-zinc-800 px-3 rounded w-max`"
            @click="filterCategory(key)"
          >
            {{ key }}
          </button>
        </HeadlessTabPanel>
      </HeadlessTabPanels>
    </HeadlessTabGroup>
    <LineBreak class="my-4" />
  </section>
  <section class="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
    <CardPost
      v-for="post in selectedPosts"
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
    />
  </section>
</template>

