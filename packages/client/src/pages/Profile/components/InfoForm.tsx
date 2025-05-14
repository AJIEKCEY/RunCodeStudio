import { Input, Button, Form, message } from 'antd/lib'
import React, { useEffect } from 'react'

import { UserProfile } from '../../../store/features/user/types'
import { VALIDATION_RULES, VALIDATION_MESSAGES } from '../../../utils/validation'
import { useUpdateUserInfoMutation } from '../../../store/features/user/userApiSlice'
import { isErrorResponse } from '../../../utils/typeguard/isErrorResponse'

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
type UserInfoProps = Partial<UserProfile>

const InfoForm = (props: UserInfoProps) => {
  const [formInfo] = Form.useForm<UserProfile>()
  const [update, { isError, isSuccess, error }] = useUpdateUserInfoMutation()
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = (values: UserProfile) => {
    const data = new FormData()
    Object.entries(values).forEach(([key, value]) => {
      data.append(key, value)
    })
    update(data)
  }
  useEffect(() => {
    if (isError) {
      if (error && isErrorResponse(error)) {
        messageApi.error(error.msg)
      } else {
        messageApi.error('Ошибка, попробуйте еще раз')
      }
    }
    if (isSuccess) {
      messageApi.success('Данные сохранены')
    }
  }, [isError, error, isSuccess])
  return (
    <>
      {contextHolder}
      <Form
        {...formItemLayout}
        form={formInfo}
        layout="vertical"
        variant="underlined"
        size="middle"
        labelWrap={false}
        name="profile"
        onFinish={onFinish}
        style={{ minWidth: 600 }}
        scrollToFirstError
        initialValues={props}
      >
        <Form.Item
          name="first_name"
          label="Имя "
          rules={[
            {
              pattern: VALIDATION_RULES.username,
              message: VALIDATION_MESSAGES.username,
            },
          ]}
        >
          <Input placeholder="Имя пользователя" />
        </Form.Item>
        <Form.Item
          name="second_name"
          label="Фамилия"
          rules={[
            {
              pattern: VALIDATION_RULES.second_name,
              message: VALIDATION_MESSAGES.second_name,
            },
          ]}
        >
          <Input placeholder="Фамилия пользователя" />
        </Form.Item>
        <Form.Item
          name="display_name"
          label="Никнейм"
          rules={[
            {
              pattern: VALIDATION_RULES.username,
              message: VALIDATION_MESSAGES.username,
            },
          ]}
        >
          <Input placeholder="Никнейм пользователя" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Телефон"
          rules={[
            {
              pattern: VALIDATION_RULES.phone,
              message: VALIDATION_MESSAGES.phone,
            },
          ]}
        >
          <Input placeholder="Телефон" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Почта"
          rules={[
            {
              pattern: VALIDATION_RULES.email,
              message: VALIDATION_MESSAGES.email,
            },
          ]}
        >
          <Input placeholder="Почта пользователя" />
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

export default InfoForm
