import { connect } from 'react-redux'
import { GlobalState } from 'store'
import { bindActionCreators } from 'redux'

import { match } from 'react-router'
import { action } from './root.module'
import { RootComponent as Component } from './root.component'

export interface MapStateProps {
  name: string
}
export type MapDispatchProps = () => {
  action: typeof action
}

export interface MapOwnProps {
  match?: match<{ id: string }>
}

const mapStateProps = (globalState: GlobalState): MapStateProps => {
  console.info(globalState)
  return {
    name: globalState.ui.root.name
  }
}
const mapDispatchProps = dispatch => {
  return {
    action: bindActionCreators({ ...action }, dispatch)
  }
}

export const Root = connect(mapStateProps, mapDispatchProps)(Component)
