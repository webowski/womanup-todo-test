import { useCallback, useState } from 'react'

const emptyFormState = {
	title: '',
	description: '',
	datetime: '',
	files: '',
}

const TodoForm = ({
	action,
	onSubmit,
	initialValues = {},
	isPending = false,
}) => {
	const initialFormState = { ...emptyFormState, ...initialValues }
	const [formData, setFormData] = useState(initialFormState)
	const [filesToUpload, setFilesToUpload] = useState([])

	const handleSubmit = useCallback(
		async (event) => {
			event.preventDefault()
			onSubmit(formData, filesToUpload)
			if (action === 'add') setFormData(emptyFormState)
		},
		// eslint-disable-next-line
		[formData, filesToUpload]
	)

	const handleInputChange = useCallback((event) => {
		setFormData((actualState) => ({
			...actualState,
			[event.target.name]: event.target.value,
		}))
	}, [])

	const handleInputFilesChange = (event) => {
		setFilesToUpload(event.target.files)
	}

	return (
		<form
			className={`Form${isPending ? ' is-pending' : ''}`}
			onSubmit={handleSubmit}
		>
			<div className='Form__fields'>
				<input
					type='text'
					name='title'
					required
					className='FormInput grow-1'
					placeholder='Заголовок задачи'
					value={formData.title}
					onChange={handleInputChange}
				/>

				<input
					type='datetime-local'
					name='datetime'
					required
					className='FormInput'
					value={formData.datetime}
					onChange={handleInputChange}
				/>

				<textarea
					name='description'
					className='FormInput'
					placeholder='Описание задачи (необязательно)'
					value={formData.description}
					onChange={handleInputChange}
				/>

				<input
					type='file'
					name='files'
					className='FormInput'
					onChange={handleInputFilesChange}
				/>
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
