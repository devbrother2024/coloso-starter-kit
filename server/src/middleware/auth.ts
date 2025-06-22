import { Request, Response, NextFunction } from 'express'
import { verifyToken, JWTPayload } from '../utils/jwt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Express Request 타입 확장
declare global {
    namespace Express {
        interface Request {
            user?: JWTPayload & {
                dbUser?: {
                    id: number
                    name: string
                    email: string
                    role: string
                    emailVerified: boolean
                }
            }
        }
    }
}

// 토큰 추출 함수
function extractToken(req: Request): string | null {
    // Authorization 헤더에서 Bearer 토큰 추출
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7) // 'Bearer ' 제거
    }

    // 쿠키에서 토큰 추출 (옵션)
    if (req.cookies && req.cookies.accessToken) {
        return req.cookies.accessToken
    }

    return null
}

// JWT 인증 미들웨어
export async function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const token = extractToken(req)

        if (!token) {
            res.status(401).json({
                error: 'Access token is required',
                message:
                    'Please provide a valid access token in the Authorization header',
                timestamp: new Date().toISOString()
            })
            return
        }

        // 토큰 검증
        const decoded = verifyToken(token)

        // access token만 허용
        if (decoded.type !== 'access') {
            res.status(401).json({
                error: 'Invalid token type',
                message: 'Only access tokens are allowed for authentication',
                timestamp: new Date().toISOString()
            })
            return
        }

        // Prisma Client로 사용자 정보 조회
        const dbUser = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                emailVerified: true
            }
        })

        if (!dbUser) {
            res.status(401).json({
                error: 'User not found',
                message: 'The user associated with this token no longer exists',
                timestamp: new Date().toISOString()
            })
            return
        }

        // 사용자 정보를 request 객체에 추가
        req.user = {
            ...decoded,
            dbUser
        }
        next()
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('expired')) {
                res.status(401).json({
                    error: 'Token expired',
                    message:
                        'Access token has expired. Please refresh your token',
                    timestamp: new Date().toISOString()
                })
            } else if (error.message.includes('invalid')) {
                res.status(401).json({
                    error: 'Invalid token',
                    message: 'The provided token is invalid',
                    timestamp: new Date().toISOString()
                })
            } else {
                res.status(401).json({
                    error: 'Authentication failed',
                    message: error.message,
                    timestamp: new Date().toISOString()
                })
            }
        } else {
            res.status(500).json({
                error: 'Internal server error',
                message: 'An unexpected error occurred during authentication',
                timestamp: new Date().toISOString()
            })
        }
    }
}

// 선택적 인증 미들웨어 (토큰이 있으면 검증, 없어도 통과)
export async function optionalAuth(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const token = extractToken(req)

        if (token) {
            const decoded = verifyToken(token)
            if (decoded.type === 'access') {
                // Prisma Client로 사용자 정보 조회
                const dbUser = await prisma.user.findUnique({
                    where: { id: decoded.userId },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        emailVerified: true
                    }
                })

                if (dbUser) {
                    req.user = {
                        ...decoded,
                        dbUser
                    }
                }
            }
        }

        next()
    } catch (error) {
        // 선택적 인증에서는 에러가 발생해도 계속 진행
        next()
    }
}

// Refresh Token 검증 미들웨어
export async function authenticateRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const token = extractToken(req)

        if (!token) {
            res.status(401).json({
                error: 'Refresh token is required',
                message: 'Please provide a valid refresh token',
                timestamp: new Date().toISOString()
            })
            return
        }

        const decoded = verifyToken(token)

        // refresh token만 허용
        if (decoded.type !== 'refresh') {
            res.status(401).json({
                error: 'Invalid token type',
                message: 'Only refresh tokens are allowed for token refresh',
                timestamp: new Date().toISOString()
            })
            return
        }

        // Prisma Client로 사용자 정보 조회
        const dbUser = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                emailVerified: true
            }
        })

        if (!dbUser) {
            res.status(401).json({
                error: 'User not found',
                message: 'The user associated with this token no longer exists',
                timestamp: new Date().toISOString()
            })
            return
        }

        req.user = {
            ...decoded,
            dbUser
        }
        next()
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('expired')) {
                res.status(401).json({
                    error: 'Refresh token expired',
                    message: 'Refresh token has expired. Please login again',
                    timestamp: new Date().toISOString()
                })
            } else {
                res.status(401).json({
                    error: 'Invalid refresh token',
                    message: error.message,
                    timestamp: new Date().toISOString()
                })
            }
        } else {
            res.status(500).json({
                error: 'Internal server error',
                message: 'An unexpected error occurred during token refresh',
                timestamp: new Date().toISOString()
            })
        }
    }
}
