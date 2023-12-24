import { memo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Button, Form } from 'antd'

import UserDataForm from '../UserDataFields/UserDataFields'
import _Input from '../_Input/_Input'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import UploadAvatar from '../../UploadAvatar/UploadAvatar'
import useProfileSubmit from '../../../hooks/useProfileSubmit'

import {
  formItemLayout,
  tailFormItemLayout,
} from '../UserDataFields/UserDataFields-config'

const UserProfileForm = () => {
  const { password, phone, country, gender, website, intro } = useSelector(
    (state) => state.currentUser.userData
  )
  const {
    control,
    getValues,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: { phone, country, gender, website, intro },
  })
  const submitHandler = useProfileSubmit(setValue, setError)
  const { isLoading } = useSelector((state) => state.usersData)
  const [passwordValidators, setPasswordValidators] = useState(false)

  useEffect(() => {
    if (watch('oldPassword')) {
      setPasswordValidators({
        correctOldPass: (e) => e === password,
      })
    } else {
      setPasswordValidators(false)
    }
  }, [watch('oldPassword')])

  return (
    <Form
      {...formItemLayout}
      name='profile'
      onFinish={handleSubmit(submitHandler)}
      initialValues={{
        prefix: '7',
      }}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item {...tailFormItemLayout}>
        <UploadAvatar />
      </Form.Item>

      <_Input
        control={control}
        type='password'
        name='oldPassword'
        label='Old password'
        error={errors.oldPassword}
        errorMessage='Incorrect password'
        status={errors.oldPassword && 'error'}
        rules={{
          required: passwordValidators,
          validate: passwordValidators,
        }}
        placeholder={'Old password'}
      />
      <UserDataForm
        control={control}
        errors={errors}
        getValues={getValues}
        errorMessages={{
          password: 'The new password must be different from the old one',
        }}
        requiredPasswords={passwordValidators}
      />

      <Form.Item {...tailFormItemLayout}>
        <Button
          type='primary'
          htmlType='submit'
          form='profile'
          loading={isLoading}
          onClick={() => clearErrors('changeProfile')}
        >
          OK
        </Button>
        {errors.changeProfile && (
          <ErrorMessage errorMessage={errors.changeProfile.message} />
        )}
      </Form.Item>
    </Form>
  )
}

export default memo(UserProfileForm)
