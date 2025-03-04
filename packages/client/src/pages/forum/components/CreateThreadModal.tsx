import React, { useState } from 'react'
import { Form, Input, Modal, Select } from 'antd'
import { Category } from '../../../store/features/forum/types'

const { TextArea } = Input
interface Values {
  title?: string
  description?: string
}

type modalProps = {
  categories: Category[]
  isOpen: boolean
  closeModal: () => void
}
const CreateThreadModal: React.FC<modalProps> = ({
  isOpen,
  closeModal,
  categories,
}) => {
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState<Values>()

  const onCreate = (values: Values) => {
    setFormValues(values)
    console.log('Данные формы ', formValues)
    closeModal()
  }

  return (
    <>
      <Modal
        open={isOpen}
        title="Создать новую тему"
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
          name="title"
          label="Название"
          rules={[
            {
              required: true,
              message: 'Введите название темы',
            },
            {
              validator(_, value) {
                const regexCat = /^[A-ZА-ЯЁ]/u
                if (regexCat.test(value)) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('Название должно начинаться с большой буквы')
                )
              },
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item name="category" label="Категория" required>
          <Select
            style={{ width: 200 }}
            options={[
              ...categories.map(cat => {
                return {
                  value: cat.id,
                  label: cat.title,
                }
              }),
            ]}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Описание"
          rules={[
            {
              required: true,
              message: 'Введите описание темы',
            },
            {
              validator(_, value) {
                if (value.length > 20) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('Описание не должно быть короче 20 символов')
                )
              },
            },
          ]}>
          <TextArea showCount autoSize={{ minRows: 2, maxRows: 6 }} />
        </Form.Item>
      </Modal>
    </>
  )
}

export default CreateThreadModal
