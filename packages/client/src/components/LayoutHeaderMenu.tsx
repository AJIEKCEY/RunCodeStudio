import { Menu } from 'antd'
import { ItemType, MenuItemType } from 'antd/es/menu/interface'

type menuProps = {
  items: ItemType<MenuItemType>[]
}
function LayoutHeaderMenu({ items }: menuProps) {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ flex: 1, minWidth: 0 }}
      items={items}
    />
  )
}

export default LayoutHeaderMenu
