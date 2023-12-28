import { memo, useState } from 'react'
import { Form, Input } from 'antd'
import { Controller } from 'react-hook-form'

import ErrorMessage from '../ErrorMessage/ErrorMessage'

const _Input = ({
  name,
  type = 'text',
  control,
  rules = { required: false },
  label,
  error,
  prefix,
  placeholder,
  errorMessage,
  tooltip,
  addonTextBefore,
  status,
  onFocus,
}) => {
  const errorField = error ? <ErrorMessage errorMessage={errorMessage} /> : null
  const addonBefore = addonTextBefore ? (
    <Form.Item noStyle>{addonTextBefore}</Form.Item>
  ) : null

  const inputProps = { type, status, placeholder, prefix, addonBefore, onFocus }
  const Field = type === 'password' ? Input.Password : Input

  return (
    <Form.Item label={label} required={rules.required} tooltip={tooltip}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            {<Field {...inputProps} {...field} />}
            {errorField}
          </>
        )}
        rules={rules}
      />
    </Form.Item>
  )
}

export default memo(_Input)
