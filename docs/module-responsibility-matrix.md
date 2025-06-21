# 모듈별 역할 매트릭스

## 📊 모듈 책임 매트릭스

### 레이어별 모듈 분류

| 레이어             | 모듈          | 주요 책임                           | 의존성              |
| ------------------ | ------------- | ----------------------------------- | ------------------- |
| **Presentation**   | `app/`        | 라우팅, 페이지 정의, SEO 메타데이터 | components, hooks   |
| **Presentation**   | `components/` | UI 컴포넌트, 재사용 가능한 뷰 로직  | store, hooks, utils |
| **Business**       | `hooks/`      | 비즈니스 로직, 상태 관리 로직       | apis, store, utils  |
| **Business**       | `utils/`      | 공통 함수, 헬퍼, 변환 로직          | types               |
| **Data**           | `apis/`       | 외부 API 통신, 데이터 페칭          | client, types       |
| **Data**           | `store/`      | 전역 상태 관리, 클라이언트 상태     | types               |
| **Data**           | `types/`      | 타입 정의, 인터페이스               | -                   |
| **Infrastructure** | `client/`     | HTTP 클라이언트, 인증, 정책         | -                   |
| **Infrastructure** | `policy/`     | 비즈니스 규칙, 설정값               | types               |
| **Infrastructure** | `styles/`     | 스타일, 테마, 디자인 시스템         | -                   |

## 🏢 비즈니스 도메인별 모듈 매핑

### 1. 사용자 관리 도메인

| 컴포넌트       | Account | Auth | User | 역할                     |
| -------------- | ------- | ---- | ---- | ------------------------ |
| **APIs**       | ✅      | ✅   | ✅   | 사용자 데이터 CRUD       |
| **Store**      | ✅      | ✅   | -    | 인증 상태, 계정 정보     |
| **Hooks**      | ✅      | ✅   | ✅   | 인증 로직, 계정 관리     |
| **Components** | ✅      | ✅   | -    | 계정 UI, 로그인 폼       |
| **Pages**      | ✅      | ✅   | -    | 계정 페이지, 인증 페이지 |
| **Types**      | ✅      | ✅   | ✅   | 사용자 타입 정의         |

### 2. 학습 관리 도메인

| 컴포넌트       | Course | Enrollment | Classroom | 역할                     |
| -------------- | ------ | ---------- | --------- | ------------------------ |
| **APIs**       | ✅     | ✅         | -         | 강의 데이터, 수강 관리   |
| **Store**      | ✅     | -          | ✅        | 강의 상태, 교실 UI 상태  |
| **Hooks**      | ✅     | ✅         | -         | 강의 로직, 수강 관리     |
| **Components** | ✅     | ✅         | ✅        | 강의 UI, 교실 인터페이스 |
| **Pages**      | ✅     | -          | ✅        | 강의 상세, 교실 페이지   |
| **Types**      | ✅     | ✅         | ✅        | 강의, 수강, 교실 타입    |

### 3. 상거래 도메인

| 컴포넌트       | Product | Purchase | Order | Payment | Voucher |
| -------------- | ------- | -------- | ----- | ------- | ------- |
| **APIs**       | ✅      | -        | ✅    | -       | ✅      |
| **Store**      | -       | ✅       | ✅    | -       | ✅      |
| **Hooks**      | ✅      | ✅       | ✅    | ✅      | ✅      |
| **Components** | ✅      | ✅       | ✅    | -       | ✅      |
| **Pages**      | ✅      | ✅       | -     | -       | -       |
| **Types**      | ✅      | ✅       | ✅    | ✅      | ✅      |

### 4. 콘텐츠 관리 도메인

| 컴포넌트       | Display | Banner | Search | Category | 역할                  |
| -------------- | ------- | ------ | ------ | -------- | --------------------- |
| **APIs**       | ✅      | ✅     | ✅     | -        | 콘텐츠 데이터         |
| **Store**      | -       | -      | -      | ✅       | 카테고리 상태         |
| **Hooks**      | ✅      | -      | ✅     | ✅       | 검색, 카테고리 로직   |
| **Components** | ✅      | ✅     | ✅     | ✅       | 콘텐츠 표시 UI        |
| **Pages**      | -       | -      | ✅     | ✅       | 검색, 카테고리 페이지 |
| **Types**      | ✅      | ✅     | ✅     | ✅       | 콘텐츠 타입           |

