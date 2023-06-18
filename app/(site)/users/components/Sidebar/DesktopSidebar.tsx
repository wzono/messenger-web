'use client'

import { useRoutes } from '@/app/hooks/useRoutes'

const DesktopSidebar = () => {
  const routes = useRoutes()
  return (
    <div className="flex gap-2">
      {routes.map((route) => (
        <div key={route.label}>
          {route.label}
        </div>
      ))}
    </div>
  )
}

export default DesktopSidebar
