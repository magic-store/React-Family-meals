import * as React from 'react'

import * as Styles from './root.component.styl'

import { MapDispatchProps, MapOwnProps, MapStateProps } from './root.container'
import { action } from './root.module'

type props = MapDispatchProps &
  MapOwnProps &
  MapStateProps & {
    action: typeof action
  }

export class RootComponent extends React.PureComponent<Readonly<props>> {
  componentWillMount() {
    this.props.action.getUserMeSuccess({ name: '我真厉害' })
  }

  render() {
    console.info(this.props)
    return <div className={Styles['local']}>这是个root component</div>
  }
}
