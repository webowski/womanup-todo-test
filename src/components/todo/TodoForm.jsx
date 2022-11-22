import { useCallback, useEffect, useState } from 'react'
import { storage } from '@/backend/firebase'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'

const emptyFormState = {
	title: '',
	description: '',
	datetime: '',
	files: [],
}

const TodoForm = ({ action, onSubmit, initialValues = {} }) => {
	const initialFormState = { ...emptyFormState, ...initialValues }
	const [formData, setFormData] = useState(initialFormState)

	const [filesToUpload, setFilesToUpload] = useState([])
	const [filesList, setFilesList] = useState([])
	const filesListRef = ref(storage, 'todo-files/')

	const handleSubmit = useCallback(
		async (event) => {
			event.preventDefault()

			if (filesToUpload?.length > 0) {
				let fileRef = ref(storage, `todo-files/${filesToUpload[0].name}`)
				await uploadBytes(fileRef, filesToUpload[0])
					.then((snapshot) => {
						getDownloadURL(snapshot.ref).then((url) => {
							setFilesList((actual) => [
								...actual,
								{ url, name: filesToUpload[0].name },
							])
						})
					})
					.catch((error) => {
						console.log(error)
					})
			}

			onSubmit(formData)

			if (action === 'add') setFormData(emptyFormState)
		},
		// eslint-disable-next-line
		[formData, filesToUpload]
	)

	useEffect(
		() => {
			listAll(filesListRef).then((response) => {
				response.items.forEach((item) => {
					getDownloadURL(item).then((url) => {
						setFilesList((actual) => [...actual, { url, name: item.name }])
					})
				})
			})
		},
		// eslint-disable-next-line
		[]
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
		<form className='Form' onSubmit={handleSubmit}>
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
					multiple
					className='FormInput'
					onChange={handleInputFilesChange}
				/>
				{filesList.map((file) => (
					<div key={file.url}>
						<a href={file.url} target='_blank' rel='noreferrer'>
							{file.name}
						</a>
					</div>
				))}
			</div>

			{action === 'add' && (
				<button className='Button -primary Form__submit'>Добавить</button>
			)}

			{action === 'edit' && (
				<button className='Button -sm -primary Form__submit'>Сохранить</button>
			)}
		</form>
	)
}
export default TodoForm
