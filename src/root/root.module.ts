import 'rxjs/add/operator/map'
import { combineEpics } from 'redux-observable'
import { EpicInput } from 'store'
import { handleActions, createAction, Action } from 'redux-actions'

export interface RouteData {
  routerName: string
  routerPath: string
}

export type RootState = {
  list: RouteData[]
}

const nameSpace = (name: string) => `ROOT/${name}`

// Actions
export const action = {
  getUserMe: createAction(nameSpace('GET_USER_ME')),
  getUserMeSuccess: createAction<{ list: RouteData[] }>(
    nameSpace('GET_USER_ME_SUCCESS')
  )
}

const getUserMeEpic = (action$: EpicInput<any>) => {
  return action$.ofType(action.getUserMe.toString()).map(r => {
    return action.getUserMeSuccess({
      list: [
        { routerName: 'One', routerPath: 'one' },
        { routerName: 'Two', routerPath: 'two' }
      ]
    })
  })
}

// Epics
export const epics = combineEpics<any>(getUserMeEpic)

export const defaultState: RootState = {
  list: [{ routerName: 'One', routerPath: '/' }]
}

// Reducer
export const reducer = handleActions<RootState, any>(
  {
    [`${action.getUserMeSuccess}`]: (
      state,
      action: Action<{ list: RouteData[] }>
    ) => {
      return {
        ...state,
        list: action.payload.list
      }
    }
  },
  defaultState
)
