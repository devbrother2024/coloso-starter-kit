import { Router, Request, Response } from 'express'
import { generateTokenPair, verifyToken } from '../utils/jwt'
import { authenticateRefreshToken } from '../middleware/auth'

const router = Router()

// 로그인 (임시 - 실제로는 사용자 인증 로직 필요)
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        // 기본 유효성 검사
        if (!email || !password) {
            res.status(400).json({
                error: 'Missing credentials',
                message: 'Email and password are required',
                timestamp: new Date().toISOString()
            })
            return
        }

        // TODO: 실제 사용자 인증 로직 구현 (데이터베이스 조회, 비밀번호 검증 등)
        // 현재는 데모용 하드코딩
        if (email === 'test@example.com' && password === 'password123') {
            const payload = {
                userId: 1,
                email: email
            }

            const tokens = generateTokenPair(payload)

            res.json({
                message: 'Login successful',
                data: {
                    user: {
                        id: 1,
                        email: email
                    },
                    tokens: {
                        accessToken: tokens.accessToken,
                        refreshToken: tokens.refreshToken
                    }
                },
                timestamp: new Date().toISOString()
            })
        } else {
            res.status(401).json({
                error: 'Invalid credentials',
                message: 'Email or password is incorrect',
                timestamp: new Date().toISOString()
            })
        }
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({
            error: 'Internal server error',
            message: 'An error occurred during login',
            timestamp: new Date().toISOString()
        })
    }
})

// 토큰 갱신
router.post(
    '/refresh',
    authenticateRefreshToken,
    async (req: Request, res: Response) => {
        try {
            if (!req.user) {
                res.status(401).json({
                    error: 'Invalid refresh token',
                    message: 'Refresh token is invalid or expired',
                    timestamp: new Date().toISOString()
                })
                return
            }

            // 새로운 토큰 쌍 생성
            const payload = {
                userId: req.user.userId,
                email: req.user.email
            }

            const tokens = generateTokenPair(payload)

            res.json({
                message: 'Token refreshed successfully',
                data: {
                    tokens: {
                        accessToken: tokens.accessToken,
                        refreshToken: tokens.refreshToken
                    }
                },
                timestamp: new Date().toISOString()
            })
        } catch (error) {
            console.error('Token refresh error:', error)
            res.status(500).json({
                error: 'Internal server error',
                message: 'An error occurred during token refresh',
                timestamp: new Date().toISOString()
            })
        }
    }
)

// 로그아웃 (현재는 클라이언트 측에서 토큰 삭제로 처리)
router.post('/logout', async (req: Request, res: Response) => {
    try {
        // TODO: 실제 구현에서는 토큰 블랙리스트 처리
        // 현재는 클라이언트에서 토큰을 삭제하도록 안내

        res.json({
            message: 'Logout successful',
            data: {
                instruction: 'Please remove the tokens from client storage'
            },
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Logout error:', error)
        res.status(500).json({
            error: 'Internal server error',
            message: 'An error occurred during logout',
            timestamp: new Date().toISOString()
        })
    }
})

// 토큰 검증 (디버깅용)
router.post('/verify', async (req: Request, res: Response) => {
    try {
        const { token } = req.body

        if (!token) {
            res.status(400).json({
                error: 'Missing token',
                message: 'Token is required for verification',
                timestamp: new Date().toISOString()
            })
            return
        }

        const decoded = verifyToken(token)

        res.json({
            message: 'Token is valid',
            data: {
                payload: decoded,
                isValid: true
            },
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        res.status(401).json({
            error: 'Invalid token',
            message:
                error instanceof Error
                    ? error.message
                    : 'Token verification failed',
            data: {
                isValid: false
            },
            timestamp: new Date().toISOString()
        })
    }
})

export default router
