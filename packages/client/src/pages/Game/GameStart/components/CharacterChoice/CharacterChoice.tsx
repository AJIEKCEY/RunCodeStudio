import React from 'react'
import { Radio, Typography, type RadioChangeEvent } from 'antd/lib'
import styles from './CharacterChoice.module.css'
import characters from './Characters'

interface CharacterChoiceProps {
  selected: string
  onSelect: (value: string) => void
}

const CharacterChoice = ({ selected, onSelect }: CharacterChoiceProps) => {
  const handleChange = (e: RadioChangeEvent) => {
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
    </div>
  )
}

export default CharacterChoice
