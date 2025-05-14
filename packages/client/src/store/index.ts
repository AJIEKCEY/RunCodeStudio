import { createStore } from './utils/createStore'
import type { RootState, AppStore, PageInitArgs } from './types'

export type { RootState, AppStore, PageInitArgs }
export { createStore }

export const store = createStore(
  typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE
)
