import transformerDirective from '@unocss/transformer-directives'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    'nuxt-icon',
    'unplugin-icons/nuxt',
    'nuxt-headlessui',
    '@unocss/nuxt',
  ],
  experimental: {
    componentIslands: true,
    payloadExtraction: true,
  },
  runtimeConfig: {
    // https://github.com/harlan-zw/nuxt-seo-kit#1-define-config
    public: {
      siteUrl: 'https://khuibeom.com',
      siteName: 'Hui Beom',
      siteDescription: 'Hi, I\'m Hui Beom. I\'m software developer from South Korea.',
      language: 'en',
    },
  },
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'copyright', content: 'Hui Beom Kim' },
        { 'http-equiv': 'accept-ch', 'content': 'DPR' },
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
      ],
    },
  },
  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/css/font.css',
    '~/assets/css/main.css',
  ],
  ogImage: {
    experimentalRuntimeBrowser: true,
  },
  // nitro: {
  //   serveStatic: true,
  // },
  ssr: true,
  // @ts-expect-error defineNuxtConfig does not have unocss type
  unocss: {
    uno: true,
    icons: true,
    attributify: true,
    shortcuts: [],
    rules: [
      [/^m-(\d+)$/, ([, d]: any) => ({ margin: `${d / 4}rem` })],
      [/^p-(\d+)$/, (match: number[]) => ({ padding: `${match[1] / 4}rem` })],
    ],
    theme: {
      breakpoints: {
        sm: '540px',
        md: '740px',
      },
    },
    transformers: [transformerDirective({ enforce: 'pre' })],
  },
  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/dpdm96hjl/image/upload/v1670587534/khuibeom.com',
    },
  },
  headlessui: {
    prefix: 'Headless',
  },
  content: {
    navigation: {
      fields: ['icon'],
    },
    highlight: {
      preload: [
        'c',
        'cpp',
        'java',
      ],
      // Theme used in all color schemes.
      theme: 'github-dark',
    },
    // documentDriven: true,
    markdown: {
      toc: {
        depth: 4,
        searchDepth: 4,
      },
    },
  },
})
//  node-server
