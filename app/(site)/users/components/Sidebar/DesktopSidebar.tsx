'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { useRoutes } from '@/app/hooks/useRoutes'

export const DesktopSidebar = () => {
  const routes = useRoutes()
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-20 lg:z-40 lg:bg-white lg:overflow-y-auto lg:border-r xl:px-6 lg:pb-4 lg:flex lg:flex-col justify-between">
      <nav className="mt-2">
        <ul
          role="list"
          className="flex flex-col items-center space-y-1"
        >
          {routes.map((route) => (
            <DesktopItem
              key={route.label}
              label={route.label}
              href={route.href}
              icon={route.icon}
              active={route.active}
              onClick={route.onClick}
            />
          ))}
        </ul>
      </nav>
    </div>
  )
}

interface DesktopItemProps {
  label: string
  href: string
  icon: React.ComponentType<any>
  active?: boolean
  onClick?: () => void
}

export const DesktopItem = ({ href, onClick, active, icon: Icon, label }: DesktopItemProps) => {
  const handleClick = () => {
    return onClick?.()
  }

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          'group flex gap-x-3 rounded-md p-3 text-sm',
          'leading-6 font-semibold items-center text-gray-500',
          'hover:text-black hover:bg-gray-100',
          {
            'bg-gray-100 text-black': active,
          })}
      >
        <Icon className="h-6 w-6 shrink-0" />
        {/* sr-only is for seo */}
        <span className="sr-only">
          {label}
        </span>
      </Link>
    </li>
  )
}
