<template>
  <!--
    PMS 訂房卡 — 列表頁
    版型來源：Figma Container 965:47891（CollectList ＠ 財務作業收款模組）
    toolbar: 965:47894 / searchEngine: 965:47913 / DataGrid: 965:47925
  -->
  <div class="flex flex-col gap-[24px] h-full">

    <!-- ── <toolbar> — Figma 965:47894 ─────────────────────────────────── -->
    <!-- flex justify-between, h:40 -->
    <div class="flex items-center justify-between shrink-0">
      <!-- Left — gap:12px: switches between normal mode and batch mode -->
      <!-- ── Batch mode (rows selected) ──────────────────────────────────── -->
      <div v-if="selectedCount > 0" class="flex items-center gap-[12px]">
        <!-- Confirm — 確認訂房 -->
        <button
          class="flex items-center justify-center w-[40px] h-[40px] rounded-[4px]"
          style="background: transparent; border: 1px solid #2877ee"
          title="確認訂房"
          @click="onBatchConfirm"
        >
          <span class="material-symbols-outlined text-[20px]" style="color: #2877ee">check_circle</span>
        </button>
        <!-- Export — 匯出 -->
        <button
          class="flex items-center justify-center w-[40px] h-[40px] rounded-[4px]"
          style="background: transparent; border: 1px solid #2877ee"
          title="匯出"
          @click="onBatchExport"
        >
          <span class="material-symbols-outlined text-[20px]" style="color: #2877ee">download</span>
        </button>
        <!-- Vertical divider — 1px × 40px -->
        <div class="w-[1px] h-[40px]" style="background: #d7dae0"></div>
        <!-- Cancel — 取消訂房 -->
        <button
          class="flex items-center justify-center w-[40px] h-[40px] rounded-[4px]"
          style="background: transparent; border: 1px solid #f4493e"
          title="取消訂房"
          @click="onBatchCancel"
        >
          <span class="material-symbols-outlined text-[20px]" style="color: #f4493e">cancel</span>
        </button>
        <!-- Delete — 刪除 -->
        <button
          class="flex items-center justify-center w-[40px] h-[40px] rounded-[4px]"
          style="background: transparent; border: 1px solid #f4493e"
          title="刪除"
          @click="onBatchDelete"
        >
          <span class="material-symbols-outlined text-[20px]" style="color: #f4493e">delete_outline</span>
        </button>
        <!-- Selection chip — 已選取項目：N -->
        <div
          class="flex items-center gap-[8px] h-[40px] px-[16px] rounded-[4px]"
          style="border: 1px solid #2e90fa"
        >
          <span class="text-[14px] font-medium whitespace-nowrap" style="color: #2e90fa">已選取項目：{{ selectedCount }}</span>
          <button class="flex items-center justify-center" title="取消全選" @click="clearSelection">
            <span class="material-symbols-outlined text-[16px]" style="color: #2e90fa">close</span>
          </button>
        </div>
      </div>
      <!-- ── Normal mode (no selection) ──────────────────────────────────── -->
      <div v-else class="flex items-center gap-[12px]">
        <!-- left1: Primary button "新增" — bg:#2877ee, h:40, px:16, py:10, rounded:4 -->
        <NuxtLink to="/pms/folio/new">
          <button
            class="h-[40px] px-[16px] py-[10px] rounded-[4px] text-[14px] font-medium leading-[1.5] tracking-[0.24px] whitespace-nowrap text-white"
            style="background: #2877ee; border: 1px solid #2877ee"
          >新增</button>
        </NuxtLink>
        <!-- Vertical divider line — 1px wide, h:40, #d7dae0 -->
        <div class="w-[1px] h-[40px]" style="background: #d7dae0"></div>
        <!-- left2: Outline button "匯入" — border:#7f8996, h:40, px:16, rounded:4 -->
        <button
          class="h-[40px] px-[16px] py-[10px] rounded-[4px] text-[14px] font-medium leading-[1.5] tracking-[0.24px] whitespace-nowrap text-[#0f172a]"
          style="background: transparent; border: 1px solid #7f8996"
        >匯入</button>
      </div>
      <!-- Right: ButtonSet — gap:12px -->
      <div class="flex items-center gap-[12px]">
        <!-- Dropdown: w:200, h:40, bg:#edf0f7, border-bottom:#7f8996, rounded-t:4 -->
        <ejs-dropdownlist
          :dataSource="modeOptions"
          placeholder="未選擇則為預設模式"
          :width="200"
          cssClass="toolbar-mode-dropdown"
        />
        <!-- Filter button: outline, h:40, px:16, icon:tune + "設定" -->
        <button
          class="flex items-center justify-center gap-[8px] h-[40px] px-[16px] py-[10px] rounded-[4px] text-[14px] font-medium leading-[1.5] tracking-[0.24px] whitespace-nowrap text-[#0f172a]"
          style="background: transparent; border: 1px solid #7f8996"
        >
          <span class="material-symbols-outlined text-[20px] text-[#3c4a5b]">tune</span>
          設定
        </button>
      </div>
    </div>

    <!-- ── searchEngine — Figma 965:47913 ──────────────────────────────── -->
    <!-- bg:white, border:1px #d7dae0, rounded:8px, p:16px, gap:20px -->
    <div
      class="flex gap-[20px] items-start p-[16px] rounded-[8px] shrink-0"
      style="background: white; border: 1px solid #d7dae0"
    >
      <!-- BasicInfo: flex-1, flex-wrap, gap:20px, min-w:300 per field -->
      <div class="flex flex-1 flex-wrap gap-[20px] items-start min-w-px">
        <!-- 訂房卡號 (TextBox) -->
        <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[300px]">
          <label class="text-[14px] leading-[1.3] text-[#3c4a5b] whitespace-nowrap">訂房卡號</label>
          <ejs-textbox placeholder="請輸入" />
        </div>
        <!-- 姓名 (TextBox) -->
        <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[300px]">
          <label class="text-[14px] leading-[1.3] text-[#3c4a5b] whitespace-nowrap">姓名</label>
          <ejs-textbox placeholder="請輸入" />
        </div>
        <!-- 訂房狀態 (Dropdown) -->
        <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[300px]">
          <label class="text-[14px] leading-[1.3] text-[#3c4a5b] whitespace-nowrap">訂房狀態</label>
          <ejs-dropdownlist :dataSource="statusOptions" placeholder="請選擇" />
        </div>
        <!-- 訂房公司 (TextBox) -->
        <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[300px]">
          <label class="text-[14px] leading-[1.3] text-[#3c4a5b] whitespace-nowrap">訂房公司</label>
          <ejs-textbox placeholder="請輸入" />
        </div>
        <!-- 入住日期 (DatePicker) -->
        <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[300px]">
          <label class="text-[14px] leading-[1.3] text-[#3c4a5b] whitespace-nowrap">入住日期</label>
          <ejs-daterangepicker placeholder="選擇日期範圍" />
        </div>
        <!-- 退房日期 (DatePicker) -->
        <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[300px]">
          <label class="text-[14px] leading-[1.3] text-[#3c4a5b] whitespace-nowrap">退房日期</label>
          <ejs-daterangepicker placeholder="選擇日期範圍" />
        </div>
      </div>
      <!-- buttonGroup: gap:8px, h:60, items-end -->
      <div class="flex gap-[8px] h-[60px] items-end shrink-0">
        <!-- Search: 40×40, bg:#2877ee, border:#2877ee, rounded:4 -->
        <button
          class="flex items-center justify-center w-[40px] h-[40px] rounded-[4px]"
          style="background: #2877ee; border: 1px solid #2877ee"
        >
          <span class="material-symbols-outlined text-[20px] text-white">search</span>
        </button>
        <!-- Clear: 40×40, bg:white, border:#2877ee, rounded:4 -->
        <button
          class="flex items-center justify-center w-[40px] h-[40px] rounded-[4px]"
          style="background: white; border: 1px solid #2877ee"
        >
          <span class="material-symbols-outlined text-[20px] text-[#3c4a5b]">delete_outline</span>
        </button>
      </div>
    </div>

    <!-- ── DataGrid — Figma 965:47925 ──────────────────────────────────── -->
    <!-- flex-1, header h:45, row h:50 -->
    <div class="flex-1 min-h-0 overflow-auto">
      <ejs-grid
        ref="gridRef"
        :dataSource="mockFolios"
        :allowPaging="true"
        :allowSorting="true"
        :pageSettings="{ pageSize: 20 }"
        :rowHeight="50"
        locale="zh-Hant"
        @rowSelected="onRowSelected"
        @rowDeselected="onRowDeselected"
      >
        <e-columns>
          <e-column type="checkbox" width="50" />
          <e-column field="folioNo"     headerText="訂房卡號" width="200" />
          <e-column field="status"      headerText="狀態"     width="200" :template="'statusTpl'" />
          <e-column field="guestName"   headerText="姓名"     width="200" />
          <e-column field="checkIn"     headerText="入住日期" width="200" />
          <e-column field="checkOut"    headerText="退房日期" width="200" />
          <e-column field="roomType"    headerText="房型"     width="200" />
          <e-column field="rooms"       headerText="間數"     width="200" textAlign="Right" />
          <e-column field="totalAmount" headerText="總金額"   width="200" textAlign="Right" />
          <e-column field="company"     headerText="訂房公司" width="200" />
          <e-column headerText="操作"   width="96"  textAlign="Center" :template="'actionTpl'" />
        </e-columns>

        <!-- 訂房狀態 badge — pill shape per Figma -->
        <template #statusTpl="{ data }">
          <span
            class="inline-flex items-center h-[24px] px-[8px] rounded-full text-[12px] font-medium leading-none"
            :class="statusBadgeClass(data.status)"
          >{{ data.status }}</span>
        </template>

        <!-- 操作欄：edit + delete icons — Figma 1632:79639 -->
        <template #actionTpl="{ data }">
          <div class="flex items-center justify-center gap-[4px]">
            <!-- Edit: always visible, primary blue icon -->
            <NuxtLink :to="`/pms/folio/${data.id}`"
              class="inline-flex items-center justify-center w-[40px] h-[40px] rounded-[24px]"
              title="編輯"
            >
              <span class="material-symbols-outlined text-[20px] text-[#2877ee]">edit</span>
            </NuxtLink>
            <!-- Delete: only for deletable statuses, danger red icon -->
            <button
              v-if="canDelete(data.status)"
              class="inline-flex items-center justify-center w-[40px] h-[40px] rounded-[24px] cursor-pointer"
              style="border: none; outline: none; background: transparent"
              title="刪除"
              @click="onDelete(data.id)"
            >
              <span class="material-symbols-outlined text-[20px] text-[#f4493e]">delete</span>
            </button>
          </div>
        </template>
      </ejs-grid>
    </div>

  </div>
