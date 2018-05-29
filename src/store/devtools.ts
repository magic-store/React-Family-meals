const pkg = require('../../package.json')

export function reduxDevTools() {
  const devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ || window.devToolsExtension
  return devTools
    ? devTools({
        name: pkg.name,
        actionsBlacklist: ['NO_OP_ACTION']
      })
    : (f: Function) => f
}
