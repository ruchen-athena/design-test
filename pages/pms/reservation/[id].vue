<template>
  <!--
    PMS 訂房 — 表單頁（新增 / 編輯）
    路由：
      /pms/reservation/new  → 新增
      /pms/reservation/:id  → 編輯
  -->
  <div class="flex flex-col gap-[24px] h-full">

    <!-- Toolbar -->
    <div class="flex items-center justify-between shrink-0">
      <div class="flex items-center gap-[8px]">
        <NuxtLink to="/pms/reservation"
          class="flex items-center justify-center w-[40px] h-[40px] rounded hover:bg-neutral-100"
          title="返回"
        >
          <span class="material-symbols-outlined text-[20px] text-[#3c4a5b]">arrow_back</span>
        </NuxtLink>
        <h1 class="text-[18px] font-medium text-[#0f172a]">
          {{ isNew ? '新增訂房' : `編輯訂房 #${route.params.id}` }}
        </h1>
      </div>
      <div class="flex items-center gap-[12px]">
        <button
          class="h-[40px] px-[16px] rounded-[4px] text-[14px] text-[#0f172a]"
          style="background: white; border: 1px solid #7f8996"
          @click="onCancel"
        >取消</button>
        <button
          class="h-[40px] px-[16px] rounded-[4px] text-[14px] text-white"
          style="background: #2877ee; border: 1px solid #2877ee"
          @click="onSubmit"
        >{{ isNew ? '建立' : '儲存' }}</button>
      </div>
    </div>

    <!-- Form -->
    <div
      class="flex-1 min-h-0 overflow-auto p-[24px] rounded-[8px]"
      style="background: white; border: 1px solid #d7dae0"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-[20px] max-w-[960px]">
        <div class="flex flex-col gap-[4px]">
          <label class="text-[14px] text-[#3c4a5b]">訂房卡號</label>
          <input v-model="form.folioNo" :disabled="!isNew"
            class="h-[40px] px-[12px] border border-[#d7dae0] rounded text-[14px] disabled:bg-neutral-100"
          />
        </div>
        <div class="flex flex-col gap-[4px]">
          <label class="text-[14px] text-[#3c4a5b]">狀態</label>
          <select v-model="form.status"
            class="h-[40px] px-[12px] border border-[#d7dae0] rounded text-[14px]"
          >
            <option v-for="s in statusOptions" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
        <div class="flex flex-col gap-[4px]">
          <label class="text-[14px] text-[#3c4a5b]">姓名</label>
          <input v-model="form.guestName"
            class="h-[40px] px-[12px] border border-[#d7dae0] rounded text-[14px]"
          />
        </div>
        <div class="flex flex-col gap-[4px]">
          <label class="text-[14px] text-[#3c4a5b]">訂房公司</label>
          <input v-model="form.company"
            class="h-[40px] px-[12px] border border-[#d7dae0] rounded text-[14px]"
          />
        </div>
        <div class="flex flex-col gap-[4px]">
          <label class="text-[14px] text-[#3c4a5b]">入住日期</label>
          <input v-model="form.checkIn" type="date"
            class="h-[40px] px-[12px] border border-[#d7dae0] rounded text-[14px]"
          />
        </div>
        <div class="flex flex-col gap-[4px]">
          <label class="text-[14px] text-[#3c4a5b]">退房日期</label>
          <input v-model="form.checkOut" type="date"
            class="h-[40px] px-[12px] border border-[#d7dae0] rounded text-[14px]"
          />
        </div>
        <div class="flex flex-col gap-[4px]">
          <label class="text-[14px] text-[#3c4a5b]">房型</label>
          <input v-model="form.roomType"
            class="h-[40px] px-[12px] border border-[#d7dae0] rounded text-[14px]"
          />
        </div>
        <div class="flex flex-col gap-[4px]">
          <label class="text-[14px] text-[#3c4a5b]">間數</label>
          <input v-model.number="form.rooms" type="number" min="1"
            class="h-[40px] px-[12px] border border-[#d7dae0] rounded text-[14px]"
          />
        </div>
        <div class="flex flex-col gap-[4px]">
          <label class="text-[14px] text-[#3c4a5b]">總金額 (TWD)</label>
          <input v-model.number="form.totalAmount" type="number" min="0"
            class="h-[40px] px-[12px] border border-[#d7dae0] rounded text-[14px]"
          />
        </div>
        <div class="flex flex-col gap-[4px] md:col-span-2">
          <label class="text-[14px] text-[#3c4a5b]">備註</label>
          <textarea v-model="form.note" rows="3"
            class="px-[12px] py-[8px] border border-[#d7dae0] rounded text-[14px]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Reservation, ReservationStatus } from '~/types'

definePageMeta({ layout: 'pms' })

const route = useRoute()
const router = useRouter()
const logger = useLogger()

const isNew = computed(() => route.params.id === 'new')

const statusOptions: ReservationStatus[] = [
  '草稿', '正常', '取消', '詢價', '等待', 'NO-SHOW', '已到', '退房',
]

const form = ref<Partial<Reservation>>({
  folioNo: isNew.value ? '' : `R${route.params.id}`,
  status: '草稿',
  guestName: '',
  company: '',
  checkIn: '',
  checkOut: '',
  roomType: '',
  rooms: 1,
  totalAmount: 0,
  note: '',
})

function onCancel() {
  logger.info('reservation.form_cancel', { isNew: isNew.value })
  router.push('/pms/reservation')
}

function onSubmit() {
  const event = isNew.value ? 'reservation.create_submit' : 'reservation.update_submit'
  logger.info(event, { form: form.value })
  // TODO: 呼叫 API
  router.push('/pms/reservation')
}
</script>
