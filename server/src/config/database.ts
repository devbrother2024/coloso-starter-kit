import { PrismaClient } from '@prisma/client'

// Prisma Client 인스턴스 생성
const prisma = new PrismaClient({
    log:
        process.env.NODE_ENV === 'development'
            ? ['query', 'info', 'warn', 'error']
            : ['error'],
    errorFormat: 'pretty'
})

// 데이터베이스 연결 테스트 함수
export async function connectDatabase(): Promise<void> {
    try {
        await prisma.$connect()
        console.log('✅ Database connected successfully')
    } catch (error) {
        console.error('❌ Database connection failed:', error)
        throw error
    }
}

// 데이터베이스 연결 해제 함수
export async function disconnectDatabase(): Promise<void> {
    try {
        await prisma.$disconnect()
        console.log('✅ Database disconnected successfully')
    } catch (error) {
        console.error('❌ Database disconnection failed:', error)
        throw error
    }
}

// 헬스체크용 데이터베이스 상태 확인 함수
export async function checkDatabaseHealth(): Promise<{
    status: string
    message: string
}> {
    try {
        // 간단한 쿼리로 연결 상태 확인
        await prisma.$queryRaw`SELECT 1`
        return {
            status: 'healthy',
            message: 'Database connection is working'
        }
    } catch (error) {
        return {
            status: 'unhealthy',
            message:
                error instanceof Error
                    ? error.message
                    : 'Unknown database error'
        }
    }
}

// Prisma Client 인스턴스 내보내기
export { prisma }
export default prisma
