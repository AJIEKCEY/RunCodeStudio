import { BellOutlined } from '@ant-design/icons'
import { Button, Drawer } from 'antd/lib'
import style from './notification.module.css'
import { useState } from 'react'
import NotificationDrawer from './NotificationDrawer'
import { useNotificationContext } from './NotificationContext'

const NotificationBell = () => {
  const [open, setOpen] = useState(false)
  const { countNotification } = useNotificationContext()

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        shape="circle"
        icon={<BellOutlined />}
        color="default"
        variant="filled"
        onClick={showDrawer}
        className={style['notification-bell']}
        data-count={countNotification}
      />
      <Drawer title="Уведомления" onClose={onClose} open={open}>
        <NotificationDrawer />
      </Drawer>
    </>
  )
}

export default NotificationBell