</template>

<script setup lang="ts">
import { provide, ref, computed } from 'vue'
import { L10n } from '@syncfusion/ej2-base'
import {
  GridComponent as EjsGrid,
  ColumnsDirective as EColumns,
  ColumnDirective as EColumn,
  Page, Sort, Filter,
} from '@syncfusion/ej2-vue-grids'

// ── Syncfusion 中文化（Pager） ──────────────────────────────────────────────
L10n.load({
  'zh-Hant': {
    pager: {
      currentPageInfo: '{0} 至 {1} 頁 (共 {2} 筆)',
      totalItemsInfo: '(共 {0} 筆)',
      firstPageTooltip: '第一頁',
      lastPageTooltip: '最後一頁',
      nextPageTooltip: '下一頁',
      previousPageTooltip: '上一頁',
      nextPagerTooltip: '下一組頁碼',
      previousPagerTooltip: '上一組頁碼',
      pagerDropDown: '筆/每頁',
      pagerAllDropDown: '全部',
      All: '全部',
    },
  },
})
import { TextBoxComponent as EjsTextbox } from '@syncfusion/ej2-vue-inputs'
import { DropDownListComponent as EjsDropdownlist } from '@syncfusion/ej2-vue-dropdowns'
import { DateRangePickerComponent as EjsDaterangepicker } from '@syncfusion/ej2-vue-calendars'

