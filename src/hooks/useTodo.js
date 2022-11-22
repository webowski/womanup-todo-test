import { useState } from 'react'
import { db, storage } from '@/backend/firebase'
import {
	doc,
	updateDoc,
	deleteDoc,
	collection,
	addDoc,
	getDoc,
	serverTimestamp,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { toTimestamp } from '@/helpers/time'

export const useTodo = () => {
	const [isTodoPending, setIsTodoPending] = useState(false)

	const addTodo = async (data, files) => {
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
	}

	const updateTodo = async (id, data, files) => {
		setIsTodoPending(true)
		try {
			const uploadedFiles = await uploadTodoFiles(files)
			const docRef = doc(db, 'todos', id)

			const todoSnap = await getDoc(docRef)
			const existedTodoFiles = todoSnap.data().files

			if (existedTodoFiles.length) {
				uploadedFiles.push(...existedTodoFiles)
			}

			let dataToUpdate = {
				title: data.title,
				description: data.description,
				datetime: toTimestamp(data.datetime),
				files: uploadedFiles,
			}

			await updateDoc(docRef, dataToUpdate)
		} catch (error) {
			console.error(error)
		} finally {
			setIsTodoPending(false)
		}
	}

	const switchTodoCompletion = async (id, value) => {
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
	}

	const deleteTodo = async (id) => {
		setIsTodoPending(true)
		const docRef = doc(db, 'todos', id)
		try {
			await deleteDoc(docRef)
		} catch (error) {
			console.error(error)
		} finally {
			setIsTodoPending(false)
		}
	}

	const uploadTodoFiles = async (filesToUpload) => {
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
	}

	return {
		isTodoPending,
		addTodo,
		updateTodo,
		switchTodoCompletion,
		deleteTodo,
		uploadTodoFiles,
	}
}
