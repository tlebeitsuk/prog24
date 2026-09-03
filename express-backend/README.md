# Express + SQLite Security Project

A simple Express API with an SQLite database.

The application is intentionally insecure. The goal is to identify security problems and improve the application step by step.

## Run the project

```bash
vp install
vp run dev
```

## API

- `GET /users` – Get all users
- `GET /users/:id` – Get a user by ID
- `GET /users/search?name=` – Search users by username
- `POST /users/register` - Register new user
- `POST /users/login` - Login user

## Security improvements

- [x] Prevent SQL injection with parameter placeholders
- [x] Validate user input
- [x] Don't return passwords from the API
- [x] Hash passwords
- [ ] Add authentication
- [ ] Protect routes that require authentication
- [ ] Add authorization/permissions
- [ ] Add rate limiting
- [ ] Add security headers
