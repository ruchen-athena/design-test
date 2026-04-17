# PMS 訂房卡模組 — 開發交付規格

> **Handoff Spec: PMS 訂房卡（Folio）模組**  
> 版型來源：Figma `ERP---財務作業模組` → 出納模組_收款作業（node 84:7675）  
> 設計稿分析方式：Figma Plugin API（figma-use skill）精確讀取  
> 業務來源：https://athena-bacchus.gitbook.io/docs/pms/reservation.md  
> 元件庫：github.com/Athena-Git-Group/syncfusion-playground (branch: et)  
> 技術棧：Vue 3 + Nuxt 4 + Tailwind CSS v4 + Syncfusion EJ2

---

## Overview

訂房卡（Folio）是 PMS 核心業務表單，管理飯店從「建立訂單」到「退房結帳」的完整住宿生命週期。版型沿用財務模組的 ERP 表單設計語言，分離業務內容後套用訂房卡業務邏輯。

**主要使用者**：訂房人員、前台人員  
**主要流程**：建立訂房 → 排房 → Check-in → 入住管理 → Check-out

---

## Layout

### 整體結構（1920px 設計基準）

```
┌─────────────────────────────────────── 1920px ───────────────────────────────────────┐
│  DsHeader                                                               h: 60px       │
│  padding: 8px 12px   gap: 16px   bg: #ffffff + bottom border                         │
├──────┬────────────────────────────────────────────────────────────────────────────────┤
│      │  Content Container   padding: 4px 12px 12px 12px   gap: 12px                  │
│  Nav │  ┌────────────────────────────────────────────────────── 1812px ─────────────┐│
│  72px│  │  Outer Container   padding: 32px (all sides)   bg: #ffffff                ││
│  bg  │  │  ┌──────────────────────────────────────────── 1748px ──────────────────┐ ││
│#001d │  │  │  Inner <container>   VERTICAL   gap: 24px                             │ ││
│5a    │  │  │                                                                        │ ││
│      │  │  │  ① Amount Summary Card       h: 138px                                │ ││
│      │  │  │  ② Smart Btn Row             h: 43px                                 │ ││
│      │  │  │  ③ Message Banner (警告)      h: 44px  (條件顯示)                    │ ││
│      │  │  │  ④ Form Section              VERTICAL  gap: 24px                     │ ││
│      │  │  │     └─ DsSectionHeader  h: 21px                                      │ ││
│      │  │  │     └─ BasicInfo Grid   h: 144px  HORIZONTAL  gap: 20px              │ ││
│      │  │  │     └─ (更多 section…)                                                │ ││
│      │  │  │  ⑤ Tab + Grid Section                                                │ ││
│      │  │  └────────────────────────────────────────────────────────────────────────┘ ││
│      │  ├────────────────────────────────────────────────────────────────────────────┤│
│      │  │  Bottom Button Bar   h: 72px   padding: 16px 32px   gap: 12px   bg:#fff  ││
│      │  └────────────────────────────────────────────────────────────────────────────┘│
└──────┴────────────────────────────────────────────────────────────────────────────────┘
```

### 尺寸快查表

| 區域 | 寬度 | 高度 | 備註 |
|------|------|------|------|
| 整體畫布 | 1920px | 1080px | |
| DsHeader | 1920px | 60px | padding: 8/12 |
| 側欄 DsNavigationA8 | 72px | 1004px | bg #001d5a |
| Outer Container | 1812px | 904px | padding: 32px all |
| Inner form (1748) | 1748px | auto | gap: 24px |
| Bottom Button Bar | 1812px | 72px | padding: 16/32 |
| TextBox component | 334px | 62px | label 18 + input 40 + helper 16 |
| Input field | fill | 40px | bg #edf0f7 (readonly) |
| DsSectionHeader | fill | 21px | |
| Amount Summary | fill | 138px | |

---

## Design Tokens（精確來自 Figma Plugin API）

> ✅ 以下色值均由 `use_figma` 直接讀取節點 `fills[0].color`，非估算值。

### 色彩 Token

