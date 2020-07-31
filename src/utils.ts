export class UnreachableError extends Error {
  constructor(error: never) {
    super(`UnreachableError found: ${error}`);
  }
}

export const checkExists = <T>(value: T | undefined | null, msg?: string): T => {
  if (value == null) {
    throw new TypeError(msg ?? 'Expected value to be non-nullable');
  }

  return value;
};
