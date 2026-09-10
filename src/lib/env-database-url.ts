/** Neon-via-Vercel often prefixes every key with DATABASE_URL_ if the integration prefix is set. */
export function resolveDatabaseUrl(env: Record<string, string | undefined> = process.env): string | undefined {
  const keys = [
    "DATABASE_URL",
    "POSTGRES_URL",
    "POSTGRES_PRISMA_URL",
    "POSTGRES_URL_NON_POOLING",
    "DATABASE_URL_DATABASE_URL",
    "DATABASE_URL_POSTGRES_URL",
    "DATABASE_URL_POSTGRES_PRISMA_URL",
    "DATABASE_URL_POSTGRES_URL_NON_POOLING",
    "DATABASE_URL_DATABASE_URL_UNPOOLED",
    "DATABASE_URL_POSTGRES_URL_NO_SSL",
  ];
  for (const key of keys) {
    const value = env[key];
    if (value && value.trim() && /^(postgres|postgresql):\/\//i.test(value.trim())) {
      return value.trim();
    }
  }
  return undefined;
}
