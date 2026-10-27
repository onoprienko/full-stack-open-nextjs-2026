import { redirect } from 'next/navigation'
import { generateToken } from '@/app/actions/tokens'
import { getCurrentUser } from '@/app/services/session'
import ReadingList from './ReadingList'

export const instant = false

const MePage = async () => {
  const user = await getCurrentUser()
  if (!user) redirect('/login')

  return (
    <div data-testid="user-profile">
      <h2>My Profile</h2>
      <p data-testid="user-name">
        <b>Name:</b> {user.name}
      </p>
      <p data-testid="user-username">
        <b>Username:</b> {user.username}
      </p>
      <hr />
      <div data-testid="api-token-section">
        <h3>API token:</h3>
        {user.token ? (
          <div data-testid="token-display">
            <p>Current token:</p>
            <p data-testid="api-token" className="break-all">
              {user.token}
            </p>
          </div>
        ) : (
          <p data-testid="no-token-message">No tokens</p>
        )}
        <form action={generateToken}>
          <button
            data-testid="generate-token-button"
            className="border p-1 px-4 cursor-pointer hover:bg-green-500 transition"
            type="submit"
          >
            Generate new token
          </button>
        </form>
      </div>
      <hr />
      <ReadingList username={user.username} />
    </div>
  )
}

export default MePage
