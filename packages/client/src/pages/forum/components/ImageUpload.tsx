import React, { useState } from 'react'
import { Flex, Image, Upload } from 'antd/lib'
import type { UploadFile, UploadProps } from 'antd/lib'
import { getBase64, FileType } from '../utils/getBase64'

type imageUploadProps = {
  fileList: UploadFile[]
  setFileList: (value: UploadFile[]) => void
}
const ImageUpload: React.FC<imageUploadProps> = ({
  fileList,
  setFileList,
}: imageUploadProps) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList)
  const handlePreview = async (file: UploadFile) => {
    if (!file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.preview as string)
    setPreviewOpen(true)
  }
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <div style={{ marginTop: 8 }}>выбрать</div>
    </button>
  )
  const onRemove = (file: UploadFile) => {
    const index = fileList.indexOf(file)
    const newFileList = fileList.slice()
    newFileList.splice(index, 1)
    setFileList(newFileList)
  }
  const beforeUpload = (file: FileType) => {
    setFileList([...fileList, file])

    return false
  }
  return (
    <Flex gap="middle" justify="center" wrap>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={true}
        onRemove={onRemove}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        onPreview={handlePreview}
        fileList={fileList}>
        {uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            mask: <span>предпросмотр</span>,
            visible: previewOpen,
            onVisibleChange: visible => setPreviewOpen(visible),
            afterOpenChange: visible => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </Flex>
  )
}

export default ImageUpload
