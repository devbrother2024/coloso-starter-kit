import { z } from 'zod'

// 회원가입 스키마
export const registerSchema = z.object({
    body: z.object({
        name: z
            .string({ required_error: '이름을 입력해주세요.' })
            .min(2, '이름은 2자 이상이어야 합니다.'),
        email: z
            .string({ required_error: '이메일을 입력해주세요.' })
            .email('올바른 이메일 형식이 아닙니다.'),
        password: z
            .string({ required_error: '비밀번호를 입력해주세요.' })
            .min(8, '비밀번호는 8자 이상이어야 합니다.')
            .regex(
                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.'
            )
    })
})

// 로그인 스키마
export const loginSchema = z.object({
    body: z.object({
        email: z
            .string({ required_error: '이메일을 입력해주세요.' })
            .email('올바른 이메일 형식이 아닙니다.'),
        password: z.string({ required_error: '비밀번호를 입력해주세요.' })
    })
})

// 토큰 갱신 스키마
export const refreshTokenSchema = z.object({
    body: z.object({
        refreshToken: z.string({
            required_error: '리프레시 토큰이 필요합니다.'
        })
    })
})
