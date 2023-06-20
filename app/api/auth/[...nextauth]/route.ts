import type { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import { prismaClinet } from '@/app/libs/prisma-db'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClinet),
  providers: [
    GithubProvider(
      {
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        httpOptions: {
          timeout: 10000,
        },
      },
    ),
    GoogleProvider(
      {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        httpOptions: {
          timeout: 10000,
        },
      },
    ),
    CredentialsProvider({
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) throw new Error('Missing credentials')

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.hashedPassword) throw new Error('User not found')

        const matched = await bcrypt.compare(credentials.password, user.hashedPassword)

        if (!matched) throw new Error('Invalid credentials')

        return user
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
}

const handler = NextAuth(authOptions)

export {
  handler as GET,
  handler as POST,
}
