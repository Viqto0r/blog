import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'
import {
  deleteObject,
  getBlob,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage'
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

export const getCollection = async (collectionName, { key, value } = {}) => {
  const q =
    key && value
      ? query(collection(db, collectionName), where(key, '==', value))
      : collection(db, collectionName)

  const querySnapshot = await getDocs(q)

  const allData = []

  querySnapshot.forEach((doc) => {
    const data = { uid: doc.id, ...doc.data() }
    allData.push(data)
  })

  return allData
}

export const getDocByUid = async (docName, uid) => {
  if (!uid) return
  const docRef = doc(db, docName, uid)
  const docSnap = await getDoc(docRef)
  if (!docSnap.exists()) {
    throw new Error(docName + ' is not found')
  }

  const document = docSnap.data()

  if (document.banned) {
    throw new BannedError('User was banned')
  }

  return document
}

export const sendFile = async (key, file, metaData) => {
  const storageRef = ref(storage, `${key}/${file.name}`)
  await uploadBytes(storageRef, file, metaData)

  return storageRef.fullPath
}

export const getFile = async (path) => {
  if (!path) return ''
  const storageRef = ref(storage, path)
  const blob = await getBlob(storageRef)
  return blob
}

export const getUrl = async (path) => {
  if (!path) return ''
  console.log(path)
  const storageRef = ref(storage, path)
  const url = await getDownloadURL(storageRef)
  return url
}

export const deleteFile = async (path) => {
  const storageRef = ref(storage, path)
  await deleteObject(storageRef)
}
