import React from 'react'
import { Radio, Typography } from 'antd'
import styles from './CharacterChoice.module.css'
import characters from './Characters'

interface CharacterChoiceProps {
  selected: string
  onSelect: (value: string) => void
}

const CharacterChoice = ({ selected, onSelect }: CharacterChoiceProps) => {
  const handleChange = (e: any) => {
    onSelect(e.target.value)
  }

  return (
    <div className={styles.characterSelect}>
      <Typography.Title level={2} style={{ color: '#fff', fontSize: '28px' }}>
        Выберите персонажа:
      </Typography.Title>
      <Radio.Group
        onChange={handleChange}
        value={selected}
        className={styles.radioGroup}>
        {characters.map(character => (
          <Radio key={character.id} value={character.id}>
            {character.name}
          </Radio>
        ))}
      </Radio.Group>
      <div>
        <Typography.Text
          style={{
            color: '#fff',
            fontStyle: 'italic',
            fontSize: '14px',
            marginTop: '1rem',
            display: 'block',
          }}>
          {characters.find(character => character.id === selected)?.description}
        </Typography.Text>
      </div>
    </div>
  )
}

export default CharacterChoice
