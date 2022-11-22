import LayoutDefault from '@/layouts/LayoutDefault'
import TodoList from '@/components/todo/TodoList'
import TodoForm from '@/components/todo/TodoForm'
import { useTodo } from '@/hooks/useTodo'
import { useCallback, useState } from 'react'

const Home = () => {
	const { addTodo } = useTodo()
	const [isFormPending, setIsFormPending] = useState(false)

	const handleAddTodo = useCallback(async (formData, files) => {
		setIsFormPending(true)
		try {
			await addTodo(formData, files)
		} catch (error) {
			console.error(error)
		} finally {
			setIsFormPending(false)
		}
		// eslint-disable-next-line
	}, [])

	return (
		<LayoutDefault>
			<TodoForm
				action='add'
				onSubmit={handleAddTodo}
				isPending={isFormPending}
			/>
			<TodoList />
		</LayoutDefault>
	)
}
export default Home
