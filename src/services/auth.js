import { auth } from '@/firebase'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

export const createUser = async (email, password) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password)
    return user
  } catch (error) {
    throw new Error(`${error.code}`)
  }
}

export const login = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password)
    return user
  } catch (error) {
    throw new Error(`${error.code}`)
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    throw new Error(`${error.code}`)
  }
}

export const getCurrentUser = () => {
  return new Promise((resolve) => {
    const removeListener = onAuthStateChanged(auth, (user) => {
      removeListener()
      resolve(user)
    })
  })
}
