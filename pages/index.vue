<template>
  <!-- Landing — PMS Demo 模組清單 -->
  <div class="min-h-screen flex items-center justify-center p-8" style="background: linear-gradient(rgba(40,119,238,0.05), rgba(40,119,238,0.05)), #fff">
    <div class="max-w-[720px] w-full">
      <header class="mb-8">
        <h1 class="text-[28px] font-medium text-[#0f172a] mb-2">PMS Demo</h1>
        <p class="text-[14px] text-[#3c4a5b]">
          Nuxt 3 + Vue 3 + Tailwind + Syncfusion EJ2 示範專案
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
        <NuxtLink
          v-for="mod in modules"
          :key="mod.path"
          :to="mod.path"
          class="block p-[20px] rounded-[8px] bg-white border border-[#d7dae0] hover:border-[#2877ee] transition-colors"
        >
          <div class="flex items-start gap-[12px]">
            <span class="material-symbols-outlined text-[24px] text-[#2877ee] shrink-0">{{ mod.icon }}</span>
            <div class="min-w-0">
              <h2 class="text-[16px] font-medium text-[#0f172a] mb-1">{{ mod.title }}</h2>
              <p class="text-[13px] text-[#3c4a5b] leading-[1.4]">{{ mod.desc }}</p>
            </div>
          </div>
        </NuxtLink>
      </div>

      <footer class="mt-8 text-[12px] text-[#7f8996]">
        <a href="https://github.com/ruchen-athena/design-test" class="hover:underline">GitHub Repo</a>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const modules = [
  { path: '/pms/folio/',       icon: 'cards_star', title: '訂房卡 (Folio)',      desc: '完整 Figma 對齊版 — 列表 + 詳細頁，含 Syncfusion Grid、searchEngine、batch actions' },
  { path: '/pms/reservation/', icon: 'hotel',      title: '訂房 (Reservation)',  desc: 'Template starter — 列表 + 表單，示範 useLogger 埋點流程' },
]
</script>
