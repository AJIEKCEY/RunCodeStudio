import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Typography, Flex, message } from 'antd/lib'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAuth } from '../../hooks/useAuth'
import { useSignInUserMutation } from '../../store/features/user/userApiSlice'

import styles from './Auth.module.css'

const { Title } = Typography

interface LoginFormValues {
  username: string
  password: string
}

const Auth = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm<LoginFormValues>()
  const [signIn, { isError, isSuccess, error }] = useSignInUserMutation()
  const [userName, setUserName] = useState('')
  const { login } = useAuth()

  const onFinish = async (values: LoginFormValues) => {
    const { username, password } = values
    setUserName(username)
    signIn({ login: username, password })
  }

  useEffect(() => {
    if (isError) {
      const errorData = (error as { data: { reason: string } })?.data
      if (errorData && errorData.reason === 'User already in system') {
        login({ name: 'serghey', isAuthenticated: true })
      }
      messageApi.error(errorData?.reason || 'Ошибка, попробуйте еще раз')
    }
    if (isSuccess) {
      messageApi.success('Данные сохранены')
      login({ name: userName, isAuthenticated: true })
    }
  }, [isError, error, isSuccess])

  return (
    <Flex
      vertical={true}
      justify={'center'}
      align={'center'}
      className={styles.container}>
      <Title level={2}>Авторизация</Title>
      {contextHolder}
      <Form
        form={form}
        name="horizontal_login"
        layout="vertical"
        onFinish={onFinish}
        className={styles.form}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Имя пользователя обязательно',
            },
          ]}
          className={styles.formItem}>
          <Input
            prefix={<UserOutlined />}
            placeholder="Имя пользователя"
            className={styles.input}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Пароль обязателен',
            },
          ]}
          className={styles.formItem}>
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Пароль"
            className={styles.input}
          />
        </Form.Item>

        <Form.Item shouldUpdate className={styles.formItem}>
          {() => (
            <Button
              block
              type="primary"
              htmlType="submit"
              className={styles.button}>
              Авторизоваться
            </Button>
          )}
        </Form.Item>
      </Form>
    </Flex>
  )
}

export default Auth
