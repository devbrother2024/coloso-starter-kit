import { Router } from 'express'
import {
    registerHandler,
    loginHandler,
    refreshTokenHandler,
    logoutHandler
} from '../controllers/auth.controller'
import { validate } from '../middleware/validate'
import {
    registerSchema,
    loginSchema,
    refreshTokenSchema
} from '../schemas/auth.schema'
import { authenticateRefreshToken } from '../middleware/auth'

const router = Router()

// 회원가입
router.post('/register', validate(registerSchema), registerHandler)

// 로그인
router.post('/login', validate(loginSchema), loginHandler)

// 토큰 갱신
router.post(
    '/refresh',
    validate(refreshTokenSchema),
    authenticateRefreshToken,
    refreshTokenHandler
)

// 로그아웃
router.post('/logout', logoutHandler)

export default router
