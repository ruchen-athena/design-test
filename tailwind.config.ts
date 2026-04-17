import type { Config } from 'tailwindcss'

/**
 * ERP Design System Token — Tailwind 設定
 * 來源：ERP-System/.claude/rules/figma-design-system/references/tokens.md
 *
 * 色彩命名：primary-{50..600}、neutral-{0..900}、語義別名
 * 間距：標準 Tailwind spacing（p-1=4px ~ p-12=48px）
 * 圓角：標準 Tailwind rounded + radius token
 */
const config: Config = {
  content: [
    './**/*.{js,ts,vue}',
    '!./node_modules/**',
  ],
  theme: {
    extend: {
      // ─── Color Tokens（Primitive + Semantic） ────────────────────────────
      colors: {
        // Primary scale（Figma: color/primary/*）
        primary: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#2877ee',   // 主要品牌色（Figma 精確值）
          600: '#1d68e0',
        },
        // Neutral scale（Figma: color/neutral/*）
        neutral: {
          0:   '#ffffff',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d7dae0',   // border-default 實際值
          400: '#9ca3af',
          500: '#7f8996',   // text disabled / meta
          600: '#3c4a5b',   // text secondary
          700: '#1e293b',
          800: '#0f172a',   // text primary
          900: '#001d5a',   // sidebar bg
        },
        // Semantic surface
        surface: {
          default: '#f8fafc', // 頁面灰底
          raised:  '#ffffff', // Card 白底
          overlay: 'rgba(0,0,0,0.5)',
        },
        // Semantic border
        border: {
          default: '#d7dae0',
          focus:   '#2877ee',
        },
        // Semantic status
        status: {
          success: '#065f46',
          warning: '#92400e',
          error:   '#991b1b',
          'success-bg': '#d1fae5',
          'warning-bg': '#fef3c7',
          'error-bg':   '#fee2e2',
        },
        // 訂房卡狀態 Badge
        badge: {
          'draft-text':    '#374151',
          'draft-bg':      '#f3f4f6',
          'active-text':   '#065f46',
          'active-bg':     '#d1fae5',
          'cancel-text':   '#991b1b',
          'cancel-bg':     '#fee2e2',
          'quote-text':    '#92400e',
          'quote-bg':      '#fef3c7',
          'wait-text':     '#3730a3',
          'wait-bg':       '#e0e7ff',
          'noshow-text':   '#374151',
          'noshow-bg':     '#f3f4f6',
          'checkout-text': '#1e40af',
          'checkout-bg':   '#dbeafe',
        },
      },

      // ─── Shadow Tokens ────────────────────────────────────────────────────
      boxShadow: {
        focus: '0 0 0 3px rgba(40, 119, 238, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config
