import { ActionsObservable } from 'redux-observable'

// webpack define variables
declare var __DEBUG__: boolean

declare global {
  export type EpicAction = ActionsObservable<any>

  interface Window {
    devToolsExtension(config?: any): any
    __REDUX_DEVTOOLS_EXTENSION__: {
      (config?: any): any
    }
  }

  interface NodeRequire {
    context: any
  }

  interface NodeModule {
    hot: any
  }
}

declare global {
  module '*.css' {
    const _: Record<string, string>
    export default _
    export = _
  }

  module '*.styl' {
    const _: Record<string, string>
    export default _
    export = _
  }
}
