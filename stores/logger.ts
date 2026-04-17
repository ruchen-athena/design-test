/**
 * Logger Store — 前端埋點 log 狀態管理
 * ---------------------------------------------------------
 * 採用 module-level reactive singleton（不依賴 Pinia）。
 * 若之後要改用 Pinia，只需把 state / actions 包進 defineStore 即可。
 *
 * 用法：直接呼叫 useLoggerStore() 取得 store
 * 一般埋點建議走 composables/useLogger.ts 提供的 API
 */
import { reactive, readonly } from 'vue'
import type { LogEntry, LogLevel } from '~/types'

interface LoggerState {
  entries: LogEntry[]
  max: number                  // 保留上限，避免記憶體爆掉
}

const state = reactive<LoggerState>({
  entries: [],
  max: 500,
})

function push(entry: LogEntry) {
  state.entries.push(entry)
  if (state.entries.length > state.max) {
    state.entries.splice(0, state.entries.length - state.max)
  }
}

function clear() {
  state.entries.splice(0, state.entries.length)
}

function byLevel(level: LogLevel) {
  return state.entries.filter((e) => e.level === level)
}

export function useLoggerStore() {
  return {
    // 對外唯讀，避免外部直接 mutate
    state: readonly(state),
    push,
    clear,
    byLevel,
  }
}
