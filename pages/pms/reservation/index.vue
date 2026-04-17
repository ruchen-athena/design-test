<template>
  <!--
    PMS 訂房 — 列表頁（Template Starter）
    示範：toolbar + searchEngine + Syncfusion Grid + logger 埋點
    版型精簡版；如需完整 Figma 樣式可參考 pages/pms/folio/index.vue
  -->
  <div class="flex flex-col gap-[24px] h-full">

    <!-- Toolbar -->
    <div class="flex items-center justify-between shrink-0">
      <div class="flex items-center gap-[12px]">
        <NuxtLink to="/pms/reservation/new">
          <button
            class="h-[40px] px-[16px] py-[10px] rounded-[4px] text-[14px] font-medium text-white"
            style="background: #2877ee; border: 1px solid #2877ee"
            @click="logger.info('reservation.create_click')"
          >新增</button>
        </NuxtLink>
      </div>
      <div class="flex items-center gap-[12px]">
        <span class="text-[14px] text-[#3c4a5b]">共 {{ reservations.length }} 筆</span>
      </div>
    </div>

    <!-- Search -->
    <div
      class="flex gap-[20px] items-end p-[16px] rounded-[8px] shrink-0"
      style="background: white; border: 1px solid #d7dae0"
    >
      <div class="flex flex-1 flex-wrap gap-[20px]">
        <div class="flex flex-col gap-[4px] flex-1 min-w-[240px]">
          <label class="text-[14px] text-[#3c4a5b]">訂房卡號</label>
          <input
            v-model="filters.folioNo"
            placeholder="請輸入"
            class="h-[40px] px-[12px] border border-[#d7dae0] rounded text-[14px]"
          />
        </div>
        <div class="flex flex-col gap-[4px] flex-1 min-w-[240px]">
          <label class="text-[14px] text-[#3c4a5b]">姓名</label>
          <input
            v-model="filters.guestName"
            placeholder="請輸入"
            class="h-[40px] px-[12px] border border-[#d7dae0] rounded text-[14px]"
          />
        </div>
      </div>
      <button
        class="h-[40px] px-[16px] rounded-[4px] text-[14px] text-white"
        style="background: #2877ee; border: 1px solid #2877ee"
        @click="onSearch"
      >查詢</button>
    </div>

    <!-- Grid -->
    <div class="flex-1 min-h-0 overflow-auto border border-[#d7dae0] rounded">
      <ejs-grid
        :dataSource="filtered"
        :allowPaging="true"
        :allowSorting="true"
        :pageSettings="{ pageSize: 10 }"
        :rowHeight="50"
      >
        <e-columns>
          <e-column field="folioNo"     headerText="訂房卡號" width="200" />
          <e-column field="status"      headerText="狀態"     width="120" />
          <e-column field="guestName"   headerText="姓名"     width="160" />
          <e-column field="checkIn"     headerText="入住日期" width="160" />
          <e-column field="checkOut"    headerText="退房日期" width="160" />
          <e-column field="roomType"    headerText="房型"     width="180" />
          <e-column field="rooms"       headerText="間數"     width="80"  textAlign="Right" />
          <e-column field="totalAmount" headerText="總金額"   width="140" textAlign="Right" :template="'amountTpl'" />
          <e-column headerText="操作"   width="100" textAlign="Center" :template="'actionTpl'" />
        </e-columns>

        <template #amountTpl="{ data }">NT$ {{ data.totalAmount.toLocaleString() }}</template>

        <template #actionTpl="{ data }">
          <NuxtLink :to="`/pms/reservation/${data.id}`"
            class="inline-flex items-center justify-center w-[40px] h-[40px]"
            title="編輯"
          >
            <span class="material-symbols-outlined text-[20px] text-[#2877ee]">edit</span>
          </NuxtLink>
        </template>
      </ejs-grid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, ref, computed } from 'vue'
import {
  GridComponent as EjsGrid,
  ColumnsDirective as EColumns,
  ColumnDirective as EColumn,
  Page, Sort,
} from '@syncfusion/ej2-vue-grids'
import type { Reservation } from '~/types'

definePageMeta({ layout: 'pms' })
provide('grid', [Page, Sort])

const logger = useLogger()

// Mock：實務上會換成 useFetch('/api/reservations')
const reservations = ref<Reservation[]>([
  { id: 1, folioNo: 'R2026040001', status: '正常', guestName: '王小明', checkIn: '2026-04-15', checkOut: '2026-04-17', roomType: '標準雙人房', rooms: 1, totalAmount: 7200,  company: '直客', createdAt: '', updatedAt: '' },
  { id: 2, folioNo: 'R2026040002', status: '正常', guestName: '李雅婷', checkIn: '2026-04-16', checkOut: '2026-04-20', roomType: '豪華套房',   rooms: 1, totalAmount: 28000, company: '旅行社甲', createdAt: '', updatedAt: '' },
  { id: 3, folioNo: 'R2026040003', status: '詢價', guestName: '張偉誠', checkIn: '2026-04-18', checkOut: '2026-04-19', roomType: '標準單人房', rooms: 2, totalAmount: 5600,  company: '直客', createdAt: '', updatedAt: '' },
])

const filters = ref({ folioNo: '', guestName: '' })

const filtered = computed(() =>
  reservations.value.filter((r) =>
    (!filters.value.folioNo   || r.folioNo.includes(filters.value.folioNo)) &&
    (!filters.value.guestName || r.guestName.includes(filters.value.guestName))
  )
)

function onSearch() {
  logger.info('reservation.search', { ...filters.value })
}
</script>
