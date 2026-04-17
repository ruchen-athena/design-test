<template>
  <!--
    PMS 訂房卡 — 詳情 / 編輯頁（靜態 UI）
    路由：/pms/folio/:id（新增時 id = 'new'）
    版型參考：財務作業收款模組 CollectForm
  -->

  <!-- Outer wrapper: full height, flex column -->
  <div class="flex flex-col h-full overflow-hidden">

    <!-- ═══ Scrollable area ═══════════════════════════════════════════════ -->
    <div class="flex-1 overflow-y-auto flex flex-col gap-[24px] pb-[24px]">

      <!-- ① Amount Summary Card — h:138px ────────────────────────────── -->
      <div
        class="rounded-[8px] shrink-0"
        style="
          border: 1px solid #d7dae0;
          background: linear-gradient(90deg, rgba(40,119,238,0.05) 0%, rgba(40,119,238,0.05) 100%),
                      linear-gradient(90deg, #fff 0%, #fff 100%);
        "
      >
        <!-- Block1: h:88px -->
        <div class="flex items-center justify-between" style="height: 88px; padding: 16px 20px; gap: 8px">
          <!-- Left: balance summary -->
          <div class="flex items-center gap-[24px]">
            <!-- 總金額 -->
            <div class="flex flex-col gap-[4px]">
              <span class="text-[12px] font-medium" style="color: #3c4a5b">總金額</span>
              <span class="text-[20px] font-bold" style="color: #0f172a">NT$ {{ folio.totalAmount.toLocaleString() }}</span>
            </div>
            <!-- Divider -->
            <div class="w-[1px] h-[40px]" style="background: #d7dae0"></div>
            <!-- 應收訂金 -->
            <div class="flex flex-col gap-[4px]">
              <span class="text-[12px] font-medium" style="color: #3c4a5b">應收訂金</span>
              <span class="text-[18px] font-semibold" style="color: #0f172a">NT$ {{ folio.depositRequired.toLocaleString() }}</span>
            </div>
            <!-- Divider -->
            <div class="w-[1px] h-[40px]" style="background: #d7dae0"></div>
            <!-- 已付訂金 -->
            <div class="flex flex-col gap-[4px]">
              <span class="text-[12px] font-medium" style="color: #3c4a5b">已付訂金</span>
              <span class="text-[18px] font-semibold" style="color: #2877ee">NT$ {{ folio.depositPaid.toLocaleString() }}</span>
            </div>
          </div>

          <!-- Right: Stepper + Status Chip -->
          <div class="flex items-center gap-[16px]">
            <!-- Mini stepper (3 steps) — custom HTML since Syncfusion Stepper is heavy -->
            <div class="flex items-center gap-[8px]">
              <!-- Step 1: 基礎 (completed) -->
              <div class="flex items-center gap-[4px]">
                <div
                  class="flex items-center justify-center w-[24px] h-[24px] rounded-full"
                  style="background: #2877ee"
                >
                  <span class="material-symbols-outlined text-[14px] text-white">check</span>
                </div>
                <span class="text-[12px] font-medium" style="color: #2877ee">基礎</span>
              </div>
              <!-- Connector -->
              <div class="w-[24px] h-[2px]" style="background: #2877ee"></div>
              <!-- Step 2: 已確認 (active) -->
              <div class="flex items-center gap-[4px]">
                <div
                  class="flex items-center justify-center w-[24px] h-[24px] rounded-full"
                  style="background: #2877ee"
                >
                  <span class="text-[12px] font-bold text-white">2</span>
                </div>
                <span class="text-[12px] font-medium" style="color: #2877ee">已確認</span>
              </div>
              <!-- Connector -->
              <div class="w-[24px] h-[2px]" style="background: #d7dae0"></div>
              <!-- Step 3: 入住退房 (pending) -->
              <div class="flex items-center gap-[4px]">
                <div
                  class="flex items-center justify-center w-[24px] h-[24px] rounded-full"
                  style="background: #d7dae0"
                >
                  <span class="text-[12px] font-bold" style="color: #7f8996">3</span>
                </div>
                <span class="text-[12px] font-medium" style="color: #7f8996">入住退房</span>
              </div>
            </div>

            <!-- Status Chip -->
            <span
              class="inline-flex items-center h-[28px] px-[12px] rounded-full text-[13px] font-semibold"
              style="background: #e8f5e9; color: #2e7d32"
            >{{ folio.status }}</span>
          </div>
        </div>

        <!-- Block2: h:50px — link -->
        <div class="flex items-center" style="height: 50px; padding: 0 16px; gap: 10px; border-top: 1px solid #d7dae0">
          <button
            class="flex items-center gap-[4px] bg-transparent border-none cursor-pointer"
            style="color: #2e90fa; font-size: 14px; font-weight: 500"
          >
            查看明細
            <span class="material-symbols-outlined text-[16px]" style="color: #2e90fa">keyboard_arrow_down</span>
          </button>
        </div>
      </div>

      <!-- ② Smart Btn Row — h:43px ──────────────────────────────────── -->
      <div class="flex items-center gap-[12px] shrink-0" style="height: 43px">
        <button
          class="flex items-center gap-[6px] h-[36px] px-[14px] rounded-[4px] bg-transparent cursor-pointer"
          style="border: 1px solid #2877ee; color: #2877ee; font-size: 14px; font-weight: 500"
        >
          訂房確認書
          <span class="material-symbols-outlined text-[16px]" style="color: #2877ee">open_in_new</span>
        </button>
        <button
          class="flex items-center gap-[6px] h-[36px] px-[14px] rounded-[4px] bg-transparent cursor-pointer"
          style="border: 1px solid #2877ee; color: #2877ee; font-size: 14px; font-weight: 500"
        >
          旅客登記卡
          <span class="material-symbols-outlined text-[16px]" style="color: #2877ee">open_in_new</span>
        </button>
      </div>

      <!-- ③ Message Banner — h:44px ─────────────────────────────────── -->
      <div
        class="flex items-center shrink-0 rounded-[4px]"
        style="height: 44px; background: #fff4d6; padding: 0 16px; gap: 8px"
      >
        <span class="material-symbols-outlined text-[20px]" style="color: #f79009">warning</span>
        <span style="font-size: 14px; font-weight: 500; color: #422a00">尚未儲存的變更</span>
      </div>

      <!-- ④ Form Sections — gap:24px ────────────────────────────────── -->

      <!-- ── Section A: 基本資訊 ──────────────────────────────────────── -->
      <div class="flex flex-col gap-[16px]">
        <div class="flex items-center">
          <div style="width: 5px; height: 21px; background: #2877ee; border-radius: 2px"></div>
          <span style="font-size: 14px; font-weight: 700; color: #2877ee; margin-left: 8px">基本資訊</span>
        </div>
        <div class="flex flex-wrap gap-[20px]">
          <!-- 訂房卡號 (readonly) -->
          <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
            <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">訂房卡號</label>
            <ejs-textbox :value="folio.folioNo" :readonly="true" placeholder="" />
          </div>
          <!-- 狀態 -->
          <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
            <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">狀態 <span style="color: #f4493e">*</span></label>
            <ejs-dropdownlist :dataSource="statusOptions" :value="folio.status" placeholder="請選擇" />
          </div>
          <!-- 姓名 -->
          <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
            <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">姓名 <span style="color: #f4493e">*</span></label>
            <ejs-autocomplete :value="folio.guestName" :dataSource="guestOptions" placeholder="搜尋住客" :minLength="2" />
          </div>
          <!-- 稱謂 -->
          <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
            <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">稱謂</label>
            <ejs-dropdownlist :dataSource="titleOptions" :value="folio.title" placeholder="請選擇" />
          </div>
          <!-- 住客狀態 -->
          <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
            <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">住客狀態</label>
            <ejs-dropdownlist :dataSource="guestStatusOptions" :value="folio.guestStatus" placeholder="請選擇" />
          </div>
          <!-- VIP等級 -->
          <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
            <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">VIP等級</label>
            <ejs-dropdownlist :dataSource="vipLevelOptions" :value="folio.vipLevel" placeholder="請選擇" />
          </div>
          <!-- 訂房名稱 -->
          <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
            <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">訂房名稱</label>
            <ejs-textbox :value="folio.bookingName" placeholder="請輸入" />
          </div>
          <!-- 訂房公司 -->
          <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
            <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">訂房公司</label>
            <ejs-combobox :value="folio.company" :dataSource="companyOptions" :allowCustom="true" placeholder="請輸入或選擇" />
          </div>
          <!-- 業務員 -->
          <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
            <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">業務員</label>
            <ejs-dropdownlist :dataSource="salespersonOptions" :value="folio.salesperson" placeholder="請選擇" />
          </div>
          <!-- 窗口資料來源 -->
          <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
            <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">窗口資料來源</label>
            <ejs-dropdownlist :dataSource="sourceOptions" :value="folio.source" placeholder="請選擇" />
          </div>
        </div>
      </div>

      <!-- ── Section B: 訂房政策 ──────────────────────────────────────── -->
      <div class="flex flex-col gap-[16px]">
        <div class="flex items-center">
          <div style="width: 5px; height: 21px; background: #2877ee; border-radius: 2px"></div>
          <span style="font-size: 14px; font-weight: 700; color: #2877ee; margin-left: 8px">訂房政策</span>
        </div>
        <div class="flex flex-col gap-[16px]">
          <!-- Row 1: 訂房類別 + 關聯單號 -->
          <div class="flex flex-wrap gap-[20px]">
            <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
              <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">訂房類別</label>
              <ejs-dropdownlist :dataSource="bookingTypeOptions" :value="folio.bookingType" placeholder="請選擇" />
            </div>
            <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
              <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">關聯單號</label>
              <ejs-textbox :value="folio.relatedNo" placeholder="請輸入" />
            </div>
          </div>
          <!-- Row 2: 3 checkboxes inline -->
          <div class="flex items-center gap-[24px] h-[40px]">
            <ejs-checkbox label="Fixed Order" :checked="folio.fixedOrder" />
            <ejs-checkbox label="印房租" :checked="folio.printRent" />
            <ejs-checkbox label="使用公帳號" :checked="folio.usePublicAccount" />
          </div>
          <!-- Row 3: 訂房備註 full-width textarea -->
          <div class="search-field flex flex-col gap-[4px] w-full">
            <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">訂房備註</label>
            <ejs-textbox :value="folio.bookingNote" placeholder="請輸入備註（最多 1000 字元）" :multiline="true" :htmlAttributes="{ rows: 3, maxlength: 1000 }" />
          </div>
        </div>
      </div>

      <!-- ── Section C: 住宿資訊 ──────────────────────────────────────── -->
      <div class="flex flex-col gap-[16px]">
        <div class="flex items-center">
          <div style="width: 5px; height: 21px; background: #2877ee; border-radius: 2px"></div>
          <span style="font-size: 14px; font-weight: 700; color: #2877ee; margin-left: 8px">住宿資訊</span>
        </div>
        <div class="flex flex-wrap gap-[20px]">
          <!-- 入住日期 -->
          <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
            <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">入住日期 <span style="color: #f4493e">*</span></label>
            <ejs-datepicker :value="folio.checkIn" placeholder="選擇日期" format="yyyy/MM/dd" />
          </div>
          <!-- 天數 -->
          <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
            <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">天數 <span style="color: #f4493e">*</span></label>
            <ejs-numerictextbox :value="folio.nights" :min="1" format="n0" placeholder="" />
          </div>
          <!-- 退房日期 -->
          <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
            <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">退房日期 <span style="color: #f4493e">*</span></label>
            <ejs-datepicker :value="folio.checkOut" placeholder="選擇日期" format="yyyy/MM/dd" />
          </div>
          <!-- 房價代號 -->
          <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
            <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">房價代號 <span style="color: #f4493e">*</span></label>
            <ejs-dropdownlist :dataSource="rateCodeOptions" :value="folio.rateCode" placeholder="請選擇" />
          </div>
          <!-- 計價房型 -->
          <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
            <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">計價房型 <span style="color: #f4493e">*</span></label>
            <ejs-dropdownlist :dataSource="roomTypeOptions" :value="folio.chargeRoomType" placeholder="請選擇" />
          </div>
          <!-- 使用房型 -->
          <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
            <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">使用房型 <span style="color: #f4493e">*</span></label>
            <ejs-dropdownlist :dataSource="roomTypeOptions" :value="folio.useRoomType" placeholder="請選擇" />
          </div>
          <!-- 間數 -->
          <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
            <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">間數 <span style="color: #f4493e">*</span></label>
            <ejs-numerictextbox :value="folio.rooms" :min="1" format="n0" placeholder="" />
          </div>
        </div>
      </div>

      <!-- ── Section D: 費用統計 ──────────────────────────────────────── -->
      <div class="flex flex-col gap-[16px]">
        <div class="flex items-center">
          <div style="width: 5px; height: 21px; background: #2877ee; border-radius: 2px"></div>
          <span style="font-size: 14px; font-weight: 700; color: #2877ee; margin-left: 8px">費用統計</span>
        </div>
        <div class="flex flex-col gap-[16px]">
          <!-- 子群 1: 自動計算值 -->
          <div class="flex flex-wrap gap-[20px]">
            <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
              <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">房租</label>
              <ejs-numerictextbox :value="folio.roomRent" :readonly="true" format="n0" placeholder="" />
            </div>
            <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
              <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">服務費</label>
              <ejs-numerictextbox :value="folio.serviceFee" :readonly="true" format="n0" placeholder="" />
            </div>
            <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
              <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">其他費用</label>
              <ejs-numerictextbox :value="folio.otherFee" :readonly="true" format="n0" placeholder="" />
            </div>
            <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
              <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">總金額</label>
              <ejs-numerictextbox :value="folio.totalAmount" :readonly="true" format="n0" placeholder="" />
            </div>
          </div>
          <!-- 分隔線 + 子群標題 -->
          <div class="flex items-center gap-[8px]">
            <span class="text-[12px] font-medium whitespace-nowrap" style="color: #7f8996">訂金與佣金設定</span>
            <div class="flex-1 h-px" style="background: #d7dae0"></div>
          </div>
          <!-- 子群 2: 手動設定 -->
          <div class="flex flex-wrap gap-[20px]">
            <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
              <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">應收訂金</label>
              <ejs-numerictextbox :value="folio.depositRequired" format="n0" placeholder="" />
            </div>
            <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
              <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">已付訂金</label>
              <ejs-numerictextbox :value="folio.depositPaid" :readonly="true" format="n0" placeholder="" />
            </div>
            <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
              <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">佣金%</label>
              <ejs-numerictextbox :value="folio.commission" :min="0" :max="100" format="n0" placeholder="" />
            </div>
          </div>
        </div>
      </div>

      <!-- ── Section E: 其他資訊 ──────────────────────────────────────── -->
      <div class="flex flex-col gap-[16px]">
        <div class="flex items-center">
          <div style="width: 5px; height: 21px; background: #2877ee; border-radius: 2px"></div>
          <span style="font-size: 14px; font-weight: 700; color: #2877ee; margin-left: 8px">其他資訊</span>
        </div>
        <div class="flex flex-col gap-[16px]">
          <!-- 子群 1: 住客組成 -->
          <div class="flex flex-wrap gap-[20px]">
            <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
              <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">大人</label>
              <ejs-numerictextbox :value="folio.adults" :min="0" format="n0" placeholder="" />
            </div>
            <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
              <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">小孩</label>
              <ejs-numerictextbox :value="folio.children" :min="0" format="n0" placeholder="" />
            </div>
            <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
              <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">總間數</label>
              <ejs-numerictextbox :value="folio.totalRooms" :readonly="true" format="n0" placeholder="" />
            </div>
          </div>
          <!-- 分隔線 + 子群標題 -->
          <div class="flex items-center gap-[8px]">
            <span class="text-[12px] font-medium whitespace-nowrap" style="color: #7f8996">訂房來源</span>
            <div class="flex-1 h-px" style="background: #d7dae0"></div>
          </div>
          <!-- 子群 2: 訂房來源 -->
          <div class="flex flex-wrap gap-[20px]">
            <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
              <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">市場類別</label>
              <ejs-dropdownlist :dataSource="marketCategoryOptions" :value="folio.marketCategory" placeholder="請選擇" />
            </div>
            <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
              <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">訂房來源</label>
              <ejs-dropdownlist :dataSource="bookingSourceOptions" :value="folio.bookingSource" placeholder="請選擇" />
            </div>
            <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
              <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">網訂編號</label>
              <ejs-textbox :value="folio.onlineBookingNo" placeholder="請輸入" />
            </div>
          </div>
          <!-- 分隔線 + 子群標題 -->
          <div class="flex items-center gap-[8px]">
            <span class="text-[12px] font-medium whitespace-nowrap" style="color: #7f8996">系統資訊</span>
            <div class="flex-1 h-px" style="background: #d7dae0"></div>
          </div>
          <!-- 子群 3: 系統資訊 (readonly) -->
          <div class="flex flex-wrap gap-[20px]">
            <div class="flex items-center h-[40px]">
              <ejs-checkbox label="Pre-C/I" :checked="folio.preCheckin" :disabled="true" />
            </div>
            <div class="search-field flex flex-col gap-[4px] flex-1 min-w-[150px]">
              <label class="text-[14px] leading-[1.3] whitespace-nowrap" style="color: #3c4a5b">訂單資訊</label>
              <ejs-textbox :value="folio.orderInfo" :readonly="true" placeholder="" />
            </div>
          </div>
        </div>
      </div>

      <!-- ⑤ Tab + Grid Section ─────────────────────────────────────── -->
      <div class="shrink-0">
        <ejs-tab ref="tabRef" heightAdjustMode="Content">
          <e-tabitems>
            <e-tabitem :header="{ text: '住客' }" :content="'guestTabContent'" />
            <e-tabitem :header="{ text: 'Notes' }" :content="'notesTabContent'" />
            <e-tabitem :header="{ text: '服務項目' }" :content="'serviceTabContent'" />
            <e-tabitem :header="{ text: '排房' }" :content="'roomAssignTabContent'" />
            <e-tabitem :header="{ text: '交辦' }" :content="'taskTabContent'" />
            <e-tabitem :header="{ text: '提醒' }" :content="'reminderTabContent'" />
            <e-tabitem :header="{ text: '接送' }" :content="'transferTabContent'" />
            <e-tabitem :header="{ text: '備品' }" :content="'amenityTabContent'" />
            <e-tabitem :header="{ text: '失物' }" :content="'lostFoundTabContent'" />
            <e-tabitem :header="{ text: '預授權' }" :content="'preAuthTabContent'" />
          </e-tabitems>
          <!-- Tab content templates (Vue 3 named slots) -->
          <template #guestTabContent>
            <div class="p-[16px]">
              <ejs-grid :dataSource="guestGridData" :allowPaging="false" :rowHeight="40">
                <e-columns>
                  <e-column field="name" headerText="姓名" width="150" />
                  <e-column field="title" headerText="稱謂" width="100" />
                  <e-column field="idType" headerText="證件類型" width="120" />
                  <e-column field="idNo" headerText="證件號碼" width="180" />
                  <e-column field="phone" headerText="電話" width="150" />
                  <e-column field="email" headerText="Email" width="200" />
                </e-columns>
              </ejs-grid>
            </div>
          </template>
          <template #notesTabContent>
            <div class="p-[16px] text-[14px]" style="color: #3c4a5b">暫無備註資料</div>
          </template>
          <template #serviceTabContent>
            <div class="p-[16px] text-[14px]" style="color: #3c4a5b">暫無服務項目資料</div>
          </template>
          <template #roomAssignTabContent>
            <div class="p-[16px] text-[14px]" style="color: #3c4a5b">暫無排房資料</div>
          </template>
          <template #taskTabContent>
            <div class="p-[16px] text-[14px]" style="color: #3c4a5b">暫無交辦事項</div>
          </template>
          <template #reminderTabContent>
            <div class="p-[16px] text-[14px]" style="color: #3c4a5b">暫無提醒資料</div>
          </template>
          <template #transferTabContent>
            <div class="p-[16px] text-[14px]" style="color: #3c4a5b">暫無接送行程</div>
          </template>
          <template #amenityTabContent>
            <div class="p-[16px] text-[14px]" style="color: #3c4a5b">暫無備品資料</div>
          </template>
          <template #lostFoundTabContent>
            <div class="p-[16px] text-[14px]" style="color: #3c4a5b">暫無失物登記</div>
          </template>
          <template #preAuthTabContent>
            <div class="p-[16px] text-[14px]" style="color: #3c4a5b">暫無預授權紀錄</div>
          </template>
        </ejs-tab>
      </div>

    </div><!-- end scrollable -->

    <!-- ═══ Bottom Button Bar — fixed at bottom ══════════════════════════ -->
    <div
      class="flex items-center justify-between shrink-0"
      style="height: 72px; padding: 16px 32px; background: white; border-top: 1px solid #d7dae0"
    >
      <!-- Left: pagination -->
      <div class="flex items-center gap-[8px]">
        <button
          class="flex items-center justify-center w-[32px] h-[32px] rounded-[4px] bg-transparent cursor-pointer"
          style="border: 1px solid #d7dae0"
        >
          <span class="material-symbols-outlined text-[18px]" style="color: #3c4a5b">chevron_left</span>
        </button>
        <span class="text-[14px] font-medium" style="color: #0f172a">1 / 10</span>
        <button
          class="flex items-center justify-center w-[32px] h-[32px] rounded-[4px] bg-transparent cursor-pointer"
          style="border: 1px solid #d7dae0"
        >
          <span class="material-symbols-outlined text-[18px]" style="color: #3c4a5b">chevron_right</span>
        </button>
      </div>

      <!-- Right: action buttons -->
      <div class="flex items-center gap-[12px]">
        <!-- 刪除 -->
        <button
          class="h-[40px] px-[16px] rounded-[4px] text-[14px] font-medium cursor-pointer bg-transparent"
          style="border: 1px solid #f4493e; color: #f4493e"
        >刪除</button>
        <!-- 更多操作 -->
        <button
          class="flex items-center gap-[4px] h-[40px] px-[16px] rounded-[4px] text-[14px] font-medium cursor-pointer bg-transparent"
          style="border: 1px solid #7f8996; color: #2877ee"
        >
          更多操作
          <span class="material-symbols-outlined text-[16px]" style="color: #2877ee">keyboard_arrow_down</span>
        </button>
        <!-- 儲存後新增 -->
        <button
          class="h-[40px] px-[16px] rounded-[4px] text-[14px] font-medium cursor-pointer bg-transparent"
          style="border: 1px solid #7f8996; color: #2877ee"
        >儲存後新增</button>
        <!-- 儲存 -->
        <button
          class="h-[40px] px-[16px] rounded-[4px] text-[14px] font-medium cursor-pointer bg-transparent"
          style="border: 1px solid #7f8996; color: #2877ee"
        >儲存</button>
        <!-- 確認 (primary) -->
        <button
          class="h-[40px] px-[16px] rounded-[4px] text-[14px] font-medium cursor-pointer text-white"
          style="background: #2877ee; border: 1px solid #2877ee"
        >確認</button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import {
  TabComponent as EjsTab,
  TabItemDirective as ETabitem,
  TabItemsDirective as ETabitems,
} from '@syncfusion/ej2-vue-navigations'
import {
  GridComponent as EjsGrid,
  ColumnsDirective as EColumns,
  ColumnDirective as EColumn,
  Page, Sort,
} from '@syncfusion/ej2-vue-grids'
import { TextBoxComponent as EjsTextbox } from '@syncfusion/ej2-vue-inputs'
import { NumericTextBoxComponent as EjsNumerictextbox } from '@syncfusion/ej2-vue-inputs'
import { DropDownListComponent as EjsDropdownlist, AutoCompleteComponent as EjsAutocomplete, ComboBoxComponent as EjsCombobox } from '@syncfusion/ej2-vue-dropdowns'
import { DatePickerComponent as EjsDatepicker } from '@syncfusion/ej2-vue-calendars'
import { CheckBoxComponent as EjsCheckbox } from '@syncfusion/ej2-vue-buttons'

definePageMeta({
  layout: 'pms',
})

const route = useRoute()
const isNew = computed(() => route.params.id === 'new')

provide('grid', [Page, Sort])

// ── Refs ────────────────────────────────────────────────────────────────────
const tabRef = ref<InstanceType<typeof EjsTab> | null>(null)

// ── Mock dropdown data ──────────────────────────────────────────────────────
const guestOptions = ['王小明', '李雅婷', '張偉誠', '陳美玲', '林俊宏', 'John Smith']
const companyOptions = ['直客', '旅行社甲', '企業客戶乙', 'OTA 丙']

// ── Mock data ───────────────────────────────────────────────────────────────
const folio = {
  folioNo: 'R2026040001',
  status: '正常',
  guestName: '王小明',
  title: '先生',
  guestStatus: '一般',
  vipLevel: '',
  bookingName: '',
  company: '直客',
  salesperson: '張業務',
  source: 'P',
  fixedOrder: false,
  printRent: true,
  bookingType: '一般訂房',
  bookingNote: '',
  usePublicAccount: false,
  relatedNo: '',
  checkIn: '2026/04/15',
  nights: 2,
  checkOut: '2026/04/17',
  rateCode: 'RACK',
  chargeRoomType: '標準雙人房',
  useRoomType: '標準雙人房',
  rooms: 1,
  roomRent: 7200,
  serviceFee: 720,
  otherFee: 0,
  totalAmount: 7920,
  depositRequired: 5000,
  depositPaid: 5000,
  commission: 0,
  adults: 2,
  children: 0,
  totalRooms: 1,
  marketCategory: '散客',
  bookingSource: '電話',
  onlineBookingNo: '',
  preCheckin: false,
  orderInfo: '2026/04/10 確認',
}

// ── Dropdown options ────────────────────────────────────────────────────────
const statusOptions = ['草稿', '正常', '取消', '詢價', '等待', 'NO-SHOW', '已到', '退房']
const titleOptions = ['先生', '小姐', '女士', 'Mr.', 'Ms.', 'Mrs.']
const guestStatusOptions = ['一般', 'VIP', '黑名單']
const vipLevelOptions = ['', 'VIP1', 'VIP2', 'VIP3']
const salespersonOptions = ['張業務', '李業務', '陳業務']
const sourceOptions = ['P', 'W', 'E', 'T']
const bookingTypeOptions = ['一般訂房', '團體訂房', '公司合約', '長住']
const rateCodeOptions = ['RACK', 'CORP', 'GOV', 'PKG']
const roomTypeOptions = ['標準單人房', '標準雙人房', '豪華雙人房', '豪華套房']
const marketCategoryOptions = ['散客', '團體', '企業', '政府', 'OTA']
const bookingSourceOptions = ['電話', '網路', 'OTA', '旅行社', '直接入住']

// ── Guest grid mock data ────────────────────────────────────────────────────
const guestGridData = [
  {
    name: '王小明',
    title: '先生',
    idType: '身分證',
    idNo: 'A123456789',
    phone: '0912-345-678',
    email: 'wang.ming@email.com',
  },
]
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════════════════════════
   Filled-input styling — search-field class (matches list page pattern)
   ═══════════════════════════════════════════════════════════════════════════ */

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

/* Icons (dropdown arrow, calendar, numeric): color:#3c4a5b, 32x32 area */
:deep(.search-field .e-input-group .e-input-group-icon),
:deep(.search-field .e-input-group.e-control-wrapper .e-input-group-icon) {
  color: #3c4a5b;
  min-width: 32px;
  min-height: 32px;
}

/* DatePicker icon */
:deep(.search-field .e-input-group .e-date-icon) {
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

/* Focus state: keep filled bg, override Syncfusion focus border changes */
:deep(.search-field .e-input-group.e-input-focus),
:deep(.search-field .e-input-group.e-control-wrapper.e-input-focus) {
  background: #edf0f7;
  border: none;
  border-bottom: 1px solid #2877ee;
  box-shadow: none;
}

/* Non-focus/non-hover: ensure consistent bottom border */
:deep(.search-field .e-input-group:not(.e-input-focus):not(:hover)),
:deep(.search-field .e-input-group.e-control-wrapper:not(.e-input-focus):not(:hover)) {
  border-bottom: 1px solid #7f8996;
}

/* Readonly inputs: slightly dimmed */
:deep(.search-field .e-input-group .e-input[readonly]),
:deep(.search-field .e-input-group.e-control-wrapper .e-input[readonly]) {
  color: #7f8996;
}

/* ═══════════════════════════════════════════════════════════════════════════
   NumericTextBox spin buttons: hide for cleaner form look
   ═══════════════════════════════════════════════════════════════════════════ */
:deep(.search-field .e-numeric .e-spin-up),
:deep(.search-field .e-numeric .e-spin-down) {
  /* keep functional but visually minimal */
}

/* ═══════════════════════════════════════════════════════════════════════════
   Checkbox — Syncfusion material theme overrides
   ═══════════════════════════════════════════════════════════════════════════ */
:deep(.e-checkbox-wrapper .e-label) {
  font-size: 14px;
  color: #3c4a5b;
}

:deep(.e-checkbox-wrapper .e-frame.e-check) {
  background-color: #2877ee;
  border-color: #2877ee;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Tab — Syncfusion styling
   ═══════════════════════════════════════════════════════════════════════════ */
:deep(.e-tab .e-tab-header .e-toolbar-item .e-tab-text) {
  font-size: 14px;
  color: #3c4a5b;
  font-weight: 500;
}

:deep(.e-tab .e-tab-header .e-toolbar-item.e-active .e-tab-text) {
  color: #2877ee;
  font-weight: 600;
}

:deep(.e-tab .e-tab-header .e-indicator) {
  background: #2877ee;
}

:deep(.e-tab .e-tab-header) {
  border-bottom: 1px solid #d7dae0;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Grid inside tabs — minimal styling
   ═══════════════════════════════════════════════════════════════════════════ */
:deep(.e-tab .e-grid) {
  border: none !important;
  box-shadow: none !important;
}

:deep(.e-tab .e-grid .e-gridheader .e-headercell) {
  height: 40px !important;
  background: linear-gradient(90deg, rgba(40, 119, 238, 0.05) 0%, rgba(40, 119, 238, 0.05) 100%),
              linear-gradient(90deg, #fff 0%, #fff 100%) !important;
  font-size: 13px !important;
  font-weight: 500 !important;
  color: #3c4a5b !important;
  padding: 0 8px !important;
}

:deep(.e-tab .e-grid .e-rowcell) {
  font-size: 13px !important;
  color: #0f172a !important;
  padding: 0 8px !important;
}
</style>
