import { useCallback, useState } from 'react'
import { db, storage } from '@/backend/firebase'
import {
	doc,
	updateDoc,
	deleteDoc,
	collection,
	addDoc,
	serverTimestamp,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { toTimestamp } from '@/helpers/time'

export const useTodo = () => {
	const [isTodoPending, setIsTodoPending] = useState(false)

	const addTodo = useCallback(async (data, files) => {
		setIsTodoPending(true)
		try {
			const uploadedFiles = await uploadTodoFiles(files)

			let dataToAdd = {
				title: data.title,
				description: data.description,
				datetime: toTimestamp(data.datetime),
				isCompleted: false,
				files: uploadedFiles,
				timestamp: serverTimestamp(),
			}

			await addDoc(collection(db, 'todos'), dataToAdd)
		} catch (error) {
			console.error(error)
		} finally {
			setIsTodoPending(false)
		}
		// eslint-disable-next-line
	}, [])

	const updateTodo = useCallback(async (id, data, files) => {
		setIsTodoPending(true)
		try {
			const uploadedFiles = await uploadTodoFiles(files)

			let dataToUpdate = {
				title: data.title,
				description: data.description,
				datetime: toTimestamp(data.datetime),
				files: uploadedFiles,
			}

			const docRef = doc(db, 'todos', id)

			await updateDoc(docRef, dataToUpdate)
		} catch (error) {
			console.error(error)
		} finally {
			setIsTodoPending(false)
		}
		// eslint-disable-next-line
	}, [])

	const switchTodoCompletion = useCallback(async (id, value) => {
		setIsTodoPending(true)
		const docRef = doc(db, 'todos', id)
		try {
			await updateDoc(docRef, {
				isCompleted: value,
			})
		} catch (error) {
			console.error(error)
		} finally {
			setIsTodoPending(false)
		}
	}, [])

	const deleteTodo = useCallback(async (id) => {
		setIsTodoPending(true)
		const docRef = doc(db, 'todos', id)
		try {
			await deleteDoc(docRef)
		} catch (error) {
			console.error(error)
		} finally {
			setIsTodoPending(false)
		}
	}, [])

	const uploadTodoFiles = useCallback(async (filesToUpload) => {
		setIsTodoPending(true)
		let uploadedFiles = []

		if (filesToUpload?.length > 0) {
			const fileRef = ref(storage, `todo-files/${filesToUpload[0].name}`)

			try {
				const snapshot = await uploadBytes(fileRef, filesToUpload[0])
				console.log(
					`Файл ${filesToUpload[0].name} выгружен на Firebase.`,
					snapshot
				)
				const url = await getDownloadURL(snapshot.ref)
				uploadedFiles.push({ url, name: filesToUpload[0].name })
			} catch (error) {
				console.error(error)
			} finally {
				setIsTodoPending(false)
			}
		}

		return uploadedFiles
	}, [])

	return {
		isTodoPending,
		addTodo,
		updateTodo,
		switchTodoCompletion,
		deleteTodo,
		uploadTodoFiles,
	}
}
