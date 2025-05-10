import React from 'react'
import { Form, Input, Modal, Select, message } from 'antd/lib'
import { Category } from '../../../store/features/forum/types'
import { useAddThreadMutation } from '../../../store/features/forum/forumApiSlice'

const { TextArea } = Input
interface Values {
  title?: string
  description?: string
  category?: number
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
  const [addThread, { isLoading }] = useAddThreadMutation()
  // Временное решение, замените на свой способ получения ID пользователя
  const mockUserId = 1 // Фиксированный ID для тестирования

  const onCreate = async (values: Values) => {
    console.info('Создание новой темы:', values)
    try {
      if (!values.title || !values.description || !values.category) {
        console.error('Не все поля заполнены:', values)
        return
      }
      
      const result = await addThread({
        title: values.title,
        description: values.description,
        category_id: values.category,
        user_id: mockUserId // Используем мок ID
      }).unwrap()
      
      console.info('Тема успешно создана:', result)
      message.success('Тема успешно создана')
      form.resetFields()
      closeModal()
    } catch (e) {
      console.error('Ошибка при создании темы:', e)
      message.error('Не удалось создать тему')
    }
  }

  return (
    <>
      <Modal
        open={isOpen}
        title="Создать новую тему"
        okText="создать"
        cancelText="отмена"
        okButtonProps={{ 
          autoFocus: true, 
          loading: isLoading,
          form: 'thread-form',
          htmlType: 'submit'
        }}
        onCancel={() => closeModal()}
        destroyOnClose>
        <Form
          id="thread-form"
          form={form}
          name="form_in_modal"
          layout="vertical"
          initialValues={{ title: '', description: '' }}
          onFinish={onCreate}
          data-testid="create-thread-form">
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
          <Form.Item 
            name="category" 
            label="Категория" 
            rules={[{
              required: true,
              message: 'Выберите категорию'
            }]}>
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
        </Form>
      </Modal>
    </>
  )
}

export default CreateThreadModal
