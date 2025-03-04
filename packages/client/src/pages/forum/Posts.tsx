import styles from './styles/thread.module.css'
import React, { useMemo, useState } from 'react'
import { Avatar, Button, Flex, Image, List, Typography } from 'antd'
import { useAppSelector } from '../../store/hooks/deriveTypes'
import { useNavigate, useParams } from 'react-router-dom'
import { Post } from '../../store/features/forum/types'
import {
  ClockCircleOutlined,
  DislikeTwoTone,
  EditOutlined,
  LikeTwoTone,
  RollbackOutlined,
} from '@ant-design/icons'
import { IconText } from './components/IconText'
import CreatePostModal from './components/CreatePostModal'

const Posts: React.FC = () => {
  const navigate = useNavigate()
  const { posts } = useAppSelector(state => state.forum)
  const { id: threadId } = useParams()
  const [showModal, setShowModal] = useState(false)
  const filteredPosts = useMemo(() => {
    let result: Post[] = [...posts]
    if (threadId)
      result = result.filter(post => post.threadId === Number(threadId))
    return result
  }, [threadId, posts])
  return (
    <Flex vertical gap="large">
      <List
        style={{ paddingInline: '1rem' }}
        itemLayout="vertical"
        dataSource={filteredPosts}
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
                text={item.createdAt.toLocaleDateString()}
                key="list-vertical-star-o"
              />,
              <Flex
                onClick={() => console.log('like')}
                style={{ cursor: 'pointer' }}>
                <IconText
                  icon={LikeTwoTone}
                  key="list-vertical-message"
                  text={''}
                />
              </Flex>,
              <Flex
                onClick={() => console.log('dislike')}
                style={{ cursor: 'pointer' }}>
                <IconText
                  icon={DislikeTwoTone}
                  key="list-vertical-message"
                  text={''}
                />
              </Flex>,
              <span>{String(item.likes)}</span>,
              item.authorId % 2 === 0 && (
                <Flex
                  onClick={() => console.log('enter edit mode')}
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
                <Avatar src={`Здесь будет аватар автора ${item.authorId}`} />
              }
              title={`Имя автора с id ${item.authorId}`}
              description={
                <Flex vertical>
                  <Typography.Paragraph>{item.content}</Typography.Paragraph>
                  {item.img && item.img.length && (
                    <Flex gap="small">
                      {item.img.map(url => {
                        return (
                          <Image
                            alt={`картинка взятая с адреса: ${url}`}
                            height={200}
                            src={url}
                            key={url}
                            preview={{
                              mask: <span>предпросмотр</span>,
                            }}
                          />
                        )
                      })}
                    </Flex>
                  )}
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

export default Posts
