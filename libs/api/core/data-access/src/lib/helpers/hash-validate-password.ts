import { compareSync, hashSync } from 'bcryptjs'

export function hashPassword(password: string): string {
  return hashSync(password, 10)
}

export function validatePassword(password: string, hashedPassword: string): boolean {
  return compareSync(password, hashedPassword)
}
