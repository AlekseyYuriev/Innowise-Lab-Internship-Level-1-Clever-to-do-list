import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAnfldMPk-5O0K2cmhuwgmzVP3uFulxrj0',
  authDomain: 'clever-to-do-list-15684.firebaseapp.com',
  projectId: 'clever-to-do-list-15684',
  storageBucket: 'clever-to-do-list-15684.appspot.com',
  messagingSenderId: '1054634359880',
  appId: '1:1054634359880:web:237d0ad04d7b017eb5ac7d'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
