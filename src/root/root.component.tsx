import * as React from 'react'

import * as Styles from './root.component.styl'
import { Link } from 'react-router-dom'

// import { One, Two, Three } from '../app/index'

import { MapDispatchProps, MapOwnProps, MapStateProps } from './root.container'
import { action } from './root.module'

type props = MapDispatchProps &
  MapOwnProps &
  MapStateProps & {
    action: typeof action
  }

export class RootComponent extends React.PureComponent<Readonly<props>> {
  componentWillMount() {
    this.props.action.getUserMe()
  }

  render() {
    console.info(this.props, Styles)
    return (
      <React.Fragment>
        {this.props.list.map(item => {
          return (
            <div key={item.routerPath} className={Styles.routerItem}>
              <Link to={item.routerPath}>{item.routerName}</Link>
            </div>
          )
        })}
        {/* <Route exact={true} path="/two" component={Two} />
        <Route exact={true} path="/three" component={Three} />
        <Route exact={true} path="/one" component={One} /> */}
        <a href="https://www.baidu.com">222</a>

        <div className={Styles.wrap}>
          <div>
            <span>1</span>
          </div>
          <div>
            <span>2</span>
          </div>
          <div>
            <span>3</span>
          </div>
          <div>
            <span>4</span>
          </div>
          <div>
            <span>5</span>
          </div>
          <div>
            <span>6</span>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
