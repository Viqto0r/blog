import { useEffect, useState } from 'react'
import { getFile } from '../api/firebaseApi'

const useImgSrc = (path) => {
  const [imgSrc, setImgSrc] = useState('')

  useEffect(() => {
    const getSrc = async () => {
      if (!path) {
        setImgSrc('')
        return
      }
      const blob = await getFile(path)
      const src = URL.createObjectURL(blob)
      setImgSrc(src)
    }
    getSrc()
  }, [path])

  return imgSrc
}

export default useImgSrc
