import React from 'react'
import { Two } from '../two'
import './one.component.styl'
export class One extends React.PureComponent<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      seconds: 0
    }
  }

  timer: any

  componentDidMount() {
    let counter = 0
    this.timer = setInterval(() => {
      this.setState({
        seconds: counter++
      })
    }, 1000)

  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <React.Fragment>
        <div>Timer View</div>
        <Two>U Had Stay In This Page for {this.state.seconds} Seconds </Two>
      </React.Fragment>
    )
  }
}
