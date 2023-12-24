import { memo } from 'react'
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
  //defaultValue = '',
}) => {
  const errorField = error ? <ErrorMessage errorMessage={errorMessage} /> : null
  const addonBefore = addonTextBefore ? (
    <Form.Item noStyle>{addonTextBefore}</Form.Item>
  ) : null

  return (
    <Form.Item label={label} required={rules.required} tooltip={tooltip}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <Input
              type={type}
              status={status}
              placeholder={placeholder}
              prefix={prefix}
              addonBefore={addonBefore}
              onFocus={onFocus}
              //defaultValue={defaultValue}
              {...field}
            />
            {errorField}
          </>
        )}
        rules={rules}
      />
    </Form.Item>
  )
}

export default memo(_Input)
