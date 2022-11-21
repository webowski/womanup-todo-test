import { useTodos } from '@/hooks/useTodos'
import TodoItem from '@/components/todo/TodoItem'
import Preloader from '@/components/ui/Preloader'

const TodoList = () => {
	const { todos, isLoading } = useTodos()

	return (
		<div className='TodoList'>
			{isLoading ? (
				<Preloader />
			) : todos.length ? (
				todos.map((todo) => <TodoItem key={todo._id} data={todo} />)
			) : (
				<div>Нет задач.</div>
			)}
		</div>
	)
}
export default TodoList
