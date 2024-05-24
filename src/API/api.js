import { db } from '@/firebase'
import { collection, getDocs, doc, getDoc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore'

export const getTaskById = async (id) => {
  const docRef = doc(db, 'todos', id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const task = {
      id: id,
      title: docSnap.data().title,
      description: docSnap.data().description,
      done: docSnap.data().done,
      date: docSnap.data().date.toDate().toISOString().split('T')[0].split('-').reverse().join('-')
    }
    return task
  } else {
    console.log('No such document!')
  }
}

export const getAllTasks = async () => {
  const tasks = []
  const querySnapshot = await getDocs(collection(db, 'todos'))
  querySnapshot.forEach((doc) => {
    tasks.push({
      id: doc.id,
      title: doc.data().title,
      description: doc.data().description,
      done: doc.data().done,
      date: doc.data().date.toDate().toISOString().split('T')[0].split('-').reverse().join('-')
    })
  })
  return tasks
}

export const createTask = async (task) => {
  task.date = new Date(task.date)
  const docRef = await addDoc(collection(db, 'todos'), task)
  console.log('Document written with ID: ', docRef.id)
}

export const removeTask = async (task) => {
  await deleteDoc(doc(db, 'todos', task.id))
}

export const changeTaskStatusToDone = async (id) => {
  const updatedTask = doc(db, 'todos', id)

  await updateDoc(updatedTask, {
    done: true
  })
}

export const changeTaskStatusToNotDone = async (id) => {
  const updatedTask = doc(db, 'todos', id)

  await updateDoc(updatedTask, {
    done: false
  })
}
