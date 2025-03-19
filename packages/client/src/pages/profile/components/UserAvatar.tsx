import { UploadOutlined } from '@ant-design/icons'
import {
  Flex,
  Upload,
  Image,
  UploadFile,
  GetProp,
  UploadProps,
  message,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { useUpdateUserAvatarMutation } from '../../../store/features/user/userApiSlice'
import { isErrorResponse } from '../../../utils/typeguard/isErrorResponse'

type userAvatarProps = {
  src: string
}
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]
const UserAvatar = ({ src }: userAvatarProps) => {
  const [update, { isError, isSuccess, error }] = useUpdateUserAvatarMutation()
  const [messageApi, contextHolder] = message.useMessage()
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList.slice(-1))
  }

  useEffect(() => {
    if (isError) {
      if (error && isErrorResponse(error)) {
        messageApi.error(error.msg)
      } else {
        messageApi.error('Ошибка, попробуйте еще раз')
      }
    }
    if (isSuccess) {
      messageApi.success('Данные сохранены')
    }
  }, [isError, error, isSuccess])
  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error(
        'Для аватара можно загужать только  файлы с расширениемJPG/PNG.'
      )
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Изображение должно быть меньше 2MB!')
    }
    return isJpgOrPng && isLt2M
  }
  return (
    <Flex vertical gap="small" align="center">
      {src && (
        <Image
          width={200}
          src={src}
          preview={{
            mask: <span>Увеличить</span>,
          }}
        />
      )}
      {contextHolder}
      <Upload
        fileList={fileList}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        action={file => {
          const formData = new FormData()
          formData.append('avatar', file)
          return new Promise((resolve, reject) => {
            update(formData)
            return isSuccess ? resolve('loaded') : reject('error')
          })
        }}
        listType="picture-circle">
        {fileList.length < 1 && (
          <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Загрузить</div>
          </div>
        )}
      </Upload>
    </Flex>
  )
}

export default UserAvatar
