import { useEffect, useState } from 'react'

const usePasswordValidators = (password, watch) => {
  const [passwordValidators, setPasswordValidators] = useState(false)
  const [oldPasswordValue, passwordValue] = watch(['oldPassword', 'password'])

  useEffect(() => {
    if (oldPasswordValue || passwordValue) {
      setPasswordValidators({
        correctOldPass: (e) => e === password,
      })
    } else {
      setPasswordValidators(false)
    }
  }, [oldPasswordValue, passwordValue])

  return passwordValidators
}

export default usePasswordValidators
