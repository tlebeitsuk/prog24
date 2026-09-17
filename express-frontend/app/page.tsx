"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const backend = "http://localhost:3001"

type User = {
  id: number
  username: string
  email: string
}

export default function HomePage() {
  const router = useRouter()

  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  async function logout() {
    await fetch(`${backend}/auth/logout`, {
      method: "POST",
      credentials: "include",
    })

    router.push("/login")
  }

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch(`${backend}/users`, {
          credentials: "include",
        })

        if (response.status === 401) {
          router.replace("/login")
          return
        }

        if (!response.ok) {
          setError("Could not fetch users")
          return
        }

        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.error(error)
        setError("Could not connect to backend")
      } finally {
        setLoading(false)
      }
    }

    getUsers()
  }, [router])

  if (loading) {
    return (
      <main className="p-8">
        <p>Loading...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="p-8">
        <p className="text-red-600">{error}</p>
      </main>
    )
  }

  return (
    <main className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users</h1>

        <button
          onClick={logout}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Logout
        </button>
      </div>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="rounded-lg border border-gray-200 bg-white p-4"
          >
            <p className="font-medium">{user.username}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </li>
        ))}
      </ul>


    </main>
  )
}