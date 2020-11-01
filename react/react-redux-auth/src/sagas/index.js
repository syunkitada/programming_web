import { all } from 'redux-saga/effects';
import auth from './auth';

// redux-sagaのMiddlewareが rootSaga タスクを起動する

// function*は、Generatorオブジェクトを返すジェネレータ関数
// ジェネレーター関数を呼び出しても関数は直ぐには実行されません。代わりに、関数のためのiterator オブジェクトが返す
export default function* rootSaga() {
  yield all([
    auth.watchLogin(),
    auth.watchLogout(),
  ])
}
