import React, { useState } from 'react'
import { Form, Input, Modal, UploadFile } from 'antd/lib'
import ImageUpload from './ImageUpload'
import { FileType } from '../utils/getBase64'

const { TextArea } = Input

interface Values {
  post: string
}

type modalProps = {
  isOpen: boolean
  closeModal: () => void
}
const CreatePostModal: React.FC<modalProps> = ({ isOpen, closeModal }) => {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const onCreate = (values: Values) => {
    const formData = new FormData()
    fileList.forEach(file => {
      formData.append('files[]', file as FileType)
    })
    formData.append('post', values.post)
    for (const pair of formData.entries()) {
      console.info(pair[0], pair[1])
    }
    setFileList([])
    closeModal()
  }

  return (
    <>
      <Modal
        open={isOpen}
        title="Создать новое сообщение"
        okText="создать"
        cancelText="отмена"
        okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
        onCancel={() => closeModal()}
        destroyOnClose
        modalRender={dom => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            clearOnDestroy
            onFinish={values => onCreate(values)}>
            {dom}
          </Form>
        )}>
        <Form.Item
          name="post"
          label="Сообщение"
          rules={[
            {
              required: true,
              message: 'Введите сообщение',
            },
            {
              validator(_, value) {
                if (value.length > 0) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('Сообщение не должно быть пустым')
                )
              },
            },
          ]}>
          <TextArea showCount autoSize={{ minRows: 4, maxRows: 10 }} />
        </Form.Item>
        <ImageUpload fileList={fileList} setFileList={setFileList} />
      </Modal>
    </>
  )
}

export default CreatePostModal
