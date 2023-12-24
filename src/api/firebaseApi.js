import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { BannedError } from '../utils/errors'

const firebaseConfig = {
  apiKey: 'AIzaSyDCtk805Xq9C83daYZABmCPbKgi4D-8Plg',
  authDomain: 'blog-595a1.firebaseapp.com',
  databaseURL: 'https://blog-595a1-default-rtdb.firebaseio.com',
  projectId: 'blog-595a1',
  storageBucket: 'blog-595a1.appspot.com',
  messagingSenderId: '96776744518',
  appId: '1:96776744518:web:fe5116259f856e4c812447',
}

const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)

export const getCollection = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName))
  const allData = []

  querySnapshot.forEach((doc) => {
    const data = { uid: doc.id, ...doc.data() }
    allData.push(data)
  })

  return allData
}

export const getUserByUid = async (uid) => {
  const docRef = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)
  if (!docSnap.exists()) {
    throw new Error('User is not found')
  }

  const user = docSnap.data()

  if (user.banned) {
    throw new BannedError('User was banned')
  }

  return user
}
