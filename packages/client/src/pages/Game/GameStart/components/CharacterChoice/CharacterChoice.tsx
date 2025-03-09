import React, { useState } from 'react'
import { Radio, Typography } from 'antd'
import styles from './CharacterChoice.module.css'
import characters from './Characters'

const CharacterChoice: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0].id)

  return (
    <div className={styles.characterSelect}>
      <Typography.Title level={2} style={{ color: '#fff', fontSize: '28px' }}>
        Выберите персонажа:
      </Typography.Title>
      <Radio.Group
        onChange={e => setSelectedCharacter(e.target.value)}
        value={selectedCharacter}
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
          {
            characters.find(character => character.id === selectedCharacter)
              ?.description
          }
        </Typography.Text>
      </div>
    </div>
  )
}

export default CharacterChoice
