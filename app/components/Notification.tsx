'use client'

import { useNotification } from './NotificationContext'

export default function Notification() {
  const { message, type } = useNotification()

  if (!message) return null

  const style: React.CSSProperties = {
    backgroundColor: type === 'success' ? '#16a34a' : '#dc2626',
  }

  return (
    <div
      data-testid="notification"
      className="px-2 py-4 text-white"
      style={style}
    >
      {message}
    </div>
  )
}
