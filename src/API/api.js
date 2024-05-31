import { db } from '@/firebase'
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore'

export const getTaskById = async (taskId, userId) => {
  const docRef = doc(db, 'users', userId, 'todos', taskId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const task = {
      id: taskId,
      title: docSnap.data().title,
      description: docSnap.data().description,
      done: docSnap.data().done,
      date: docSnap
        .data()
        .date.toDate()
        .toISOString()
        .split('T')[0]
        .split('-')
        .reverse()
        .join('-')
    }
    return task
  } else {
    return
  }
}

export const getAllTasks = async (userId) => {
  const tasks = []
  const querySnapshot = await getDocs(collection(db, 'users', userId, 'todos'))
  querySnapshot.forEach((doc) => {
    tasks.push({
      id: doc.id,
      title: doc.data().title,
      description: doc.data().description,
      done: doc.data().done,
      date: doc
        .data()
        .date.toDate()
        .toISOString()
        .split('T')[0]
        .split('-')
        .reverse()
        .join('-')
    })
  })
  return tasks
}

export const createTask = async (task, id) => {
  task.date = new Date(task.date)
  await addDoc(collection(db, 'users', id, 'todos'), task)
}

export const removeTask = async (task, id) => {
  await deleteDoc(doc(db, 'users', id, 'todos', task.id))
}

export const changeTaskStatusToDone = async (taskId, userId) => {
  const updatedTask = doc(db, 'users', userId, 'todos', taskId)

  await updateDoc(updatedTask, {
    done: true
  })
}

export const changeTaskStatusToNotDone = async (taskId, userId) => {
  const updatedTask = doc(db, 'users', userId, 'todos', taskId)

  await updateDoc(updatedTask, {
    done: false
  })
}

export const updateTask = async (task, userId) => {
  const updatedTask = doc(db, 'users', userId, 'todos', task.id)

  await updateDoc(updatedTask, {
    title: task.title,
    description: task.description,
    date: new Date(task.date)
  })
}