definePageMeta({ layout: 'pms' })

provide('grid', [Page, Sort, Filter])

// ── Grid ref & selection state ─────────────────────────────────────────────
const gridRef = ref<InstanceType<typeof EjsGrid> | null>(null)
const selectedRows = ref<any[]>([])
const selectedCount = computed(() => selectedRows.value.length)

function onRowSelected() {
  const grid = gridRef.value?.ej2Instances
  if (grid) {
    selectedRows.value = grid.getSelectedRecords() as any[]
  }
}

function onRowDeselected() {
  const grid = gridRef.value?.ej2Instances
  if (grid) {
    // Use nextTick-style delay because deselected event fires before internal state updates
    setTimeout(() => {
      selectedRows.value = grid.getSelectedRecords() as any[]
    }, 0)
  }
}

function clearSelection() {
  const grid = gridRef.value?.ej2Instances
  if (grid) {
    grid.clearSelection()
    selectedRows.value = []
  }
}

// ── Batch action handlers ──────────────────────────────────────────────────
function onBatchConfirm() {
  // TODO: implement batch confirm (詢價/等待 → 正常)
  console.log('Batch confirm', selectedRows.value)
}

function onBatchExport() {
  // TODO: implement batch export (匯出)
  console.log('Batch export', selectedRows.value)
}

