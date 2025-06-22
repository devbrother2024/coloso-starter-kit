import { PrismaClient } from '@prisma/client'

// Test database setup
const prisma = new PrismaClient()

beforeAll(async () => {
    // Connect to test database
    await prisma.$connect()
})

afterAll(async () => {
    // Clean up and disconnect
    await prisma.$disconnect()
})

beforeEach(async () => {
    // Clean up test data before each test
    await prisma.user.deleteMany()
})

export { prisma }
