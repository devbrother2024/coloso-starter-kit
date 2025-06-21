import { Request, Response, NextFunction, RequestHandler } from 'express'
import { AnyZodObject, ZodError } from 'zod'

export const validate =
    (schema: AnyZodObject): RequestHandler =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params
            })
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = error.errors.map(err => ({
                    path: err.path.join('.'),
                    message: err.message
                }))
                res.status(400).json({
                    error: 'Validation failed',
                    details: errors,
                    timestamp: new Date().toISOString()
                })
            } else {
                res.status(500).json({
                    error: 'Internal server error',
                    message: 'An unexpected error occurred during validation',
                    timestamp: new Date().toISOString()
                })
            }
        }
    }
