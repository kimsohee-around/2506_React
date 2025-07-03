import TodoInsert from './TodoInsert'
import TodoList from './TodoList'
import '../assets/css/TodoTemplate.scss'

export default function TodoTemplate() {
  return (
    <div className='TodoTemplate'>
      <div className='app-title'>일정관리</div>
      <div className='content'>{/* TodoInsert, TodoList 컴포넌트 */}</div>
    </div>
  )
}
