import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  deleteUser,
} from 'firebase/auth'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore'

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
const db = getFirestore(firebaseApp)

export const sendDataInDB = async (key, user, userData) => {
  try {
    await setDoc(doc(db, key, user.uid), userData)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export const getDataFromDB = async (key, id) => {
  const docRef = doc(db, key, id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    console.log('No such document!')
    return false
  }
}

export const loginFB = async (userEmail, userPassword) => {
  try {
    await signInWithEmailAndPassword(auth, userEmail, userPassword)
  } catch (e) {
    console.log('Ошибка логина', e)
  }
}

export const logoutFB = async () => {
  try {
    await signOut(auth)
  } catch (e) {
    console.log('Ошибка логаута', e)
  }
}

export const createUserFB = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
  } catch (e) {
    console.log('Ошибка создания пользователя')
  }
}

export const getCollectionFromDB = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName))
    const allData = []

    querySnapshot.forEach((doc) => {
      const data = { uid: doc.id, ...doc.data() }
      allData.push(data)
    })

    return allData
  } catch (e) {
    console.log('Ошибка получения коллекции данных', e)
  }
}

export const deleteUserFromDB = async (user) => {
  try {
    await deleteUser(user)
    console.log(`Пользователь ${user} удален`)
  } catch (e) {
    console.log(`Ошибка удаления пользователя ${user}`, e)
  }
}
