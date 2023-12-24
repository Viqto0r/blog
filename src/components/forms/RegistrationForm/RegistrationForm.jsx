import { memo, useCallback } from 'react'
import { Button, Form } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import _Input from '../_Input/_Input'
import _Select from '../_Select/_Select'
import _Checkbox from '../_Checkbox/_Checkbox'
import useEmailError from '../../../hooks/useEmailError'

import { registerUser } from '../../../store/slices/currentUserSlice'
import {
  formItemLayout,
  tailFormItemLayout,
} from '../UserDataFields/UserDataFields-config'
import { emailPattern } from '../validationPatterns'
import UserDataFields from '../UserDataFields/UserDataFields'

const RegistrationForm = ({ onHideForms }) => {
  const {
    control,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.currentUser)
  const emailError = useEmailError(errors)

  const clearErrorHandler = useCallback(() => {
    if (errors.regError) {
      clearErrors('regError')
    }
  }, [errors.regError])

  const submitHandler = async (userData) => {
    try {
      await dispatch(
        registerUser({ ...userData, role: 'user', banned: false })
      ).unwrap()
      onHideForms()
    } catch (e) {
      setError('regError', {
        type: 'regError',
        message: 'Email already in use',
      })
    }
  }
  return (
    <Form
      {...formItemLayout}
      name='register'
      onFinish={handleSubmit(submitHandler)}
      onCancel={onHideForms}
      initialValues={{
        prefix: '7',
      }}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <_Input
        name='email'
        control={control}
        error={emailError.error}
        errorMessage={emailError.errorMessage}
        status={emailError.status}
        label='Email'
        onFocus={clearErrorHandler}
        rules={{
          required: true,
          pattern: emailPattern,
          validate: { notEmpty: (e) => e !== undefined },
        }}
        placeholder={'Email'}
      />
      <UserDataFields
        control={control}
        errors={errors}
        getValues={getValues}
        errorMessages={{
          password:
            'Password must contain minimum 6 characters, at least one uppercase letter, one lowercase letter and one number.',
        }}
      />

      <_Checkbox
        control={control}
        name='agreement'
        error={errors.agreement}
        errorMessage='Should accept agreement'
        rules={{
          required: true,
        }}
      />
      <Form.Item {...tailFormItemLayout}>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Register
        </Button>
      </Form.Item>
    </Form>
  )
}

export default memo(RegistrationForm)
