OWASP Mitigations

- A05: Security Misconfiguration — I added strict HTTP security headers in `next.config.js` including a Content-Security-Policy, X-Frame-Options (DENY), Referrer-Policy, and X-Content-Type-Options. This reduces the risk of clickjacking, mixed-content/script injection, and data exfiltration via referrer headers.

- A03: Injection — I verified the project uses Prisma client APIs (e.g. `findMany`) which parameterize queries by default and avoided any use of raw/unsafe query APIs. Avoiding `$queryRawUnsafe` prevents attacker-controlled input from being interpreted as SQL, mitigating SQL injection risks.

Notes
- Ensure the environment variables `AUTH_SECRET`, `AUTH_GITHUB_ID`, and `AUTH_GITHUB_SECRET` are set in `.env.local` on both local and Vercel deployments. Generate a strong `AUTH_SECRET` with `npx auth secret`.
