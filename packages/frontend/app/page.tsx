'use client'

import { Button } from '@/components/ui/button'
import axios from 'axios'
import { LogOut } from 'lucide-react'
import { useState } from 'react'

const HomePage: React.FC = () => {
  const [user, setUser] = useState(null)

  const handleGetUser = async () => {
    const { data } = await axios.get('http://localhost:3333/user', {
      withCredentials: true,
    })

    setUser(data)
  }

  const handleLogout = async () => {
    await axios.get('http://localhost:3333/logout', {
      withCredentials: true,
    })
  }

  return (
    <div>
      <div className="flex gap-2">
        <Button onClick={handleGetUser}>Get Authenticated User</Button>
        <Button
          variant={'destructive'}
          onClick={handleLogout}
        >
          <LogOut />
          Sign Out
        </Button>
      </div>

      <span>{user ? `Hello ${user.username}` : 'Not authenticated'}</span>
    </div>
  )
}

export default HomePage
