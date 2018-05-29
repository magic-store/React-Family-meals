import React from 'react'
import { Two } from '../two'
import * as Rx from 'rxjs'
import './one.component.styl'
export class One extends React.PureComponent<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      arr: [1, 2, 3, 4]
    }
  }

  timer: any

  componentDidMount() {
    let counter = 0
    this.timer = setInterval(() => {
      this.setState({
        arr: [0, 2, 3, counter++]
      })
    }, 1000)

    this.setObservable()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  setObservable = () => {
    console.info(11, this)
    const demo = Rx.Observable.create(obr => {
      obr.next(1)
      setTimeout(() => {
        obr.next(1000)
        obr.complete()
      })
    })
    demo.take(1).subscribe(r => console.info(r, demo))

    const timeOut = ms => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('timeOut')
        }, ms)
      })
    }

    const print = async ms => {
      const zhiHu = await timeOut(ms).then(r => {
        console.info(r)
        return r
      })
      console.info(222, zhiHu)
    }

    print(3000)
  }

  handleClick = () => {
    console.info(this, 'click')
  }

  render() {
    console.info(this.props, this.state)
    return (
      <React.Fragment>
        <div onClick={this.handleClick}>MMMMM : One</div>
        {this.state.arr.map((i, index) => <Two key={index}>{i}</Two>)}
      </React.Fragment>
    )
  }
}