function onBatchCancel() {
  // TODO: implement batch cancel (正常 → 取消)
  console.log('Batch cancel', selectedRows.value)
}

function onBatchDelete() {
  // TODO: implement batch delete (刪除)
  console.log('Batch delete', selectedRows.value)
}

// ── Action handlers ────────────────────────────────────────────────────────
const deletableStatuses = ['草稿', '正常', '詢價', '等待']
function canDelete(status: string): boolean {
  return deletableStatuses.includes(status)
}

function onDelete(id: number) {
  // TODO: implement delete confirmation + API call
  console.log('Delete folio', id)
}

// ── Toolbar options ─────────────────────────────────────────────────────────
const modeOptions = ['一般模式', '進階模式']

// ── Search panel options ────────────────────────────────────────────────────
const statusOptions = ['草稿', '正常', '取消', '詢價', '等待', 'NO-SHOW', '已到', '退房']

// ── Status badge class map ──────────────────────────────────────────────────
function statusBadgeClass(status: string): string {
  const map: Record<string, string> = {
    '草稿':    'bg-badge-draft-bg    text-badge-draft-text',
    '正常':    'bg-badge-active-bg   text-badge-active-text',
    '取消':    'bg-badge-cancel-bg   text-badge-cancel-text',
    '詢價':    'bg-badge-quote-bg    text-badge-quote-text',
    '等待':    'bg-badge-wait-bg     text-badge-wait-text',
    'NO-SHOW': 'bg-badge-noshow-bg   text-badge-noshow-text',
    '已到':    'bg-badge-active-bg   text-badge-active-text',
    '退房':    'bg-badge-checkout-bg text-badge-checkout-text',
  }
  return map[status] ?? 'bg-neutral-100 text-neutral-700'
}

// ── Mock data ───────────────────────────────────────────────────────────────
const mockFolios = [
  { id: 1,  folioNo: 'R2026040001', status: '正常',    guestName: '王小明', checkIn: '2026/04/15', checkOut: '2026/04/17', roomType: '標準雙人房', rooms: 1, totalAmount: 'NT$ 7,200',  company: '直客' },
  { id: 2,  folioNo: 'R2026040002', status: '正常',    guestName: '李雅婷', checkIn: '2026/04/16', checkOut: '2026/04/20', roomType: '豪華套房',   rooms: 1, totalAmount: 'NT$ 28,000', company: '旅行社甲' },
  { id: 3,  folioNo: 'R2026040003', status: '詢價',    guestName: '張偉誠', checkIn: '2026/04/18', checkOut: '2026/04/19', roomType: '標準單人房', rooms: 2, totalAmount: 'NT$ 5,600',  company: '直客' },
  { id: 4,  folioNo: 'R2026040004', status: '等待',    guestName: '陳美玲', checkIn: '2026/04/20', checkOut: '2026/04/23', roomType: '標準雙人房', rooms: 3, totalAmount: 'NT$ 21,600', company: '企業客戶乙' },
  { id: 5,  folioNo: 'R2026040005', status: '草稿',    guestName: '林俊宏', checkIn: '2026/04/22', checkOut: '2026/04/24', roomType: '豪華雙人房', rooms: 1, totalAmount: 'NT$ 9,600',  company: '直客' },
  { id: 6,  folioNo: 'R2026040006', status: '取消',    guestName: '黃淑芬', checkIn: '2026/04/25', checkOut: '2026/04/27', roomType: '標準雙人房', rooms: 1, totalAmount: 'NT$ 7,200',  company: '旅行社甲' },
  { id: 7,  folioNo: 'R2026040007', status: 'NO-SHOW', guestName: '吳建志', checkIn: '2026/04/10', checkOut: '2026/04/12', roomType: '標準單人房', rooms: 1, totalAmount: 'NT$ 3,600',  company: '直客' },
  { id: 8,  folioNo: 'R2026040008', status: '已到',    guestName: '蔡宜蓁', checkIn: '2026/04/14', checkOut: '2026/04/16', roomType: '豪華套房',   rooms: 2, totalAmount: 'NT$ 56,000', company: '企業客戶乙' },
  { id: 9,  folioNo: 'R2026040009', status: '退房',    guestName: 'John Smith', checkIn: '2026/04/08', checkOut: '2026/04/11', roomType: '豪華雙人房', rooms: 1, totalAmount: 'NT$ 14,400', company: 'OTA 丙' },
  { id: 10, folioNo: 'R2026040010', status: '正常',    guestName: '鄭雅柔', checkIn: '2026/04/28', checkOut: '2026/05/02', roomType: '標準雙人房', rooms: 4, totalAmount: 'NT$ 57,600', company: '旅行社甲' },
]
</script>

