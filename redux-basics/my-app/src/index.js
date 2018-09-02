import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from './actions'

import { createStore } from 'redux'
import todoApp from './reducers'


// Reducerを与えてStoreを作成する
let store = createStore(todoApp)

// 第二引数で初期状態を渡すこともできる
// サーバでStateの状態を保持し、それを使って初期化する場合に利用する
// let store = createStore(todoApp, window.STATE_FROM_SERVER)


// 初期状態のログをとる
console.log(store.getState())

// 状態が変化するたびに、ログをとる
// subscribe()はリスナーを登録解除するための関数を返すことに、注意してください
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

// ActionをいくつかDispatchする
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

// 状態更新の購読をやめる
unsubscribe()
