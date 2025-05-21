import { CloseCircleOutlined } from '@ant-design/icons'
import { NotificationType } from '../../hooks/useNotification'
import style from './notification.module.css'

const NotificationItem = (props: NotificationType) => {
  const { title, options } = props
  return (
    <div className={style['notification-item']}>
      <div className={style.title}>{title}</div>
      {options?.body && <div className={style.description}>{options?.body}</div>}
      <div className={style['notification-close']}>
        <CloseCircleOutlined />
      </div>
    </div>
  )
}

export default NotificationItem
