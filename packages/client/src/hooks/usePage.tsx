//packages/client/src/hooks/usePage.ts

import { useEffect } from 'react'

import { PageInitArgs, useStore } from '../store/store'
import { useAppDispatch } from '../store/hooks/deriveTypes'

type PageProps = {
  initPage: (data: PageInitArgs) => Promise<unknown>
}

export const usePage = ({ initPage }: PageProps) => {
  const dispatch = useAppDispatch()
  const store = useStore()

  useEffect(() => {
    initPage({ dispatch, state: store.getState() })
  }, [])
}
