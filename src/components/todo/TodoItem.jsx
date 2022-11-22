import { useState, useCallback, useEffect } from 'react'
import TodoForm from '@/components/todo/TodoForm'
import { useTodo } from '@/hooks/useTodo'
import { toDisplayTimeFormat } from '@/helpers/time'
import dayjs from 'dayjs'

const TodoItem = ({ data }) => {
	const [isOnEdit, setIsOnEdit] = useState(false)
	const [isExpired, setIsExpired] = useState(false)

	const { isTodoPending, updateTodo, switchTodoCompletion, deleteTodo } =
		useTodo()

	const handleEditTodo = useCallback(() => {
		setIsOnEdit(true)
	}, [])

	const handleUpdateTodo = useCallback(
		async (formData, files) => {
			try {
				await updateTodo(data._id, formData, files)
			} catch (error) {
				console.error(error)
			} finally {
				setIsOnEdit(false)
			}
		},
		// eslint-disable-next-line
		[]
	)

	useEffect(() => {
		const interval = setInterval(() => {
			const now = dayjs()
			const expiredValue = dayjs(data.datetime).diff(now) < 0
			setIsExpired(expiredValue)
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	}, [data.datetime])

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
						<div className='TodoItem__time'>
							<span>{toDisplayTimeFormat(data.datetime)}</span>
							{isExpired && (
								<span className='TodoItem__badge'>Время истекло</span>
							)}
						</div>
						<h4 className='TodoItem__title'>{data.title}</h4>
						{data.description && (
							<div className='TodoItem__description'>{data.description}</div>
						)}
						{true && (
							<ul className='TodoItem__files'>
								{data.files.map((file, index) => (
									<li key={'todoFile' + file.index}>
										<a href={file.url} target='_blank' rel='noreferrer'>
											{file.name}
										</a>
									</li>
								))}
							</ul>
						)}
					</div>

					<div className='TodoItem__actions'>
						<button className='Button -sm' onClick={handleEditTodo}>
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
