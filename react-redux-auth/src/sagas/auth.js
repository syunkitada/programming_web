import { delay } from 'redux-saga'
import { put, call, takeEvery, all } from 'redux-saga/effects'
import actions from '../actions'
import api from '../modules/api'


function* login(action) {
  console.log("login", action.payload)
  const {user, error} = yield call(api.login, action.payload)

  if (error) {
    yield put(actions.auth.loginFailure(error))
  } else {
    yield put(actions.auth.loginSuccess(user))
  }
}

function* watchLogin() {
  yield takeEvery(actions.auth.login, login)
}

function* logout(action) {
  console.log("logout", action.payload)
  const {user, error} = yield call(api.logout, action.payload)

  if (error) {
    yield put(actions.auth.logoutFailure(error))
  } else {
    yield put(actions.auth.logoutSuccess(user))
  }
}

function* watchLogout() {
  yield takeEvery(actions.auth.logout, logout)
}

export default {
  watchLogin,
  watchLogout,
}
