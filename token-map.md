# PMS Design Token Map

> 來源：`pms-folio-spec.md`（Figma node `84:7675` / `1:163881`）
> 用途：Figma token → Tailwind class → CSS variable → 實際值 快速查對表

---

## Color Tokens

| Figma Token | Tailwind Class | CSS Variable | 實際值 | 用途 |
|-------------|---------------|-------------|--------|------|
| `--ds-color-primary` | `text-ds-primary` / `bg-ds-primary` / `border-ds-primary` | `var(--ds-color-primary)` | `#2877ee` | 主要藍、按鈕、連結、section header |
| `--ds-color-link` | `text-ds-link` | `var(--ds-color-link)` | `#2e90fa` | 超連結文字 |
| `--ds-color-sidebar` | `bg-ds-sidebar` | `var(--ds-color-sidebar)` | `#001d5a` | 側欄導覽背景 |
| `--ds-color-danger` | `text-ds-danger` / `border-ds-danger` | `var(--ds-color-danger)` | `#f4493e` | 刪除、危險操作 |
| `--ds-color-warning-bg` | `bg-ds-warning-bg` | `var(--ds-color-warning-bg)` | `#fff4d6` | 警告 banner 背景 |
| `--ds-color-warning-icon` | `text-ds-warning-icon` | `var(--ds-color-warning-icon)` | `#f79009` | 警告圖示、badge |
| `--ds-color-warning-text` | `text-ds-warning-text` | `var(--ds-color-warning-text)` | `#422a00` | 警告文字 |
| `--ds-color-input-readonly` | `bg-ds-input-readonly` | `var(--ds-color-input-readonly)` | `#edf0f7` | 唯讀輸入框背景、filled 欄位 |
| `--ds-color-bg-surface` | `bg-ds-bg-surface` | `var(--ds-color-bg-surface)` | `#ffffff` | 表單、卡片背景 |
| `--ds-color-text-default` | `text-ds-text-default` | `var(--ds-color-text-default)` | `#0f172a` | 一般深色文字 |
| `--ds-color-helper` | `text-ds-helper` | `var(--ds-color-helper)` | `#3c4a5b` | 輸入框補充說明文字 |
| `--ds-color-meta` | `text-ds-meta` | `var(--ds-color-meta)` | `#7f8996` | 程式版本、最次要資訊 |

---

## Status Badge Tokens

| 狀態 | Tailwind Class（文字） | Tailwind Class（背景） | 文字色 | 背景色 |
|------|----------------------|----------------------|--------|--------|
| 草稿 (Draft) | `text-badge-draft-text` | `bg-badge-draft-bg` | `#374151` | `#f3f4f6` |
| 正常 / 已核准 | `text-badge-active-text` | `bg-badge-active-bg` | `#065f46` | `#d1fae5` |
| 已駁回 / 取消 | `text-badge-cancel-text` | `bg-badge-cancel-bg` | `#991b1b` | `#fee2e2` |
| 詢價 (Quote) | `text-badge-quote-text` | `bg-badge-quote-bg` | `#92400e` | `#fef3c7` |
| 等待 (Wait) | `text-badge-wait-text` | `bg-badge-wait-bg` | `#3730a3` | `#e0e7ff` |
| NO-SHOW | `text-badge-noshow-text` | `bg-badge-noshow-bg` | `#374151` | `#f3f4f6` |
| 退房 | `text-badge-checkout-text` | `bg-badge-checkout-bg` | `#1e40af` | `#dbeafe` |

---

## Typography Tokens

| Figma Token | Tailwind Class | 字級 | 字重 | 用途 |
|-------------|---------------|------|------|------|
| `--ds-text-section-title` | `text-ds-section-title` | 14px | 700 | DsSectionHeader 標題 |
| `--ds-text-btn` | `text-ds-btn` | 14px | 500 | 所有按鈕文字 |
| `--ds-text-body` | `text-ds-body` | 14px | 400 | 一般表單內文 |
| `--ds-text-link` | `text-ds-link` | 14px | 500 | 超連結 |
| `--ds-text-helper` | `text-ds-helper` | 12px | 400 | 輸入框補充說明 |
| `--ds-text-meta` | `text-ds-meta` | 12px | 400 | programID、版本號 |

---

## Spacing Tokens

| Figma Token | Tailwind Class（範例） | CSS Variable | 值 | 用途 |
|-------------|----------------------|-------------|-----|------|
| `--ds-space-xs` | `p-ds-xs` / `gap-ds-xs` | `var(--ds-space-xs)` | `4px` | TextBox 內部 gap |
| `--ds-space-sm` | `p-ds-sm` / `gap-ds-sm` | `var(--ds-space-sm)` | `8px` | 圖示間距 |
| `--ds-space-md` | `p-ds-md` / `gap-ds-md` | `var(--ds-space-md)` | `12px` | 按鈕間 gap、Content Container gap |
| `--ds-space-lg` | `p-ds-lg` / `gap-ds-lg` | `var(--ds-space-lg)` | `16px` | Button padding-x、Block2 padding |
| `--ds-space-xl` | `p-ds-xl` / `gap-ds-xl` | `var(--ds-space-xl)` | `20px` | BasicInfo form grid gap |
| `--ds-space-2xl` | `p-ds-2xl` / `gap-ds-2xl` | `var(--ds-space-2xl)` | `24px` | Form section gap（section 之間）|
| `--ds-space-3xl` | `p-ds-3xl` / `gap-ds-3xl` | `var(--ds-space-3xl)` | `32px` | Outer Container padding（頁面邊距）|

---

## 使用範例

```vue
<!-- Section Header -->
<div class="flex items-center gap-ds-sm">
  <div class="w-[5px] h-[21px] bg-ds-primary"></div>
  <span class="text-ds-section-title text-ds-primary">基本資訊</span>
</div>

<!-- 狀態 Badge -->
<span class="text-badge-active-text bg-badge-active-bg px-2 py-0.5 rounded text-ds-helper">
  正常
</span>

<!-- Warning Banner -->
<div class="bg-ds-warning-bg px-ds-lg py-ds-sm">
  <span class="text-ds-warning-text text-ds-btn">尚未儲存的變更</span>
</div>
```
