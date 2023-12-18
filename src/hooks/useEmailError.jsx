import { useEffect, useState } from 'react'

const useEmailError = (errors) => {
  const [emailError, setEmailError] = useState({
    error: null,
    errorMessage: '',
    status: '',
  })

  useEffect(() => {
    let errorMessage = ''
    let status = ''
    let error = null

    if (errors.email) {
      error = errors.email
      errorMessage = 'Invalid email'
      status = 'error'
    } else if (errors.regError) {
      error = errors.regError
      errorMessage = 'Email has already use'
      status = 'error'
    }

    setEmailError({ errorMessage, status, error })
  }, [errors.email, errors.regError])

  return emailError
}

export default useEmailError
