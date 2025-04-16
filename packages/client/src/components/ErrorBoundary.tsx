import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Flex, Typography } from 'antd/lib'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Flex vertical gap="large" align="center" className="page">
          <Typography.Title style={{ color: '#fff' }}>
            Что-то пошло не так ...
          </Typography.Title>
        </Flex>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
