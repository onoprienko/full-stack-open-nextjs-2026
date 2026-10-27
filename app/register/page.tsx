'use client'

import { useActionState, useState } from 'react'
import { registerUser } from '../actions/users'

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, {
    error: '',
    id: '',
  })

  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              required
              className="border"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Name
            <input
              type="text"
              name="name"
              required
              className="border"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              required
              className="border"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Confirm Password
            <input
              type="password"
              name="passwordconfirm"
              required
              className="border"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </label>
        </div>
        <button
          data-testid="register-button"
          className="border p-1 px-4 cursor-pointer hover:bg-green-500 transition"
          type="submit"
        >
          Register
        </button>
        {state.error && (
          <p data-testid={state.id} style={{ color: 'red' }}>
            {state.error}
          </p>
        )}
      </form>
    </div>
  )
}
