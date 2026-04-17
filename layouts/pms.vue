<template>
  <!--
    頁面框架 — 對齊 Figma: Screen/Navigation＠1920＠zh-TW (112:5334)
    來源：ERP 共用財務設定檔 YtWyGH7oKg0ql5BUv1scWa
    Icon：Material Symbols（對齊 Figma Library Icon 2ebZBUwzvnu1oV28DnBzSR）
  -->
  <div class="flex flex-col h-screen overflow-hidden">

    <!-- Main Content — bg: 微藍色底 rgba(40,119,238,0.05) over white -->
    <div class="flex flex-col flex-1 min-h-0" style="background: linear-gradient(rgba(40,119,238,0.05), rgba(40,119,238,0.05)), #fff">

      <!-- DsHeader — Figma 965:47886 — h:60px, px:12px, py:8px, gap:16px
           List 頁：一層（標題 + star）
           Detail 頁：兩層（標題 > 單號 + star） -->
      <header class="h-[60px] flex-shrink-0 flex items-center gap-[16px] px-[12px] py-[8px]">

        <!-- Left — flex-1, gap:8px -->
        <div class="flex flex-1 items-center gap-[8px] min-w-0 min-h-px">

          <!-- DsNavigationItemHome — w:72px, h:44px, px:8px, py:12px, rounded-lg -->
          <NuxtLink to="/" class="flex-shrink-0 flex items-center justify-center w-[72px] h-[44px] px-[8px] py-[12px] rounded-[8px]">
            <span class="material-symbols-outlined text-[32px] text-[#0f172a]" style="font-variation-settings: 'FILL' 1">home</span>
          </NuxtLink>

          <!-- Title + Star — Figma: "star" section, self-stretch -->
          <div class="flex items-center self-stretch">
            <div class="flex items-center h-full shrink-0">
              <!-- Title — px:8px, 16px, #0f172a -->
              <div class="flex items-center justify-center h-full px-[8px]">
                <NuxtLink to="/pms/folio" class="text-[16px] leading-[1.3] text-[#0f172a] whitespace-nowrap" style="font-variation-settings: 'wght' 400">
                  訂房卡
                </NuxtLink>
              </div>
              <!-- Detail 層：僅在 detail 頁顯示 -->
              <template v-if="isDetailPage">
                <span class="material-symbols-outlined text-[18px] text-[#0f172a] shrink-0">chevron_right</span>
                <div class="flex items-center h-full px-[8px]">
                  <span class="text-[16px] font-medium leading-[1.3] text-[#0f172a] whitespace-nowrap">{{ detailTitle }}</span>
                </div>
              </template>
              <!-- Star (favorite) Icon Button — 40×40px, rounded, star-outline 20px -->
              <button class="flex items-center justify-center w-[40px] h-[40px] rounded-[4px] shrink-0">
                <span class="material-symbols-outlined text-[20px] text-[#3c4a5b]">star_outline</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Right: Utility Navigation — gap:4px, h:full -->
        <div class="flex items-center gap-[4px] h-full shrink-0">
          <!-- SpeedDial (Notification) — 44×44, FILL 1 實心 icon -->
          <div class="relative flex items-center justify-center w-[44px] h-[44px] px-[8px] py-[12px]">
            <span class="material-symbols-outlined text-[24px] text-[#3c4a5b]" style="font-variation-settings: 'FILL' 1">notifications</span>
            <div class="absolute top-[3px] right-[3px] bg-[#ffbe0b] rounded-full px-[4px] flex items-center justify-center overflow-hidden">
              <span class="text-[12px] font-medium leading-[1.3] text-[#1d1400] tracking-[0.1px] whitespace-nowrap">9+</span>
            </div>
          </div>
          <!-- SideMenu (Settings) — 44×44, FILL 1 實心 icon -->
          <div class="flex items-center justify-center w-[44px] h-[44px] px-[8px] py-[12px]">
            <span class="material-symbols-outlined text-[24px] text-[#3c4a5b]" style="font-variation-settings: 'FILL' 1">settings</span>
          </div>
          <!-- Avatar — 44×44 outer, 24×24 circle, bg+border:#1f57d1 -->
          <div class="flex items-center justify-center w-[44px] h-[44px] p-[8px]">
            <div class="w-[24px] h-[24px] rounded-full bg-[#1f57d1] border border-[#1f57d1] flex items-center justify-center">
              <span class="text-[11px] font-medium leading-[1.3] text-[#f2f0f4] tracking-[0.1px] whitespace-nowrap">AN</span>
            </div>
          </div>
        </div>

      </header>

      <!-- Content Container — pt:4px, pb:12px, px:12px, gap:12px -->
      <div class="flex flex-1 min-h-0 gap-[12px] pt-[4px] pb-[12px] px-[12px]">

        <!-- DsNavigationA8 — Figma 3466:125259
             bg:#001d5a, flex-col, gap:8px, p:8px, rounded:12px, w:72px, h:full -->
        <aside class="w-[72px] flex-shrink-0 h-full bg-[#001d5a] rounded-[12px] p-[8px] flex flex-col gap-[8px]">

          <!-- Top — Figma 3466:125278: pb:8px, pt:0, px:0, border-b:1px solid #7f8996, shrink-0 -->
          <div class="flex flex-col items-center justify-center shrink-0 w-full pt-0 px-0 pb-[8px]" style="border-bottom: 1px solid #7f8996">
            <!-- DsNavigation/ItemMenu — min-h:56, min-w:56, gap:4, px:2, py:4, rounded:8 -->
            <NuxtLink
              to="/pms/folio"
              class="w-full min-h-[56px] min-w-[56px] flex flex-col items-center justify-center gap-[4px] rounded-[8px] px-[2px] py-[4px] shrink-0"
            >
              <span class="material-symbols-outlined text-[24px] text-white shrink-0" style="font-variation-settings: 'FILL' 1">cards_star</span>
              <span class="text-[12px] text-white text-center leading-[1.3] tracking-[0.1px] overflow-hidden text-ellipsis whitespace-nowrap min-w-full">我的最愛</span>
            </NuxtLink>
          </div>

          <!-- Under — Figma 3466:125280: flex-1, flex-col, gap:8, overflow:clip, w:full -->
          <div class="flex-1 flex flex-col gap-[8px] overflow-hidden w-full min-h-px min-w-px">
            <!-- 訂房 (active) — bg:#1f57d1 -->
            <NuxtLink
              to="/pms/folio"
              class="w-full min-h-[56px] min-w-[56px] flex flex-col items-center justify-center gap-[4px] rounded-[8px] px-[2px] py-[4px] shrink-0 bg-[#1f57d1]"
            >
              <span class="material-symbols-outlined text-[24px] text-white shrink-0">hotel</span>
              <span class="text-[12px] text-white text-center leading-[1.3] tracking-[0.1px] overflow-hidden text-ellipsis whitespace-nowrap">訂房</span>
            </NuxtLink>
            <!-- 住客 -->
            <button class="w-full min-h-[56px] min-w-[56px] flex flex-col items-center justify-center gap-[4px] rounded-[8px] px-[2px] py-[4px] shrink-0">
              <span class="material-symbols-outlined text-[24px] text-white shrink-0">person</span>
              <span class="text-[12px] text-white text-center leading-[1.3] tracking-[0.1px] overflow-hidden text-ellipsis whitespace-nowrap min-w-full">住客</span>
            </button>
            <!-- 帳務 -->
            <button class="w-full min-h-[56px] min-w-[56px] flex flex-col items-center justify-center gap-[4px] rounded-[8px] px-[2px] py-[4px] shrink-0">
              <span class="material-symbols-outlined text-[24px] text-white shrink-0">receipt_long</span>
              <span class="text-[12px] text-white text-center leading-[1.3] tracking-[0.1px] overflow-hidden text-ellipsis whitespace-nowrap">帳務</span>
            </button>
            <!-- 報表 -->
            <button class="w-full min-h-[56px] min-w-[56px] flex flex-col items-center justify-center gap-[4px] rounded-[8px] px-[2px] py-[4px] shrink-0">
              <span class="material-symbols-outlined text-[24px] text-white shrink-0">bar_chart</span>
              <span class="text-[12px] text-white text-center leading-[1.3] tracking-[0.1px] overflow-hidden text-ellipsis whitespace-nowrap min-w-full">報表</span>
            </button>
          </div>

          <!-- DsNavigationItemSystem — Figma 3464:57000: 56×56 fixed, rounded:8, shrink-0 -->
          <div class="shrink-0 w-[56px] h-[56px] flex flex-col items-center justify-center rounded-[8px] px-[2px] py-[4px]">
            <span class="text-[14px] font-bold text-white tracking-wider">ERP</span>
          </div>

        </aside>

        <!-- Container — Figma 112:5274 — border:#d7dae0, rounded-xl(12px), flex-1, overflow:clip -->
        <div class="flex-1 flex flex-col min-w-0 border border-[#d7dae0] rounded-xl overflow-hidden">
          <!-- 內容區 — Figma 112:5275 — bg:white, p:32px, rounded-t-xl, flex-1, border-b -->
          <div class="flex-1 bg-white p-[32px] rounded-t-xl overflow-auto min-h-0 border-b border-[#d7dae0]">
            <slot />
          </div>
          <!-- DsProgramID — Figma 3422:84371 — bg: blue-tint 0.08, px:16px, py:6px, 12px #7f8996 -->
          <div
            class="flex items-center justify-between px-[16px] py-[6px] text-[12px] text-[#7f8996] leading-[1.3] tracking-[0.1px] whitespace-nowrap"
            style="background: linear-gradient(rgba(40,119,238,0.08), rgba(40,119,238,0.08)), #fff"
          >
            <span>programID</span>
            <span>v1.0.0-PMS</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// 判斷是否為 detail 頁（/pms/folio/:id）
const isDetailPage = computed(() => {
  const id = route.params.id
  return !!id && id !== 'new'
})

// Detail 頁標題（訂房卡號或 "新增"）
const detailTitle = computed(() => {
  const id = route.params.id
  if (id === 'new') return '新增'
  return String(id || '')
})
</script>

<style scoped></style>
