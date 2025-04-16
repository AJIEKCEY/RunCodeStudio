import React from 'react'
import { Button, Flex, Typography } from 'antd/lib'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Flex vertical gap="large" align="center" className="page">
      <Typography.Title style={{ color: '#fff' }}>404</Typography.Title>
      <Typography.Title level={2} style={{ color: '#fff' }}>
        Такой страницы не существует
      </Typography.Title>
      <Button onClick={() => navigate('/')}>На главную</Button>
    </Flex>
  )
}

export default NotFound
