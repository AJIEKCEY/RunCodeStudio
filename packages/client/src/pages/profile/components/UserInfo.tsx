import React, { useState } from 'react'
import type { CascaderProps } from 'antd'
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd'

const { Option } = Select

interface DataNodeType {
  value: string
  label: string
  children?: DataNodeType[]
}

const residences: CascaderProps<DataNodeType>['options'] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
]

const formItemLayout = {
  labelCol: {
    xs: { span: 46 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 36 },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

const Userinfo: React.FC = () => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="7">+7</Option>
        <Option value="8">+8</Option>
      </Select>
    </Form.Item>
  )

  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([])

  return (
    <Form
      {...formItemLayout}
      form={form}
      labelWrap={true}
      name="profile"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      style={{ maxWidth: 800 }}
      scrollToFirstError>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        name="newPassword"
        label="Новый пароль"
        rules={[
          {
            required: true,
            message: 'новый пароль',
          },
        ]}
        hasFeedback>
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="password"
        label="Пароль"
        rules={[
          {
            required: true,
            message: 'пароль',
          },
        ]}
        hasFeedback>
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Подтверждение пароля"
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
              return Promise.reject(new Error('пароли не совпадают'))
            },
          }),
        ]}>
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="nickname"
        label="Игровой псевдоним"
        tooltip="никнейм"
        rules={[
          {
            required: true,
            message: 'введите псевдоним',
            whitespace: true,
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        name="country"
        label="Страна"
        rules={[
          {
            type: 'array',
            required: true,
            message: 'введите страну проживания',
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="телефон"
        rules={[{ required: true, message: 'телефон' }]}>
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="about"
        label="О себе"
        rules={[
          { required: true, message: 'можно написать пару слов о себе' },
        ]}>
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>

      <Form.Item
        name="gender"
        label=" Пол"
        rules={[{ required: true, message: 'укажите ваш пол' }]}>
        <Select placeholder="select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Userinfo
