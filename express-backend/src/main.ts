import express from "express"
import session from "express-session"
import cors from "cors"
import users from "./routes/users.ts"
import auth from "./routes/auth.ts"

const app = express()

app.use(cors({
  origin: "http://localhost:5173", // Domains that are allowed to use this backend
  credentials: true // Allows cookies to be sent/received
}))

app.use(
  session({
    secret: "jiajpiaF0u912opjqfjoiialwfpaoupkhjasf",
    resave: false,
    saveUninitialized: false,
    /*
    cookie: {
     httpOnly: true
     secure: true
     sameSite: "lax"
    }
    */
  }),
)

// Allow the server to read JSON from requests
app.use(express.json())

// Routes
app.get("/", (_req, res) => {
  res.json("Cybersecurity API")
})

app.use("/users", users)
app.use("/auth", auth)

app.listen(3000, () => {
  console.log("⚡️ Server running at http://localhost:3000")
})
