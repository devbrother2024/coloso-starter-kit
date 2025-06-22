import { Request, Response } from 'express'
import { registerUser, loginUser } from '../services/auth.service'
import { generateTokenPair } from '../utils/jwt'
import { AuthService } from '../services/auth.service'
import {
    sendSuccess,
    sendError,
    createValidationError,
    createAuthError
} from '../utils/response'

export class AuthController {
    private authService: AuthService

    constructor() {
        this.authService = new AuthService()
    }

    async signUp(req: Request, res: Response) {
        try {
            const {
                email,
                password,
                name,
                username,
                emailCertified,
                country,
                language,
                clientId,
                extras
            } = req.body

            // 필수 필드 검증
            if (!email || !password || !name) {
                return sendError(
                    res,
                    createValidationError(
                        'Email, password, and name are required'
                    )
                )
            }

            // 추가 데이터 구성
            const additionalData = {
                username,
                emailCertified,
                country,
                language,
                clientId,
                extras
            }

            const result = await this.authService.signUp(
                email,
                password,
                name,
                additionalData
            )

            return sendSuccess(res, result, 'User registered successfully', 201)
        } catch (error: any) {
            if (error.message === 'User already exists') {
                return sendError(
                    res,
                    createValidationError('User already exists')
                )
            }

            return sendError(res, {
                code: 500,
                message: 'Internal server error',
                cause: 'SIGNUP_ERROR',
                details: error.message
            })
        }
    }

    async signIn(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            if (!email || !password) {
                return sendError(
                    res,
                    createValidationError('Email and password are required')
                )
            }

            const result = await this.authService.signIn(email, password)

            return sendSuccess(res, result, 'Sign in successful')
        } catch (error: any) {
            if (error.message === 'Invalid credentials') {
                return sendError(
                    res,
                    createValidationError('Invalid email or password')
                )
            }

            return sendError(res, {
                code: 500,
                message: 'Internal server error',
                cause: 'SIGNIN_ERROR',
                details: error.message
            })
        }
    }

    async getProfile(req: Request, res: Response) {
        try {
            const userId = (req as any).user.id
            const user = await this.authService.getUserById(userId)

            if (!user) {
                return sendError(res, createAuthError('User not found'))
            }

            return sendSuccess(res, user, 'Profile retrieved successfully')
        } catch (error: any) {
            return sendError(res, {
                code: 500,
                message: 'Internal server error',
                cause: 'PROFILE_ERROR',
                details: error.message
            })
        }
    }
}

export const registerHandler = async (req: Request, res: Response) => {
    try {
        const user = await registerUser(req.body)
        const { password, ...userWithoutPassword } = user
        res.status(201).json({
            message: 'User registered successfully',
            data: userWithoutPassword,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        if (error instanceof Error && error.message.includes('exists')) {
            res.status(409).json({
                error: 'Conflict',
                message: error.message,
                timestamp: new Date().toISOString()
            })
        } else {
            res.status(500).json({
                error: 'Internal server error',
                message: 'An error occurred during registration',
                timestamp: new Date().toISOString()
            })
        }
    }
}

export const loginHandler = async (req: Request, res: Response) => {
    try {
        const { user, tokens } = await loginUser(req.body)
        const { password, ...userWithoutPassword } = user
        res.status(200).json({
            message: 'Login successful',
            data: {
                user: userWithoutPassword,
                tokens
            },
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        if (error instanceof Error && error.message.includes('Invalid')) {
            res.status(401).json({
                error: 'Unauthorized',
                message: error.message,
                timestamp: new Date().toISOString()
            })
        } else {
            res.status(500).json({
                error: 'Internal server error',
                message: 'An error occurred during login',
                timestamp: new Date().toISOString()
            })
        }
    }
}

export const refreshTokenHandler = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({ error: 'Invalid refresh token' })
            return
        }
        const tokens = generateTokenPair({
            userId: req.user.userId,
            email: req.user.email
        })
        res.status(200).json({
            message: 'Token refreshed successfully',
            data: tokens,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            message: 'An error occurred during token refresh',
            timestamp: new Date().toISOString()
        })
    }
}

export const logoutHandler = (req: Request, res: Response) => {
    // TODO: Implement token invalidation (e.g., blocklist)
    res.status(200).json({
        message: 'Logout successful',
        data: {
            instruction: 'Please remove the tokens from client storage'
        },
        timestamp: new Date().toISOString()
    })
}
