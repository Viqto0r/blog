import { memo, useState } from 'react'
import { AutoComplete, Button, Checkbox, Form, Input, Select } from 'antd'

import {
  countries,
  formItemLayout,
  tailFormItemLayout,
} from './RegistrationForm-config'

const { Option } = Select

const RegistrationForm = ({ onRegistration }) => {
  const [form] = Form.useForm()

  const [autoCompleteResult, setAutoCompleteResult] = useState([])
  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([])
    } else {
      setAutoCompleteResult(
        ['.com', '.org', '.net'].map((domain) => `${value}${domain}`)
      )
    }
  }
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }))

  return (
    <Form
      {...formItemLayout}
      form={form}
      name='register'
      onFinish={onRegistration}
      initialValues={{
        prefix: '7',
      }}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name='nickname'
        label='Nickname'
        tooltip='What do you want others to call you?'
        rules={[
          {
            required: true,
            message: 'Please input your nickname!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='email'
        label='E-mail'
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='password'
        label='Password'
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name='confirm'
        label='Confirm Password'
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error('The new password that you entered do not match!')
              )
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name='gender'
        label='Gender'
        rules={[
          {
            required: true,
            message: 'Please select gender!',
          },
        ]}
      >
        <Select placeholder='select your gender'>
          <Option value='male'>Male</Option>
          <Option value='female'>Female</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name='country'
        label='Country'
        rules={[
          {
            required: true,
            message: 'Please select your country!',
          },
        ]}
      >
        <Select
          showSearch
          style={{
            width: 200,
          }}
          placeholder='Search to Select'
          optionFilterProp='children'
          filterOption={(input, option) =>
            (option?.label ?? '').includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '')
              .toLowerCase()
              .localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={countries}
        />
      </Form.Item>

      <Form.Item
        name='phone'
        label='Phone Number'
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
          addonBefore={<Form.Item noStyle>+7</Form.Item>}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item name='website' label='Website'>
        <AutoComplete
          options={websiteOptions}
          onChange={onWebsiteChange}
          placeholder='website'
        >
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item name='intro' label='Intro'>
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>

      <Form.Item
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
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type='primary' htmlType='submit'>
          Register
        </Button>
      </Form.Item>
    </Form>
  )
}

export default memo(RegistrationForm)
