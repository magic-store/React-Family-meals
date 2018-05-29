import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import * as ReactDOM from 'react-dom'
import { store, history } from 'store'
import React from 'react'

import './common'

import { Root as RootComponent } from 'root'

if (module.hot) {
  module.hot.accept()
}

class AppComponent extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="container">
            <RootComponent />
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

const rootElement = document.getElementById('app')
ReactDOM.render(<AppComponent />, rootElement)
