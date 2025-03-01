import { Header } from 'antd/es/layout/layout'
import { ItemType, MenuItemType } from 'antd/es/menu/interface'

import LayoutHeaderMenu from './LayoutHeaderMenu'
type layoutHeaderProps = {
  items: ItemType<MenuItemType>[]
}
function LayoutHeader(props: layoutHeaderProps) {
  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="demo-logo" />
      <LayoutHeaderMenu items={props.items} />
    </Header>
  )
}
export default LayoutHeader
