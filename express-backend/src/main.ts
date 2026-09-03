import express from "express"
import session from "express-session"
import users from "./routes/users.ts"

const app = express()

app.use(
  session({
    secret: "jiajpiaF0u912opjqfjöiialwfpäoupkhjasf",
    resave: false,
    saveUninitialized: false,
  }),
)

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
