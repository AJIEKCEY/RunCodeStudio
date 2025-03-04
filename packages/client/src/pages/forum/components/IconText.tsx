import { Space } from 'antd'
import React from 'react'

export const IconText = ({ icon, text }: { icon: React.FC; text: string }) => {
  const Icon = icon
  return (
    <Space>
      {/* {React.createElement(icon)} */}
      {<Icon />}
      {text}
    </Space>
  )
}
