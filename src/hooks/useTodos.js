import { useEffect, useState } from 'react'
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore'
import { db } from '@/backend/firebase'
import dayjs from 'dayjs'

const timePattern = 'HH:mm DD.MM.YYYY' // input[datetime] 'd/m/Y H:i:s'

export const useTodos = () => {
	const [todos, setTodos] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(collection(db, 'todos'), orderBy('timestamp', 'desc')),
			(snapshot) => {
				const todosRes = snapshot.docs.map((doc) => {
					let todoData = { _id: doc.id, ...doc.data() }

					if (doc.data()?.timestamp) {
						const timeSeconds = doc.data()?.datetime.seconds
						const timestamp = dayjs.unix(timeSeconds).format(timePattern)
						todoData = { ...todoData, datetime: timestamp }
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
