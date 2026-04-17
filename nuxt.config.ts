export default defineNuxtConfig({
  ssr: false,

  app: {
    baseURL: '/design-test/',
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
        },
      ],
    },
  },

  css: [
    '~/assets/css/main.css',
    // Syncfusion EJ2 Material Theme（對齊 syncfusion-playground）
    '@syncfusion/ej2-base/styles/material.css',
    '@syncfusion/ej2-icons/styles/material.css',
    '@syncfusion/ej2-buttons/styles/material.css',
    '@syncfusion/ej2-inputs/styles/material.css',
    '@syncfusion/ej2-dropdowns/styles/material.css',
    '@syncfusion/ej2-splitbuttons/styles/material.css',
    '@syncfusion/ej2-calendars/styles/material.css',
    '@syncfusion/ej2-grids/styles/material.css',
    '@syncfusion/ej2-layouts/styles/material.css',
    '@syncfusion/ej2-lists/styles/material.css',
    '@syncfusion/ej2-navigations/styles/material.css',
    '@syncfusion/ej2-notifications/styles/material.css',
    '@syncfusion/ej2-popups/styles/material.css',
  ],

  vite: {
    css: {
      postcss: {
        plugins: [
          require('@tailwindcss/postcss'),
        ],
      },
    },
  },

  devtools: { enabled: true },
  devServer: { port: 3100 },

  nitro: {
    prerender: {
      routes: [
        '/pms/folio/new',
        '/pms/reservation/new',
      ],
    },
  },

  compatibilityDate: '2024-08-14',
})
