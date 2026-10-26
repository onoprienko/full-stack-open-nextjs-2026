import { redirect } from 'next/navigation'
import { generateToken } from '@/app/actions/tokens'
import { getCurrentUser } from '@/app/services/session'

export const instant = false

const MePage = async () => {
  const user = await getCurrentUser()

  if (!user) redirect('/login')

  return (
    <div>
      <h2>My Profile</h2>
      <p>
        <b>Name:</b> {user.name}
      </p>
      <p>
        <b>Username:</b> {user.username}
      </p>
      <hr />
      <h3>API token:</h3>
      {user.token ? (
        <>
          <p>Current token:</p>
          <p className="break-all">{user.token}</p>
        </>
      ) : (
        <p>No tokens</p>
      )}
      <form action={generateToken}>
        <button
          className="border p-1 px-4 cursor-pointer hover:bg-green-500 transition"
          type="submit"
        >
          Generate new token
        </button>
      </form>
    </div>
  )
}

export default MePage
