"use client"

import Link from "next/link"
import { SubmitEvent, useState } from "react"

const backend = "http://localhost:3001"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()

        setError("")

        const response = await fetch(`${backend}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                email,
                password,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            setError(data.error || "Login failed")
            return
        }

        console.log("Logged in:", data)
    }

    return (
        <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
                <h1 className="mb-6 text-2xl font-bold">
                    Login
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </main>
    )
}