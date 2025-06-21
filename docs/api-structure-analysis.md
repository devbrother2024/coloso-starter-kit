# API 구조 분석

## 📊 API 엔드포인트 매트릭스

이 문서는 `client/apis` 내 모듈과 `mock.json`을 기반으로 API 엔드포인트를 분석하고 정의합니다.

### 1. **인증 (Authentication)**

| API 모듈 (`apis/auth`) | HTTP 메서드 | 엔드포인트      | 역할          | 현재 상태 (Mock) | 목표 상태 (Real) |
| ---------------------- | ----------- | --------------- | ------------- | ---------------- | ---------------- |
| `signIn`               | `POST`      | `/auth/signin`  | 사용자 로그인 | ✅               | ✅               |
| `signUp`               | `POST`      | `/auth/signup`  | 회원가입      | ⬜️               | ✅               |
| `signOut`              | `POST`      | `/auth/signout` | 로그아웃      | ⬜️               | ✅               |
| `verify`               | `POST`      | `/auth/verify`  | 이메일 인증   | ⬜️               | ✅               |

### 2. **사용자 (User)**

| API 모듈 (`apis/user`) | HTTP 메서드 | 엔드포인트        | 역할              | 현재 상태 (Mock) | 목표 상태 (Real) |
| ---------------------- | ----------- | ----------------- | ----------------- | ---------------- | ---------------- |
| `getUser`              | `GET`       | `/users/me`       | 내 정보 조회      | ✅               | ✅               |
| `updateUser`           | `PUT`       | `/users/me`       | 내 정보 수정      | ⬜️               | ✅               |
| `getUserCourses`       | `GET`       | `/users/courses`  | 내 강의 목록 조회 | ✅               | ✅               |
| `getUserVouchers`      | `GET`       | `/users/vouchers` | 내 쿠폰 목록 조회 | ✅               | ✅               |

### 3. **상품/강의 (Product/Course)**

| API 모듈            | HTTP 메서드 | 엔드포인트       | 역할           | 현재 상태 (Mock) | 목표 상태 (Real) |
| ------------------- | ----------- | ---------------- | -------------- | ---------------- | ---------------- |
| `getProductById`    | `GET`       | `/products/{id}` | 상품 상세 조회 | ✅               | ✅               |
| `getCourseById`     | `GET`       | `/courses/{id}`  | 강의 상세 조회 | ✅               | ✅               |
| `getCourseChapters` | `GET`       | `/chapters/{id}` | 강의 챕터 조회 | ✅               | ✅               |

### 4. **주문/결제 (Order)**

| API 모듈 (`apis/order`) | HTTP 메서드 | 엔드포인트     | 역할           | 현재 상태 (Mock) | 목표 상태 (Real) |
| ----------------------- | ----------- | -------------- | -------------- | ---------------- | ---------------- |
| `getOrders`             | `GET`       | `/orders`      | 주문 내역 조회 | ✅               | ✅               |
| `getOrderById`          | `GET`       | `/orders/{id}` | 주문 상세 조회 | ✅               | ✅               |
| `createOrder`           | `POST`      | `/orders`      | 주문 생성      | ⬜️               | ✅               |

### 5. **콘텐츠/운영 (Operation/Display)**

| API 모듈           | HTTP 메서드 | 엔드포인트           | 역할               | 현재 상태 (Mock) | 목표 상태 (Real) |
| ------------------ | ----------- | -------------------- | ------------------ | ---------------- | ---------------- |
| `getOperationData` | `GET`       | `/operations/{type}` | 페이지 운영 데이터 | ✅               | ✅               |
| `getDisplayData`   | `GET`       | `/displays`          | 전시 데이터 조회   | ✅               | ✅               |
| `getBanners`       | `GET`       | `/banners/{type}`    | 배너 조회          | ✅               | ✅               |
| `getPageData`      | `GET`       | `/pages/{slug}`      | 페이지 상세 조회   | ✅               | ✅               |
| `getSearchResults` | `GET`       | `/search/{keyword}`  | 검색 결과 조회     | ✅               | ✅               |

## 📦 데이터 스키마 (TypeScript)

`types` 디렉토리와 `mock.json`을 기반으로 주요 API의 요청/응답 데이터 구조를 정의합니다.

### 1. `User`

```typescript
// GET /users/me - 응답
interface TypeUser {
    id: number
    name: string
    email: string
    phone?: string
    country?: string
    language?: string
    emailMarketingAgreedAt?: string
}
```

### 2. `Product`

```typescript
// GET /products/{id} - 응답
interface TypeProduct {
    id: number
    type: 'COURSE' | 'BUNDLE'
    publicTitle: string
    subtitle?: string
    listPrice: number
    salePrice: number
    currency: 'USC' | 'KRW'
    course: TypeCourse
    // ... 기타 필드
}

interface TypeCourse {
    id: number
    publicTitle: string
    keywords: string
    clipCount: string
    runningTime: string
    desktopCardAsset: string
    // ... 기타 필드
}
```

### 3. `Order`

