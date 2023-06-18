import { DesktopSidebar } from './DesktopSidebar'

export async function Sidebar(
  { children }: { children: React.ReactNode },
) {
  return (
    <div className="h-full">
      <DesktopSidebar />
      <main className="h-full lg:pl-20">
        {children}
      </main>
    </div>
  )
}
