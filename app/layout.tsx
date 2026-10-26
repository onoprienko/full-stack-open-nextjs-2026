import './globals.css'
import AuthSessionProvider from './components/SessionProvider'
import NavBar from './components/NavBar'
import { NotificationProvider } from './components/NotificationContext'
import Notification from './components/Notification'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground max-w-2xl">
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <Notification />
            <div className="p-6 border">{children}</div>
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
