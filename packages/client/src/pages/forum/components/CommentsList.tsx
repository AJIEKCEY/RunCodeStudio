import React from 'react'
import { List, Button } from 'antd/lib'
import { RollbackOutlined } from '@ant-design/icons'
import { IComment } from '../../../store/features/forum/types'
import Comment from './Comment'

interface CommentsListProps {
  comments: IComment[] | undefined
  onReply: (commentId: number) => void
  onNavigateBack: () => void
}

const CommentsList: React.FC<CommentsListProps> = ({ 
  comments, 
  onReply,
  onNavigateBack
}) => {
  // Фильтруем только корневые комментарии (без родителя)
  const rootComments = comments?.filter(comment => comment.root_comment === null) || []

  return (
    <List
      style={{ paddingInline: '1rem' }}
      itemLayout="vertical"
      dataSource={rootComments}
      header={
        <Button
          onClick={onNavigateBack}
          type="primary"
          shape="default"
          icon={<RollbackOutlined />}
          size="large"
        />
      }
      renderItem={comment => (
        <Comment 
          key={comment.id} 
          comment={comment} 
          onReply={onReply} 
        />
      )}
    />
  )
}

export default CommentsList 