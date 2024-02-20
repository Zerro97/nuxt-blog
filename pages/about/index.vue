<script setup lang="ts">
useHead({
  meta: [
    { name: 'keywords', content: 'blog, tech, about, dev, web' },
  ],
})

definePageMeta({
  layout: 'main',
})

useSeoMeta({
  title: 'About Me | Hui Beom',
  ogTitle: 'About Me | Hui Beom',
  description: 'Hi, I\'m Hui Beom. I\'m  software developer from South Korea.',
  ogDescription: 'Hi, I\'m Hui Beom. I\'m  software developer from South Korea.',
})

// defineOgImageStatic({
//   component: 'MyOgImage',
//   description: '',
//   background: '#27272a',
// })

const workHistory = ref([{
  dateFrom: 'October 2022',
  dateTo: 'Present',
  title: 'Web Developer',
  description: 'SLMED',
  image: '/about/slmed-logo.png',
  link: 'https://slmed.co.kr',
}, {
  dateFrom: 'August 2022',
  dateTo: 'September 2022',
  title: 'Frontend Developer',
  description: 'DP Planning (Contract)',
  image: '/about/dpplanning-logo.png',
  link: 'http://www.dpplanning.co.kr/main/index.html',
}])

const educationHistory = ref([{
  dateFrom: 'Fall 2017',
  dateTo: 'Spring 2020',
  title: 'B.S. Computer Science',
  description: 'University of Wisconsin, Madison (USA)',
  image: '/about/UW-logo.png',
  link: 'https://www.wisc.edu/',
}, {
  dateFrom: 'Spring 2016',
  dateTo: 'Spring 2017',
  title: 'Applied Science',
  description: 'Taylor\'s University (Malaysia)',
  image: '/about/taylors-logo.png',
  link: 'https://university.taylors.edu.my/en.html',
}])
</script>