| Token 建議名稱 | 說明 | 精確 Hex | Tailwind 近似值 |
|--------------|------|---------|----------------|
| `--ds-color-primary` | 主要藍、按鈕、連結、section header | `#2877ee` | `blue-500` / 自訂 |
| `--ds-color-link` | 超連結文字 | `#2e90fa` | `blue-400` |
| `--ds-color-sidebar` | 側欄導覽背景 | `#001d5a` | `blue-950` / 自訂 |
| `--ds-color-danger` | 刪除、危險操作 | `#f4493e` | `red-500` |
| `--ds-color-warning-bg` | 警告 banner 背景 | `#fff4d6` | `amber-50` |
| `--ds-color-warning-icon` | 警告圖示、badge | `#f79009` | `amber-500` |
| `--ds-color-warning-text` | 警告文字 | `#422a00` | `amber-950` |
| `--ds-color-input-readonly` | 唯讀/disabled 輸入框背景 | `#edf0f7` | `slate-100` |
| `--ds-color-helper` | 輸入框補充說明文字 | `#3c4a5b` | `slate-600` |
| `--ds-color-meta` | 程式版本、最次要資訊 | `#7f8996` | `slate-400` |
| `--ds-color-text-default` | 一般深色文字 | `#0f172a` | `slate-950` |
| `--ds-color-bg-surface` | 表單、卡片背景 | `#ffffff` | `white` |
| `--ds-color-chip-primary` | 關聯單據 chip 背景 | `#2877ee` | 同 primary |
| `--ds-color-chip-close` | 關閉/刪除 chip | `#f4493e` | 同 danger |

### 訂房卡狀態 Badge 顏色

> 從 CollectList 截圖觀察（三種標準狀態）：

| 狀態名稱 | 文字顏色 | 背景顏色 | Tailwind |
|---------|---------|---------|---------|
| 草稿 (Draft) | `#374151` | `#f3f4f6` | `bg-gray-100 text-gray-700` |
| 正常 / 已核准 | `#065f46` | `#d1fae5` | `bg-emerald-100 text-emerald-800` |
| 已駁回 / 取消 | `#991b1b` | `#fee2e2` | `bg-red-100 text-red-800` |
| 詢價 (Quote) | `#92400e` | `#fef3c7` | `bg-amber-100 text-amber-800` |
| 等待 (Wait) | `#3730a3` | `#e0e7ff` | `bg-indigo-100 text-indigo-800` |
| NO-SHOW | `#374151` | `#f3f4f6` | `bg-gray-100 text-gray-700` |
| 退房 | `#1e40af` | `#dbeafe` | `bg-blue-100 text-blue-800` |

### Spacing Token

| Token | 值 | 用途 |
|-------|---|------|
| `--ds-space-xs` | 4px | TextBox 內部 gap（label-input-helper） |
| `--ds-space-sm` | 8px | 圖示間距、小型 gap |
| `--ds-space-md` | 12px | 按鈕間 gap、Content Container gap |
| `--ds-space-lg` | 16px | Button padding x、Block2 padding |
| `--ds-space-xl` | 20px | BasicInfo form grid gap（欄位間） |
| `--ds-space-2xl` | 24px | Form section gap（section 之間） |
| `--ds-space-3xl` | 32px | Outer Container padding（頁面邊距） |

### Typography Token

| Token | size | weight | color | 用途 |
|-------|------|--------|-------|------|
| `--ds-text-section-title` | 14px | 700 | `#2877ee` | DsSectionHeader 標題 |
| `--ds-text-btn` | 14px | 500 | 依按鈕型別 | 所有按鈕文字 |
| `--ds-text-body` | 14px | 400 | `#0f172a` | 一般表單內文 |
| `--ds-text-link` | 14px | 500 | `#2e90fa` | 超連結 |
| `--ds-text-helper` | 12px | 400 | `#3c4a5b` | 輸入框補充說明 |
| `--ds-text-meta` | 12px | 400 | `#7f8996` | programID、版本號 |

---

## 版型 × 業務對應表

