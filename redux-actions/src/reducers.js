// import { combineReducers } from 'redux'
// import {
//   ADD_TODO,
//   TOGGLE_TODO,
//   SET_VISIBILITY_FILTER,
//   VisibilityFilters
// } from './actions'
// const { SHOW_ALL } = VisibilityFilters
// 
// function visibilityFilter(state = SHOW_ALL, action) {
//   switch (action.type) {
//     case SET_VISIBILITY_FILTER:
//       return action.filter
//     default:
//       return state
//   }
// }
// 
// function todos(state = [], action) {
//   switch (action.type) {
//     case ADD_TODO:
//       return [
//         ...state,
//         {
//           text: action.text,
//           completed: false
//         }
//       ]
//     case TOGGLE_TODO:
//       return state.map((todo, index) => {
//         if (index === action.index) {
//           return Object.assign({}, todo, {
//             completed: !todo.completed
//           })
//         }
//         return todo
//       })
//     default:
//       return state
//   }
// }
// 
// // combineReducersでReducerをまとめる(ルートReducer)と呼ぶ
// // StoreはActionがDispatchされると、ルートReducerを呼び出す
// // ルートReducerは、登録されたReducerを順に実行し、stateが変化していく
// const todoApp = combineReducers({
//   visibilityFilter,
//   todos
// })
// 
// export default todoApp

import { combineReducers } from 'redux'
import actions, {VisibilityFilters} from './actions'
import { handleActions, combineActions } from 'redux-actions';

const defaultState = [];

const visibilityFilter = handleActions({
  [actions.setVisibilityFilter]: (state=VisibilityFilters.SHOW_ALL, action) => {
      return action.payload.filter
  }
}, defaultState)

const todos = handleActions({
  [actions.addTodo]: (state=[], action) => {
    console.log(state);
    console.log(action);

    return [
      ...state,
      {
        text: action.payload.text,
        completed: false
      }
    ]
  },
  [actions.toggleTodo]: (state=[], action) => {
    console.log(state)
    return state.map((todo, index) => {
      if (index == action.payload.index) {
        return Object.assign({}, todo, {
          completed: !todo.completed
        })
      }
      return todo
    })
  }
}, defaultState);

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp
