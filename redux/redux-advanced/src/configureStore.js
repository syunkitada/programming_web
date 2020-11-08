import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'

const loggerMiddleware = createLogger()

// thunkMiddlewareを使うと、ActionCreaterはオブジェクトの代わりに関数を返せるようになる
// ActionCreaterが関数を返すと、その関数はRedux Thunkのミドルウェアによって実行される
// この関数は、非同期APIを呼び出したり、ActionをDispatchすることもできる

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,  // 関数をdispatchできるようにする
      loggerMiddleware  // Actionのログを取るためのMiddleware
    )
  )
}
