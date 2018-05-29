import { createAction, Action } from 'redux-actions'
import { ActionsObservable } from 'redux-observable'

export type EpicInput<T> = ActionsObservable<Action<T>>

export const action = createAction('NO_OP_ACTION')
