import LayoutDefault from '@/layouts/LayoutDefault'
import TodoList from '@/components/todo/TodoList'
import TodoForm from '@/components/todo/TodoForm'
import { useTodo } from '@/hooks/useTodo'

const Home = () => {
	const { addTodo } = useTodo()

	return (
		<LayoutDefault>
			<TodoForm action='add' onSubmit={addTodo} />
			<TodoList />
		</LayoutDefault>
	)
}
export default Home
