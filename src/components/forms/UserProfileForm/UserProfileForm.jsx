import { memo, useCallback } from 'react'
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
import { getUrl } from '../../../api/firebaseApi'
import usePasswordValidators from '../../../hooks/usePasswordValidators'

const getDefaultAvatar = async (src) => {
  const url = await getUrl(src)
  if (!url) return { fileList: [] }
  return {
    fileList: [
      {
        uid: '-1',
        name: 'avatar.png',
        status: 'done',
        url,
      },
    ],
  }
}

const UserProfileForm = () => {
  const {
    password,
    phone,
    country,
    gender,
    website,
    intro,
    avatar: avatarSrc,
  } = useSelector((state) => state.currentUser.data)

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
    defaultValues: async () => {
      const avatar = await getDefaultAvatar(avatarSrc)

      return { phone, country, gender, website, intro, avatar }
    },
  })

  const { isLoading } = useSelector((state) => state.usersData)
  const submitProfileHandler = useProfileSubmit(setValue, setError)
  const passwordValidators = usePasswordValidators(password, watch)
  const avatarValue = watch('avatar')

  const removeAvatarHandler = useCallback(() => {
    setValue('avatar', { fileList: [] })
    return false
  }, [])

  return (
    <Form
      {...formItemLayout}
      name='profile'
      onFinish={handleSubmit(submitProfileHandler)}
      initialValues={{
        prefix: '7',
      }}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item {...tailFormItemLayout}>
        <UploadAvatar
          control={control}
          avatar={avatarValue}
          onRemove={removeAvatarHandler}
        />
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
