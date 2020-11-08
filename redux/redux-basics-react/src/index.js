import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'


const store = createStore(todoApp)


// すべてのコンテナコンポーネントは、Storeを購読するためにRedux Storeにアクセスする必要がある
// Providerを使うと、アプリケーション内すべてのコンテナコンポーネントでStoreを利用できるようになる
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
