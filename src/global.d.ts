interface Window {
  devToolsExtension(config?: any): any
  __REDUX_DEVTOOLS_EXTENSION__: {
    (config?: any): any
  }
}

declare interface NodeRequire {
  context: any
}
declare interface NodeModule {
  hot: any
}

// webpack define variables
declare var __DEBUG__: boolean

declare module '*.styl' {
  const content: any
  export default content
}
