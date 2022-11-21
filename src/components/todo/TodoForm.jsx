import { useCallback, useState } from 'react'

const TodoForm = ({ action, onSubmit, initialValues }) => {
	let initialFormState = initialValues || {
		title: '',
		// datetime: ''
		files: [],
	}

	const [formData, setFormData] = useState(initialFormState)

	const handleSubmit = useCallback(
		(event) => {
			event.preventDefault()
			onSubmit(formData)
			setFormData(initialFormState)
		},
		[formData, onSubmit]
	)

	const handleInputChange = useCallback((event) => {
		setFormData((actualState) => ({
			...actualState,
			[event.target.name]: event.target.value,
		}))
	}, [])

	return (
		<form className='Form' onSubmit={handleSubmit}>
			<div className='Form__fields'>
				<input
					type='text'
					className='FormInput grow-1'
					name='title'
					required
					placeholder='Заголовок задачи'
					value={formData.title}
					onChange={handleInputChange}
				/>

				{/* <input type='datetime-local' className='FormInput' required /> */}

				{/* <input type='file' className='FormInput' /> */}
			</div>

			{action === 'add' && (
				<button className='Button -primary'>Добавить</button>
			)}

			{action === 'edit' && (
				<button className='Button -sm -primary'>Сохранить</button>
			)}
		</form>
	)
}
export default TodoForm
