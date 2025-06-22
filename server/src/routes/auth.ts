import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { validate } from '../middleware/validate'
import { authenticateRefreshToken, authenticateToken } from '../middleware/auth'
import {
    loginSchema,
    registerSchema,
    emailSecretRequestSchema,
    emailSecretConfirmSchema
} from '../schemas/auth.schema'

const router = Router()
const authController = new AuthController()

// 회원가입
router.post('/signup', validate(registerSchema), (req, res) => {
    authController.signUp(req, res)
})

// 로그인
router.post('/signin', validate(loginSchema), (req, res) => {
    authController.signIn(req, res)
})

// 이메일 인증 코드 요청 (클라이언트 호환)
router.post(
    '/signup/email-secret-request',
    validate(emailSecretRequestSchema),
    (req, res) => {
        // TODO: 실제 이메일 인증 코드 발송 로직 구현
        res.json({
            success: true,
            message: 'Email verification code sent',
            data: {
                email: req.body.email,
                codeSent: true
            }
        })
    }
)

// 이메일 인증 코드 확인 (클라이언트 호환)
router.post(
    '/signup/email-secret-confirm',
    validate(emailSecretConfirmSchema),
    (req, res) => {
        // TODO: 실제 이메일 인증 코드 검증 로직 구현
        const { email, code } = req.body

        // 임시로 모든 코드를 유효한 것으로 처리 (실제로는 Redis나 DB에서 검증)
        if (code && code.length === 6) {
            res.json({
                success: true,
                message: 'Email verification successful',
                data: {
                    email,
                    verified: true
                }
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Invalid verification code',
                error: {
                    code: 400,
                    message: 'Invalid verification code',
                    cause: 'INVALID_CODE'
                }
            })
        }
    }
)

// 이메일 변경 인증 코드 요청 (클라이언트 호환)
router.post(
    '/email-change-secret',
    validate(emailSecretRequestSchema),
    (req, res) => {
        // TODO: 실제 이메일 변경 인증 코드 발송 로직 구현
        res.json({
            success: true,
            message: 'Email change verification code sent',
            data: {
                email: req.body.email,
                codeSent: true
            }
        })
    }
)

// 토큰 갱신
router.post('/refresh', authenticateRefreshToken, (req, res) => {
    authController.refresh(req, res)
})

// 로그아웃
router.post('/signout', authenticateToken, (req, res) => {
    authController.signOut(req, res)
})

export default router
