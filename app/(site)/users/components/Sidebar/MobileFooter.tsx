'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { useConversation } from '@/app/hooks/useConversation'
import { useRoutes } from '@/app/hooks/useRoutes'

export const MobileFooter = () => {
  const routes = useRoutes()
  const { isOpen } = useConversation()

  if (isOpen)
    return null

  return (
    <div
      className="lg:hidden flex justify-between items-center fixed bottom-0 w-full z-40 bg-white border-t"
    >
      {routes.map((route) => (
        <MobileFooterItem
          key={route.label}
          {...route}
        />
      ))}
    </div>
  )
}

interface MobileFooterItemProps {
  label: string
  href: string
  icon: React.ComponentType<any>
  active?: boolean
  onClick?: () => void
}

const MobileFooterItem = ({
  label, href, icon: Icon, active, onClick,
}: MobileFooterItemProps) => {
  const handleClick = () => onClick?.()
  return (
    <Link
      href={href}
      onClick={handleClick}
      className={
        clsx(
          'group flex gap-x-3',
          'text-sm leading-6 font-semibold',
          'w-full justify-center p-4 text-gray-500',
          'hover:text-black hover:bg-gray-100',
          active && 'bg-gray-100 text-black',
        )
      }
    >
      <Icon className="w-6 h-6" />
      <span className="sr-only">
        {label}
      </span>
    </Link>
  )
}
