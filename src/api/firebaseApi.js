import { initializeApp } from 'firebase/app'
import { getAuth, deleteUser } from 'firebase/auth'
import { collection, getDocs, getFirestore } from 'firebase/firestore'

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

export const getCollection = async (collectionName) => {
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
    return false
  }
}

export const deleteUserFromDB = async (user) => {
  try {
    await deleteUser(user)
    console.log(`Пользователь ${user} удален`)
    return true
  } catch (e) {
    console.log(`Ошибка удаления пользователя ${user}`, e)
    return false
  }
}
