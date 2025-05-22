import React, { useState } from 'react'
import { Form, Input, Button, Typography, Flex, message } from 'antd/lib'
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import styles from './Registration.module.css'
import { useAuth } from '../../hooks/useAuth'
import { VALIDATION_RULES, VALIDATION_MESSAGES } from '../../utils/validation'
import {
  useSignUpUserMutation,
  useLogoutUserMutation,
} from '../../store/features/user/userApiSlice'

const { Title } = Typography

interface RegistrationFormValues {
  first_name: string
  second_name: string
  login: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

const Registration = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm<RegistrationFormValues>()
  const [signUp, { isLoading }] = useSignUpUserMutation()
  const [logout] = useLogoutUserMutation()
  const { login } = useAuth()
  const [retrying, setRetrying] = useState(false)

  const onFinish = async (values: RegistrationFormValues): Promise<void> => {
    const payload = {
      first_name: values.first_name,
      second_name: values.second_name,
      login: values.login,
      email: values.email,
      password: values.password,
      phone: values.phone,
    }

    try {
      const data = await signUp(payload).unwrap()
      messageApi.success('Регистрация прошла успешно!')
      login({ name: values.login, isAuthenticated: true })
    } catch (err: any) {
      console.error('Ошибка регистрации:', err)
      const reason = err?.data?.reason || err?.data?.message || 'Неизвестная ошибка'

      // Если пользователь уже в системе и ещё не пробовали разлогинить — выйдем и повторим
      if (reason === 'User already in system' && !retrying) {
        try {
          await logout({}).unwrap()
          setRetrying(true)
          messageApi.info('Выход выполнен, повторная попытка регистрации')
          return onFinish(values as RegistrationFormValues)
        } catch (logoutErr) {
          console.error('Ошибка при logout:', logoutErr)
          messageApi.error('Не удалось разлогиниться перед регистрацией')
        }
      } else {
        messageApi.error(`Ошибка при регистрации: ${reason}`)
      }
    }
  }

  return (
    <Flex vertical justify="center" align="center" className={styles.container}>
      <Title level={2}>Регистрация</Title>
      {contextHolder}
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className={styles.form}
        initialValues={{
          first_name: '',
          second_name: '',
          login: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
        }}
      >
        <Form.Item
          name="first_name"
          label="Имя"
          rules={[{ required: true, message: 'Укажите имя' }]}
        >
          <Input placeholder="Имя" />
        </Form.Item>

        <Form.Item
          name="second_name"
          label="Фамилия"
          rules={[{ required: true, message: 'Укажите фамилию' }]}
        >
          <Input placeholder="Фамилия" />
        </Form.Item>

        <Form.Item
          name="login"
          label="Логин"
          rules={[
            { required: true, message: 'Логин обязателен' },
            {
              pattern: VALIDATION_RULES.username,
              message: VALIDATION_MESSAGES.username,
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Логин" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Email обязателен' },
            {
              type: 'email',
              pattern: VALIDATION_RULES.email,
              message: VALIDATION_MESSAGES.email,
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Телефон"
          rules={[
            { required: true, message: 'Телефон обязателен' },
            {
              pattern: VALIDATION_RULES.phone,
              message: VALIDATION_MESSAGES.phone,
            },
          ]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="+7 (900) 123-45-67" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Пароль"
          rules={[
            { required: true, message: 'Пароль обязателен' },
            {
              pattern: VALIDATION_RULES.password,
              message: VALIDATION_MESSAGES.password,
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Подтвердите пароль"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Подтверждение пароля обязательно' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Пароли не совпадают'))
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Подтвердите пароль" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  )
}
export const initRegistrationPage = () => Promise.resolve()
export default Registration
