import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

// get next-auth user session
export function getSession() {
  return getServerSession(authOptions)
}
