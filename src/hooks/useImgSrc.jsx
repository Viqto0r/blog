import { useEffect, useState } from 'react'
import { getFile } from '../api/firebaseApi'

const useImgSrc = (path) => {
  const [imgSrc, setImgSrc] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSrc = async () => {
      if (!path) {
        setImgSrc(null) // Если ошибки с картинками изменить на ""
        return
      }

      const blob = await getFile(path)
      const src = URL.createObjectURL(blob)
      setImgSrc(src)
    }
    getSrc()
  }, [path])

  return [imgSrc, loading, setLoading]
}

export default useImgSrc
