import React, { useState } from 'react'
import styles from './styles/thread.module.css'
import {
  Card,
  Space,
  Tag,
  List,
  Button,
  Avatar,
  Typography,
  Flex,
} from 'antd/lib'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ClockCircleOutlined,
  DislikeTwoTone,
  EditOutlined,
  LikeTwoTone,
  RollbackOutlined,
  TagOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  useGetCommentsQuery,
  useGetPostQuery,
} from '../../store/features/forum/forumApiSlice'
import { IconText } from './components/IconText'
import CreatePostModal from './components/CreatePostModal'

const Posts: React.FC = () => {
  const navigate = useNavigate()
  const { id: threadId } = useParams()
  const { data: post, isLoading, error } = useGetPostQuery(Number(threadId))
  const { data: comments } = useGetCommentsQuery(Number(threadId))
  const [showModal, setShowModal] = useState(false)

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
      <List
        style={{ paddingInline: '1rem' }}
        itemLayout="vertical"
        dataSource={comments}
        header={
          <Button
            onClick={() => navigate(-1)}
            type="primary"
            shape="default"
            icon={<RollbackOutlined />}
            size="large"
          />
        }
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <IconText
                icon={ClockCircleOutlined}
                text={new Date(item.createdAt).toLocaleDateString()}
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
              <span>{String('item.Reaction.type')}</span>,
              item.user_id % 2 === 0 && (
                <Flex
                  onClick={() => console.info('enter edit mode')}
                  style={{ cursor: 'pointer' }}>
                  <IconText
                    icon={EditOutlined}
                    key="list-vertical-message"
                    text={''}
                  />
                </Flex>
              ),
            ]}>
            <List.Item.Meta
              avatar={
                <Avatar src={`Здесь будет аватар автора ${item.user_id}`} />
              }
              title={`${item.user.firstname}`}
              description={
                <Flex vertical>
                  <Typography.Paragraph>{item.text}</Typography.Paragraph>
                </Flex>
              }
            />
          </List.Item>
        )}
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
        onClick={() => setShowModal(curr => !curr)}>
        добавить сообщение
      </Button>
      <CreatePostModal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
      />
    </Flex>
  )
}
export const initPostsPage = () => Promise.resolve()
export default Posts
