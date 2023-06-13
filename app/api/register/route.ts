import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import { prisma } from '@/app/libs/prisma-db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, name } = body

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Missing email, password or name' },
        {
          status: 400,
        })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        name,
      },
    })

    return NextResponse.json(user)
  }
  catch (error: any) {
    console.error('register user error', error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
