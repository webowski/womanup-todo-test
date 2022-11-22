import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyDfiywh0BFwe1Fy3nLIr2pEzHeMlRRg7aQ',
	authDomain: 'womanup-todo-test.firebaseapp.com',
	projectId: 'womanup-todo-test',
	storageBucket: 'womanup-todo-test.appspot.com',
	messagingSenderId: '676547432872',
	appId: '1:676547432872:web:70ccba83d0b09c0e014d9d',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore()
export const storage = getStorage(app)
