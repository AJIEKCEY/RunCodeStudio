import React, { useState } from 'react'
import styles from './styles/thread.module.css'
import {
  Card,
  Space,
  Tag,
  Button,
  Typography,
  Flex,
} from 'antd/lib'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ClockCircleOutlined,
  TagOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  useGetCommentsQuery,
  useGetPostQuery,
} from '../../store/features/forum/forumApiSlice'
import CreateCommentModal from './components/CreateCommentModal'
import CommentsList from './components/CommentsList'

const Posts: React.FC = () => {
  const navigate = useNavigate()
  const { id: threadId } = useParams()
  const postId = Number(threadId)
  const { data: post, isLoading, error } = useGetPostQuery(postId)
  const { data: comments } = useGetCommentsQuery(postId)
  const [showModal, setShowModal] = useState(false)
  const [replyToCommentId, setReplyToCommentId] = useState<number | undefined>(undefined)

  const handleAddComment = (commentId?: number) => {
    setReplyToCommentId(commentId)
    setShowModal(true)
  }

  const handleNavigateBack = () => {
    navigate(-1)
  }

  if (isLoading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка загрузки поста</div>
  
  return (
    <Flex vertical gap="large">
      <Card>
        <Space size="middle" style={{ marginBottom: 16 }}>
          <Tag icon={<UserOutlined />}>{post?.user.firstname}</Tag>
          <Tag icon={<ClockCircleOutlined />}>
            {post?.createdAt
              ? new Date(post.createdAt).toLocaleDateString()
              : 'Нет даты'}
          </Tag>
          <Tag icon={<TagOutlined />}>{post?.category.name}</Tag>
        </Space>

        {post?.description && (
          <Typography style={{ fontSize: 16 }}>{post?.description}</Typography>
        )}
      </Card>
      
      <CommentsList 
        comments={comments}
        onReply={handleAddComment}
        onNavigateBack={handleNavigateBack}
      />
      
      <Button
        className={styles['pulsing-button']}
        color="primary"
        variant="outlined"
        size="large"
        style={{
          bottom: '30px',
          position: 'sticky',
          maxWidth: '400px',
          alignSelf: 'center',
        }}
        onClick={() => handleAddComment()}>
        добавить комментарий
      </Button>
      
      <CreateCommentModal
        isOpen={showModal}
        closeModal={() => {
          setShowModal(false)
          setReplyToCommentId(undefined)
        }}
        postId={postId}
        rootCommentId={replyToCommentId}
      />
    </Flex>
  )
}

export const initPostsPage = () => Promise.resolve()
export default Posts
