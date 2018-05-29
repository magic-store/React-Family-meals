import { connect } from 'react-redux'
import { GlobalState } from 'store'
import { bindActionCreators } from 'redux'

import { action } from './root.module'
import { match } from 'react-router'
import { RootComponent as Component } from './root.component'
import { RouteData } from './root.module'

export interface MapStateProps {
  list: RouteData[]
}
export type MapDispatchProps = () => {
  action: typeof action
}

export interface MapOwnProps {
  match?: match<{ id: string }>
}

const mapStateProps = (globalState: GlobalState): MapStateProps => {
  return {
    list: globalState.ui.root.list
  }
}
const mapDispatchProps = dispatch => {
  return {
    action: bindActionCreators({ ...action }, dispatch)
  }
}

export const Root = connect(mapStateProps, mapDispatchProps)(Component)
