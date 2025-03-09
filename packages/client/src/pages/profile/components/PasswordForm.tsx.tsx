import { Input, Button, Form, message } from 'antd'
import React, { useEffect } from 'react'

import { UserProfilePassword } from '../../../store/features/user/types'
import { useUpdateUserPasswordMutation } from '../../../store/features/user/userApiSlice'
import { isErrorResponse } from '../../../utils/typeguard/isErrorResponse'
import {
  VALIDATION_MESSAGES,
  VALIDATION_RULES,
} from '../../../utils/validation'

const formItemLayout = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 16 },
    sm: { span: 24 },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 10,
    },
    sm: {
      span: 24,
      offset: 10,
    },
  },
}

const PasswordForm: React.FC = () => {
  const [form] = Form.useForm<UserProfilePassword>()
  const [update, { isError, isSuccess, error }] =
    useUpdateUserPasswordMutation()
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = (values: UserProfilePassword) => {
    const data = new FormData()
    data.append('oldPassword', values.oldPassword)
    data.append('newPassword', values.newPassword)
    update(data)
  }
  useEffect(() => {
    if (isError) {
      messageApi.error(
        isErrorResponse(error) ? error.msg : 'Ошибка, попробуйте еще раз'
      )
      if (isSuccess) {
        messageApi.success('Данные сохранены')
      }
    }
  }, [isError, error])

  return (
    <>
      {contextHolder}
      <Form
        {...formItemLayout}
        layout="vertical"
        form={form}
        variant="underlined"
        size="large"
        labelWrap={false}
        name="password"
        onFinish={onFinish}
        style={{ minWidth: 600 }}
        scrollToFirstError>
        <Form.Item
          name="newPassword"
          label="Новый пароль"
          rules={[
            { required: true, message: 'введите новый пароль' },
            {
              pattern: VALIDATION_RULES.password,
              message: VALIDATION_MESSAGES.password,
            },
          ]}
          hasFeedback>
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="oldPassword"
          label="Пароль"
          rules={[
            { required: true, message: 'Пароль обязателен' },
            {
              pattern: VALIDATION_RULES.password,
              message: VALIDATION_MESSAGES.password,
            },
          ]}
          hasFeedback>
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Подтверждение пароля"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Подтвердите пароль',
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

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default PasswordForm
