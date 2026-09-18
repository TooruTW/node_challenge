export function getEnv(name: string): string | undefined {
  return process.env[name];
}

export function hasEnv(name: string): boolean {
  return process.env[name] !== undefined;
}

export function getEnvOr(name: string, fallback: string): string {
  return process.env[name] ?? fallback;
}
