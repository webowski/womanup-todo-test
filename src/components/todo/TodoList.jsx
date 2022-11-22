import { useTodos } from '@/hooks/useTodos'
import TodoItem from '@/components/todo/TodoItem'
import Preloader from '@/components/ui/Preloader'

const TodoList = () => {
	const { todos, isLoading, isFailed } = useTodos()

	return (
		<div className='TodoList'>
			{isLoading && !isFailed ? (
				<Preloader />
			) : todos.length ? (
				todos.map((todo) => <TodoItem key={todo._id} data={todo} />)
			) : (
				<div>Нет задач.</div>
			)}
			{isFailed && <div>Ошибка получения данных.</div>}
		</div>
	)
}
export default TodoList
