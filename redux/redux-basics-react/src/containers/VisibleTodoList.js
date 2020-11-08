import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import { VisibilityFilters } from '../actions'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

// mapStateToPropsはconnectのために必要
// 現在のRedux Storeの状態を、どのようにPropsへ変換するかを示す
// Stateが変更されたときに呼ばれ、このPropsは、コンテナがラップしているプレゼンテーションコンポーネントに渡される
function mapStateToProps(state) {
  console.log("called mapStateToProps", state)
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

// mapDispatchToPropsはconnectのために必要
// Actionのdispatch
// dispatchメソッドを受け取り、コールバックとなるPropsを返す
// このPropsも、プレゼンテーションコンポーネントに渡される
// そして、プレゼンテーションコンポーネントで、onClickなどに設定することで、クリック時にTOGGLE_TODOというActionをDispatchする
const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
})


// connectによってコンテナコンポーネントを作成できる
// プレゼンテーションコンポーネントにバインドして、exportする
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
