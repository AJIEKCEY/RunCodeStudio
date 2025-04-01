import React from 'react'

import { Flex } from 'antd'

import { useGetUserQuery } from '../../store/features/user/userApiSlice'
import UserAvatar from './components/UserAvatar'
import Userinfo from './components/UserInfo'

const Profile = () => {
  const { isSuccess, data: user } = useGetUserQuery('')

  return (
    <Flex
      gap="middle"
      wrap
      align="center"
      justify="center"
      vertical
      style={{ paddingTop: '3rem' }}>
      <UserAvatar
        src={
          isSuccess
            ? `https://ya-praktikum.tech/api/v2/resources/${user.avatar}`
            : ''
        }
      />
      <Userinfo {...user} email="test@ya.ru" />
    </Flex>
  )
}

export default Profile
