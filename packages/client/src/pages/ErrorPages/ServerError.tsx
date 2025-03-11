import React from 'react'
import { Flex, Typography } from 'antd'

const ServerError = () => {
  return (
    <Flex vertical gap="large" align="center" className="page">
      <Typography.Title style={{ color: '#fff' }}>Error 500</Typography.Title>
      <Typography.Paragraph style={{ color: '#fff' }}>
        Сервис временно недоступен. Повторите попытку позже или обратитесь в
        поддержку
      </Typography.Paragraph>
    </Flex>
  )
}

export default ServerError
