import bcrypt from 'bcrypt'
import { prisma } from '../config/database'
import { generateTokenPair } from '../utils/jwt'
import { User } from '@prisma/client'
import { Prisma } from '@prisma/client'

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

// 새로운 AuthService 클래스
export class AuthService {
    private readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
    private readonly JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h'
    private readonly REFRESH_TOKEN_EXPIRES_IN =
        process.env.REFRESH_TOKEN_EXPIRES_IN || '7d'
    private readonly SALT_ROUNDS = 12

    async signUp(
        email: string,
        password: string,
        name: string,
        additionalData?: {
            username?: string
            emailCertified?: boolean
            country?: string | null
            language?: string
            clientId?: string
            extras?: Record<string, any>
        }
    ) {
        try {
            // 이메일 중복 확인
            const existingUser = await prisma.user.findUnique({
                where: { email }
            })

            if (existingUser) {
                throw new Error('User already exists')
            }

            // 비밀번호 해싱
            const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS)

            // Prisma 트랜잭션으로 사용자 생성
            const user = await prisma.$transaction(async tx => {
                // 사용자 생성
                const newUser = await tx.user.create({
                    data: {
                        email,
                        password: hashedPassword,
                        name,
                        // 추가 필드들 저장
                        username: additionalData?.username || email,
                        emailVerified: additionalData?.emailCertified || false,
                        country: additionalData?.country,
                        language: additionalData?.language || 'en',
                        // clientId는 별도 테이블이나 metadata로 관리할 수 있음
                        metadata: additionalData?.extras
                            ? JSON.stringify(additionalData.extras)
                            : null
                    },
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        username: true,
                        emailVerified: true,
                        country: true,
                        language: true,
                        createdAt: true
                    }
                })

                // 환영 이메일 발송 준비 (실제 구현은 추후)
                // await this.sendWelcomeEmail(newUser.email, newUser.name)

                return newUser
            })

            // JWT 토큰 생성 (기존 유틸리티 함수 사용)
            const tokens = generateTokenPair({
                userId: user.id,
                email: user.email,
                name: user.name
            })

            // mock.json 호환 응답 형식
            return {
                data: {
                    accessToken: tokens.accessToken,
                    tokenType: 'bearer'
                },
                meta: {
                    refreshToken: tokens.refreshToken,
                    tokenType: 'bearer'
                },
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    username: user.username,
                    emailVerified: user.emailVerified,
                    country: user.country,
                    language: user.language,
                    createdAt: user.createdAt
                }
            }
        } catch (error) {
            // Prisma 특정 에러 처리
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // P2002: Unique constraint failed (이메일 중복)
                if (error.code === 'P2002') {
                    throw new Error('User already exists')
                }
                // 기타 Prisma 에러
                throw new Error(`Database error: ${error.message}`)
            }

            if (error instanceof Prisma.PrismaClientUnknownRequestError) {
                throw new Error('Unknown database error occurred')
            }

            if (error instanceof Prisma.PrismaClientValidationError) {
                throw new Error('Invalid user data provided')
            }

            if (error instanceof Prisma.PrismaClientInitializationError) {
                throw new Error('Database connection failed')
            }

            // 기존 비즈니스 로직 에러는 그대로 전달
            if (error instanceof Error) {
                throw error
            }

            // 알 수 없는 에러
            throw new Error('An unexpected error occurred during sign up')
        }
    }

    async signIn(email: string, password: string) {
        try {
            // 상수 정의
            const MAX_LOGIN_ATTEMPTS = 5
            const LOCK_DURATION_MINUTES = 15

            // 사용자 조회
            const user = await prisma.user.findUnique({
                where: { email }
            })

            if (!user) {
                throw new Error('Invalid credentials')
            }

            // 계정 잠금 상태 확인
            if (user.lockedUntil && user.lockedUntil > new Date()) {
                const remainingTime = Math.ceil(
                    (user.lockedUntil.getTime() - Date.now()) / (1000 * 60)
                )
                throw new Error(
                    `Account is locked. Try again in ${remainingTime} minutes.`
                )
            }

            // 비밀번호 검증
            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            )

            if (!isPasswordValid) {
                // 로그인 실패 처리
                const newAttempts = user.loginAttempts + 1
                let updateData: any = {
                    loginAttempts: newAttempts,
                    lastFailedLoginAt: new Date()
                }

                // 최대 시도 횟수 초과 시 계정 잠금
                if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
                    const lockUntil = new Date()
                    lockUntil.setMinutes(
                        lockUntil.getMinutes() + LOCK_DURATION_MINUTES
                    )
                    updateData.lockedUntil = lockUntil
                }

                await prisma.user.update({
                    where: { id: user.id },
                    data: updateData
                })

                if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
                    throw new Error(
                        `Too many failed login attempts. Account locked for ${LOCK_DURATION_MINUTES} minutes.`
                    )
                }

                throw new Error('Invalid credentials')
            }

            // 로그인 성공 - 실패 카운터 리셋 및 로그인 시간 업데이트
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    loginAttempts: 0,
                    lockedUntil: null,
                    lastLoginAt: new Date()
                }
            })

            // JWT 토큰 생성 (기존 유틸리티 함수 사용)
            const tokens = generateTokenPair({
                userId: user.id,
                email: user.email,
                name: user.name
            })

            // mock.json 호환 응답 형식
            return {
                data: {
                    accessToken: tokens.accessToken,
                    tokenType: 'bearer'
                },
                meta: {
                    refreshToken: tokens.refreshToken,
                    tokenType: 'bearer'
                },
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    username: user.username,
                    emailVerified: user.emailVerified,
                    country: user.country,
                    language: user.language,
                    lastLoginAt: new Date()
                }
            }
        } catch (error) {
            // Prisma 특정 에러 처리
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // P2002: Unique constraint failed
                if (error.code === 'P2002') {
                    throw new Error('Database constraint violation')
                }
                // P2025: Record not found
                if (error.code === 'P2025') {
                    throw new Error('Invalid credentials')
                }
                // 기타 Prisma 에러
                throw new Error(`Database error: ${error.message}`)
            }

            if (error instanceof Prisma.PrismaClientUnknownRequestError) {
                throw new Error('Unknown database error occurred')
            }

            if (error instanceof Prisma.PrismaClientValidationError) {
                throw new Error('Invalid database query parameters')
            }

            if (error instanceof Prisma.PrismaClientInitializationError) {
                throw new Error('Database connection failed')
            }

            // 기존 비즈니스 로직 에러는 그대로 전달
            if (error instanceof Error) {
                throw error
            }

            // 알 수 없는 에러
            throw new Error('An unexpected error occurred during sign in')
        }
    }

    async getUserById(userId: number) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                username: true,
                emailVerified: true,
                country: true,
                language: true,
                createdAt: true,
                updatedAt: true
            }
        })

        if (!user) {
            throw new Error('User not found')
        }

        return user
    }

    // 환영 이메일 발송 준비 메서드 (실제 구현은 추후)
    private async sendWelcomeEmail(email: string, name: string) {
        // TODO: 실제 이메일 발송 로직 구현
        console.log(`Welcome email prepared for ${name} (${email})`)
    }
}
