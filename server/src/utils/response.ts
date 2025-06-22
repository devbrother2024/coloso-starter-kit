import { Response } from 'express'

// 표준 API 응답 형식
export interface ApiResponse<T = any> {
    success: boolean
    data?: T
    error?: ApiError
    message?: string
}

// 에러 응답 형식
export interface ApiError {
    code: number
    message: string
    cause?: string
    details?: any
}

// 성공 응답 생성
export const createSuccessResponse = <T>(
    data?: T,
    message?: string
): ApiResponse<T> => {
    return {
        success: true,
        data,
        message
    }
}

// 에러 응답 생성
export const createErrorResponse = (error: ApiError): ApiResponse => {
    return {
        success: false,
        error
    }
}

// Express Response 헬퍼 함수들
export const sendSuccess = <T>(
    res: Response,
    data?: T,
    message?: string,
    statusCode: number = 200
) => {
    return res.status(statusCode).json(createSuccessResponse(data, message))
}

export const sendError = (
    res: Response,
    error: ApiError,
    statusCode?: number
) => {
    const status = statusCode || error.code || 500
    return res.status(status).json(createErrorResponse(error))
}

// 일반적인 에러 생성 헬퍼들
export const createValidationError = (
    message: string,
    details?: any
): ApiError => ({
    code: 400,
    message,
    cause: 'VALIDATION_ERROR',
    details
})

export const createAuthError = (
    message: string = 'Authentication required'
): ApiError => ({
    code: 401,
    message,
    cause: 'AUTH_ERROR'
})

export const createForbiddenError = (
    message: string = 'Access forbidden'
): ApiError => ({
    code: 403,
    message,
    cause: 'FORBIDDEN_ERROR'
})

export const createNotFoundError = (
    message: string = 'Resource not found'
): ApiError => ({
    code: 404,
    message,
    cause: 'NOT_FOUND_ERROR'
})

export const createInternalError = (
    message: string = 'Internal server error',
    details?: any
): ApiError => ({
    code: 500,
    message,
    cause: 'INTERNAL_ERROR',
    details
})
