import crypto from 'node:crypto'

export function sha256(message: string) {
  const hash = crypto.createHash('sha256').update(message)
  const hashHex = hash.digest('hex')

  return hashHex
}
