import { FC } from 'react'
import { Category } from '../../../store/features/forum/types'
import { Flex, Select, Input } from 'antd/lib'
import { DefaultOptionType } from 'antd/lib//select'

const { Search } = Input
type navigationProps = {
  categories: Category[]
  handlerCategory: (categoryID: number[]) => void
  handleSearch: (text: string) => void
}
function prepareOptions(categories: Category[]): DefaultOptionType[] {
  const options = categories.map((category): DefaultOptionType => {
    return {
      label: category.title,
      value: String(category.id),
    }
  })
  return options
}
const ForumNavigation: FC<navigationProps> = ({
  categories,
  handleSearch,
  handlerCategory,
}) => {
  const options = prepareOptions(categories)
  return (
    <Flex
      style={{
        height: '3rem',
        paddingInline: '1rem',
        position: 'sticky',
        top: 0,
        backgroundColor: '#ffffff',
        zIndex: 1,
        marginBottom: '1rem',
        borderBottom: '1px solid #8076a3',
      }}
      justify="space-between"
      align="center">
      <Select
        mode="tags"
        placeholder="Выбор желаемых категорий"
        style={{ minWidth: '30%', height: ' 2rem' }}
        onChange={values =>
          handlerCategory(values.map((id: number) => Number(id)))
        }
        tokenSeparators={[',']}
        options={options}
      />

      <Search
        placeholder="поиск по тексу в описании темы"
        allowClear
        onSearch={handleSearch}
        style={{ width: 300 }}
      />
    </Flex>
  )
}

export default ForumNavigation
