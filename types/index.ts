/**
 * 對應 DB Schema 的型別定義
 * ---------------------------------------------------------
 * 模組：PMS（Property Management System）
 * 主要實體：Reservation / Folio / Guest / Room
 *
 * 命名規則
 * - 主鍵：id
 * - 時間欄位：UTC ISO string（例：2026-04-17T10:30:00Z）
 * - 金額：最小貨幣單位（TWD 元；使用時需自行格式化）
 * - 狀態：使用 string literal union，對應 Badge 樣式 token
 */

// ── Reservation（訂房） ─────────────────────────────────────
export type ReservationStatus =
  | '草稿'
  | '正常'
  | '取消'
  | '詢價'
  | '等待'
  | 'NO-SHOW'
  | '已到'
  | '退房'

export interface Reservation {
  id: number
  folioNo: string              // 訂房卡號，例 R2026040001
  status: ReservationStatus
  guestName: string
  guestId?: number             // 關聯 Guest.id
  checkIn: string              // YYYY-MM-DD
  checkOut: string             // YYYY-MM-DD
  roomType: string
  rooms: number                // 間數
  totalAmount: number          // TWD 元
  company?: string             // 訂房公司／OTA／旅行社
  note?: string
  createdAt: string
  updatedAt: string
}

// ── Guest（住客） ────────────────────────────────────────────
export interface Guest {
  id: number
  name: string
  idNumber?: string            // 身分證／護照
  phone?: string
  email?: string
  vipLevel?: 'none' | 'silver' | 'gold' | 'platinum'
  createdAt: string
}

// ── Room（房間） ─────────────────────────────────────────────
export interface Room {
  id: number
  roomNo: string               // 房號，例 A301
  roomType: string
  status: 'available' | 'occupied' | 'cleaning' | 'maintenance'
  floor: number
}

// ── Logger（前端埋點） ──────────────────────────────────────
export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface LogEntry {
  id: string                   // uuid-like
  level: LogLevel
  event: string                // 例：reservation.create
  payload?: Record<string, unknown>
  ts: string                   // ISO timestamp
  route?: string               // 觸發時的路由路徑
}
