export type UserAvatar = FormData
export type UserAuthType = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export type UserLoginType = Pick<UserAuthType, 'login' | 'password'>
export type UserInfoType = UserAuthType & {
  id: number
  avatar: string | null
  display_name: string | null
}

export type UserProfile = {
  first_name: string
  second_name: string
  display_name: string
  email: string
  phone: string
  avatar: string
  login: string
}

export type UserProfilePassword = {
  oldPassword: string
  newPassword: string
}

export type BadRequest = {
  data: { reason: string }
  status: number | string
}
export enum PractikumEndpoints {
  BASE = 'https://ya-praktikum.tech/api/v2',
  AUTH = `${PractikumEndpoints.BASE}/auth`,
  USER = `${PractikumEndpoints.BASE}/user`,
  PROFILE = `${PractikumEndpoints.USER}/profile`,
}
export type ErrorResponse = {
  status: number | string
  msg: string
}
