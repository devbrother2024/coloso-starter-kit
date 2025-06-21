import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { checkDatabaseHealth } from './config/database'

// Load environment variables
dotenv.config()

const app = express()

// Security middleware
app.use(helmet())

// CORS configuration
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        credentials: true
    })
)

// Logging middleware
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Health check endpoint
app.get('/health', async (req, res) => {
    try {
        // Check database connection
        const dbHealth = await checkDatabaseHealth()

        const isHealthy = dbHealth.status === 'healthy'

        res.status(isHealthy ? 200 : 503).json({
            status: isHealthy ? 'OK' : 'ERROR',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development',
            version: process.env.npm_package_version || '1.0.0',
            database: dbHealth
        })
    } catch (error) {
        res.status(503).json({
            status: 'ERROR',
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : 'Unknown error',
            database: {
                status: 'unhealthy',
                message: 'Database check failed'
            }
        })
    }
})

// API routes will be added here
app.use('/api', (req, res) => {
    res.status(200).json({
        message: 'API is running',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            api: '/api'
        }
    })
})

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl,
        method: req.method
    })
})

// Global error handler
app.use(
    (
        error: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        console.error('Global error handler:', error)

        res.status(500).json({
            error:
                process.env.NODE_ENV === 'production'
                    ? 'Internal server error'
                    : error.message,
            timestamp: new Date().toISOString()
        })
    }
)

export default app
