import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { generateTokenPair } from '../utils/jwt'
import { User } from '@prisma/client'

const prisma = new PrismaClient()

export const registerUser = async (
    input: Omit<User, 'id' | 'role' | 'createdAt' | 'updatedAt'>
) => {
    const { name, email, password } = input

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
        throw new Error('User with this email already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            ...input,
            password: hashedPassword
        }
    })

    return user
}

export const loginUser = async (input: Pick<User, 'email' | 'password'>) => {
    const { email, password } = input

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
        throw new Error('Invalid email or password')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw new Error('Invalid email or password')
    }

    const tokens = generateTokenPair({ userId: user.id, email: user.email })

    return { user, tokens }
}
