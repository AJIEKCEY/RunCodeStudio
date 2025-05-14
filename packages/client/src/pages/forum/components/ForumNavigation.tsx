import React from 'react'
import { Select, Input } from 'antd'
import styles from '../styles/forum.module.css'

const ForumNavigation: React.FC = () => {
  return (
    <div className={styles['forum-navigation']}>
      <Select
        defaultValue="all"
        style={{ width: 120 }}
        options={[
          { value: 'all', label: 'Все темы' },
          { value: 'my', label: 'Мои темы' },
        ]}
      />
      <Input.Search
        placeholder="Поиск по темам"
        style={{ width: 200 }}
        onSearch={(value) => console.log(value)}
      />
    </div>
  )
}

export default ForumNavigation
