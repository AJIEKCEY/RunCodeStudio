import React, { useState } from 'react'
import { Flex, Radio } from 'antd'
import { UserProfile } from '../../../store/features/user/types'
import InfoForm from './InfoForm'
import PasswordForm from './PasswordForm'

type UserInfoProps = Partial<UserProfile>
const UserInfo = (props: UserInfoProps) => {
  const [selectedForm, setSelectedForm] = useState('password')

  return (
    <Flex vertical align="center" gap="large">
      <Radio.Group
        onChange={e => setSelectedForm(e.target.value)}
        name="radiogroup"
        defaultValue={'password'}
        options={[
          { value: 'password', label: 'пароль' },
          { value: 'info', label: 'данные профиля' },
        ]}
      />
      {selectedForm !== 'password' ? <InfoForm {...props} /> : <PasswordForm />}
    </Flex>
  )
}

export default UserInfo
