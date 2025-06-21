import { Request, Response } from 'express'
import { registerUser, loginUser } from '../services/auth.service'
import { generateTokenPair } from '../utils/jwt'

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
