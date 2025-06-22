import { z } from 'zod'

// 회원가입 스키마 - 클라이언트 TypeSignUp 인터페이스와 호환
export const registerSchema = z.object({
    body: z.object({
        // 필수 필드
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
                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
                '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.'
            ),

        // 클라이언트 호환 필드들
        username: z.string().optional(), // 클라이언트에서 전송하는 username (보통 email과 동일)
        emailCertified: z.boolean().optional().default(false), // 이메일 인증 상태
        country: z.string().nullable().optional(), // 국가 코드 (CustomerCountry)
        language: z.string().optional(), // 언어 코드 (CustomerLanguageCode로 변환된 값)
        clientId: z.string().optional(), // 클라이언트 ID

        // 추가 메타데이터 (선택적)
        extras: z.record(z.any()).optional() // 추가 데이터를 위한 확장 가능한 필드
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

// 이메일 인증 요청 스키마 (클라이언트 호환)
export const emailSecretRequestSchema = z.object({
    body: z.object({
        email: z.string().email('올바른 이메일 형식이 아닙니다.'),
        clientId: z.string().optional()
    })
})

// 이메일 인증 확인 스키마 (클라이언트 호환)
export const emailSecretConfirmSchema = z.object({
    body: z.object({
        email: z.string().email('올바른 이메일 형식이 아닙니다.'),
        code: z.string().min(6, '인증 코드는 6자리입니다.'),
        clientId: z.string().optional()
    })
})
