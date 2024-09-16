export function toEnum<T extends object>(
  enumType: T,
  value: string | null | undefined
): T[keyof T] | null {
  if (Object.values(enumType).includes(value)) {
    return value as T[keyof T];
  }
  return null;
}