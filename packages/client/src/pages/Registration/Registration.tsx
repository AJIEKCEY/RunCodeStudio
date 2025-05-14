import React from 'react'
import { Form, Input, Button, Typography, Flex } from 'antd/lib'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import styles from './Registration.module.css'
import { VALIDATION_RULES, VALIDATION_MESSAGES } from '../../utils/validation'

const { Title } = Typography

interface RegistrationFormValues {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const Registration = () => {
  const [form] = Form.useForm<RegistrationFormValues>()

  const onFinish = (values: RegistrationFormValues) => {
    console.info('Форма отправлена:', values)
    // Здесь можно добавить логику отправки данных на сервер
  }

  return (
    <Flex vertical={true} justify={'center'} align={'center'} className={styles.container}>
      <Title level={2}>Регистрация</Title>
      <Form
        className={styles.form}
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
      >
        <Form.Item
          name="username"
          label="Имя пользователя"
          rules={[
            { required: true, message: 'Имя пользователя обязательно' },
            {
              pattern: VALIDATION_RULES.username,
              message: VALIDATION_MESSAGES.username,
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Имя пользователя" />
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
          <Button type="primary" htmlType="submit" block>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  )
}
export const initRegistrationPage = () => Promise.resolve()
export default Registration
