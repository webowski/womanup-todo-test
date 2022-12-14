import React, { useCallback, useRef, useState } from 'react'

const emptyFormState = {
	title: '',
	description: '',
	datetime: '',
	files: '',
}

/**
 * Компонент "Форма добавления/редактироваия задачи"
 * @param {{action: ('edit' | 'add'), onSubmit: Function, onCancel: Function, initialValues: object, isPending: boolean}} props Объект свойств. `action` - действие 'edit' или 'add'. `onSubmit` - функция отправки формы. `initialValues` - начальные значения полей формы. `isPending` - состояние ожидания после отправки формы.
 * @returns {JSX.Element}
 */
const TodoForm = ({
	action,
	onSubmit,
	initialValues = {},
	isPending = false,
	onCancel,
}) => {
	const initialFormState = { ...emptyFormState, ...initialValues }
	const [formData, setFormData] = useState(initialFormState)
	const [filesToUpload, setFilesToUpload] = useState([])
	const fileInput = useRef()

	/**
	 * Обработчик отправки формы
	 */
	const handleSubmit = useCallback(
		async (event) => {
			event.preventDefault()
			await onSubmit(formData, filesToUpload)
			if (action === 'add') {
				setFormData(emptyFormState)
			}
			fileInput.current.value = ''
		},
		// eslint-disable-next-line
		[formData, filesToUpload]
	)

	/**
	 * Опработчик изменения строковых полей
	 */
	const handleInputChange = useCallback((event) => {
		setFormData((actualState) => ({
			...actualState,
			[event.target.name]: event.target.value,
		}))
	}, [])

	/**
	 * Опработчик изменения поля выбора файла
	 * @param {InputEvent} event
	 */
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
					ref={fileInput}
					type='file'
					name='files'
					className='FormInput'
					onChange={handleInputFilesChange}
				/>
			</div>

			<div className='Form__actions'>
				{action === 'add' && (
					<button className='Button -primary'>Добавить</button>
				)}

				{action === 'edit' && (
					<>
						<button className='Button -sm -primary'>Сохранить</button>
						<button className='Button -sm' type='button' onClick={onCancel}>
							Отмена
						</button>
					</>
				)}
			</div>
		</form>
	)
}
export default TodoForm
