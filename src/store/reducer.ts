import { combineReducers } from 'redux'

import { reducer as RootReducer, RootState } from '../root/root.module'

export interface GlobalState {
  readonly ui: GlobalUIState
  readonly router?: GlobalRouterState
}
export interface GlobalUIState {
  root: RootState
}

export interface GlobalRouterState {
  location: any
}

const uiReducer = {
  root: RootReducer
}

export const rootReducer = combineReducers<GlobalState>({
  ui: combineReducers<GlobalUIState>(uiReducer)
})
