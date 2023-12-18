import { Form, Checkbox } from 'antd'
import { Controller } from 'react-hook-form'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { memo } from 'react'
import { tailFormItemLayout } from '../RegistrationForm/RegistrationForm-config'

const _Checkbox = ({
  name,
  control,
  rules = { required: false },
  error,
  errorMessage,
}) => {
  const errorField = error ? (
    <>
      <br />
      <ErrorMessage errorMessage={errorMessage} />{' '}
    </>
  ) : null

  {
    /*<Form.Item
        name='agreement'
        valuePropName='checked'
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href=''>agreement</a>
        </Checkbox>
      </Form.Item>*/
  }

  return (
    <Form.Item {...tailFormItemLayout}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <>
              <Checkbox {...field} checked={field.value}>
                I have read the <a href=''>agreement</a>
              </Checkbox>
              {errorField}
            </>
          )
        }}
        rules={rules}
      />
    </Form.Item>
  )
}

export default memo(_Checkbox)
