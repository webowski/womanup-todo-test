import { useState, useCallback } from 'react'
import TodoForm from '@/components/todo/TodoForm'
import { useTodo } from '@/hooks/useTodo'

const TodoItem = ({ data }) => {
	const [isOnEdit, setIsOnEdit] = useState(false)
	const { isTodoPending, updateTodo, switchTodoCompletion, deleteTodo } =
		useTodo()

	const editTodo = () => {
		setIsOnEdit(true)
	}

	const handleUpdateTodo = (formData) => {
		updateTodo(data._id, formData)
		setIsOnEdit(false)
	}

	return (
		<article
			className={`TodoItem${data.isCompleted ? ' is-completed' : ''}${
				isTodoPending ? ' is-pending' : ''
			}`}
		>
			{isOnEdit ? (
				<TodoForm
					action='edit'
					onSubmit={handleUpdateTodo}
					initialValues={data}
				/>
			) : (
				<>
					<div className='TodoItem__body'>
						<div className='TodoItem__time'>{data.datetime?.toString()}</div>
						<h4 className='TodoItem__title'>{data.title}</h4>
					</div>

					<div className='TodoItem__actions'>
						<button className='Button -sm' onClick={editTodo}>
							Редактировать
						</button>

						{data.isCompleted ? (
							<button
								className='Button -sm'
								onClick={() => switchTodoCompletion(data._id, false)}
							>
								Возобновить
							</button>
						) : (
							<button
								className='Button -sm'
								onClick={() => switchTodoCompletion(data._id, true)}
							>
								Завершить
							</button>
						)}

						<button className='Button -sm' onClick={() => deleteTodo(data._id)}>
							Удалить
						</button>
					</div>
				</>
			)}
		</article>
	)
}
export default TodoItem
