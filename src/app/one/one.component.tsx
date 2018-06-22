import React from 'react'
import { Two } from '../two'
import * as Rx from 'rxjs'

// import { take, map, combineAll } from 'rxjs/operators'

// import * as interval from 'rxjs/add/observable/interval'

export class One extends React.PureComponent<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      arr: [1, 2, 3, 4]
    }
  }

  componentDidMount() {
    // console.dir(this)
    setTimeout(() => {
      this.setState({
        arr: [0, 2, 3, 4]
      })
    }, 3000)
    let counter = 0
    setInterval(() => {
      this.setState({
        arr: [0, 2, 3, counter++]
      })
    }, 1000)

    this.setObservable()
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

    // 每秒发出值，并只取前2个
    // const source = interval(1000).pipe(take(2))
    // // 将 source 发出的每个值映射成取前5个值的 interval observable
    // const example = source.pipe(
    //   map(val =>
    //     interval(1000).pipe(map(i => `Result (${val}): ${i}`), take(5))
    //   )
    // )
    /*
  soure 中的2个值会被映射成2个(内部的) interval observables，
  这2个内部 observables 每秒使用 combineLatest 策略来 combineAll，
  每当任意一个内部 observable 发出值，就会发出每个内部 observable 的最新值。
*/
    //const combined = example.pipe(combineAll())
    /*
  输出:
  ["Result (0): 0", "Result (1): 0"]
  ["Result (0): 1", "Result (1): 0"]
  ["Result (0): 1", "Result (1): 1"]
  ["Result (0): 2", "Result (1): 1"]
  ["Result (0): 2", "Result (1): 2"]
  ["Result (0): 3", "Result (1): 2"]
  ["Result (0): 3", "Result (1): 3"]
  ["Result (0): 4", "Result (1): 3"]
  ["Result (0): 4", "Result (1): 4"]
*/
    // const subscribe = combined.subscribe(val => console.log(val))
    // console.info(subscribe)
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
      this.updateState('222')
    }

    print(3000)
  }

  updateState = (newOne: string) => {
    console.dir(this)
    const newArr = [...this.state.arr, newOne]

    this.setState({
      arr: newArr
    })
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
