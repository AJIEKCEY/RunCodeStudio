import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Typography, Flex } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAuth } from "../../hooks/useAuth";

import styles from './Auth.module.css'

const { Title } = Typography

interface LoginFormValues {
  username: string
  password: string
}

const Auth= () => {
  const [form] = Form.useForm<LoginFormValues>();
  const [clientReady, setClientReady] = useState<boolean>(false);
  const { login } = useAuth();

  useEffect(() => {
    setClientReady(true)
  }, [])

  const onFinish = async (values: LoginFormValues) => {
    console.log('Finish:', values);

    const {username, password} = values

    if (username === "user" && password === "password") {
      // Здесь будет реализована логика авторизации после добавление бэкенда.
      await login({ id: 1, name: username, isAuthenticated: true });
    } else {
      alert("Invalid username or password");
    }
  }

  return (
    <Flex
      vertical={true}
      justify={'center'}
      align={'center'}
      className={styles.container}>
      <Title level={2}>Авторизация</Title>
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
