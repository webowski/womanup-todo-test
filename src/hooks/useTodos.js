import { useEffect, useState } from 'react'
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore'
import { db } from '@/backend/firebase'
import { toInputTimeFormat } from '@/helpers/time'

export const useTodos = () => {
	const [todos, setTodos] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(collection(db, 'todos'), orderBy('timestamp', 'desc')),
			(snapshot) => {
				const todosRes = snapshot.docs.map((doc) => {
					let todoData = { _id: doc.id, ...doc.data() }

					if (doc.data()?.datetime) {
						const datetime = toInputTimeFormat(doc.data()?.datetime)
						todoData = { ...todoData, datetime: datetime }
					}

					return todoData
				})
				setTodos(todosRes)
				setIsLoading(false)
			}
		)
		return () => unsubscribe()
	}, [])

	return { todos, isLoading }
}
