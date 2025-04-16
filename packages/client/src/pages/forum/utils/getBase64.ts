import { GetProp, UploadProps } from 'antd/lib'

export const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]
