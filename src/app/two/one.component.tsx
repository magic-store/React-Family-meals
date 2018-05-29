import React from 'react'

export class Two extends React.PureComponent {
  componentWillUnmount() {
    console.info('unMount')
  }

  componentWillMount() {
    console.info('Mount')
  }

  render() {
    return <div>MMMMM : two{this.props.children}</div>
  }
}
