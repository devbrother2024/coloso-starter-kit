import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

// 키 파일 경로
const PRIVATE_KEY_PATH = path.join(__dirname, '../../keys/private.pem')
const PUBLIC_KEY_PATH = path.join(__dirname, '../../keys/public.pem')

// 키 읽기 (캐시)
let privateKey: string | null = null
let publicKey: string | null = null

function getPrivateKey(): string {
    if (!privateKey) {
        privateKey = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8')
    }
    return privateKey
}

function getPublicKey(): string {
    if (!publicKey) {
        publicKey = fs.readFileSync(PUBLIC_KEY_PATH, 'utf8')
    }
    return publicKey
}

// 토큰 만료 시간 설정
export const TOKEN_EXPIRES = {
    ACCESS_TOKEN: '15m', // 15분
    REFRESH_TOKEN: '7d' // 7일
} as const

// JWT 페이로드 타입
export interface JWTPayload {
    userId: number
    email: string
    name?: string // 사용자 이름 필드 추가 (선택적)
    type: 'access' | 'refresh'
    iat?: number
    exp?: number
}

// 토큰 생성 함수
export function generateAccessToken(payload: Omit<JWTPayload, 'type'>): string {
    try {
        const tokenPayload: JWTPayload = {
            ...payload,
            type: 'access'
        }

        return jwt.sign(tokenPayload, getPrivateKey(), {
            algorithm: 'RS256',
            expiresIn: TOKEN_EXPIRES.ACCESS_TOKEN,
            issuer: 'dev-brother2-api',
            audience: 'dev-brother2-client'
        })
    } catch (error) {
        throw new Error(
            `Failed to generate access token: ${error instanceof Error ? error.message : 'Unknown error'}`
        )
    }
}

export function generateRefreshToken(
    payload: Omit<JWTPayload, 'type'>
): string {
    try {
        const tokenPayload: JWTPayload = {
            ...payload,
            type: 'refresh'
        }

        return jwt.sign(tokenPayload, getPrivateKey(), {
            algorithm: 'RS256',
            expiresIn: TOKEN_EXPIRES.REFRESH_TOKEN,
            issuer: 'dev-brother2-api',
            audience: 'dev-brother2-client'
        })
    } catch (error) {
        throw new Error(
            `Failed to generate refresh token: ${error instanceof Error ? error.message : 'Unknown error'}`
        )
    }
}

// 토큰 검증 함수
export function verifyToken(token: string): JWTPayload {
    try {
        const decoded = jwt.verify(token, getPublicKey(), {
            algorithms: ['RS256'],
            issuer: 'dev-brother2-api',
            audience: 'dev-brother2-client'
        }) as JWTPayload

        return decoded
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error('Token has expired')
        } else if (error instanceof jwt.JsonWebTokenError) {
            throw new Error('Invalid token')
        } else {
            throw new Error(
                `Token verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`
            )
        }
    }
}

// 토큰 디코딩 (검증 없이)
export function decodeToken(token: string): JWTPayload | null {
    try {
        const decoded = jwt.decode(token) as JWTPayload
        return decoded
    } catch (error) {
        return null
    }
}

// 토큰 만료 시간 확인
export function getTokenExpiration(token: string): Date | null {
    try {
        const decoded = decodeToken(token)
        if (decoded && decoded.exp) {
            return new Date(decoded.exp * 1000)
        }
        return null
    } catch (error) {
        return null
    }
}

// 토큰 유효성 검사 (만료 여부만)
export function isTokenExpired(token: string): boolean {
    try {
        const expiration = getTokenExpiration(token)
        if (!expiration) return true

        return expiration.getTime() < Date.now()
    } catch (error) {
        return true
    }
}

// 토큰 쌍 생성
export function generateTokenPair(payload: Omit<JWTPayload, 'type'>) {
    return {
        accessToken: generateAccessToken(payload),
        refreshToken: generateRefreshToken(payload)
    }
}