## 🔄 컴포넌트 계층 구조

### Components 폴더 내부 구조

| 계층        | 폴더         | 역할              | 예시                             |
| ----------- | ------------ | ----------------- | -------------------------------- |
| **Level 1** | `elements/`  | 기본 UI 요소      | Button, Input, Link              |
| **Level 2** | `layouts/`   | 레이아웃 컴포넌트 | Header, Footer, Sidebar          |
| **Level 3** | `modules/`   | 기능별 모듈       | SearchInput, Account, Dropdown   |
| **Level 4** | `templates/` | 페이지 템플릿     | ProductTemplate, AccountTemplate |

### 의존성 방향

```
Templates → Modules → Layouts → Elements
```

## 📁 폴더 구조별 책임 분석

### App Router 구조 (`app/`)

| 경로                   | 역할             | 특징             |
| ---------------------- | ---------------- | ---------------- |
| `app/layout.tsx`       | 루트 레이아웃    | 전역 메타데이터  |
| `app/[lang]/`          | 다국어 라우팅    | 언어별 분기      |
| `app/[lang]/(auth)/`   | 인증 페이지 그룹 | 로그인, 회원가입 |
| `app/[lang]/account/`  | 계정 관리        | 중첩 라우팅      |
| `app/[lang]/products/` | 상품 페이지      | 동적 라우팅      |
| `app/[lang]/purchase/` | 구매 프로세스    | 복잡한 중첩 구조 |

### 상태 관리 구조 (`store/`)

| 파일               | 관리 상태    | 범위          |
| ------------------ | ------------ | ------------- |
| `common.ts`        | 공통 상태    | 전역          |
| `authorization.ts` | 인증 상태    | 전역          |
| `header.ts`        | 헤더 UI 상태 | 레이아웃      |
| `classroom.ts`     | 교실 상태    | 학습 페이지   |
| `purchase.ts`      | 구매 상태    | 구매 프로세스 |
| `dialog.ts`        | 모달 상태    | UI 상태       |

## 🎯 모듈 간 상호작용 패턴

### 1. 데이터 플로우 패턴

```
API → Hook → Store → Component → UI
```

### 2. 이벤트 처리 패턴

```
User Input → Component → Hook → API/Store → State Update
```

### 3. 라우팅 패턴

```
URL Change → Next.js Router → Page Component → Layout → Content
```

## 📋 모듈별 핵심 메트릭스

| 모듈                    | 복잡도 | 재사용성  | 테스트 용이성 | 유지보수성 |
| ----------------------- | ------ | --------- | ------------- | ---------- |
| `apis/`                 | 낮음   | 높음      | 높음          | 높음       |
| `components/elements/`  | 낮음   | 매우 높음 | 높음          | 높음       |
| `components/layouts/`   | 중간   | 높음      | 중간          | 높음       |
| `components/modules/`   | 중간   | 중간      | 중간          | 중간       |
| `components/templates/` | 높음   | 낮음      | 낮음          | 중간       |
| `hooks/`                | 중간   | 높음      | 높음          | 높음       |
| `store/`                | 낮음   | 높음      | 높음          | 높음       |
| `utils/`                | 낮음   | 매우 높음 | 높음          | 높음       |

## 🔧 개선 권장사항

### 1. 모듈 분리 개선

- **Templates 모듈**: 더 세분화된 컴포넌트로 분해 고려
- **Store 모듈**: 도메인별 스토어 분리 검토

### 2. 의존성 관리

- **순환 의존성 방지**: 명확한 의존성 방향 유지
- **인터페이스 분리**: 타입 정의를 통한 결합도 감소

### 3. 테스트 가능성

- **Pure Functions**: 부수 효과 없는 함수 증가
- **Mocking**: API 및 외부 의존성 모킹 전략

---

_이 매트릭스는 콜로소 DevBrother2 프로젝트의 모듈별 책임과 역할을 체계적으로 정리한 문서입니다._
