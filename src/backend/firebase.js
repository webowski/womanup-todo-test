// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyDfiywh0BFwe1Fy3nLIr2pEzHeMlRRg7aQ',
	authDomain: 'womanup-todo-test.firebaseapp.com',
	projectId: 'womanup-todo-test',
	storageBucket: 'womanup-todo-test.appspot.com',
	messagingSenderId: '676547432872',
	appId: '1:676547432872:web:70ccba83d0b09c0e014d9d',
}

// Initialize Firebase
initializeApp(firebaseConfig)

export const db = getFirestore()
