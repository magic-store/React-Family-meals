import { createStore, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import { createEpicMiddleware, combineEpics } from 'redux-observable'

import { rootReducer } from './reducer'
import { epics } from './epic'
import { reduxDevTools } from './devtools'

import createBrowserHistory from 'history/createBrowserHistory'

export const history = createBrowserHistory()

const rootEpic = (action$, globalStore) =>
  combineEpics(...epics)(action$, globalStore)

const epicMiddleware = createEpicMiddleware<any, any>(rootEpic)

export const store = createStore(
  connectRouter(history)(rootReducer),
  compose(
    applyMiddleware(epicMiddleware, routerMiddleware(history)),
    reduxDevTools()
  )
)
