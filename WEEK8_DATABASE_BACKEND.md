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

**4. Backend Reflection**

This backend design meets the project’s functional requirements by modeling `User`, `Message`, and `Contact` entities with explicit relations and constraints that support the write and read paths required by the form and list pages. The Prisma schema enforces referential integrity and unique constraints (e.g., `email`), which ensures that form-submitted data is validated and stored consistently. Server Actions handle form writes, and Server Components query the Prisma client to render lists, providing a clear separation of concerns between data mutation and presentation.

Security and privacy are addressed through multiple layers: server-side validation prevents malformed or malicious input, the Prisma client issues parameterized queries that mitigate SQL injection risks, and the database connection is kept out of source control as an environment variable. Provisioning a managed Postgres instance adds vendor-level protections such as enforced SSL, automated backups, and role-based access controls that reduce operational exposure (PostgreSQL Global Development Group, 2024).

Performance and scalability are supported by PostgreSQL’s robust transactional engine and by standard operational patterns: connection pooling (provider-managed pools or PgBouncer) to avoid exhausting connections, selective indexing to accelerate common queries, and caching or read replicas as growth strategies. This layered approach enables predictable latency for typical web workloads while providing clear upgrade paths if throughput increases.

Future improvements include adding automated migration and integration tests, audit logging for data changes, and stricter privacy controls (field-level encryption, retention policies). These steps will improve reliability and compliance as the app moves toward production. Overall, combining Prisma’s type-safe, schema-first workflow with PostgreSQL provides developer velocity without sacrificing the relational guarantees required for consistent, auditable data (Prisma, 2023; PostgreSQL Global Development Group, 2024).

**References**

Prisma. (2023). Prisma documentation. https://www.prisma.io/docs/

PostgreSQL Global Development Group. (2024). PostgreSQL documentation. https://www.postgresql.org/docs/
