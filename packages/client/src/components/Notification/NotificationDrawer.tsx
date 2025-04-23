import { message, Switch } from 'antd'
import NotificationItem from './NotificationItem'
import style from './notification.module.css'
import { useNotificationContext } from './NotificationContext'

const NotificationDrawer = () => {
  const {
    isNotificationsEnabled,
    toggleNotifications,
    notificationStatus,
    notification,
    infoText,
    openInfoText,
  } = useNotificationContext()

  const [messageApi, contextHolder] = message.useMessage()

  const handleToggleNotifications = () => {
    if (openInfoText) {
      messageApi.open({
        type: 'warning',
        content: infoText.message,
        duration: 4,
      })
    }
    toggleNotifications()
  }

  return (
    <>
      {contextHolder}
      <div className={style['notification-area']}>
        <div className={style['notification-wrapper']}>
          {notification.length === 0 && 'Нет уведомлений'}
          {notification.map((el, index) => {
            return (
              <NotificationItem
                key={index}
                title={el.title}
                options={{ body: el.options?.body }}
              />
            )
          })}
        </div>
        <div className={style['notification-switch-area']}>
          <Switch
            checked={isNotificationsEnabled}
            defaultValue={isNotificationsEnabled}
            onChange={handleToggleNotifications}
          />
          <div className={style['notification-switch-info']}>
            <h5 className={style.title}>{notificationStatus.title}</h5>
            <h6 className={style.description}>
              {notificationStatus.description}
            </h6>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotificationDrawer
