import React from 'react'
import { Typography } from 'antd'

const rules = [
  'Нажмите стрелку вверх, чтобы прыгнуть',
  'Нажмите стрелку вниз, чтобы пригнуться',
  'Собирайте монеты, чтобы купить жизни или способности',
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
