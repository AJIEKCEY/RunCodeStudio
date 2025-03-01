import { Menu } from 'antd'
import { ItemType, MenuItemType } from 'antd/es/menu/interface'
import { Link } from 'react-router-dom'

type menuProps = {
  items: ItemType<MenuItemType>[]
}
function LayoutHeaderMenu({ items }: menuProps) {
  return (
    <Menu theme="dark" mode="horizontal" style={{ flex: 1, minWidth: 0 }}>
      {items.map(item => (
        <Menu.Item key={item?.key}>
          <Link to="/">На главную</Link>
        </Menu.Item>
      ))}
    </Menu>
  )
}

export default LayoutHeaderMenu
