# API 마이그레이션 가이드

이 가이드는 기존 Mock API에서 Express API로 단계적으로 마이그레이션하는 과정을 설명합니다.

## 🎯 목적

- 기존 Mock API와 Express API를 동시에 지원하는 하이브리드 구조 구현
- 클라이언트 코드 변경 없이 단계적 마이그레이션 지원
- 표준화된 API 응답 형식 제공

## 🔧 설정 방법

### 1. 환경 변수 설정

`.env` 파일을 생성하고 다음 설정을 추가하세요:

```env
# API Configuration
API_MODE=hybrid
EXPRESS_API_URL=http://localhost:5001
MOCK_API_URL=http://localhost:8080
EXPRESS_ENDPOINTS=auth
API_DEBUG=true
```

### 2. API 모드 설명

- **mock**: 모든 API 요청을 Mock API(localhost:8080)로 전송
- **hybrid**: 설정된 엔드포인트만 Express API로, 나머지는 Mock API로 전송
- **live**: 모든 API 요청을 Express API(localhost:5001)로 전송

### 3. 단계적 마이그레이션

#### 1단계: Auth API 마이그레이션

```env
EXPRESS_ENDPOINTS=auth
```

#### 2단계: User API 추가

```env
EXPRESS_ENDPOINTS=auth,user
```

#### 3단계: Order API 추가

```env
EXPRESS_ENDPOINTS=auth,user,order
```

#### 최종 단계: 전체 마이그레이션

```env
API_MODE=live
```

## 📋 API 응답 형식

### 표준 응답 형식

모든 API는 다음과 같은 표준 형식을 따릅니다:

```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}
```

### 성공 응답 예시

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe"
    },
    "tokens": {
      "accessToken": "...",
      "refreshToken": "..."
    }
  },
  "message": "Login successful"
}
```

### 에러 응답 예시

```json
{
  "success": false,
  "error": {
    "code": 400,
    "message": "Invalid credentials",
    "cause": "AUTH_ERROR"
  }
}
```

## 🔄 사용 방법

### 클라이언트 코드

기존 클라이언트 코드는 변경 없이 사용할 수 있습니다:

```typescript
import http from '@/client/http';

// 이 요청은 설정에 따라 Mock 또는 Express API로 자동 라우팅됩니다
const response = await http.post('/auth/signin', {
  email: 'user@example.com',
  password: 'password123',
});

// 표준 응답 형식으로 데이터에 접근
if (response.success) {
  console.log('User:', response.data.user);
} else {
  console.error('Error:', response.error.message);
}
```

### 디버그 모드

`API_DEBUG=true` 설정 시 콘솔에서 API 요청/응답 정보를 확인할 수 있습니다:

```
[API Debug] API Request: /auth/signin {
  baseUrl: "http://localhost:5001",
  fullUrl: "http://localhost:5001/auth/signin",
  useExpress: true
}

[API Debug] API Response: /auth/signin {
  status: 200,
  ok: true,
  responseText: "{"success":true,"data":{"user":{"id":1...}"
}
```

## 🚀 Express API 개발 가이드

### 컨트롤러 구조

```typescript
import { sendSuccess, sendError, createValidationError } from '../utils/response';

export class AuthController {
  async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return sendError(res, createValidationError('Email and password are required'));
      }

      const result = await this.authService.signIn(email, password);

      if (!result) {
        return sendError(res, createAuthError('Invalid credentials'));
      }

      return sendSuccess(res, result, 'Login successful');
    } catch (error: any) {
      return sendError(res, createInternalError('Login failed', error.message));
    }
  }
}
```

### 응답 유틸리티 사용

```typescript
// 성공 응답
return sendSuccess(res, data, 'Operation successful', 201);

// 에러 응답
return sendError(res, createValidationError('Invalid input'));
return sendError(res, createAuthError('Authentication required'));
return sendError(res, createNotFoundError('User not found'));
```

## 🔍 트러블슈팅

### 1. CORS 오류

Express 서버에서 CORS 설정 확인:

```typescript
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
```

### 2. 인증 토큰 오류

클라이언트에서 인증 헤더가 올바르게 설정되는지 확인:

```typescript
// Express API 사용 시 자동으로 Bearer 토큰이 추가됩니다
Authorization: Bearer<access_token>;
```

### 3. 응답 형식 불일치

Express API에서 표준 응답 유틸리티를 사용하는지 확인:

```typescript
// ❌ 직접 응답
res.json({ user: data });

// ✅ 표준 응답 유틸리티 사용
sendSuccess(res, { user: data }, 'User retrieved');
```

## 📊 마이그레이션 체크리스트

- [ ] 환경 변수 설정 완료
- [ ] Auth API Express 구현 완료
- [ ] Auth API 테스트 완료
- [ ] User API Express 구현 완료
- [ ] User API 테스트 완료
- [ ] Order API Express 구현 완료
- [ ] Order API 테스트 완료
- [ ] 전체 시스템 테스트 완료
- [ ] 프로덕션 배포 준비 완료

## 🔗 관련 파일

- `client/config/api.ts` - API 설정 관리
- `client/client/http.ts` - HTTP 클라이언트 (하이브리드 지원)
- `client/types/api.ts` - API 타입 정의
- `server/src/utils/response.ts` - Express 응답 유틸리티
- `server/src/controllers/auth.controller.ts` - Auth 컨트롤러 예시
