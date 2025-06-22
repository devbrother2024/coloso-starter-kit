import { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { authenticateToken } from '../middleware/auth'

const router = Router()
const userController = new UserController()

// GET /users/me - 현재 사용자 정보 조회
router.get('/me', authenticateToken, (req, res) => {
    userController.getMe(req, res)
})

// PUT /users/me - 현재 사용자 정보 수정
router.put('/me', authenticateToken, (req, res) => {
    userController.updateMe(req, res)
})

export default router
