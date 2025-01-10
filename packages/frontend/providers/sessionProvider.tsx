'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import useSWR from 'swr'

import fetchUserApi from '@/api/fetchUser'
import { useRouter } from 'next/navigation'
import logoutApi from '@/api/logout'

type Session = {
  status: 'authenticated' | 'unauthenticated' | 'loading'
  user:
    | {
        id: string
        name: string
        email: string
      }
    | undefined
}

type SessionContext = {
  logOut: () => Promise<void>
} & Session

const SessionContext = createContext({} as SessionContext)

export const useSession = () => useContext(SessionContext)

type SessionProviderProps = {
  children: React.ReactNode
}

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const router = useRouter()
  const [session, setSession] = useState<Session>({
    status: 'unauthenticated',
    user: undefined,
  })

  const { data, isLoading, error } = useSWR('user', fetchUserApi)

  useEffect(() => {
    setSession({
      status: 'loading',
      user: undefined,
    })
  }, [isLoading])

  useEffect(() => {
    setSession({
      status: data ? 'authenticated' : 'unauthenticated',
      user: data,
    })
  }, [data])

  useEffect(() => {
    setSession({
      status: 'unauthenticated',
      user: undefined,
    })
  }, [error])

  const logOut = async () => {
    await logoutApi()

    setSession({
      status: 'unauthenticated',
      user: undefined,
    })
    router.replace('/sign-in')
  }

  return (
    <SessionContext.Provider
      value={{
        logOut,
        ...session,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider
