import React from 'react'
import { Typography } from 'antd/lib'

const rules = [
  'Нажмите на пробел, чтобы прыгнуть',
  'Собирайте монетки и продержитесь дольше всех',
  'При столкновении с препятствием игра заканчивается поражением',
]

const Rules: React.FC = () => {
  return (
    <div>
      <Typography.Title
        level={3}
        style={{
          color: '#fff',
          fontSize: '24px',
          textAlign: 'center',
          marginBottom: '0',
          marginTop: '30px',
        }}>
        Правила игры:
      </Typography.Title>
      <ul style={{ marginTop: '0' }}>
        {rules.map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ul>
    </div>
  )
}

export default Rules
