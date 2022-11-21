import { useCallback, useState } from 'react'
import { db } from '@/backend/firebase'
import {
	doc,
	updateDoc,
	deleteDoc,
	collection,
	addDoc,
	serverTimestamp,
} from 'firebase/firestore'

export const useTodo = () => {
	const [isTodoPending, setIsTodoPending] = useState(false)

	const addTodo = useCallback(async (newTodoData) => {
		setIsTodoPending(true)
		try {
			await addDoc(collection(db, 'todos'), {
				timestamp: serverTimestamp(),
				title: newTodoData.title,
				datetime: serverTimestamp(),
				isCompleted: false,
				files: newTodoData.files,
			})
		} catch (error) {
			console.error(error)
		} finally {
			setIsTodoPending(false)
		}
	}, [])

	const updateTodo = useCallback(async (id, data) => {
		setIsTodoPending(true)
		try {
			const docRef = doc(db, 'todos', id)
			await updateDoc(docRef, {
				title: data.title,
			})
		} catch (error) {
			console.error(error)
		} finally {
			setIsTodoPending(false)
		}
	}, [])

	const switchTodoCompletion = useCallback(async (id, value) => {
		setIsTodoPending(true)
		const docRef = doc(db, 'todos', id)
		await updateDoc(docRef, {
			isCompleted: value,
		})
		setIsTodoPending(false)
	}, [])

	const deleteTodo = useCallback(async (id) => {
		setIsTodoPending(true)
		const docRef = doc(db, 'todos', id)
		await deleteDoc(docRef)
		setIsTodoPending(false)
	}, [])

	return {
		isTodoPending,
		addTodo,
		updateTodo,
		switchTodoCompletion,
		deleteTodo,
	}
}
