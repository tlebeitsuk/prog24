import express from "express"
import users from "./routes/users.ts"

const app = express()

// Allow the server to read JSON from requests
app.use(express.json())

// Routes
app.get("/", (_req, res) => {
  res.json("Cybersecurity API")
})

app.use("/users", users)

app.listen(3000, () => {
  console.log("⚡️ Server running at http://localhost:3000")
})
