import app from './app'
import { connectDatabase, disconnectDatabase } from './config/database'

const PORT = process.env.PORT || 5000

// Initialize database connection and start server
async function startServer() {
    try {
        // Connect to database first
        await connectDatabase()

        // Start the server
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`)
            console.log(`📊 Health check: http://localhost:${PORT}/health`)
            console.log(`🔗 API endpoint: http://localhost:${PORT}/api`)
            console.log(
                `🌍 Environment: ${process.env.NODE_ENV || 'development'}`
            )
        })

        // Handle graceful shutdown
        const gracefulShutdown = async () => {
            console.log('Shutting down gracefully...')

            // Close server
            server.close(async () => {
                try {
                    await disconnectDatabase()
                    console.log('Process terminated')
                    process.exit(0)
                } catch (error) {
                    console.error('Error during shutdown:', error)
                    process.exit(1)
                }
            })
        }

        process.on('SIGTERM', gracefulShutdown)
        process.on('SIGINT', gracefulShutdown)
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

// Handle uncaught exceptions
process.on('uncaughtException', error => {
    console.error('Uncaught Exception:', error)
    process.exit(1)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason)
    process.exit(1)
})

// Start the server
startServer()

export default startServer
