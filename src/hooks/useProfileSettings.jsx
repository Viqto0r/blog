import { useCallback, useState } from 'react'

const useProfileSettings = () => {
  const [showProfileSettings, setShowProfileSettings] = useState(false)

  const toggleProfileSettings = useCallback(() => {
    setShowProfileSettings((state) => !state)
  }, [])

  return { showProfileSettings, toggleProfileSettings }
}

export default useProfileSettings
