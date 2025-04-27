import { useEffect, useState } from 'react'

export type NotificationStatusType = {
  title: string
  description: string
  isEnabled: boolean
}

type NotificationPermission = 'granted' | 'denied' | 'default'

export type NotificationType = {
  title: string
  options?: NotificationOptions
}

export type NotificationContextType = {
  isNotificationsEnabled: boolean
  toggleNotifications: () => void
  notificationStatus: NotificationStatusType
  notification: NotificationType[]
  sendNotification: (props: NotificationType) => void
  infoText: {
    title: string
    message: string
  }
  countNotification: number
  openInfoText: boolean
}

const getLocalStorage = (key: string) => {
  if (typeof window === 'undefined') {
    console.warn('useLocalStorage:только для браузерного окружения')
    return null
  }
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : null
}

const setLocalStorage = (key: string, data: unknown) => {
  if (typeof window === 'undefined') {
    console.warn('setLocalStorage:только для браузерного окружения')
    return
  }
  localStorage.setItem(key, JSON.stringify(data))
}

const NOTIFICATION_STATUSES: Record<
  NotificationPermission,
  NotificationStatusType
> = {
  granted: {
    title: 'Уведомления включены',
    description: 'Вы будете получать важные уведомления от нашего сервиса',
    isEnabled: true,
  },
  denied: {
    title: 'Уведомления отключены',
    description:
      'Разрешите уведомления в настройках браузера, чтобы не пропустить важные обновления',
    isEnabled: false,
  },
  default: {
    title: 'Уведомления не настроены',
    description: 'Нажмите кнопку, чтобы разрешить отправку уведомлений',
    isEnabled: false,
  },
}

const useNotification = (): NotificationContextType => {
  if (typeof window === 'undefined') {
    console.warn('useNotification: хук только для браузерного окружения')
    return {
      isNotificationsEnabled: false,
      toggleNotifications: () => {
        console.info('node env')
      },
      notificationStatus: NOTIFICATION_STATUSES['default'],
      notification: [],
      sendNotification: () => {
        console.info('node env')
      },
      infoText: { title: '', message: '' },
      countNotification: 0,
      openInfoText: false,
    }
  }
  const typeNotification: NotificationPermission =
    getLocalStorage('notificationPermission') || 'default'
  const [notificationStatus, setNotificationStatus] =
    useState<NotificationStatusType>(NOTIFICATION_STATUSES[typeNotification])
  const [permission, setPermission] =
    useState<NotificationPermission>(typeNotification)
  const [notification, setNotification] = useState<NotificationType[]>([])
  const [infoText, setInfoText] = useState({ title: '', message: '' })
  const [openInfoText, setOpenInfoText] = useState(false)
  const countNotification = notification.length

  const requestPermission = () => {
    Notification.requestPermission().then(
      (newPermission: NotificationPermission) => {
        setPermission(newPermission)
        setNotificationStatus(NOTIFICATION_STATUSES[newPermission])
        setLocalStorage('notificationPermission', newPermission)
      }
    )
  }

  const toggleNotifications = () => {
    if (permission === 'denied') {
      setInfoText({
        title: 'Уведомления отключены',
        message:
          'Пожалуйста, разрешите уведомления в настройках вашего браузера',
      })
      setOpenInfoText(true)
    } else if (permission === 'granted') {
      setInfoText({
        title: 'Уведомления отключены',
        message:
          'Пожалуйста, сбросьте разрешение на уведомления в настройках вашего браузера',
      })
      setOpenInfoText(true)
    } else {
      requestPermission()
    }
  }

  const resetNotification = () => {
    const notificationPermission = getLocalStorage('notificationPermission')
    if (
      Notification.permission === 'default' &&
      notificationPermission &&
      notificationPermission !== Notification.permission
    ) {
      localStorage.removeItem('notificationPermission')
      setNotificationStatus(NOTIFICATION_STATUSES['default'])
      setPermission('default')
    }
  }

  const sendNotification = (props: NotificationType) => {
    if (permission !== 'granted') return
    const { title, options } = props

    new Notification(title, options)
    setNotification(prev => [...prev, { title, options: { ...options } }])
  }

  useEffect(() => {
    resetNotification()
  }, [])

  return {
    notification,
    notificationStatus,
    toggleNotifications,
    sendNotification,
    openInfoText,
    infoText,
    countNotification,
    isNotificationsEnabled: notificationStatus.isEnabled,
  }
}

export default useNotification
