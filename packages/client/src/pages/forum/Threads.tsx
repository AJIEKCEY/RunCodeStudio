import React, { useState } from 'react'
import { Card, Space, Tag, Button, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ClockCircleOutlined, TagOutlined, UserOutlined } from '@ant-design/icons'
import { useGetThreadsQuery, useGetCategoriesQuery } from '../../store/features/forum/forumApiSlice'
import { Post } from '../../store/features/forum/types'
import CreateThreadModal from './components/CreateThreadModal'
import ForumNavigation from './components/ForumNavigation'

const Threads: React.FC = () => {
  const navigate = useNavigate()
  const { data: threads, isLoading: isThreadsLoading } = useGetThreadsQuery()
  const { data: categories, isLoading: isCategoriesLoading } = useGetCategoriesQuery()
  const [showModal, setShowModal] = useState(false)

  const handleNavigateToThread = (threadId: number) => {
    navigate(`/forum/${threadId}`)
  }

  if (isThreadsLoading || isCategoriesLoading) return <div>Загрузка...</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <ForumNavigation />

      {threads?.map((thread: Post) => (
        <Card
          key={thread.id}
          hoverable
          onClick={() => handleNavigateToThread(thread.id)}
          style={{ cursor: 'pointer' }}
        >
          <Space size="middle" style={{ marginBottom: 16 }}>
            <Tag icon={<UserOutlined />}>{thread.user.firstname}</Tag>
            <Tag icon={<ClockCircleOutlined />}>
              {thread.createdAt ? new Date(thread.createdAt).toLocaleDateString() : 'Нет даты'}
            </Tag>
            <Tag icon={<TagOutlined />}>{thread.category.name}</Tag>
          </Space>

          {thread.description && (
            <Typography style={{ fontSize: 16 }}>{thread.description}</Typography>
          )}
        </Card>
      ))}

      <Button
        className="create-thread-button"
        type="primary"
        size="large"
        style={{
          bottom: '20px',
          position: 'sticky',
          maxWidth: '200px',
          alignSelf: 'center',
        }}
        onClick={() => setShowModal(true)}
        data-testid="create-thread-btn"
      >
        Создать тему
      </Button>

      <CreateThreadModal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        categories={categories || []}
      />
    </div>
  )
}

export default Threads