<template>
  <section class="flex flex-col">
    <h1 data-cy="about-title">
      About Me
    </h1>
    <div class="flex flex-col sm:flex-row-reverse">
      <nuxt-img
        provider="cloudinary"
        src="/about/profile.jpg"
        :placeholder="[10, 10]"
        sizes="sm:180px md:220px"
        width="220px"
        height="220px"
        alt="profile"
        class="mt-3 sm:mt-0 max-w-[180px] max-h-[180px] sm:max-w-[220px] sm:max-h-[220px] rounded"
      />
      <p class="mt-3 mr-14">
        I'm Hui Beom, a software developer from South Korea. I mostly dealt with frontend web development in my career and a bit of backend work as well.
      </p>
    </div>
  </section>
  <section class="flex flex-col mt-10">
    <h2>What I'm working on now</h2>
    <p class="mt-3 text-zinc-400">
      Last Updated: May 22th, 2023
    </p>
    <p class="mt-2">
      Just passed AWS Developer Associate exam! It took me longer than what I hoped for but at least I learnt many new things on the way :)
    </p>
  </section>
  <section class="grid grid-cols-1 mt-14 sm:mt-16 md:mt-20 md:grid-cols-2">
    <div>
      <h2>Work History</h2>
      <div class="flex flex-col mt-4 gap-y-6">
        <CardAbout
          v-for="history in workHistory"
          :key="history.description"
          :date-from="history.dateFrom"
          :date-to="history.dateTo"
          :title="history.title"
          :description="history.description"
          :image="history.image"
          :link="history.link"
        />
      </div>
    </div>
    <div class="mt-16 md:mt-0">
      <h2>Education</h2>
      <div class="flex flex-col mt-4 gap-y-6">
        <CardAbout
          v-for="history in educationHistory"
          :key="history.description"
          :date-from="history.dateFrom"
          :date-to="history.dateTo"
          :title="history.title"
          :description="history.description"
          :image="history.image"
          :link="history.link"
        />
      </div>
    </div>
  </section>
  <section class="flex flex-col mt-14 sm:mt-16 md:mt-20">
    <h2>My Skill Sets</h2>
    <p class="mt-4">
      While I believe that a good software developer is not defined by different technologies that they know, I thought it would still be beneficial to include it here for people who are curious
    </p>
    <HeadlessDisclosure v-slot="{ open }">
      <HeadlessDisclosureButton class="px-4 py-2 mt-4 border rounded max-w-max border-zinc-700">
        Display Skill Sets
        <Icon :name="`${open ? 'mdi:chevron-up' : 'mdi:chevron-down'}`" />
      </HeadlessDisclosureButton>
      <HeadlessDisclosurePanel>
        <TheAlert class="mt-3">
          This is a personal, opinionated view of my current skills.
        </TheAlert>
        <div class="mt-6">
          <h4>Languages</h4>
          <div class="grid grid-cols-1 gap-2 mt-2 sm:grid-cols-2 md:grid-cols-3">
            <CardSkill name="HTML" logo="logos:html-5" :cur-level="2" :max-level="3" />
            <CardSkill name="CSS" logo="logos:css-3" :cur-level="4" :max-level="6" />
            <CardSkill name="Javascript" logo="logos:javascript" :cur-level="5" :max-level="8" />
            <CardSkill name="Typescript" logo="logos:typescript-icon" :cur-level="3" :max-level="8" />
            <CardSkill name="Java" logo="logos:java" :cur-level="4" :max-level="10" />
            <CardSkill name="C" logo="logos:c" :cur-level="2" :max-level="8" />
            <CardSkill name="Rust" logo="logos:rust" :cur-level="2" :max-level="8" />
            <CardSkill name="Python" logo="logos:python" :cur-level="2" :max-level="8" />
          </div>
        </div>
        <div class="mt-6">
          <h4>Web Frameworks/Libraries</h4>
          <div class="grid grid-cols-1 gap-2 mt-2 sm:grid-cols-2 md:grid-cols-3">
            <CardSkill name="React" logo="logos:react" :cur-level="4" :max-level="8" />
            <CardSkill name="Next 13" logo="logos:nextjs-icon" :cur-level="2" :max-level="7" />
            <CardSkill name="React Query" logo="logos:react-query-icon" :cur-level="2" :max-level="6" />
            <CardSkill name="Vue 3" logo="logos:vue" :cur-level="4" :max-level="8" />
            <CardSkill name="Nuxt 3" logo="logos:nuxt-icon" :cur-level="2" :max-level="7" />
            <CardSkill name="Angular" logo="logos:angular-icon" :cur-level="1" :max-level="8" />
            <CardSkill name="Svelte" logo="logos:svelte-icon" :cur-level="2" :max-level="8" />
            <CardSkill name="NodeJS" logo="logos:nodejs-icon" :cur-level="4" :max-level="8" />
            <CardSkill name="Gatsby" logo="logos:gatsby" :cur-level="1" :max-level="7" />
            <CardSkill name="Strapi" logo="logos:strapi-icon" :cur-level="1" :max-level="3" />
            <CardSkill name="Tauri" logo="logos:tauri" :cur-level="1" :max-level="7" />
            <CardSkill name="Spring" logo="logos:spring-icon" :cur-level="2" :max-level="8" />
            <CardSkill name=".NET Framework" logo="logos:dotnet" :cur-level="1" :max-level="8" />
            <CardSkill name="Tailwind" logo="logos:tailwindcss-icon" :cur-level="2" :max-level="5" />
            <CardSkill name="UnoCSS" logo="logos:unocss" :cur-level="2" :max-level="5" />
            <CardSkill name="Supabase" logo="logos:supabase-icon" :cur-level="2" :max-level="7" />
          </div>
        </div>
        <div class="mt-6">
          <h4>DBMS</h4>
          <div class="grid grid-cols-1 gap-2 mt-2 sm:grid-cols-2 md:grid-cols-3">
            <CardSkill name="MySQL" logo="logos:mysql-icon" :cur-level="3" :max-level="8" />
            <CardSkill name="Oracle" logo="logos:oracle" :cur-level="3" :max-level="8" />
            <CardSkill name="Postgresql" logo="logos:postgresql" :cur-level="3" :max-level="8" />
            <CardSkill name="MongoDB" logo="logos:mongodb-icon" :cur-level="1" :max-level="8" />
          </div>
        </div>
        <div class="mt-6">
          <h4>Others</h4>
          <div class="grid grid-cols-1 gap-2 mt-2 sm:grid-cols-2 md:grid-cols-3">
            <CardSkill name="Docker" logo="logos:docker-icon" :cur-level="1" :max-level="5" />
            <CardSkill name="Nginx" logo="logos:nginx" :cur-level="1" :max-level="3" />
            <CardSkill name="Github Actions" logo="logos:github-octocat" :cur-level="1" :max-level="4" />
            <CardSkill name="AWS" logo="logos:aws" :cur-level="2" :max-level="10" />
            <CardSkill name="Cypress" logo="logos:cypress-icon" :cur-level="1" :max-level="5" />
            <CardSkill name="Vitest" logo="logos:vitest" :cur-level="1" :max-level="5" />
            <CardSkill name="OpenCV" logo="logos:opencv" :cur-level="1" :max-level="8" />
          </div>
        </div>
        <div class="mt-6">
          <h4>Certifications</h4>
          <div class="grid grid-cols-1 gap-2 mt-2 grid-cols-1 sm:grid-cols-2">
            <CardCertificate
              link="https://www.credly.com/badges/27629b54-ebe0-4bdf-abc9-1d43087f5870/public_url"
              name="AWS Certified Developer - Associate"
              image="aws-developer-associate"
              date="May 21, 2023"
            />
          </div>
        </div>
        <div class="mt-6">
          <h4>My Current Favorite Stack</h4>
          <div class="flex mt-2 gap-x-4">
            <TheTooltip>
              <template #trigger>
                <Icon name="logos:nuxt-icon" class="text-4xl hover:grayscale-0 grayscale" />
              </template>
              <template #tooltip>
                <p>Nuxt 3</p>
              </template>
            </TheTooltip>
            <TheTooltip>
              <template #trigger>
                <Icon name="logos:vue" class="text-4xl hover:grayscale-0 grayscale" />
              </template>
              <template #tooltip>
                <p>Vue 3</p>
              </template>
            </TheTooltip>
            <TheTooltip>
              <template #trigger>
                <Icon name="logos:javascript" class="text-4xl hover:grayscale-0 grayscale" />
              </template>
              <template #tooltip>
                <p>Javascript</p>
              </template>
            </TheTooltip>
            <TheTooltip>
              <template #trigger>
                <Icon name="logos:tailwindcss-icon" class="text-4xl hover:grayscale-0 grayscale" />
              </template>
              <template #tooltip>
                <p>Tailwind</p>
              </template>
            </TheTooltip>
          </div>
        </div>
      </HeadlessDisclosurePanel>
    </HeadlessDisclosure>
  </section>
</template>
