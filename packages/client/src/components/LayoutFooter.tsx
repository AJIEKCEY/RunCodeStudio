import { Layout } from 'antd'
import React from 'react'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import { Flex } from 'antd'

type footerProps = {
  text: string
  onFullScreen: VoidFunction
  isFullScreen: boolean
}
function LayoutFooter({ text, onFullScreen, isFullScreen }: footerProps) {
  return (
    <Layout>
      <Flex justify="space-between">
        {text} ©{new Date().getFullYear()}
        {isFullScreen ? (
          <FullscreenExitOutlined onClick={onFullScreen} />
        ) : (
          <FullscreenOutlined onClick={onFullScreen} />
        )}
      </Flex>
    </Layout>
  )
}

export default LayoutFooter
