# Copilot Instructions - site-nutrologia API

## Project Overview
A TypeScript/Express.js REST API for a nutrition website with authentication, contact management, and blog posts. The project uses strict TypeScript and supports both real database connections (MySQL) and fallback simulation mode when database is unavailable.

## Architecture

### Core Structure
- **Entry point**: [src/server.ts](src/server.ts) - HTTP server initialization with graceful shutdown
- **App setup**: [src/app.ts](src/app.ts) - Express middleware configuration, image path resolution, and CORS
- **Routes**: [src/routes.ts](src/routes.ts) - Endpoint definitions connecting controllers to HTTP verbs
- **Controllers**: [src/controllers/](src/controllers/) - Request/response handlers with input validation
- **Services**: [src/services/](src/services/) - Business logic (authentication, external integrations)
- **Database**: [src/database/connection.ts](src/database/connection.ts) - MySQL2 connection pool

### Key Patterns
- **Controllers → Services pattern**: Controllers handle HTTP concerns; services contain reusable business logic
  - Example: [AuthController.ts](src/controllers/AuthController.ts) calls [authService.ts](src/services/authService.ts)
- **Graceful degradation**: Server starts without database when MySQL unavailable; controllers return mock responses
  - See [ContatoController.ts](src/controllers/ContatoController.ts) - contact endpoint always succeeds with simulated ID
- **Image path resolution**: Multi-fallback strategy supporting environment variable, multiple relative paths, and dist builds
  - Logic in [src/app.ts](src/app.ts) lines ~20-35; define `IMAGE_PATH` in `.env` to override

## Critical Development Workflows

### Build & Run
```bash
npm run dev      # TypeScript watch mode with ts-node-dev
npm run build    # Compile src/ to dist/
npm start        # Run compiled server
```
- **Environment**: Set `PORT` (default 3000), `JWT_SECRET`, `NODE_ENV` in `.env`
- **TypeScript config**: [tsconfig.json](tsconfig.json) targets ES2022, strict mode enabled

### Authentication Flow
1. **Login**: POST `/login` with `{email, senha}` → calls `loginService()`
2. **hardcoded credentials**: `admin@email.com` / `123456` (see [authService.ts](src/services/authService.ts))
3. **JWT generation**: Signed with `JWT_SECRET` env var, 1-day expiry
4. **Protected routes**: Use `auth` middleware ([src/middlewares/auth.ts](src/middlewares/auth.ts)) to verify token in `Authorization` header
   - Example: POST `/posts` is protected; access returns `{status: "Área protegida"}`

## Project-Specific Conventions

### Error Handling
- Controllers validate required fields inline and return 400 + JSON error object
- Middleware returns 401 for auth failures; 403-style errors send JSON, not HTML
- No global error handler; each endpoint owns its error response

### Database Layer
- [BANCO.sql](BANCO.sql) defines schema: `posts`, `agendamentos` tables
- **Important**: Database connection is optional. When MySQL unavailable, controllers gracefully fall back to simulated responses
- New endpoints should follow ContatoController pattern: validate input, execute if DB available, else return mock with simulated ID

### Code Style
- Static methods on controller classes (see `AuthController.static async login()`)
- Arrow functions in services; no `async` decorators in middleware
- Use `process.env` with fallbacks (e.g., `PORT` defaults to 3000 if unset)
- Strict TypeScript: no `any`, explicit `Request | Response | NextFunction` types

### File Naming
- Controllers: `*Controller.ts` (PascalCase)
- Services: `*Service.ts` (camelCase export functions)
- Middleware: lowercase (e.g., `auth.ts`)

## Integration Points

### External Dependencies
- **Express 4.18**: HTTP server framework; CORS, rate-limiting, helmet enabled in setup
- **JWT**: `jsonwebtoken` for token generation/verification with configurable secret
- **MySQL2**: Optional database driver; graceful fallback if unavailable
- **Morgan**: HTTP request logging (enabled in app middleware)
- **Helmet**: Security headers middleware

### CORS & Rate Limiting
- CORS enabled via `cors()` middleware in [src/app.ts](src/app.ts)
- Rate-limit dependency included but not yet wired; add via `express-rate-limit` if needed

## New Feature Checklist
When adding endpoints:
1. Define route in [src/routes.ts](src/routes.ts)
2. Create controller method in [src/controllers/](src/controllers/) with static method signature
3. If business logic needed, extract to [src/services/](src/services/)
4. Add middleware (e.g., `auth`) to route if protected
5. Validate inputs in controller; return 400 on failure
6. Support simulation mode if endpoint uses database (see ContatoController pattern)
7. Ensure error responses are JSON: `res.status(code).json({erro: "message"})`
