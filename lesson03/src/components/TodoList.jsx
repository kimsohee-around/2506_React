import '../assets/css/TodoList.scss'
import TodoListItem from './TodoListItem'

export default function TodoList() {
  return <div className='TodoList'>
      {
        todos.map((item)=> 
          <TodoListItem/>
        )
      }
  </div>
}
