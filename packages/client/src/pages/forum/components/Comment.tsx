import React from 'react'
import { IComment } from '../../../store/features/forum/types'
import { List, Avatar, Button } from 'antd'
import { Space } from 'antd'
import { ClockCircleOutlined, DislikeTwoTone, LikeTwoTone } from '@ant-design/icons'
import { IconText } from './IconText'
import styles from '../styles/comments.module.css'
import UrlImageDisplay from './UrlImageDisplay'

interface CommentProps {
  comment: IComment
  onReply: (commentId: number) => void
  level?: number
}

const Comment: React.FC<CommentProps> = ({ comment, onReply, level = 0 }) => {
  const MAX_NESTING_LEVEL = 3
  const nestedLevelClass = level > 0 ? styles[`nested-level-${level}`] : ''

  const likes = comment.reactions.filter((reaction) => reaction.type === 'like').length
  const dislikes = comment.reactions.filter((reaction) => reaction.type === 'dislike').length

  return (
    <div className={styles['comment-container']}>
      <List.Item
        key={comment.id}
        actions={[
          <IconText
            icon={ClockCircleOutlined}
            text={new Date(comment.createdAt).toLocaleDateString()}
            key="date"
          />,
          // prettier-ignore
          <Space onClick={() => console.info('like')} style={{ cursor: 'pointer' }} key="like">
            <IconText icon={LikeTwoTone} text={String(likes)} />
          </Space>,
          // prettier-ignore
          <Space onClick={() => console.info('dislike')} style={{ cursor: 'pointer' }} key="dislike">
            <IconText icon={DislikeTwoTone} text={String(dislikes)} />
          </Space>,
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar src={`Здесь будет аватар автора ${comment.user_id}`} />}
          title={
            <div className={styles['comment-meta']}>
              <span className={styles['comment-author']}>{comment.user.firstname}</span>
              <span className={styles['comment-date']}>
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
          }
          description={<UrlImageDisplay text={comment.text} />}
        />
      </List.Item>

      {comment.replies && comment.replies.length > 0 && level < MAX_NESTING_LEVEL && (
        <div className={`${styles['comment-replies']} ${nestedLevelClass}`}>
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} onReply={onReply} level={level + 1} />
          ))}
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && level >= MAX_NESTING_LEVEL && (
        <Button
          type="link"
          className={styles['show-more']}
          onClick={() => console.info(`Показать ответы на комментарий ${comment.id}`)}
        >
          Показать {comment.replies.length} ответов...
        </Button>
      )}
    </div>
  )
}

export default Comment
