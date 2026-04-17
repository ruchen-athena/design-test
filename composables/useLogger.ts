/**
 * useLogger — 前端埋點 API
 * ---------------------------------------------------------
 * 提供統一的 log 介面，底層寫入 stores/logger.ts。
 *
 * 使用範例：
 *   const logger = useLogger()
 *   logger.info('reservation.create', { folioNo: 'R2026040001' })
 *   logger.error('api.failed', { url, status })
 *
 * 未來擴充：
 * - flush() 可把 buffer 送到後端 /api/logs
 * - 加入 sampling rate、user context 等
 */
import { useLoggerStore } from '~/stores/logger'
import type { LogEntry, LogLevel } from '~/types'

function genId(): string {
  // 簡易 uid，避免引入額外套件
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export function useLogger() {
  const store = useLoggerStore()
  const route = useRoute()

  function log(level: LogLevel, event: string, payload?: Record<string, unknown>) {
    const entry: LogEntry = {
      id: genId(),
      level,
      event,
      payload,
      ts: new Date().toISOString(),
      route: route?.fullPath,
    }
    store.push(entry)

    // 開發期同步 console，方便追蹤
    if (import.meta.dev) {
      const fn =
        level === 'error' ? console.error :
        level === 'warn'  ? console.warn  :
        level === 'info'  ? console.info  :
        console.debug
      fn(`[${event}]`, payload ?? '')
    }
  }

  return {
    debug: (event: string, payload?: Record<string, unknown>) => log('debug', event, payload),
    info:  (event: string, payload?: Record<string, unknown>) => log('info',  event, payload),
    warn:  (event: string, payload?: Record<string, unknown>) => log('warn',  event, payload),
    error: (event: string, payload?: Record<string, unknown>) => log('error', event, payload),
    entries: store.state.entries,
    clear: store.clear,
  }
}
