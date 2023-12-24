import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Button, Drawer, Form, Space } from 'antd'

import UserDataForm from '../UserDataFields/UserDataFields'
import _Input from '../_Input/_Input'

import {
  formItemLayout,
  tailFormItemLayout,
} from '../UserDataFields/UserDataFields-config'

import ErrorMessage from '../ErrorMessage/ErrorMessage'
import useProfileSubmit from '../../../hooks/useProfileSubmit'

const UserProfileSettings = ({ open, onClose }) => {
  const { isLoading } = useSelector((state) => state.usersData)
  const { password, phone, country, gender, website, intro } = useSelector(
    (state) => state.authData.currentUser
  )

  const {
    control,
    getValues,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: { phone, country, gender, website, intro },
  })

  const submitHandler = useProfileSubmit(setValue, setError)

  return (
    <Drawer
      title={`Change profile settings`}
      placement='right'
      size='large'
      onClose={onClose}
      open={open}
      extra={
        <Space>
          <Button
            type='primary'
            htmlType='submit'
            form='profile'
            loading={isLoading}
            onClick={() => clearErrors('changeProfile')}
          >
            OK
          </Button>
        </Space>
      }
    >
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
        <>
          <_Input
            control={control}
            type='password'
            name='oldPassword'
            label='Old password'
            error={errors.oldPassword}
            errorMessage='Incorrect password'
            status={errors.oldPassword && 'error'}
            rules={{
              required: true,
              validate: {
                correctOldPass: (e) => e === password,
              },
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
          />
          {errors.changeProfile && (
            <Form.Item {...tailFormItemLayout}>
              <ErrorMessage errorMessage={errors.changeProfile.message} />
            </Form.Item>
          )}
        </>
      </Form>
    </Drawer>
  )
}

export default memo(UserProfileSettings)
