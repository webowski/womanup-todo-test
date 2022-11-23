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

/**
 * Хук для получения/записи/удаления данных Задачи
 * @returns Объект функций и состояний
 */
export const useTodo = () => {
	const [isTodoPending, setIsTodoPending] = useState(false)

	/**
	 * Добавляет задачу в Firebase
	 * @param {object} data Объект имён и значений полей (кроме файлов) для записи в базу
	 * @param {object[]} files Массив объектов, полученный из поля `input type="file"`
	 */
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

	/**
	 * Обновляет данные задачи в Firebase. Если передан файл, добавляет к имеющимся в задаче
	 * @param {string} id Id задачи
	 * @param {object} data Объект имён и значений полей (кроме файлов) для записи в базу
	 * @param {object[]} files Массив объектов, полученный из поля `input type="file"`
	 */
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

	/**
	 * Меняет состояние завершения задачи (завершено/не завершено)
	 * @param {string} id Id задачи
	 * @param {boolean} isCompleted Значение true/false
	 */
	const switchTodoCompletion = async (id, isCompleted) => {
		setIsTodoPending(true)
		const docRef = doc(db, 'todos', id)
		try {
			await updateDoc(docRef, {
				isCompleted: isCompleted,
			})
		} catch (error) {
			console.error(error)
		} finally {
			setIsTodoPending(false)
		}
	}

	/**
	 * Удаляет задачу
	 * @param {string} id Id задачи
	 */
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

	/**
	 * Выгружает файл в Firebase
	 * @param {object[]} filesToUpload Объект файла, полученный из формы
	 * @returns {Promise<array<{url: string, name: string}>>} Объект файла с именем и адресом
	 */
	const uploadTodoFiles = async (filesToUpload) => {
		let uploadedFiles = []

		if (filesToUpload?.length > 0) {
			const fileRef = ref(storage, `todo-files/${filesToUpload[0].name}`)

			try {
				const snapshot = await uploadBytes(fileRef, filesToUpload[0])
				console.log(
					`Файл ${filesToUpload[0].name} выгружен на Firebase`,
					snapshot
				)
				const url = await getDownloadURL(snapshot.ref)
				uploadedFiles.push({ url, name: filesToUpload[0].name })
			} catch (error) {
				console.error(error)
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
	}
}
