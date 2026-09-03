import { Router } from "express"
import bcrypt from "bcrypt"
import db from "../database.ts"

const router = Router()

router.get("/", (_req, res) => {
  const users = db.prepare("SELECT id, username, email FROM users").all()

  res.json(users)
})

// http://localhost:3000/users/search?name=lisa
router.get("/search", (req, res) => {
  const name = req.query.name

  if (!name) {
    return res.status(400).json({ error: "Name is required" })
  }

  const users = db
    .prepare(`SELECT id, username, email FROM users WHERE username LIKE ?`)
    .all(`'%${name}%'`)

  res.json(users)
})

router.get("/:id", (req, res) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "Invalid id" })
  }

  const user = db.prepare("SELECT id, username, email FROM users WHERE id = ?").get(id)

  if (!user) {
    return res.status(404).json({ error: "User not found" })
  }

  res.json(user)
})

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Missing fields" })
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters long" })
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Add user to DB
  const result = db
    .prepare(`
      INSERT INTO users (username, email, password)
      VALUES (?, ?, ?)
      RETURNING *
    `)
    .get(username, email, hashedPassword)

  // Return user
  res.status(201).json(result)
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" })
  }

  const user = db
    .prepare(`
    SELECT * FROM users WHERE email = ?
    `)
    .get(email)

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" })
  }

  const passwordMatches = await bcrypt.compare(password, user.password)

  if (!passwordMatches) {
    return res.status(401).json({ error: "Invalid email or password" })
  }

  res.json(user)
})

export default router
