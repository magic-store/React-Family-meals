import * as React from 'react'

import * as Styles from './root.component.styl'
import { Link } from 'react-router-dom'

import { MapDispatchProps, MapOwnProps, MapStateProps } from './root.container'
import { action } from './root.module'

type props = MapDispatchProps & MapOwnProps & MapStateProps & { action: typeof action }

export class RootComponent extends React.PureComponent<Readonly<props>> {

  componentWillMount() {
    this.props.action.getUserMe()
  }

  render() {
    return (
      <React.Fragment>
        {this.props.list.map(item => {
          return (
            <div key={item.routerPath} className={Styles.routerItem}>
              <Link to={item.routerPath}>{item.routerName}</Link>
            </div>
          )
        })}
      </React.Fragment>
    )
  }
}
