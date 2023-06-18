import { usePathname } from 'next/navigation'
import { HiChat, HiUsers } from 'react-icons/hi'
import { HiArrowLeftOnRectangle } from 'react-icons/hi2'
import { signOut } from 'next-auth/react'
import { useConversation } from './useConversation'

export const useRoutes = () => {
  const pathname = usePathname()
  const { isOpen } = useConversation()

  const routes = [
    {
      label: 'Chat',
      href: '/conversations',
      icon: HiChat,
      active: pathname === '/conversations' || isOpen,
    },
    {
      label: 'Users',
      href: '/users',
      icon: HiUsers,
      active: pathname === '/users',
    },
    {
      label: 'Logout',
      href: '#',
      icon: HiArrowLeftOnRectangle,
      onClick: signOut,
    },
  ]

  return routes
}
