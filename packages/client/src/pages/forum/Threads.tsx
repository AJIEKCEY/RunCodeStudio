import { MessageOutlined } from '@ant-design/icons'
import { List, Avatar, Typography, Flex, Button, Tag } from 'antd'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ForumNavigation from './components/ForumNavigation'
import { useAppSelector } from '../../store/hooks/deriveTypes'
import styles from './/styles/thread.module.css'
import { Thread } from '../../store/features/forum/types'
import CreateThreadModal from './components/CreateThreadModal'
import { IconText } from './components/IconText'

const Threads: React.FC = () => {
  const { categories, threads } = useAppSelector(state => state.forum)
  const [categoryFilter, setcategoryFilter] = useState<number[]>([])
  const [search, setSearch] = useState<string>('')
  const [showModal, setShowModal] = useState(false)

  const filterThreads = useMemo(() => {
    let result: Thread[] = [...threads]
    if (categoryFilter.length)
      result = [...threads].filter(thread =>
        categoryFilter.includes(thread.categoryId)
      )
    if (search !== '') {
      const searchRegex = new RegExp(search, 'i')
      result = [...result].filter(thread =>
        searchRegex.test(thread.description)
      )
    }
    return result
  }, [categoryFilter, search])

  return (
    <Flex vertical gap="large">
      <ForumNavigation
        categories={categories}
        handleSearch={setSearch}
        handlerCategory={setcategoryFilter}
      />
      <List
        itemLayout="vertical"
        size="large"
        dataSource={filterThreads}
        renderItem={item => (
          <List.Item
            onClick={() => console.log(item.id)}
            className={styles['thread-list-item']}
            key={item.id}
            actions={[
              <div className={styles['thread-list-item-actions']}>
                <IconText
                  icon={MessageOutlined}
                  text={String(item.posts.length)}
                  key="list-vertical-message"
                />
                <Tag
                  color={
                    item.categoryId === 3
                      ? 'volcano'
                      : item.categoryId === 4
                      ? 'gold'
                      : item.categoryId === 2
                      ? 'processing'
                      : 'cyan'
                  }>
                  {
                    categories.find(
                      (cat: { id: number }) => cat.id === item.categoryId
                    )?.title
                  }
                </Tag>
              </div>,
            ]}>
            <List.Item.Meta
              avatar={<Avatar src={item.authorId} />}
              title={
                <Typography.Text style={{ fontSize: '1.7rem' }}>
                  <Link
                    style={{ color: '#8076a3' }}
                    to={{
                      pathname: `${item.id}`,
                    }}>
                    {item.title}
                  </Link>
                </Typography.Text>
              }
              description={
                <Typography.Paragraph
                  style={{ fontSize: '1rem' }}
                  ellipsis={{
                    rows: 1,
                    expandable: 'collapsible',
                    symbol: expanded => (expanded ? 'свернуть' : 'развернуть'),
                  }}>
                  {item.description}
                </Typography.Paragraph>
              }
            />
          </List.Item>
        )}
      />
      <Button
        className={styles['pulsing-button']}
        data-testid="create-thread-btn"
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
        добавить тему
      </Button>
      <CreateThreadModal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        categories={categories}
      />
    </Flex>
  )
}

export default Threads
