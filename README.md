# PMS Demo

Nuxt 3 + Vue 3 + Tailwind + Syncfusion EJ2 打造的 PMS（Property Management System）DEMO 專案。

線上部署：https://ruchen-athena.github.io/design-test/

---

## 快速開始

```bash
git clone https://github.com/ruchen-athena/design-test.git
cd design-test
npm install
npm run dev              # → http://localhost:3100
```

### 常用指令

| 指令 | 用途 |
|---|---|
| `npm run dev` | 啟動 dev server（port 3100） |
| `npm run generate` | 產生靜態站到 `.output/public/` |
| `npm run build` | SSR 版本 build |
| `npm run preview` | 預覽 build 結果 |

---

## 分支策略

簡單兩分支：

| 分支 | 用途 | 內容 |
|---|---|---|
| `main` | 開發 | Vue/Nuxt 原始碼 |
| `gh-pages` | 部署 | `npm run generate` 產出的靜態檔 |

### 工作流程

1. 在 `main` 開發、commit、`git push origin main`
2. GitHub Actions 自動觸發 `.github/workflows/deploy.yml`
3. CI 跑 `npm install` → `npm run generate` → 推到 `gh-pages`
4. GitHub Pages 從 `gh-pages` 發佈

**不需要**手動跑 `npx gh-pages` 或手動 build。改程式碼 → push main → 等 CI 跑完（~40s）→ 線上更新。

想手動觸發重 deploy 可到 Actions 頁按 "Run workflow"。

---

## 專案結構

```
design-test/
├── .github/workflows/
│   └── deploy.yml              # CI：push main 自動部署到 gh-pages
│
├── app.vue                     # 根元件（Syncfusion license 註冊）
├── nuxt.config.ts              # Nuxt 設定（baseURL、Syncfusion CSS）
├── tailwind.config.ts          # 設計系統 token（color / shadow）
├── tsconfig.json
├── package.json
│
├── assets/
│   └── css/
│       ├── main.css            # Tailwind entry
│       └── variables.css       # CSS 變數
│
├── layouts/
│   └── pms.vue                 # PMS 共用版型（header + sidebar + content）
│
├── pages/
│   └── pms/
│       ├── folio/              # 訂房卡（完整版，對齊 Figma）
│       │   ├── index.vue       #   列表頁
│       │   └── [id].vue        #   詳細頁（new / :id）
│       └── reservation/        # 訂房（template starter，精簡版）
│           ├── index.vue       #   列表頁
│           └── [id].vue        #   表單頁（new / :id）
│
├── components/
│   └── pms/
│       └── folio/              # 訂房卡子元件
│           ├── FolioAmountSummary.vue
│           ├── FolioBottomBar.vue
│           ├── FolioMessageBanner.vue
│           ├── FolioSectionBasicInfo.vue
│           ├── FolioSectionBookingPolicy.vue
│           ├── FolioSectionCostSummary.vue
│           ├── FolioSectionOtherInfo.vue
│           ├── FolioSectionStayInfo.vue
│           ├── FolioSmartBtnRow.vue
│           └── FolioTabPanel.vue
│
├── composables/
│   └── useLogger.ts            # 埋點 API：debug / info / warn / error
│
├── stores/
│   └── logger.ts               # Log 狀態管理（reactive singleton，無 Pinia 依賴）
│
├── types/
│   └── index.ts                # DB Schema 型別：Reservation / Guest / Room / LogEntry
│
├── pms-folio-spec.md           # 訂房卡規格文件
└── token-map.md                # 設計 token 對照表
```

### 關鍵約定

- **baseURL**：`nuxt.config.ts` 設 `/design-test/`（配合 GitHub Pages 路徑）
- **SSR**：關閉（`ssr: false`），走 SPA + 靜態產出
- **UI 元件庫**：Syncfusion EJ2（Material theme）
- **設計系統**：Tailwind token 定義在 `tailwind.config.ts`，顏色對齊 Figma Library

---

## 埋點用法

```ts
const logger = useLogger()

logger.info('reservation.create', { folioNo: 'R2026040001' })
logger.error('api.failed', { url, status: 500 })
```

- 所有 log 寫入 `stores/logger.ts` 的 reactive buffer（上限 500 筆）
- dev 模式同步印到 console
- 之後若要送後端，在 `useLogger` 加 `flush()` 打 `/api/logs` 即可

---

## 部署設定

### GitHub Pages

- **Source**：`gh-pages` 分支，`/` 根目錄
- **URL**：https://ruchen-athena.github.io/design-test/

### CI 權限

`.github/workflows/deploy.yml` 使用 `GITHUB_TOKEN` 推 `gh-pages`，需要 repo 設定：
Settings → Actions → General → Workflow permissions → **Read and write permissions**。

---

## 不進 git 的檔案

見 `.gitignore`。主要排除：

- `node_modules/`、`.nuxt/`、`.output/`、`dist`（build 產物）
- `.agents/`、`.kiro/`、`.claude/`、`skills-lock.json`（本地 agent 工具）
- `.DS_Store`、`.env*`
