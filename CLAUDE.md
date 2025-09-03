# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

**Ult** is a full-stack TypeScript application using:
- **Backend**: NestJS with Prisma ORM, tRPC for type-safe APIs
- **Frontend**: Next.js 14 (App Router) with React 18, Tailwind CSS, Preline UI
- **Database**: PostgreSQL
- **Authentication**: JWT-based with Google OAuth support
- **Monorepo**: pnpm workspaces with three packages (server, web, shared)

## Essential Commands

### Development
```bash
# Install dependencies (uses pnpm)
pnpm install

# Start both servers (Next.js on :3000, NestJS on :3001)
pnpm dev

# Run specific app
pnpm --filter=server dev
pnpm --filter=web dev
```

### Database Operations
```bash
# Run migrations (development)
pnpm db:migrate

# Create new migration
pnpm db:migrate:new

# Seed database
pnpm db:seed

# Generate Prisma client
pnpm db:prisma:generate
```

### Testing
```bash
# Run all tests
pnpm test

# Server tests
pnpm --filter=server test
pnpm --filter=server test:watch
pnpm --filter=server test:cov
```

### Build & Production
```bash
# Build all apps
pnpm build

# Production commands
pnpm prod:server
pnpm prod:web
pnpm prod:db:migrate
pnpm prod:db:seed
```

### Linting
```bash
# Server linting
pnpm --filter=server lint

# Web linting  
pnpm --filter=web lint
```

## Architecture Overview

### tRPC Integration Pattern
The application uses tRPC for end-to-end type safety between NestJS and Next.js:

1. **Server-side routers** (`apps/server/src/*/**.router.ts`) define tRPC procedures
2. **AppRouter type** exported from `apps/server/src/trpc/trpc.router.ts:37`
3. **Client consumes** via `apps/web/contexts/TrpcContext.tsx` using `@trpc/react-query`
4. **Shared types** in `apps/shared/interfaces.ts` ensure consistency

### Authentication Flow
- JWT tokens stored in cookies (`jwtAccessToken`)
- Auth service at `apps/server/src/auth/auth.service.ts`
- Protected routes use `WithAuth` HOC (`apps/web/components/common/auth/WithAuth.tsx`)
- Google OAuth integration via Passport strategies

### Database Schema
- Prisma schema at `apps/server/prisma/schema.prisma`
- Core models: User, Post, PostComment, PostReaction, Role, Category
- User authentication supports email and Google OAuth
- Role-based access control through User-Role many-to-many

### Module Structure
Each feature module in the server follows this pattern:
- `*.module.ts` - NestJS module definition
- `*.service.ts` - Business logic
- `*.router.ts` - tRPC router with procedures
- `*.dto.ts` - Data transfer objects with Zod validation

### Frontend Organization
- **App Router**: Pages in `apps/web/app/`
- **Components**: Reusable UI in `apps/web/components/`
- **Contexts**: Global state providers in `apps/web/contexts/`
- **Hooks**: Custom React hooks in `apps/web/hooks/`

### Environment Configuration
- Development: `apps/server/.env.development`
- Production: `apps/server/.env.production`
- Required: DATABASE_URL, JWT secrets, SMTP credentials for email
- Optional: Google OAuth credentials, OpenAI API key

### Key Dependencies
- **Validation**: Zod for runtime type checking
- **Email**: @nestjs-modules/mailer with EJS templates
- **File uploads**: Uppy with various adapters
- **UI Components**: Preline, Headless UI, Hero Icons
- **Forms**: react-hook-form with Zod resolver