<style scoped>
/* Toolbar mode dropdown — Figma: filled input, bg:#edf0f7, bottom-border only */
:deep(.toolbar-mode-dropdown.e-input-group) {
  background: #edf0f7;
  border: none;
  border-bottom: 1px solid #7f8996;
  border-radius: 4px 4px 0 0;
  height: 40px;
}
:deep(.toolbar-mode-dropdown.e-input-group::before),
:deep(.toolbar-mode-dropdown.e-input-group::after) {
  background: #2877ee;
}
:deep(.toolbar-mode-dropdown.e-input-group .e-input) {
  font-size: 14px;
  color: #0f172a;
  text-align: left;
  padding-left: 14px;
  line-height: 40px;
}
:deep(.toolbar-mode-dropdown.e-input-group .e-input::placeholder) {
  color: #67717e;
  font-size: 14px;
}
:deep(.toolbar-mode-dropdown.e-input-group:not(.e-input-focus):not(:hover)) {
  border-bottom: 1px solid #7f8996;
}
:deep(.toolbar-mode-dropdown.e-input-group .e-input-group-icon) {
  color: #3c4a5b;
  min-width: 32px;
  min-height: 32px;
}

/* ── searchEngine filled-input overrides — Figma 965:47913 ─────────────── */

/* Input container: filled bg, bottom-border only, rounded-top */
:deep(.search-field .e-input-group),
:deep(.search-field .e-input-group.e-control-wrapper) {
  background: #edf0f7;
  border: none;
  border-bottom: 1px solid #7f8996;
  border-radius: 4px 4px 0 0;
  height: 40px;
  box-shadow: none;
}

/* Remove Syncfusion default hover/active border overrides */
:deep(.search-field .e-input-group:not(.e-disabled):hover),
:deep(.search-field .e-input-group.e-control-wrapper:not(.e-disabled):hover) {
  border: none;
  border-bottom: 1px solid #7f8996;
}

/* Input text: 14px, left-aligned, pl:14px, color:#0f172a */
:deep(.search-field .e-input-group .e-input),
:deep(.search-field .e-input-group.e-control-wrapper .e-input) {
  font-size: 14px;
  color: #0f172a;
  text-align: left;
  padding-left: 14px;
  line-height: 40px;
  height: 100%;
}

/* Placeholder: color:#67717e */
:deep(.search-field .e-input-group .e-input::placeholder),
:deep(.search-field .e-input-group.e-control-wrapper .e-input::placeholder) {
  color: #67717e;
  font-size: 14px;
}

/* Icons (dropdown arrow, calendar): color:#3c4a5b, 32x32 area */
:deep(.search-field .e-input-group .e-input-group-icon),
:deep(.search-field .e-input-group.e-control-wrapper .e-input-group-icon) {
  color: #3c4a5b;
  min-width: 32px;
  min-height: 32px;
}

/* DateRangePicker icon button area */
:deep(.search-field .e-input-group .e-range-icon),
:deep(.search-field .e-input-group .e-date-range-icon) {
  color: #3c4a5b;
  min-width: 32px;
  min-height: 32px;
}

