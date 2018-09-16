// /*
//  * Actionタイプ
//  */
// 
// export const ADD_TODO = 'ADD_TODO'
// export const TOGGLE_TODO = 'TOGGLE_TODO'
// export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
// 
// /*
//  * 他の定数
//  */
// 
// export const VisibilityFilters = {
//   SHOW_ALL: 'SHOW_ALL',
//   SHOW_COMPLETED: 'SHOW_COMPLETED',
//   SHOW_ACTIVE: 'SHOW_ACTIVE'
// }
// 
// /*
//  * Actionクリエイター
//  */
// 
// export function addTodo(text) {
//   return { type: ADD_TODO, text }
// }
// 
// export function toggleTodo(index) {
//   return { type: TOGGLE_TODO, index }
// }
// 
// export function setVisibilityFilter(filter) {
//   return { type: SET_VISIBILITY_FILTER, filter }
// }

import { createActions } from 'redux-actions';

export const VisibilityFilters = {
   SHOW_ALL: 'SHOW_ALL',
   SHOW_COMPLETED: 'SHOW_COMPLETED',
   SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export default createActions({
  ADD_TODO: (text) => ({ text: text }),
  TOGGLE_TODO: (index) => ({ index: index }),
  SET_VISIBILITY_FILTER: (filter) => ({ filter: filter })
})
