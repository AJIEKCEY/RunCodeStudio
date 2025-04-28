import React, { useState } from 'react'
import styles from './styles/thread.module.css'
import {
  Card,
  Divider,
  Space,
  Tag,
  List,
  Button,
  Avatar,
  Typography,
  Form,
  Input,
  Flex,
} from 'antd/lib'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ClockCircleOutlined,
  DislikeTwoTone,
  EditOutlined,
  LikeTwoTone,
  MessageOutlined,
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
  // const filteredPosts = useMemo(() => {
  //   let result: Post[] = posts
  //   if (threadId)
  //     result = result.filter(post => post.threadId === Number(threadId))
  //   return result
  // }, [threadId, posts])
  const { TextArea } = Input

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
                  {/* {item.img && item.img.length && (
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
                  )} */}
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
    // <div style={{ margin: '0 auto', padding: 16 }}>
    //   {/* Заголовок и содержание поста */}
    //   <Card>
    //     <Space size="middle" style={{ marginBottom: 16 }}>
    //       <Tag icon={<UserOutlined />}>{post?.user.firstname}</Tag>
    //       <Tag icon={<ClockCircleOutlined />}>
    //         {post?.createdAt
    //           ? new Date(post.createdAt).toLocaleDateString()
    //           : 'Нет даты'}
    //       </Tag>
    //       <Tag icon={<TagOutlined />}>{post?.category.name}</Tag>
    //     </Space>

    //     {post?.description && (
    //       <Typography style={{ fontSize: 16 }}>{post?.description}</Typography>
    //     )}
    //   </Card>

    //   {/* Блок комментариев */}
    //   <Divider orientation="left" style={{ marginTop: 40 }}>
    //     <MessageOutlined style={{ marginRight: 8 }} />
    //     Комментарии {comments?.length}
    //   </Divider>

    //   {/* Список комментариев */}
    //   <List
    //     itemLayout="horizontal"
    //     dataSource={comments} // Просто массив из 2 элементов для примера
    //     renderItem={item => (
    //       <List.Item>
    //         <List.Item.Meta
    //           avatar={<Avatar icon={<UserOutlined />} />}
    //           // title={'Имя пользователя'}
    //           description={
    //             <>
    //               <Typography style={{ marginBottom: 0 }}>
    //                 {item.text}
    //               </Typography>
    //               <Typography style={{ fontSize: 12 }}>
    //                 {item.updatedAt
    //                   ? new Date(item.updatedAt).toLocaleDateString()
    //                   : 'Нет даты'}
    //               </Typography>
    //             </>
    //           }
    //         />
    //       </List.Item>
    //     )}
    //   />

    //   {/* Форма добавления комментария */}
    //   <Card style={{ marginTop: 24 }}>
    //     <List.Item>
    //       <List.Item.Meta
    //         avatar={<Avatar icon={<UserOutlined />} />}
    //         description={
    //           <Form>
    //             <Form.Item>
    //               <TextArea></TextArea>
    //             </Form.Item>
    //             <Form.Item>
    //               <Button type="primary">Отправить</Button>
    //             </Form.Item>
    //           </Form>
    //         }
    //       />
    //     </List.Item>
    //   </Card>
    // </div>
  )
}

export default Posts
