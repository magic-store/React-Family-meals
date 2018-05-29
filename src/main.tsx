import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import * as ReactDOM from 'react-dom'
import { store, history } from 'store'
import { GlobalRoute } from './route'

import './common'

if (module.hot) {
  module.hot.accept()
}

class AppComponent extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <GlobalRoute />
        </ConnectedRouter>
      </Provider>
    )
  }
}

const rootElement = document.getElementById('app')
ReactDOM.render(<AppComponent />, rootElement)
