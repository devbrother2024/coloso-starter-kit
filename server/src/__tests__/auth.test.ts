import request from 'supertest'
import app from '../app'
import { prisma } from './setup'
import bcrypt from 'bcrypt'

describe('Auth API - 로그인 구현', () => {
    const testUser = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'Test123!@#',
        emailCertified: true,
        country: 'KR',
        language: 'ko'
    }

    beforeEach(async () => {
        // Create a test user for login tests
        const hashedPassword = await bcrypt.hash(testUser.password, 12)
        await prisma.user.create({
            data: {
                name: testUser.name,
                email: testUser.email,
                password: hashedPassword,
                username: testUser.email,
                emailVerified: testUser.emailCertified,
                country: testUser.country,
                language: testUser.language
            }
        })
    })

    describe('POST /auth/signin', () => {
        describe('입력 검증 (서브태스크 8.1)', () => {
            it('이메일이 없으면 400 에러를 반환해야 함', async () => {
                const response = await request(app)
                    .post('/auth/signin')
                    .send({ password: 'test123' })

                expect(response.status).toBe(400)
                expect(response.body.error).toBe('Validation failed')
                expect(response.body.details).toContainEqual(
                    expect.objectContaining({
                        path: 'body.email',
                        message: expect.stringContaining('이메일')
                    })
                )
            })

            it('비밀번호가 없으면 400 에러를 반환해야 함', async () => {
                const response = await request(app)
                    .post('/auth/signin')
                    .send({ email: 'test@example.com' })

                expect(response.status).toBe(400)
                expect(response.body.error).toBe('Validation failed')
                expect(response.body.details).toContainEqual(
                    expect.objectContaining({
                        path: 'body.password',
                        message: expect.stringContaining('비밀번호')
                    })
                )
            })

            it('잘못된 이메일 형식이면 400 에러를 반환해야 함', async () => {
                const response = await request(app).post('/auth/signin').send({
                    email: 'invalid-email',
                    password: 'test123'
                })

                expect(response.status).toBe(400)
                expect(response.body.error).toBe('Validation failed')
                expect(response.body.details).toContainEqual(
                    expect.objectContaining({
                        path: 'body.email',
                        message: '올바른 이메일 형식이 아닙니다.'
                    })
                )
            })
        })

        describe('사용자 조회 및 비밀번호 비교 (서브태스크 8.2)', () => {
            it('존재하지 않는 사용자면 400 에러를 반환해야 함', async () => {
                const response = await request(app).post('/auth/signin').send({
                    email: 'nonexistent@example.com',
                    password: 'test123'
                })

                expect(response.status).toBe(400)
                expect(response.body.error.message).toBe(
                    'Invalid email or password'
                )
                expect(response.body.error.cause).toBe('VALIDATION_ERROR')
            })

            it('잘못된 비밀번호면 400 에러를 반환해야 함', async () => {
                const response = await request(app).post('/auth/signin').send({
                    email: testUser.email,
                    password: 'wrongpassword'
                })

                expect(response.status).toBe(400)
                expect(response.body.error.message).toBe(
                    'Invalid email or password'
                )
                expect(response.body.error.cause).toBe('VALIDATION_ERROR')
            })

            it('올바른 자격증명으로 로그인에 성공해야 함', async () => {
                const response = await request(app).post('/auth/signin').send({
                    email: testUser.email,
                    password: testUser.password
                })

                expect(response.status).toBe(200)
                expect(response.body.success).toBe(true)
                expect(response.body.message).toBe('Sign in successful')
            })
        })

        describe('토큰 발급 (서브태스크 8.3)', () => {
            it('로그인 성공 시 JWT 토큰을 발급해야 함', async () => {
                const response = await request(app).post('/auth/signin').send({
                    email: testUser.email,
                    password: testUser.password
                })

                expect(response.status).toBe(200)
                expect(response.body.data.data.accessToken).toBeDefined()
                expect(response.body.data.data.tokenType).toBe('bearer')
                expect(response.body.data.meta.refreshToken).toBeDefined()
                expect(response.body.data.meta.tokenType).toBe('bearer')

                // JWT 토큰 형식 확인
                const accessToken = response.body.data.data.accessToken
                expect(accessToken).toMatch(
                    /^eyJ[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
                )
            })

            it('사용자 정보를 응답에 포함해야 함', async () => {
                const response = await request(app).post('/auth/signin').send({
                    email: testUser.email,
                    password: testUser.password
                })

                expect(response.status).toBe(200)
                expect(response.body.data.user).toEqual(
                    expect.objectContaining({
                        email: testUser.email,
                        name: testUser.name,
                        username: testUser.email,
                        emailVerified: testUser.emailCertified,
                        country: testUser.country,
                        language: testUser.language,
                        lastLoginAt: expect.any(String)
                    })
                )
            })
        })

        describe('Brute Force 방지 (서브태스크 8.4)', () => {
            it('5회 연속 로그인 실패 시 계정을 잠궈야 함', async () => {
                // 5회 연속 실패
                for (let i = 0; i < 5; i++) {
                    await request(app).post('/auth/signin').send({
                        email: testUser.email,
                        password: 'wrongpassword'
                    })
                }

                // 6번째 시도에서 계정 잠금 확인
                const response = await request(app).post('/auth/signin').send({
                    email: testUser.email,
                    password: 'wrongpassword'
                })

                expect(response.status).toBe(429)
                expect(response.body.error.message).toContain('Account')
                expect(response.body.error.cause).toBe('ACCOUNT_LOCKED')
            })

            it('계정 잠금 후 올바른 비밀번호로도 로그인이 차단되어야 함', async () => {
                // 5회 연속 실패로 계정 잠금
                for (let i = 0; i < 5; i++) {
                    await request(app).post('/auth/signin').send({
                        email: testUser.email,
                        password: 'wrongpassword'
                    })
                }

                // 올바른 비밀번호로도 차단되는지 확인
                const response = await request(app).post('/auth/signin').send({
                    email: testUser.email,
                    password: testUser.password
                })

                expect(response.status).toBe(429)
                expect(response.body.error.message).toContain(
                    'Account is locked'
                )
            })

            it('로그인 실패 횟수가 데이터베이스에 기록되어야 함', async () => {
                await request(app).post('/auth/signin').send({
                    email: testUser.email,
                    password: 'wrongpassword'
                })

                const user = await prisma.user.findUnique({
                    where: { email: testUser.email }
                })

                expect(user?.loginAttempts).toBe(1)
                expect(user?.lastFailedLoginAt).toBeDefined()
            })
        })

        describe('에러 메시지 및 상태코드 처리 (서브태스크 8.5)', () => {
            it('적절한 HTTP 상태 코드를 반환해야 함', async () => {
                // 성공 - 200
                const successResponse = await request(app)
                    .post('/auth/signin')
                    .send({
                        email: testUser.email,
                        password: testUser.password
                    })
                expect(successResponse.status).toBe(200)

                // 입력 검증 실패 - 400
                const validationResponse = await request(app)
                    .post('/auth/signin')
                    .send({ email: 'invalid' })
                expect(validationResponse.status).toBe(400)

                // 잘못된 자격증명 - 400
                const authResponse = await request(app)
                    .post('/auth/signin')
                    .send({
                        email: testUser.email,
                        password: 'wrong'
                    })
                expect(authResponse.status).toBe(400)
            })

            it('에러 응답에 타임스탬프가 포함되어야 함', async () => {
                const response = await request(app)
                    .post('/auth/signin')
                    .send({ email: 'invalid' })

                expect(response.body.timestamp).toBeDefined()
                expect(new Date(response.body.timestamp)).toBeInstanceOf(Date)
            })
        })

        describe('mock.json 호환 응답 형식 (서브태스크 8.7)', () => {
            it('mock.json과 호환되는 응답 구조를 반환해야 함', async () => {
                const response = await request(app).post('/auth/signin').send({
                    email: testUser.email,
                    password: testUser.password
                })

                expect(response.status).toBe(200)
                expect(response.body).toEqual(
                    expect.objectContaining({
                        success: true,
                        message: 'Sign in successful',
                        data: expect.objectContaining({
                            data: expect.objectContaining({
                                accessToken: expect.any(String),
                                tokenType: 'bearer'
                            }),
                            meta: expect.objectContaining({
                                refreshToken: expect.any(String),
                                tokenType: 'bearer'
                            }),
                            user: expect.objectContaining({
                                id: expect.any(Number),
                                email: testUser.email,
                                name: testUser.name
                            })
                        })
                    })
                )
            })
        })
    })

    describe('JWT 토큰 검증', () => {
        let accessToken: string

        beforeEach(async () => {
            const response = await request(app).post('/auth/signin').send({
                email: testUser.email,
                password: testUser.password
            })
            accessToken = response.body.data.data.accessToken
        })

        it('유효한 토큰으로 보호된 엔드포인트에 접근할 수 있어야 함', async () => {
            const response = await request(app)
                .get('/api/protected/profile')
                .set('Authorization', `Bearer ${accessToken}`)

            expect(response.status).toBe(200)
            expect(response.body.success).toBe(true)
            expect(response.body.data.email).toBe(testUser.email)
        })

        it('토큰 없이 보호된 엔드포인트에 접근하면 401 에러를 반환해야 함', async () => {
            const response = await request(app).get('/api/protected/profile')

            expect(response.status).toBe(401)
            expect(response.body.error).toContain('Access token is required')
        })

        it('잘못된 토큰으로 접근하면 401 에러를 반환해야 함', async () => {
            const response = await request(app)
                .get('/api/protected/profile')
                .set('Authorization', 'Bearer invalid-token')

            expect(response.status).toBe(401)
            expect(response.body.error).toContain('Authentication failed')
        })
    })
})
