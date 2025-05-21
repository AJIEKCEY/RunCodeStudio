import React, { useState } from 'react'
import { Card, Space, Button, Typography, Input, Avatar } from 'antd'
import { UserOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons'
import {
  useAddCommentMutation,
  useAddReactionMutation,
} from '../../../store/features/forum/forumApiSlice'
import { IComment } from '../../../store/features/forum/types'
import { useAuth } from '../../../hooks/useAuth'

interface CommentProps {
  comment: IComment
  postId: number
  onCommentAdded: () => void
}

const Comment: React.FC<CommentProps> = ({ comment, postId, onCommentAdded }) => {
  const [isReplying, setIsReplying] = useState(false)
  const [replyText, setReplyText] = useState('')
  const { user } = useAuth()
  const [createComment] = useAddCommentMutation()
  const [createReaction] = useAddReactionMutation()

  const handleReply = async () => {
    if (!replyText.trim()) return

    try {
      await createComment({
        postId,
        text: replyText,
        rootCommentId: comment.id,
      }).unwrap()
      setReplyText('')
      setIsReplying(false)
      onCommentAdded()
    } catch (error) {
      console.error('Ошибка при создании ответа:', error)
    }
  }

  const handleReaction = async (type: 'like' | 'dislike') => {
    if (!user) return

    try {
      await createReaction({
        commentId: comment.id,
        type,
      }).unwrap()
      onCommentAdded()
    } catch (error) {
      console.error('Ошибка при создании реакции:', error)
    }
  }

  if (!comment) return null

  return (
    <Card style={{ marginBottom: 16 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Avatar icon={<UserOutlined />} />
          <Typography.Text strong>{comment.user?.firstname || 'Аноним'}</Typography.Text>
          <Typography.Text type="secondary">
            {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : ''}
          </Typography.Text>
        </Space>

        <Typography.Paragraph>{comment.text}</Typography.Paragraph>

        <Space>
          <Button icon={<LikeOutlined />} onClick={() => handleReaction('like')} disabled={!user}>
            {comment.reactions?.filter((r: { type: string }) => r.type === 'like').length || 0}
          </Button>
          <Button
            icon={<DislikeOutlined />}
            onClick={() => handleReaction('dislike')}
            disabled={!user}
          >
            {comment.reactions?.filter((r: { type: string }) => r.type === 'dislike').length || 0}
          </Button>
          {user && (
            <Button type="link" onClick={() => setIsReplying(!isReplying)}>
              Ответить
            </Button>
          )}
        </Space>

        {isReplying && (
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input.TextArea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Напишите ваш ответ..."
              rows={3}
            />
            <Space>
              <Button type="primary" onClick={handleReply}>
                Отправить
              </Button>
              <Button onClick={() => setIsReplying(false)}>Отмена</Button>
            </Space>
          </Space>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div style={{ marginLeft: 24 }}>
            {comment.replies.map((reply: IComment) => (
              <Comment
                key={reply.id}
                comment={reply}
                postId={postId}
                onCommentAdded={onCommentAdded}
              />
            ))}
          </div>
        )}
      </Space>
    </Card>
  )
}

export default Comment
