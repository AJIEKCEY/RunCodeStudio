import { Footer } from 'antd/es/layout/layout'
import React from 'react'

type footerProps = {
  text: string
}
function LayoutFooter({ text }: footerProps) {
  return (
    <Footer style={{ textAlign: 'center' }}>
      {text} ©{new Date().getFullYear()}{' '}
    </Footer>
  )
}

export default LayoutFooter
