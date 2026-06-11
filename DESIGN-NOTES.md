# Week 3 IT516: Interactive Features

## Feature 1: Theme Toggle
- What it does: Allows the user to switch between light mode and dark mode and remembers the choice using localStorage.
- Why it matters: It improves comfort and accessibility by letting users choose a display mode that works best for them.
- Events involved: `click` on the toggle button.
- State to track: the current theme mode (`light` or `dark`).
- Why this matters: Writing the event model first helps avoid the mistake of placing handlers on the wrong element or forgetting to connect the DOM element to the listener.

## Feature 2: Contact Form Validation
- What it does: Validates name, email, and message fields, shows inline errors, and displays a success message when the form is valid.
- Why it matters: It prevents invalid submissions and gives users immediate feedback on what needs correction.
- Events involved: `submit` on the form.
- State to track: whether the form is currently valid and what error messages are shown per field.
- Why this matters: Planning validation state before coding helps keep the logic clear and avoids buggy form behavior.

# Week 4: Component Architecture

## Component Hierarchy
```
RootLayout (Server)
├── Header (Client - contains ThemeToggle)
│   └── Nav (Server - uses Link)
├── main (children)
│   ├── HomePage (Server)
│   │   ├── Hero (Server)
│   │   └── Card (Server - reusable)
│   └── ContactPage (Server)
│       └── ContactForm (Client - useState for form fields/errors)
└── Footer (Server)
```

## Week 7: Async Data Fetch (This week's assignment)

- Data source chosen: Open-Meteo (no API key required).
- Endpoint used for demo: `https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current_weather=true`
- Why Open-Meteo: no auth keys, minimal CORS friction, returns simple current weather payload useful for a concise UI demo.
- Notes: Implement a client component that fetches `current_weather`, shows a skeleton while loading, displays an accessible error state, and a refresh control to re-fetch. Respect `prefers-reduced-motion` for skeleton animations.


## Components Planned
- **Header**: Client component (needs ThemeToggle with state). Receives no props, holds theme state.
- **Nav**: Server component. Receives no props, renders navigation links.
- **Footer**: Server component. Receives no props, renders footer content.
- **Hero**: Server component. Receives title and description props for homepage hero section.
- **Card**: Server component. Receives title, description, href props for reusable content blocks.
- **ThemeToggle**: Client component (useState for theme, useEffect for localStorage).
- **ContactForm**: Client component (useState for form state and errors).

Client components are marked with "use client" only where needed for interactivity.
```

**Week 8: Database & Backend**

**Schema definition (Prisma / PostgreSQL)**

Generator and datasource (Prisma):

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int       @id @default(autoincrement())
  email     String    @unique
  name      String?
  messages  Message[]
  contacts  Contact[]
  createdAt DateTime  @default(now())
}

model Message {
  id        Int      @id @default(autoincrement())
  content   String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  userId    Int
}

model Contact {
  id     Int     @id @default(autoincrement())
  name   String
  email  String?
  phone  String?
  user   User?   @relation(fields: [userId], references: [id])
  userId Int?
}
```

Rationale: I selected PostgreSQL as the production datastore and Prisma as the ORM/DB toolkit. PostgreSQL provides ACID guarantees, strong relational features (joins, constraints, transactions), and robust community support — a good fit for structured data like users, messages, and contacts where consistency matters. Prisma offers a concise schema-first workflow, type-safe client code, and smooth developer ergonomics that speed implementation and reduce runtime errors.

Provider chosen and why:
- Provider: PostgreSQL (hosted on a managed provider such as Supabase, Neon, or Heroku Postgres).
- Why: mature relational model, strong tooling, proven scalability for web apps, and first-class support in Prisma via the `postgresql` provider. Managed Postgres options simplify backups, connection pooling, and security.

## Week 9: Authentication (Auth.js)

- Installed Auth.js (NextAuth v5 beta): `npm install next-auth@beta`.
- Created `auth.ts` at project root using the GitHub provider and exported the handlers and helpers:
  - `export const { handlers, auth, signIn, signOut } = NextAuth({ providers: [GitHub], session: { strategy: 'jwt', maxAge: 60 * 60 * 24 } });`
- Added the Next.js API route `app/api/auth/[...nextauth]/route.ts` that forwards requests: `export { GET, POST } from "@/auth";`.
- Implemented a server-side sign-in/sign-out button using `auth()`, `signIn`, and `signOut` (rendered from the root layout so it remains a server component and does not force client bundles).
- Protected the `messages` page on the server by calling `const session = await auth()` and redirecting unauthenticated users to `/api/auth/signin`.
- Environment variables: set `AUTH_SECRET`, `AUTH_GITHUB_ID`, and `AUTH_GITHUB_SECRET` in `.env.local`. Generate a strong `AUTH_SECRET` with `npx auth secret` and keep secrets out of version control.

Notes:
- Server-side `auth()` provides session data at render time without client JS, which enables secure route protection.
- Keep OAuth callback URLs and environment variables configured in the Vercel project for the production deployment.