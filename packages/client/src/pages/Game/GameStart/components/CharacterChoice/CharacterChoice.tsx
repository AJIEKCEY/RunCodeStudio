import React from 'react'
import { Radio, Typography, type RadioChangeEvent } from 'antd/lib'
import styles from './CharacterChoice.module.css'
import characters from './Characters'
import { useTheme } from '../../../../../context/ThemeContext'

interface CharacterChoiceProps {
  selected: string
  onSelect: (value: string) => void
}

const CharacterChoice = ({ selected, onSelect }: CharacterChoiceProps) => {
  const handleChange = (e: RadioChangeEvent) => {
    onSelect(e.target.value)
  }
  const { settings } = useTheme()
  const textColor = settings?.textColor || '#ffffff'

  return (
    <div className={styles.characterSelect}>
      <Typography.Title
        level={2}
        style={{ color: textColor, fontSize: '28px' }}>
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
