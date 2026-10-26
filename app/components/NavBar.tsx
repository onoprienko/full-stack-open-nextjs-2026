'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

const NavBar = () => {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center gap-4">
      <Link className="hover:text-gray-300 cursor-pointer" href="/">
        home
      </Link>
      {' | '}
      <Link className="hover:text-gray-300 cursor-pointer" href="/blogs">
        blogs
      </Link>
      {' | '}
      <Link className="hover:text-gray-300 cursor-pointer" href="/users">
        users
      </Link>
      {' | '}
      {session ? (
        <>
          <Link
            className="hover:text-gray-300 cursor-pointer"
            href="/blogs/new"
          >
            create new
          </Link>
          {' | '}
          <Link className="hover:text-gray-300 cursor-pointer" href="/me">
            me
          </Link>
          {' | '}
          <em className="opacity-50">{session.user?.name} logged in</em>{' '}
          <button
            className="hover:text-gray-300 cursor-pointer"
            onClick={() => signOut()}
          >
            logout
          </button>
        </>
      ) : (
        <>
          <Link className="hover:text-gray-300 cursor-pointer" href="/login">
            login
          </Link>
          {' | '}
          <Link className="hover:text-gray-300 cursor-pointer" href="/register">
            register
          </Link>
        </>
      )}
    </nav>
  )
}

export default NavBar
