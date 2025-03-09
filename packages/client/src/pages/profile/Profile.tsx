import React from 'react'

import { Flex } from 'antd'

import Userinfo from './components/UserInfo'
import UserAvatar from './components/UserAvatar'
import { useGetUserQuery } from '../../store/features/user/userApiSlice'

const Profile: React.FC = () => {
  const { isSuccess, data: user } = useGetUserQuery('')

  return (
    <Flex
      gap="middle"
      wrap
      align="center"
      justify="center"
      vertical
      style={{ paddingTop: '3rem' }}>
      <UserAvatar src={isSuccess ? user.avatar : ''} />
      <Userinfo {...user} email="test@ya.ru" />
    </Flex>
  )
}

export default Profile
