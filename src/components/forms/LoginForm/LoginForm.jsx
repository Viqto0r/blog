import { memo, useCallback } from 'react'
import { Button, Checkbox, Form } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import ErrorMessage from '../ErrorMessage/ErrorMessage'
import _Input from '../../forms/_Input/_Input'

import { emailPattern } from '../validationPatterns'
import { login } from '../../../store/slices/authSlice'
import { BannedError } from '../../../utils/errors'

const LoginForm = ({ onShowForm, onHideForms }) => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.authData)
  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  const submitHandler = async (userData) => {
    try {
      await dispatch(login(userData)).unwrap()
      onHideForms()
    } catch (e) {
      let message = 'Invalid login or password'

      if (e.name === 'BannedError') {
        message = e.message
      }

      setError('authError', {
        type: 'auth error',
        message,
      })
    }
  }

  const clearErrorHandler = useCallback(() => {
    if (errors.authError) {
      clearErrors('authError')
    }
  }, [errors.authError])

  return (
    <Form
      name='normal_login'
      className='login-form'
      initialValues={{
        remember: true,
      }}
      onFinish={handleSubmit(submitHandler)}
    >
      <_Input
        name='email'
        control={control}
        error={errors.email}
        errorMessage='Invalid email'
        status={(errors.email || errors.authError) && 'error'}
        rules={{
          required: true,
          pattern: emailPattern,
          validate: { notEmpty: (e) => e !== undefined },
        }}
        prefix={<MailOutlined />}
        placeholder={'Email'}
        onFocus={clearErrorHandler}
      />
      <_Input
        control={control}
        type='password'
        name='password'
        error={errors.password}
        errorMessage='Enter your password'
        status={(errors.password || errors.authError) && 'error'}
        rules={{
          required: true,
          validate: { notEmpty: (e) => e !== undefined },
        }}
        prefix={<LockOutlined className='site-form-item-icon' />}
        placeholder={'Password'}
        onFocus={clearErrorHandler}
      />

      <ErrorMessage errorMessage={errors.authError?.message} />

      <Form.Item>
        <Form.Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Log in
        </Button>
        Or <a onClick={() => onShowForm('registration')}>register now!</a>
      </Form.Item>
    </Form>
  )
}

export default memo(LoginForm)
