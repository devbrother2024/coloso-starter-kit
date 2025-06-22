import { Router, Request, Response, RequestHandler } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { authenticateToken } from '../middleware/auth'
import { sendSuccess, sendError, createAuthError } from '../utils/response'

const router = Router()
const authController = new AuthController()

// 모든 protected 라우트에 인증 미들웨어 적용
router.use(authenticateToken)

// 프로필 조회
router.get('/profile', (req, res) => {
    authController.getProfile(req, res)
})

// 사용자 대시보드 데이터
const getDashboard: RequestHandler = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            sendError(res, createAuthError('User information not found'))
            return
        }

        // TODO: 실제 구현에서는 사용자별 대시보드 데이터 조회
        const dashboardData = {
            user: {
                id: req.user.userId,
                email: req.user.email
            },
            stats: {
                totalProjects: 5,
                completedTasks: 23,
                pendingTasks: 7,
                lastLoginAt: new Date().toISOString()
            },
            recentActivity: [
                {
                    id: 1,
                    action: 'Created new project',
                    timestamp: new Date(
                        Date.now() - 1000 * 60 * 30
                    ).toISOString() // 30분 전
                },
                {
                    id: 2,
                    action: 'Completed task #15',
                    timestamp: new Date(
                        Date.now() - 1000 * 60 * 60 * 2
                    ).toISOString() // 2시간 전
                }
            ]
        }

        sendSuccess(res, dashboardData, 'Dashboard data retrieved successfully')
    } catch (error: any) {
        console.error('Dashboard error:', error)
        sendError(res, {
            code: 500,
            message: 'Internal server error',
            cause: 'DASHBOARD_ERROR',
            details: error.message
        })
    }
}

router.get('/dashboard', getDashboard)

export default router
