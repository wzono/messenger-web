'use client'

import { signOut } from 'next-auth/react'
import Button from '@/app/components/Button'

const Users = () => {
  const logout = () => {
    signOut()
  }
  return (
    <>
      Helle Users
      <Button onClick={logout}>
        Logout
      </Button>
    </>
  )
}

export default Users
