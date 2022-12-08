import transformerDirective from '@unocss/transformer-directives'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/image-edge',
    'nuxt-icon',
    'nuxt-headlessui',
    '@unocss/nuxt',
  ],
  app: {
    head: {
      title: 'Hui Beom',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' }],
    },
  },
  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/css/font.css',
    '~/assets/css/main.css',
  ],
  nitro: {
    serveStatic: true,
    prerender: {
      routes: ['/docs'],
    },
  },
  // @ts-expect-error unocss does not exist in NuxtConfig type
  unocss: {
    uno: true,
    icons: true,
    attributify: true,
    shortcuts: [],
    rules: [
      [/^m-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
      [/^p-(\d+)$/, match => ({ padding: `${match[1] / 4}rem` })],
    ],
    theme: {
      breakpoints: {
        sm: '540px',
        md: '740px',
      },
    },
    transformers: [transformerDirective({ enforce: 'pre' })],
  },
  headlessui: {
    prefix: 'Headless',
  },
  content: {
    navigation: {
      fields: ['icon'],
    },
    highlight: {
      // Theme used in all color schemes.
      theme: 'github-dark',
    },
    documentDriven: true,
    markdown: {
      toc: {
        depth: 4,
        searchDepth: 4,
      },
    },
  },
})
