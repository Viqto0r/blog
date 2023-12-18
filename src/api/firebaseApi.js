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

// Переписать логику на создание юзера в async thunk

//const sendDataInDB = async (key, user, userData) => {
//  console.log(userData)
//  try {
//    return await setDoc(doc(db, key, user.uid), userData)
//  } catch (e) {
//    console.error('Error adding document: ', e)
//    return false
//  }
//}

//export const getDataFromDB = async (key, id) => {
//  const docRef = doc(db, key, id)
//  try {
//    const docSnap = await getDoc(docRef)
//    if (!docSnap.exists()) {
//      throw new Error('Данные пользователя не найдены')
//    }
//    return docSnap.data()
//  } catch (e) {
//    console.log(e)
//    return false
//  }
//}

//export const loginFB = async ({ email, password }) => {
//  try {
//    return await signInWithEmailAndPassword(auth, email, password)
//  } catch (e) {
//    console.log('Ошибка логина', e)
//    return false
//  }
//}

//export const logoutFB = async () => {
//  try {
//    return await signOut(auth)
//  } catch (e) {
//    console.log('Ошибка логаута', e)
//    return false
//  }
//}

//const filterUserData = ({ agreement, confirm, ...rest }) => rest

//export const createUserFB = async (userData) => {
//  const filteredUserData = filterUserData(userData)

//  try {
//    const { user } = await createUserWithEmailAndPassword(
//      auth,
//      userData.email,
//      userData.password
//    )
//    return await sendDataInDB('users', user, filteredUserData)
//  } catch (e) {
//    console.log('Ошибка создания пользователя')
//    return false
//  }
//}

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
