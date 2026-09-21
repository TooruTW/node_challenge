export function getErrorCode(error: unknown): string | undefined {
  return (error as { code?: string }).code;
}

export function isErrorCode(error: unknown, code: string): boolean {
  return (error as { code?: string }).code === code;
}

export function errorPath(error: unknown): string | undefined {
  return (error as { path?: string }).path;
}
