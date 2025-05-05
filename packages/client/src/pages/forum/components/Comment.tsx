import React from 'react'
import { IComment } from '../../../store/features/forum/types'
import { 
  List, 
  Avatar, 
  Typography, 
  Flex, 
  Button 
} from 'antd/lib'
import {
  ClockCircleOutlined,
  DislikeTwoTone,
  EditOutlined,
  LikeTwoTone,
} from '@ant-design/icons'
import { IconText } from './IconText'
import styles from '../styles/comments.module.css'

interface CommentProps {
  comment: IComment
  onReply: (commentId: number) => void
  level?: number
}

const Comment: React.FC<CommentProps> = ({ comment, onReply, level = 0 }) => {
  // Максимальная глубина вложенности для комментариев
  const MAX_NESTING_LEVEL = 3;
  
  // Определяем класс для стилизации уровня вложенности
  const nestedLevelClass = level > 0 ? styles[`nested-level-${level}`] : '';
  
  return (
    <div className={styles['comment-container']}>
      <List.Item
        key={comment.id}
        actions={[
          <IconText
            icon={ClockCircleOutlined}
            text={new Date(comment.createdAt).toLocaleDateString()}
            key="list-vertical-star-o"
          />,
          <Flex
            onClick={() => console.info('like')}
            style={{ cursor: 'pointer' }}>
            <IconText
              icon={LikeTwoTone}
              key="list-vertical-message"
              text={''}
            />
          </Flex>,
          <Flex
            onClick={() => console.info('dislike')}
            style={{ cursor: 'pointer' }}>
            <IconText
              icon={DislikeTwoTone}
              key="list-vertical-message"
              text={''}
            />
          </Flex>,
          <Button 
            type="link" 
            className={styles['comment-reply-button']}
            onClick={() => onReply(comment.id)}
          >
            Ответить
          </Button>,
          comment.user_id % 2 === 0 && (
            <Button 
              type="link" 
              icon={<EditOutlined />}
              onClick={() => console.info('enter edit mode')}
            >
              Редактировать
            </Button>
          ),
        ]}>
        <List.Item.Meta
          avatar={
            <Avatar src={`Здесь будет аватар автора ${comment.user_id}`} />
          }
          title={
            <div className={styles['comment-meta']}>
              <span className={styles['comment-author']}>{comment.user.firstname}</span>
              <span className={styles['comment-date']}>
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
          }
          description={
            <Typography.Paragraph>{comment.text}</Typography.Paragraph>
          }
        />
      </List.Item>
      
      {/* Отображаем ответы на комментарий, если они есть и не превышен лимит вложенности */}
      {comment.replies && comment.replies.length > 0 && level < MAX_NESTING_LEVEL && (
        <div className={`${styles['comment-replies']} ${nestedLevelClass}`}>
          {comment.replies.map(reply => (
            <Comment 
              key={reply.id} 
              comment={reply} 
              onReply={onReply} 
              level={level + 1} 
            />
          ))}
        </div>
      )}
      
      {/* Если превышен лимит вложенности, показываем кнопку "Показать больше ответов" */}
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