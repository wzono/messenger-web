import { Sidebar } from './components/Sidebar'

async function UsersLayout(
  { children }: { children: React.ReactNode },
) {
  return (
    <div className="h-full">
      <Sidebar>
        {children}
      </Sidebar>
    </div>
  )
}

export default UsersLayout