/* Focus state: bottom border accent line #2877ee via pseudo-elements */
:deep(.search-field .e-input-group.e-input-focus::before),
:deep(.search-field .e-input-group.e-input-focus::after),
:deep(.search-field .e-input-group.e-control-wrapper.e-input-focus::before),
:deep(.search-field .e-input-group.e-control-wrapper.e-input-focus::after) {
  background: #2877ee;
}

/* Focus state: keep filled bg, override any Syncfusion focus border changes */
:deep(.search-field .e-input-group.e-input-focus),
:deep(.search-field .e-input-group.e-control-wrapper.e-input-focus) {
  background: #edf0f7;
  border: none;
  border-bottom: 1px solid #2877ee;
  box-shadow: none;
}

/* Ensure no default bottom-border override on non-focus/non-hover state */
:deep(.search-field .e-input-group:not(.e-input-focus):not(:hover)),
:deep(.search-field .e-input-group.e-control-wrapper:not(.e-input-focus):not(:hover)) {
  border-bottom: 1px solid #7f8996;
}

/* ═══════════════════════════════════════════════════════════════════════════
   DataGrid — Figma 258:12661 (CollectList DataGrid)
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Grid container: flex column layout, fill height, border-top only ───── */
:deep(.e-grid) {
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
  border: none !important;
  border-top: 1px solid #d7dae0 !important;
  box-shadow: none !important;
}

/* ── Header row: h:45px, subtle blue-tinted gradient ─────────────────────── */
:deep(.e-grid .e-gridheader) {
  border-bottom: 1px solid #d7dae0;
}

