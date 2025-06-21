import { Router, Request, Response } from 'express'
import { authenticateToken } from '../middleware/auth'

const router = Router()

// 모든 라우트에 인증 미들웨어 적용
router.use(authenticateToken)

// 사용자 프로필 조회
router.get('/profile', async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({
                error: 'Unauthorized',
                message: 'User information not found',
                timestamp: new Date().toISOString()
            })
            return
        }

        // TODO: 실제 구현에서는 데이터베이스에서 사용자 정보 조회
        res.json({
            message: 'Profile retrieved successfully',
            data: {
                user: {
                    id: req.user.userId,
                    email: req.user.email,
                    tokenType: req.user.type,
                    issuedAt: new Date(req.user.iat! * 1000).toISOString(),
                    expiresAt: new Date(req.user.exp! * 1000).toISOString()
                }
            },
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Profile error:', error)
        res.status(500).json({
            error: 'Internal server error',
            message: 'An error occurred while retrieving profile',
            timestamp: new Date().toISOString()
        })
    }
})

// 사용자 대시보드 데이터
router.get('/dashboard', async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({
                error: 'Unauthorized',
                message: 'User information not found',
                timestamp: new Date().toISOString()
            })
            return
        }

        // TODO: 실제 구현에서는 사용자별 대시보드 데이터 조회
        res.json({
            message: 'Dashboard data retrieved successfully',
            data: {
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
            },
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Dashboard error:', error)
        res.status(500).json({
            error: 'Internal server error',
            message: 'An error occurred while retrieving dashboard data',
            timestamp: new Date().toISOString()
        })
    }
})

export default router
