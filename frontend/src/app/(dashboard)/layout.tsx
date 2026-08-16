import { Outlet } from 'react-router-dom'
import { Sidebar } from '@renderer/components/layout/Sidebar/Sidebar'
import { TopBar } from '@renderer/components/layout/TopBar/TopBar'
import { mockCurrentUser } from '@renderer/mocks/currentUser.mock'

/**
 * Ortak kabuk: sol menü + üst bar. HashRouter'da yalnızca <Outlet />
 * içeriği rota değiştikçe yenilenir. Web'deki app/(dashboard)/layout.jsx
 * karşılığı — burada elle App.tsx'e bağlanıyor (otomatik routing yok).
 */
export default function DashboardLayout(): JSX.Element {
  // TODO(backend): mockUser yerine useCurrentUser() (React Query) kullan.
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar user={mockCurrentUser} />
        <main className="flex-1 overflow-y-auto p-margin-desktop">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