```typescript
// GET /orders - 응답
interface TypeOrder {
    id: number
    orderName: string
    orderState: 'COMPLETED' | 'PENDING' | 'FAILED'
    paymentMethod: 'CARD' | 'PAYPAL' | 'PROMOTION'
    paymentCompletedAt: string
    orderItems: TypeOrderItem[]
}

interface TypeOrderItem {
    product: {
        id: number
        publicTitle: string
        cardImageAsset: string
    }
}
```

### 4. `Operation` (메인 페이지 등)

```typescript
// GET /operations/page?type=MAIN_PAGE - 응답
interface TypeOperation {
    id: string
    type: string
    data: {
        meta: {
            type: 'MAIN_BIG' | 'MAIN_QUICK_LINK' | 'MAIN_CURATION'
            theme: 'CURATION-CAROUSEL' | 'QuickLinks' | 'RecommendCard'
            publicTitle?: string
        }
        data: (TypeBanner | TypeCourse)[]
    }[]
}
```

## 🔄 API 통신 패턴

### 1. **데이터 페칭 라이브러리: TanStack Query (React Query)**

- `useQuery`와 `useMutation`을 사용하여 서버 상태를 관리합니다.
- 현재 프로젝트에서는 `useQuery`가 직접적으로 사용되기보다, 각 도메인별 훅 내부에서 데이터를 가져오고 Valtio 스토어에 저장하는 패턴이 주로 보입니다. 실제 구현에서는 `useQuery`를 활용한 서버 상태 관리로 전환하는 것이 이상적입니다.

#### 예시:

```typescript
// 이상적인 useQuery 사용 예시 (현재 코드에는 없음)
import { useQuery } from '@tanstack/react-query'
import { getUser } from '@/apis/user'

const useUserQuery = () => {
    return useQuery({
        queryKey: ['user', 'me'],
        queryFn: getUser,
        staleTime: 5 * 60 * 1000 // 5분
    })
}
```

### 2. **캐싱 전략**

- **HTTP 캐싱**: `client/http.ts`에서 `next: { revalidate: ... }` 옵션을 통해 Next.js의 데이터 캐시를 활용합니다. 기본적으로 `cache.revalidate` (정책 파일에 정의된 시간)만큼 캐시되며, `cache.noStore` 옵션으로 캐시를 비활성화할 수 있습니다.
- **React Query 캐싱**: `useAuth` 훅에서 로그아웃 시 `queryClient.removeQueries`를 호출하여 사용자 관련 쿼리 캐시를 명시적으로 제거합니다. 이는 데이터 정합성을 유지하는 중요한 패턴입니다.

### 3. **로딩 및 에러 상태 관리**

- **로딩**: 현재는 컴포넌트 레벨에서 `useState`를 사용하거나, `nextjs-toploader`를 통해 페이지 전환 시 로딩 바를 표시합니다. `useQuery`의 `isLoading` 상태를 활용하면 컴포넌트별 로딩 상태를 더 쉽게 관리할 수 있습니다.
- **에러 처리**: `client/http.ts`의 `_fetch` 함수에서 `response.ok`가 아닐 경우 `Promise.reject(error)`를 통해 에러를 전파합니다. `useQuery`의 `isError`, `error` 상태를 사용하여 UI에서 에러를 처리하는 것이 좋습니다.

## 🔒 인증/인가 구조

### 1. **토큰 기반 인증 (JWT)**

- `mock.json`의 `/auth/signin` 응답에 `accessToken`과 `refreshToken`이 포함되어 있어, JWT(JSON Web Token) 기반 인증을 사용함을 알 수 있습니다.
- `useAuth` 훅의 `successSignIn` 함수는 `accessToken`을 `localStorage`에 저장합니다.
- `client/http.ts`의 `getToken` 함수는 `localStorage`에서 토큰을 읽어옵니다.

### 2. **API 요청 헤더 설정**

- `client/http.ts`의 `_fetch` 함수 내에 인증 헤더를 설정하는 로직이 주석 처리되어 있습니다.
- 실제 API 연동 시 이 부분을 활성화하여 모든 요청에 `Authorization: bearer ${token}` 헤더를 포함해야 합니다.

```typescript
// client/http.ts - 활성화 필요
const authHeader = token ? { authorization: `bearer ${token}` } : {}
options?.headers && Object.assign(options?.headers, authHeader)
```

### 3. **권한별 API 접근 제어**

- 현재 클라이언트 코드에서는 명시적인 권한별 접근 제어 로직을 찾기 어렵습니다.
- 일반적으로 백엔드에서 특정 엔드포인트에 대한 접근을 토큰의 유효성 및 권한에 따라 제어합니다.
- 클라이언트에서는 `isAuthorized` 상태를 확인하여 특정 페이지나 컴포넌트의 렌더링을 제어하는 방식으로 사용자 경험을 향상시킬 수 있습니다.
- 예를 들어, 로그인한 사용자만 접근 가능한 페이지는 `useAuth`의 `isAuthorized`를 확인하여 리다이렉트 처리를 할 수 있습니다.
