import React, { useState } from 'react'
import { Form, Input, Modal, UploadFile, message } from 'antd/lib'
import ImageUpload from './ImageUpload'
import { FileType } from '../utils/getBase64'
import { useAddCommentMutation } from '../../../store/features/forum/forumApiSlice'

const { TextArea } = Input

interface Values {
  comment: string
}

type modalProps = {
  isOpen: boolean
  closeModal: () => void
  postId: number
  rootCommentId?: number
}

const CreateCommentModal: React.FC<modalProps> = ({
  isOpen,
  closeModal,
  postId,
  rootCommentId,
}) => {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [addComment, { isLoading }] = useAddCommentMutation()
  const [messageApi, contextHolder] = message.useMessage()

  const onCreate = async (values: Values) => {
    try {
      // В будущем можно добавить поддержку загрузки файлов
      // const formData = new FormData()
      // fileList.forEach(file => {
      //   formData.append('files[]', file as FileType)
      // })

      await addComment({
        text: values.comment,
        postId,
        rootCommentId,
      }).unwrap()

      messageApi.success('Комментарий успешно добавлен')
      setFileList([])
      form.resetFields()
      closeModal()
    } catch (error) {
      console.error('Failed to create comment:', error)
      messageApi.error('Не удалось добавить комментарий')
    }
  }

  return (
    <>
      {contextHolder}
      <Modal
        open={isOpen}
        title="Создать новый комментарий"
        okText="создать"
        cancelText="отмена"
        okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
        onCancel={() => closeModal()}
        destroyOnClose
        confirmLoading={isLoading}
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="comment"
          label="Комментарий"
          rules={[
            {
              required: true,
              message: 'Введите комментарий',
            },
            {
              validator(_, value) {
                if (value && value.length > 0) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Комментарий не должен быть пустым'))
              },
            },
          ]}
        >
          <TextArea showCount autoSize={{ minRows: 4, maxRows: 10 }} />
        </Form.Item>
        <ImageUpload fileList={fileList} setFileList={setFileList} />
      </Modal>
    </>
  )
}

export default CreateCommentModal
