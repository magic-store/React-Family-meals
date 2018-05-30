import { createAction, Action } from 'redux-actions'
import { ActionsObservable } from 'redux-observable'

export type EpicInput<T> = ActionsObservable<Action<T>>

export const action = createAction('NO_OP_ACTION')

const swap = (i, j, arr) => {
  const temp = arr[j]
  arr[j] = arr[i]
  arr[i] = temp
}

// 内外正向排序
export const bubble1 = arr => {
  const target = []
  const length = arr.length
  let flag = false

  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        flag = true
        swap(i, j, arr)
      }
    }
    if (!flag) {
      break
    }
  }
  return target
}

//外正内反 反向排序
export const bubble2 = arr => {
  const target = []
  const length = arr.length
  let flag = false

  for (let i = 0; i < length - 1; i++) {
    for (let j = length - 1; j >= i + 1; j--) {
      if (arr[j] < arr[j - 1]) {
        flag = true
        swap(i, j, arr)
      }
    }
    if (!flag) {
      break
    }
  }
  return target
}

// 外反内正
export const bubble3 = arr => {
  const target = []
  const length = arr.length
  let flag = false

  for (let i = length - 1; i > 0; i--) {
    for (let j = 0; j < length - 1 - i; j++) {
      if (arr[j] < arr[j + 1]) {
        flag = true
        swap(i, j, arr)
      }
    }
    if (!flag) {
      break
    }
  }
  return target
}

// 内外反向
export const bubble4 = arr => {
  const target = []
  const length = arr.length
  let flag = false

  for (let i = length - 1; i > 0; i--) {
    for (let j = 0; j < length - 1 - i; j++) {
      if (arr[j] < arr[j + 1]) {
        flag = true
        swap(i, j, arr)
      }
    }
    if (!flag) {
      break
    }
  }
  return target
}
