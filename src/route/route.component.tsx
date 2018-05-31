import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { One, Two, Three } from '../app/index'
import { Root } from '../root'

export class GlobalRoute extends React.PureComponent {
  redirect = () => {
    return <Root />
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" render={this.redirect} />
          <Route exact={true} path="/two" component={Two} />
          <Route exact={true} path="/three" component={Three} />
          <Route exact={true} path="/one" component={One} />
        </Switch>
      </BrowserRouter>
    )
  }
}
