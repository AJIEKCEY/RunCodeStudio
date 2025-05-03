import { useEffect } from 'react'

import { PageInitArgs, useStore } from '../store/store'
import { useAppDispatch } from '../store/hooks/deriveTypes'

type PageProps = {
  initPage: (data: PageInitArgs) => Promise<unknown>
}

/**
 * Хук для инициализации страницы
 * @param {PageProps} props - Пропсы хука
 * @param {Function} props.initPage - Функция инициализации страницы
 * @returns {void}
 */
export const usePage = ({ initPage }: PageProps) => {
  const dispatch = useAppDispatch()
  const store = useStore()

  useEffect(() => {
    const initializePage = async () => {
      try {
        await initPage({ dispatch, state: store.getState() })
      } catch (error) {
        console.error('Ошибка при инициализации страницы:', error)
        // TODO: Добавить обработку ошибок через систему уведомлений
      }
    }

    initializePage()
  }, [initPage, dispatch, store])
}
