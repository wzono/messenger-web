import { prismaClinet } from '../libs/prisma-db'
import { getSession } from './getSession'

export async function getCurrentUser() {
  try {
    const session = await getSession()
    if (!session?.user?.email)
      return null

    const user = await prismaClinet.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    return user
  }
  catch (error) {
    return null
  }
}
