import { combineEpics } from 'redux-observable'
import { EpicInput } from 'store'
import { handleActions, createAction, Action } from 'redux-actions'

export type RootState = {
  name: string
}

const nameSpace = (name: string) => `ROOT/${name}`

// Actions
export const action = {
  getUserMe: createAction(nameSpace('GET_USER_ME')),
  getUserMeSuccess: createAction<{ name: string }>(
    nameSpace('GET_USER_ME_SUCCESS')
  )
}

// Epic
const getUserMeEpic = (action$: EpicInput<any>) =>
  action$.ofType(action.getUserMe.toString()).switchMap(r => {
    console.info(r)
    return action.getUserMeSuccess({
      name: '我是最屌的'
    })
  })

export const epics = combineEpics<any>(getUserMeEpic)

export const defaultState: RootState = {
  name: 'wave'
}

// Reducer
export const reducer = handleActions<RootState, any>(
  {
    [`${action.getUserMeSuccess}`]: (
      state,
      action: Action<{ name: string }>
    ) => {
      console.info(action)
      return {
        ...state,
        name: action.payload.name
      }
    }
  },
  defaultState
)
