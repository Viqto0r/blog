import { memo, useCallback } from 'react'
import { Button, Form } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import _Input from '../_Input/_Input'
import _Select from '../_Select/_Select'
import _Checkbox from '../_Checkbox/_Checkbox'
import useEmailError from '../../../hooks/useEmailError'

import { registerUser } from '../../../store/slices/authSlice'
import {
  countries,
  formItemLayout,
  genders,
  tailFormItemLayout,
} from './RegistrationForm-config'
import { emailPattern, passwordPattern } from '../validationPatterns'

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
  const { isLoading } = useSelector((state) => state.authData)
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

      <_Input
        control={control}
        type='password'
        name='password'
        label='Password'
        error={errors.password}
        errorMessage='Password must contain minimum 6 characters, at least one
                uppercase letter, one lowercase letter and one number.'
        status={errors.password && 'error'}
        rules={{
          required: true,
          //pattern: passwordPattern,
          validate: { notEmpty: (e) => e !== undefined },
        }}
        placeholder={'Password'}
      />
      <_Input
        control={control}
        type='password'
        name='confirm'
        label='Password'
        error={errors.confirm}
        errorMessage='Passwords mismatch'
        rules={{
          required: true,
          validate: {
            match: (e) => e === getValues('password'),
          },
        }}
        placeholder={'Confirm password'}
      />
      <_Select
        control={control}
        name='gender'
        error={errors.gender}
        errorMessage='Please select gender'
        label='Gender'
        options={genders}
        rules={{
          required: true,
          validate: {
            match: (e) => e === getValues('gender'),
          },
        }}
      />
      <_Select
        control={control}
        name='country'
        label='Country'
        error={errors.country}
        errorMessage='Please select your country!'
        options={countries}
        showSearch={true}
        placeholder='Search your country'
        styles={{ width: 200 }}
        rules={{
          required: true,
          validate: { notEmpty: (e) => e !== undefined },
        }}
      />
      <_Input
        type='number'
        name='phone'
        control={control}
        error={errors.phone}
        errorMessage='Invalid phone'
        label='Phone'
        rules={{
          required: true,
          pattern: /\d{10}/,
          validate: { notEmpty: (e) => e !== undefined },
        }}
        placeholder={'Phone'}
        addonTextBefore='+7'
      />
      <_Input name='website' label='Website' control={control} />
      <_Input name='intro' label='Intro' control={control} />

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
