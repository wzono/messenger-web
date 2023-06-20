import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var prisma: PrismaClient
}

const prismaClinet = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'production') globalThis.prisma = prismaClinet

export { prismaClinet }
