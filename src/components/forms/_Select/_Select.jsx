import { Form, Select } from 'antd'
import { Controller } from 'react-hook-form'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { memo } from 'react'

const _Select = ({
  name,
  control,
  placeholder,
  rules = { required: false },
  label,
  error,
  errorMessage,
  tooltip,
  showSearch = false,
  styles,
  options,
}) => {
  const errorField = error ? <ErrorMessage errorMessage={errorMessage} /> : null
  let filterParams = {}

  if (showSearch) {
    filterParams = {
      filterOption: (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
      filterSort: (optionA, optionB) =>
        (optionA?.label ?? '')
          .toLowerCase()
          .localeCompare((optionB?.label ?? '').toLowerCase()),
    }
  }

  return (
    <Form.Item label={label} required={rules.required} tooltip={tooltip}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <Select
              showSearch={showSearch}
              style={styles}
              placeholder={placeholder}
              optionFilterProp='children'
              options={options}
              status={errorField && 'error'}
              {...filterParams}
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

export default memo(_Select)