| 財務稿元件/區塊 | 財務業務含義 | 訂房卡業務含義 | 狀態 |
|--------------|-----------|-------------|------|
| DsHeader | 應用程式標頭 | 訂房卡標頭（麵包屑、導航） | ✅ 直接沿用 |
| DsNavigationA8 | 財務功能側欄 | PMS 功能側欄（訂房/住客/帳務）| ✅ 直接沿用結構 |
| Amount Summary Card | 收款總額 + 沖抵總額 + 進度 | 總金額 + 應收訂金 + 已付訂金 + 訂房狀態 Stepper | ✅ 沿用，替換欄位 |
| SmartBtn Row (CardBtn Group) | 銷售訂單/應收單關聯 | 訂房相關聯單（確認書/登記卡/傳票）| ✅ 沿用，替換 labels |
| DsSectionHeader (藍色左邊框) | 「交易資訊」、「補充說明」 | 「基本資訊」、「訂房政策」、「費用統計」等 | ✅ 沿用 component |
| BasicInfo Form Grid (gap-20) | 收款單號/日期/科目 | 訂房卡號/入住日期/房型/房價 | ✅ 沿用 layout |
| TextBox (334×62) | 一般欄位輸入 | 訂房欄位輸入 | ✅ 直接套用 |
| Message Banner (#fff4d6) | 「尚未儲存的變更」 | 「尚未儲存的變更」 | ✅ 直接沿用 |
| Tab (現金/匯款/信用卡/支票/其他) | 收款方式分類 | 住客/Notes/服務項目/排房/交辦…等 | ✅ Tab 結構沿用 |
| Data Grid（Tab 下方） | 收款明細列表 | 住宿明細 / 服務項目 / 住客清單 | ✅ 沿用 |
| Bottom Button Bar | 刪除/更多操作/儲存後新增/儲存草稿/核准 | 刪除/更多操作/儲存後新增/儲存草稿/確認 | ✅ 近乎 1:1 |
| Pagination (1/10) | Grid 分頁 | 訂房明細分頁 | ✅ 直接沿用 |
| DsProgramID footer | 版本資訊 | 版本資訊 | ✅ 直接沿用 |
| 會計科目 / 傳票科目欄位 | 財務會計分錄 | — | ❌ 捨棄 |
| 稅務設定 / 發票資訊 | 稅務合規 | — | ❌ 捨棄 |
| 核銷匹配邏輯 | 應收核銷 | — | ❌ 捨棄 |
| — | — | 排房作業（房號選擇畫面）| ⚠️ 需自行設計 |
| — | — | Pre-Check in 發送流程 | ⚠️ 需自行設計 |
| — | — | 訂房確認書列印/發送 | ⚠️ 需自行設計 |
| — | — | 線上繳款單 | ⚠️ 需自行設計 |
| — | — | 簡訊 / Email 發送 | ⚠️ 需自行設計 |
| — | — | 住客歷史 AutoComplete | ⚠️ 需自行設計 |

---

## 元件規格

### DsSectionHeader

```html
<!-- 5px 藍色左邊框 + 標題文字 -->
<div class="flex items-center gap-0">
  <div style="width:5px; height:21px; background:#2877ee"></div>
  <span style="font-size:14px; font-weight:700; color:#2877ee; margin-left:8px">
    基本資訊
  </span>
</div>
```

| 屬性 | 值 |
|------|---|
| 左邊框寬 | 5px |
| 左邊框高 | 21px |
| 左邊框色 | `#2877ee` |
| 文字 | 14px / 700 / `#2877ee` |

### TextBox 欄位元件

```
┌──────────────────────────────── 334px ─────────────┐
│ Label row                              gap-2   18px │  ← 必填星號 + label
├────────────────────────────────────────────────────┤
│ Input container                               40px  │  ← border, bg #fff (filled) / #edf0f7 (readonly)
├────────────────────────────────────────────────────┤
│ Helper text                            gap-4   16px │  ← 12px / #3c4a5b
└────────────────────────────────────────────────────┘
Total: 62px (gap-4 between each)
```

| 狀態 | 背景 | 邊框 |
|------|------|------|
| Default (空) | `#ffffff` | `border-gray-300` |
| Filled (有值) | `#edf0f7` | `border-gray-300` |
| Readonly | `#edf0f7` | none |
| Error | `#ffffff` | `border-red-500` |
| Focus | `#ffffff` | `border-[#2877ee]` ring |

### Amount Summary Card（頂部統計區）

**PMS 版本對應：**
```
Block1 (88px, padding 16/20, gap 8):
  ├─ [balance area]
  │    ├─ Label: "總金額"   Value: NT$ xxx
  │    ├─ Label: "應收訂金" Value: NT$ xxx
  │    └─ Label: "已付訂金" Value: NT$ xxx (readonly chip)
  ├─ [Stepper 240×56]
  │    Step 1: 基礎 (active #2877ee)
  │    Step 2: 已確認
  │    Step 3: 入住/退房
  └─ [Status Chip h-36, 對應訂房狀態]

Block2 (50px, padding 16, gap 10):
  └─ Link: "查看明細 ↓"  (14px / 500 / #2e90fa)
```

### Bottom Button Bar（底部操作列）

| 按鈕 | 寬度 | 背景 | 文字色 | 用途 |
|------|------|------|-------|------|
| 刪除 | 61px | `#ffffff` | `#f4493e` | 刪除訂房卡（已存檔才顯示） |
| 更多操作 ▼ | 123px | `#ffffff` | `#2877ee` | Dropdown（確認書/簡訊/Email…） |
| 儲存後新增 | 80px | `#ffffff` | `#2877ee` | outline btn |
| 儲存草稿 | 74px | `#ffffff` | `#2877ee` | outline btn → PMS 改為「儲存」 |
| 核准 | 61px | `#2877ee` | `#ffffff` | primary solid → PMS 改為「確認」 |

所有按鈕：h-40, padding 10/16, font 14px/500

### Message Banner（警告訊息列）

| 屬性 | 值 |
|------|---|
| 高度 | 44px |
| 背景 | `#fff4d6` |
| 圖示色 | `#f79009` |
| 標題文字 | 14px / 500 / `#422a00` |
| 顯示時機 | 表單有未儲存變更時 |

### DsHeader（頂部導覽列）

| 屬性 | 值 |
|------|---|
| 高度 | 60px |
| 背景 | `#ffffff` |
| Padding | 8px 12px |
| Gap | 16px |
| 內容 | 左：breadcrumb / 上一頁箭頭 + 歷史紀錄；右：通知鈴鐺 + 設定 + 使用者頭像 |

### DsNavigationA8（側欄）

| 屬性 | 值 |
|------|---|
| 寬度 | 72px |
| 背景 | `#001d5a` |
| 圖示 | Material Symbols，白色，icon-only |
| PMS 選單項 | 首頁、訂房、住客、帳務、報表 |

---

## 可複用元件清單（Syncfusion EJ2）

### 核心表單元件

| 元件 | Syncfusion Import | 關鍵 Props | PMS 用途 |
|------|-----------------|-----------|---------|
| `EjsTextbox` | `@syncfusion/ej2-vue-inputs` | `placeholder`, `floatLabelType`, `value`, `readonly` | 訂房卡號(readonly)、姓名、備註、網訂編號 |
| `EjsNumericTextbox` | `@syncfusion/ej2-vue-inputs` | `value`, `min`, `max`, `format`, `decimals`, `readonly` | 間數、天數、人數、金額統計 |
| `EjsTextarea` | `@syncfusion/ej2-vue-inputs` | `value`, `rows`, `maxlength` | 訂房備註（1000字元上限） |
| `EjsDropdownlist` | `@syncfusion/ej2-vue-dropdowns` | `dataSource`, `fields`, `value`, `placeholder`, `enabled` | 狀態、訂房類別、房價代號、計價/使用房型、市場類別 |
| `EjsCombobox` | `@syncfusion/ej2-vue-dropdowns` | `dataSource`, `fields`, `allowCustom`, `value` | 訂房公司（可輸入新值）、業務員 |
| `EjsAutocomplete` | `@syncfusion/ej2-vue-dropdowns` | `dataSource`, `fields`, `value`, `minLength` | 住客姓名（搜尋住客歷史） |
| `EjsDatepicker` | `@syncfusion/ej2-vue-calendars` | `value`, `format`, `min`, `max`, `enabled` | 入住日期、退房日期 |
| `EjsCheckbox` | `@syncfusion/ej2-vue-buttons` | `checked`, `label`, `disabled` | Fixed Order、印房租、使用公帳號 |

### 導覽 / 結構元件

| 元件 | Syncfusion Import | 關鍵 Props | PMS 用途 |
|------|-----------------|-----------|---------|
| `EjsTab` | `@syncfusion/ej2-vue-navigations` | `headerPlacement='Top'`, `selectedItem` | 住客/Notes/服務/排房/交辦 頁籤 |
| `EjsToolbar` | `@syncfusion/ej2-vue-navigations` | `items[]` | 搜尋列操作工具 |
| `EjsSplitter` | `@syncfusion/ej2-vue-layouts` | `paneSettings`, `orientation` | 左列表 + 右表單分割 |

### 資料展示元件

| 元件 | Syncfusion Import | 關鍵 Props | PMS 用途 |
|------|-----------------|-----------|---------|
| `EjsGrid` | `@syncfusion/ej2-vue-grids` | `dataSource`, `allowPaging`, `allowSorting`, `editSettings` | 住宿明細、住客清單、服務項目清單 |
| `EjsDialog` | `@syncfusion/ej2-vue-popups` | `v-model:visible`, `header`, `width`, `isModal` | 複製訂房卡、排房確認、異動紀錄、住客查詢 |
| `EjsToast` | `@syncfusion/ej2-vue-notifications` | `content`, `cssClass`, `timeOut`, `position` | 儲存成功/失敗回饋 |

---

## 功能清單（依業務區塊分組）

### F1. 訂房卡主表單操作

| # | 功能 | 觸發元素 | 說明 |
|---|------|---------|------|
| F1-1 | 新增訂房卡 | 側欄「新增」或上方按鈕 | 清空表單，存檔產生卡號 |
| F1-2 | 儲存草稿 → 儲存 | Bottom Bar「儲存」 | 有必填欄位即可存 |
| F1-3 | 儲存後新增 | Bottom Bar「儲存後新增」 | 存檔後立即清空表單 |
| F1-4 | 複製訂房卡 | 更多操作 → 複製 | Dialog 輸入新卡號後複製 |
| F1-5 | 刪除訂房卡 | Bottom Bar「刪除」 | 僅已存檔且非入住狀態可刪 |
| F1-6 | 異動紀錄 | 更多操作 → 異動紀錄 | Modal 顯示完整欄位變更歷史 |
| F1-7 | 狀態切換 | Amount Summary Card Chip | 正常/取消/詢價/等待（規則見狀態機） |
| F1-8 | 確認作業 | Bottom Bar「確認」 | 產生確認號碼，更新 Stepper 至步驟 2 |

### F2. 住宿明細管理

| # | 功能 | 說明 |
|---|------|------|
| F2-1 | 新增明細列 | Grid + 按鈕新增住宿紀錄 |
| F2-2 | 編輯明細 | 雙擊或 inline edit |
| F2-3 | 刪除明細 | 選取後刪除，庫存還原 |
| F2-4 | 金額自動計算 | 房租 + 服務費 + 其他費用 → 總金額 |
| F2-5 | 排房作業 | 開排房頁面，選取房號 |

### F3. 住客管理（Tab 頁籤）

| # | 功能 |
|---|------|
| F3-1 | AutoComplete 搜尋既有住客，或建立新住客 |
| F3-2 | 選取後自動帶入姓名、稱謂等欄位 |
| F3-3 | 新增 Profile Note（最多 1000 字元） |

### F4. 附加服務 Tab 群

交辦 · 提醒 · 接送 · 服務項目 · 備品 · 失物 · 預授權 · 團體名單

### F5. 溝通功能（更多操作 Dropdown）

訂房確認書 · 簡訊 · Email · Pre-Check in · 線上繳款單

### F6. 旅客登記卡

列印 / 檢視平板簽名 R 卡

### F7. 財務

分帳規則設定 · 應收訂金追蹤

---

## 欄位規格

### 區塊 A：基本資訊

| 欄位 | 元件 | 必填 | 唯讀 | 說明 |
|------|------|:----:|:----:|------|
| 訂房卡號 | `EjsTextbox` | — | ✓ | 系統自動產生，存檔後顯示 |
| 狀態 | `EjsDropdownlist` | ✓ | — | 正常/取消/詢價/等待 |
| 姓名 | `EjsAutocomplete` | ✓ | — | 搜尋住客歷史 |
| 稱謂 | `EjsDropdownlist` | — | — | 住客歷史自動帶入 |
| 住客狀態 | `EjsDropdownlist` | — | — | 一般/VIP/黑名單 |
| VIP 等級 | `EjsDropdownlist` | — | — | 狀態為 VIP 時才啟用 |
| 訂房名稱/團號 | `EjsTextbox` | — | — | max 255 字元 |
| 訂房公司 | `EjsCombobox` | — | — | 可輸入新值 |
| 業務員 | `EjsDropdownlist` | — | — | |
| 窗口資料來源 | `EjsDropdownlist` | — | — | P/C/O |

### 區塊 B：訂房政策

| 欄位 | 元件 | 必填 | 唯讀 | 說明 |
|------|------|:----:|:----:|------|
| Fixed Order | `EjsCheckbox` | — | — | 金額鎖定 |
| 印房租 | `EjsCheckbox` | — | — | |
| 訂房類別 | `EjsDropdownlist` | — | — | |
| 訂房備註 | `EjsTextarea` | — | — | max 1000 字元 |
| 使用公帳號 | `EjsCheckbox` | — | — | |
| 關聯單號 | `EjsTextbox` | — | — | |

### 區塊 C：住宿資訊（明細欄位）

| 欄位 | 元件 | 必填 | 唯讀 | 說明 |
|------|------|:----:|:----:|------|
| 入住日期 | `EjsDatepicker` | ✓ | — | 連動天數與退房日 |
| 天數 | `EjsNumericTextbox` | ✓ | — | min: 1 |
| 退房日期 | `EjsDatepicker` | ✓ | — | 可回算天數 |
| 房價代號 | `EjsDropdownlist` | ✓ | — | Rate Code |
| 計價房型 | `EjsDropdownlist` | ✓ | — | |
| 使用房型 | `EjsDropdownlist` | ✓ | — | |
| 間數 | `EjsNumericTextbox` | ✓ | — | min: 1 |

### 區塊 D：費用統計（唯讀，自動計算）

| 欄位 | 元件 | 唯讀 | 說明 |
|------|------|:----:|------|
| 房租 | `EjsNumericTextbox` | ✓ | |
| 服務費 | `EjsNumericTextbox` | ✓ | |
| 其他費用 | `EjsNumericTextbox` | ✓ | |
| 總金額 | `EjsNumericTextbox` | ✓ | |
| 應收訂金 | `EjsNumericTextbox` | — | 可手動輸入 |
| 已付訂金 | `EjsNumericTextbox` | ✓ | |
| 佣金% | `EjsNumericTextbox` | — | |

### 區塊 E：其他資訊

| 欄位 | 元件 | 必填 | 唯讀 | 說明 |
|------|------|:----:|:----:|------|
| 大人 | `EjsNumericTextbox` | — | — | |
| 小孩 | `EjsNumericTextbox` | — | — | |
| 總間數 | `EjsNumericTextbox` | — | ✓ | 自動統計 |
| 市場類別 | `EjsDropdownlist` | — | — | |
| 訂房來源 | `EjsDropdownlist` | — | — | |
| 網訂編號 | `EjsTextbox` | — | — | |
| Pre-C/I | `EjsCheckbox` | — | ✓ | 系統自動標記 |
| 訂單資訊 | `EjsTextbox` | — | ✓ | 確認/取消時間 |

---

## States and Interactions

### 元件互動狀態

| 元件 | 狀態 | 視覺變化 |
|------|------|---------|
| TextBox | Default | white bg, gray border |
| TextBox | Focus | white bg, `#2877ee` border + ring |
| TextBox | Filled | `#edf0f7` bg |
| TextBox | Readonly | `#edf0f7` bg, no border, no cursor |
| TextBox | Error | white bg, `#f4493e` border, helper 變紅 |
| Button (primary) | Default | `#2877ee` bg, white text |
| Button (primary) | Hover | `#1d68e0` bg (darken 8%) |
| Button (primary) | Loading | spinner + disabled |
| Button (outline) | Default | white bg, `#2877ee` text, `#2877ee` border |
| Button (danger) | Default | white bg, `#f4493e` text |
| Status Chip | 依狀態 | 見設計 Token 表 |
| Message Banner | 有未存變更 | 顯示 #fff4d6 banner |
| Message Banner | 無未存變更 | 隱藏（不佔空間） |
| Bottom Bar「確認」| 未存檔 | disabled 灰色 |
| Bottom Bar「刪除」| 新建（未存） | hidden |

### 訂房卡狀態機

```
詢價 ──[手動確認]──→ 正常（觸發庫存扣除）
等待 ──[自動/手動]──→ 正常（等庫存釋放後）
正常 ──[手動取消]──→ 取消（庫存即時還原，記錄取消時間/人員）
取消 ──[手動恢復]──→ 正常（重新扣除庫存）
正常 ──[Check-in]──→ 已到（僅系統操作，不可手動）
已到 ──[Check-out]──→ 退房（僅 Check-out / 夜核觸發）
正常/已到 ──[手動]──→ NO-SHOW
```

### 明細列狀態規則

| 狀態 | 可編輯 | 可刪除 | 庫存 |
|------|:-----:|:-----:|------|
| 正常 | ✓ | ✓ | 扣除 |
| 詢價 | ✓ | ✓ | 無 |
| 等待 | ✓ | ✓ | 無 |
| 取消 | — | — | 還原 |
| 已到 | — | — | 扣除 |
| 退房 | — | — | 扣除 |

### 列表視圖類型（Data Grid）

> Figma node: `1:163881`（列表互動行為）

視圖：列表式，依使用場景分三種型態：

| 型態 | 說明 | 典型使用場景 |
|------|------|-------------|
| **檢視導向列表**（View-first Table） | 以「先查看原先內容、再決定是否編輯」為核心。 | 住宿明細、訂單列表 |
| **編輯導向列表**（Edit-first Table） | 使用者操作此列表的目的為修改資料。 | 設定值、費率表 |
| **行內編輯導向列表**（Inline-Edit-first Table） | 適用於跳進單頁的固定值，直接在列表行內修改資料。 | 服務項目、備品清單 |

### 列表列互動狀態規格

#### 共用狀態（三種型態皆適用）

| 狀態 | 觸發方式 | 視覺變化 |
|------|---------|---------|
| **初始** | — | 正常列表呈現；含 checkbox 欄、資料欄、操作 icon 欄 |
| **Hover** | 滑鼠移入列 | 左側出現箭頭游標指示器；列背景 hover highlight |
| **Selected**（點擊 Checkbox Cell） | 點擊 Checkbox Cell | Checkbox 勾選；列背景切換為選取色；頂部出現批量操作列「選取 N 筆」 |
| **Focus**（行單擊） | 單擊列（非 Checkbox 區） | 列取得 focus 高亮；左側箭頭指示器顯示 |

#### 型態專屬狀態

| 型態 | 狀態 | 觸發方式 | 行為結果 |
|------|------|---------|---------|
| View-first | **Navigate to Detail (View Mode)** | 點擊 Icon Button 或行雙擊 | 導航至詳情頁（唯讀模式開啟） |
| View-first | **Navigate to Customer Detail (View Mode)** | 單擊特定 Cell（如姓名連結） | 導航至住客詳情頁（唯讀模式） |
| Edit-first | **Navigate to Detail (Edit Mode)** | 點擊 Icon Button 或行雙擊 | 導航至詳情頁（直接以編輯模式開啟） |
| Edit-first | **Navigate to Customer Detail (View Mode)** | 單擊特定 Cell（如姓名連結） | 導航至住客詳情頁（唯讀模式） |
| Inline-Edit-first | **Inline-Edit** | 點擊 Icon Button 或行雙擊 | 行內直接啟動編輯；該列欄位轉為可輸入狀態 |

---

## Responsive Behavior

> 設計稿為 1920px。PMS 主要使用情境為桌面，需支援到 1280px。

| Breakpoint | Layout 調整 |
|------------|-----------|
| ≥ 1920px | 全寬設計稿呈現 |
| 1440px | 表單欄位寬度 auto，維持 5 欄 |
| 1280px | 表單縮為 4 欄，TextBox 自適應 |
| < 1280px | 不要求支援（ERP 桌面工具） |

---

## Edge Cases

| 場景 | 處理方式 |
|------|---------|
| 新建未存檔 | Bottom Bar「刪除」隱藏；Message Banner 顯示 |
| 訂房卡已入住（已到/退房） | 欄位全部唯讀；刪除/儲存 disabled |
| 住客姓名搜尋無結果 | AutoComplete 顯示「建立新住客」選項 |
| 入住日期 > 退房日期 | 退房日期 error state，helper 顯示錯誤 |
| 應收訂金 > 總金額 | NumericTextbox 顯示 warning helper |
| 狀態為取消 | 所有欄位唯讀，僅允許「恢復為正常」操作 |
| Grid 無資料 | 顯示「無任何資料」empty state（置中文字） |
| 表單 Loading | 各 TextBox 顯示 Skeleton 佔位 |
| 存檔 API 失敗 | Toast 顯示錯誤訊息（top-center, 5s） |
| 存檔成功 | Toast 顯示成功（top-center, 3s），更新訂房卡號 |

---

## Animation / Motion

| 元件 | Trigger | 動畫 | 時長 | Easing |
|------|---------|------|------|--------|
| Message Banner | 出現/消失 | slide-down / fade | 200ms | ease-out |
| Dialog | 開啟 | scale + fade in | 200ms | ease-out |
| Dialog | 關閉 | scale + fade out | 150ms | ease-in |
| Toast | 進入 | slide from top | 300ms | ease-out |
| Toast | 離開 | fade out | 200ms | ease-in |
| Tab 切換 | 點擊 | underline slide | 200ms | ease-in-out |
| Status Chip | 狀態改變 | color transition | 150ms | ease |

---

## Accessibility Notes

- `DsSectionHeader` 的 `<span>` 需加 `role="heading" aria-level="3"`
- 每個 TextBox 的 `<input>` 需有 `id`，label 用 `for` 關聯
- 必填欄位在 label 前加 `aria-required="true"` 及視覺星號 `*`
- Status Chip 顏色不能是唯一識別方式，需含文字標籤
- 底部操作按鈕的 disabled 狀態需加 `aria-disabled="true"`
- Dialog 開啟時 focus 需移至 Dialog 內部；關閉時 focus 返回觸發元素
- Grid 需支援鍵盤導覽（Tab / Arrow keys）

---

## 附：工作流程最佳實踐（補充說明）

> 本節記錄本次規格生成過程中確認的最佳工作順序，供後續任務參考。

### 正確的 Skill 調用順序

```
1. /figma:figma-use        ← MANDATORY PREREQUISITE（讀取此規範後才能正確使用 Figma MCP）
2. /design:design-handoff  ← 套用 Figma URL，產生 design-handoff 格式規格
3. WebFetch GitBook        ← 讀取業務說明書
4. git clone component repo ← 讀取元件庫
5. 整合 → 輸出 spec.md
```

### 關鍵注意事項

| 問題 | 原因 | 解法 |
|------|------|------|
| `use_figma` 無輸出 | 使用了 `console.log()` 而非 `return` | 永遠用 `return` 回傳資料 |
| `setCurrentPageAsync` timeout | 一次性載入整頁太大 | 先用 `figma.root.children` 取 childCount，再按需讀取子節點 |
| 色值不準確 | 截圖視覺估算 | 用 `fills[0].color` 精確讀取（r/g/b 需 ×255 轉 hex） |
| 跳過 figma-use skill | 沒有先詢問 AgentSkills | 凡涉及 Figma 操作前必須先 invoke figma:figma-use |

---

*本文件由 figma-use skill + design-handoff skill 規範 + GitHub Repo 分析 + GitBook 說明書整合產出。*  
*Design token 色值來自 Figma Plugin API 精確讀取（非截圖估算）。*
