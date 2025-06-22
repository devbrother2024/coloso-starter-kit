import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import {
    sendSuccess,
    sendError,
    createValidationError,
    createAuthError
} from '../utils/response'

const prisma = new PrismaClient()

export class UserController {
    async getMe(req: Request, res: Response) {
        try {
            if (!req.user) {
                return sendError(
                    res,
                    createAuthError('Authentication required')
                )
            }

            // Prisma Client로 사용자 정보 조회 (민감 정보 제외)
            const user = await prisma.user.findUnique({
                where: { id: req.user.userId },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    username: true,
                    role: true,
                    emailVerified: true,
                    maskedEmail: true,
                    phone: true,
                    language: true,
                    country: true,
                    postalCode: true,
                    address: true,
                    addressExtra: true,
                    phoneCertifiedAt: true,
                    emailMarketingAgreedAt: true,
                    phoneMarketingAgreedAt: true,
                    lastLoginAt: true,
                    createdAt: true,
                    updatedAt: true
                    // password는 의도적으로 제외
                }
            })

            if (!user) {
                return sendError(res, createAuthError('User not found'))
            }

            return sendSuccess(res, user, 'User profile retrieved successfully')
        } catch (error: any) {
            return sendError(res, {
                code: 500,
                message: 'Internal server error',
                cause: 'USER_PROFILE_ERROR',
                details: error.message
            })
        }
    }

    async updateMe(req: Request, res: Response) {
        try {
            if (!req.user) {
                return sendError(
                    res,
                    createAuthError('Authentication required')
                )
            }

            const {
                name,
                username,
                phone,
                language,
                country,
                postalCode,
                address,
                addressExtra,
                emailMarketingAgreedAt,
                phoneMarketingAgreedAt
            } = req.body

            // 이메일 변경은 별도 처리 (재인증 필요)
            if (req.body.email) {
                return sendError(
                    res,
                    createValidationError(
                        'Email change requires separate verification process'
                    )
                )
            }

            // 변경 가능한 필드만 업데이트
            const updateData: any = {}
            if (name !== undefined) updateData.name = name
            if (username !== undefined) updateData.username = username
            if (phone !== undefined) updateData.phone = phone
            if (language !== undefined) updateData.language = language
            if (country !== undefined) updateData.country = country
            if (postalCode !== undefined) updateData.postalCode = postalCode
            if (address !== undefined) updateData.address = address
            if (addressExtra !== undefined)
                updateData.addressExtra = addressExtra
            if (emailMarketingAgreedAt !== undefined) {
                updateData.emailMarketingAgreedAt = emailMarketingAgreedAt
                    ? new Date()
                    : null
            }
            if (phoneMarketingAgreedAt !== undefined) {
                updateData.phoneMarketingAgreedAt = phoneMarketingAgreedAt
                    ? new Date()
                    : null
            }

            // 업데이트할 데이터가 없는 경우
            if (Object.keys(updateData).length === 0) {
                return sendError(
                    res,
                    createValidationError('No valid fields to update')
                )
            }

            // Prisma Client로 사용자 정보 업데이트
            const updatedUser = await prisma.user.update({
                where: { id: req.user.userId },
                data: updateData,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    username: true,
                    role: true,
                    emailVerified: true,
                    maskedEmail: true,
                    phone: true,
                    language: true,
                    country: true,
                    postalCode: true,
                    address: true,
                    addressExtra: true,
                    phoneCertifiedAt: true,
                    emailMarketingAgreedAt: true,
                    phoneMarketingAgreedAt: true,
                    lastLoginAt: true,
                    createdAt: true,
                    updatedAt: true
                }
            })

            return sendSuccess(
                res,
                updatedUser,
                'User profile updated successfully'
            )
        } catch (error: any) {
            if (error.code === 'P2002') {
                // Prisma unique constraint violation
                return sendError(
                    res,
                    createValidationError('Username or email already exists')
                )
            }

            return sendError(res, {
                code: 500,
                message: 'Internal server error',
                cause: 'USER_UPDATE_ERROR',
                details: error.message
            })
        }
    }
}