:deep(.e-grid .e-gridheader .e-headercell) {
  height: 45px !important;
  background: linear-gradient(90deg, rgba(40, 119, 238, 0.05) 0%, rgba(40, 119, 238, 0.05) 100%),
              linear-gradient(90deg, #fff 0%, #fff 100%) !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  color: #3c4a5b !important;
  letter-spacing: 0.1px !important;
  line-height: 1.3 !important;
  padding: 0 8px !important;
}

:deep(.e-grid .e-gridheader .e-headercelldiv) {
  font-size: 14px !important;
  font-weight: 500 !important;
  color: #3c4a5b !important;
  letter-spacing: 0.1px !important;
  line-height: 1.3 !important;
}

/* Header checkbox cell: same gradient background */
:deep(.e-grid .e-gridheader .e-headercell.e-checkselectall) {
  background: linear-gradient(90deg, rgba(40, 119, 238, 0.05) 0%, rgba(40, 119, 238, 0.05) 100%),
              linear-gradient(90deg, #fff 0%, #fff 100%) !important;
}

/* ── Data rows: h:50px, white bg, bottom border ──────────────────────────── */
:deep(.e-grid .e-row) {
  height: 50px !important;
  background: #ffffff !important;
}

:deep(.e-grid .e-row:hover) {
  background: #f8fafc !important;
}

:deep(.e-grid .e-altrow) {
  background: #ffffff !important;
}

:deep(.e-grid .e-altrow:hover) {
  background: #f8fafc !important;
}

:deep(.e-grid .e-rowcell) {
  font-size: 14px !important;
  font-weight: 400 !important;
  color: #0f172a !important;
  line-height: 1.5 !important;
  letter-spacing: 0.24px !important;
  padding: 0 8px !important;
  border-color: #d7dae0 !important;
  border-width: 0 0 1px 0 !important;
}

/* Remove left/right borders on cells */
:deep(.e-grid .e-headercell) {
  border-color: #d7dae0 !important;
}

/* ── Checkbox column styling ─────────────────────────────────────────────── */
:deep(.e-grid .e-checkselectall),
:deep(.e-grid .e-checkselect) {
  width: 50px !important;
}

/* ── Pager: h:48px, border-top, transparent bg, sticky bottom ────────────── */
:deep(.e-grid .e-pager) {
  flex-shrink: 0 !important;
  height: 48px !important;
  border: none !important;
  border-top: 1px solid #d7dae0 !important;
  padding: 0 16px 0 8px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  background: transparent !important;
}

/* Page number buttons: 32×32, 14px, medium weight, dark text */
:deep(.e-grid .e-pager .e-numericitem) {
  font-size: 14px !important;
  font-weight: 500 !important;
  color: #0f172a !important;
  letter-spacing: 0.1px !important;
  min-width: 32px !important;
  width: 32px !important;
  height: 32px !important;
  line-height: 32px !important;
  border-radius: 4px !important;
  background: transparent !important;
  border: none !important;
}

/* Active page number: subtle blue tint, NOT solid blue */
:deep(.e-grid .e-pager .e-currentitem) {
  background: linear-gradient(90deg, rgba(40, 119, 238, 0.12) 0%, rgba(40, 119, 238, 0.12) 100%), #fff !important;
  color: #0f172a !important;
  border-radius: 4px !important;
  border: none !important;
}

/* Navigation icons (first/prev/next/last): 32×32, #3c4a5b, transparent bg */
:deep(.e-grid .e-pager .e-icon-first),
:deep(.e-grid .e-pager .e-icon-prev),
:deep(.e-grid .e-pager .e-icon-next),
:deep(.e-grid .e-pager .e-icon-last) {
  color: #3c4a5b !important;
}

:deep(.e-grid .e-pager .e-first),
:deep(.e-grid .e-pager .e-prev),
:deep(.e-grid .e-pager .e-next),
:deep(.e-grid .e-pager .e-last) {
  min-width: 32px !important;
  width: 32px !important;
  height: 32px !important;
  border-radius: 4px !important;
  background: transparent !important;
  border: none !important;
}

:deep(.e-grid .e-pager .e-icons) {
  color: #3c4a5b !important;
}

/* Pagination container (left section): flex row, px:8, gap:16, h:40 — Figma 474:19025 */
:deep(.e-grid .e-pager .e-pagercontainer) {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  padding: 0 8px !important;
  gap: 16px !important;
  height: 40px !important;
}

/* Right-side info text: "1 至 20 頁 (共 1000 筆)" — right:16px, 14px, #0f172a */
:deep(.e-grid .e-pager .e-parentmsgbar) {
  font-size: 14px !important;
  color: #0f172a !important;
  text-align: right !important;
  white-space: nowrap !important;
  padding-right: 0 !important;
}

/* Page size dropdown area: flex, gap:15px, items-center */
:deep(.e-grid .e-pager .e-pagerdropdown) {
  display: flex !important;
  align-items: center !important;
  gap: 15px !important;
  font-size: 14px !important;
  color: #0f172a !important;
}

/* Page size dropdown input: ~69px, bottom-border only */
:deep(.e-grid .e-pager .e-pagerdropdown .e-input-group),
:deep(.e-grid .e-pager .e-pagerdropdown .e-input-group.e-control-wrapper) {
  width: 69px !important;
  border: none !important;
  border-bottom: 1px solid #7f8996 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  height: 40px !important;
}
:deep(.e-grid .e-pager .e-pagerdropdown .e-input) {
  font-size: 14px !important;
  color: #0f172a !important;
  text-align: left !important;
  padding-left: 14px !important;
  line-height: 40px !important;
}

/* "筆/每頁" label text */
:deep(.e-grid .e-pager .e-pagecountmsg),
:deep(.e-grid .e-pager .e-constant) {
  font-size: 14px !important;
  color: #0f172a !important;
  white-space: nowrap !important;
}

/* ── Grid content area: flex-1 to push pager to bottom ──────────────────── */
:deep(.e-grid .e-gridcontent) {
  flex: 1 1 auto !important;
  overflow: auto !important;
  border: none !important;
}

:deep(.e-grid .e-table) {
  border: none !important;
}

/* ── Action column icon buttons ──────────────────────────────────────────── */
:deep(.e-grid .e-rowcell) .material-symbols-outlined {
  cursor: pointer;
  transition: opacity 0.15s ease;
}

:deep(.e-grid .e-rowcell) .material-symbols-outlined:hover {
  opacity: 0.7;
}

/* ── Checkbox selected state — primary blue #2877ee ────────────────────── */
:deep(.e-grid .e-checkbox-wrapper .e-frame.e-check) {
  background-color: #2877ee !important;
  border-color: #2877ee !important;
}
:deep(.e-grid .e-checkselectall .e-frame.e-check) {
  background-color: #2877ee !important;
  border-color: #2877ee !important;
}
:deep(.e-grid .e-checkbox-wrapper .e-frame) {
  border-color: #3c4a5b !important;
}
</style>
