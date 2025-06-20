# Coloso DevBrother2 Client

🎨 **콜로소(Coloso) 온라인 강의 플랫폼 클라이언트 애플리케이션**

이 프로젝트는 [콜로소](https://coloso.co.kr) 의 보일러플레이트 프로젝트인 starter-kit 의 간소화 버전입니다. 콜로소의 ["설계, 운영, 보안까지 완벽하게 체득하는 실전형 MCP 확장 가이드"](https://coloso.co.kr/products/programmer-devbrother2) 강의 수강생들의 교육 목적으로 제작되었습니다.

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0.0 이상
- npm

### 설치 및 실행

1. **의존성 설치**
   ```bash
   npm ci
   ```

2. **개발 서버 실행**
   ```bash
   npm run dev
   ```
   - 애플리케이션은 `http://localhost:8089`에서 실행됩니다

3. **API 서버 실행**
   ```bash
   npm run dev:api
   ```
   - Mock API 서버가 `http://localhost:8080`에서 실행됩니다


## 🚀 주요 기능

- **다국어 지원**: 한국어, 영어, 중국어(번체) 지원
- **강의 카탈로그**: 카테고리별 강의 탐색 및 검색
- **결제 시스템**: 다양한 결제 방법을 통한 강의 구매
- **학습 관리**: 구매한 강의의 학습 진행 상황 관리
- **사용자 계정**: 개인정보 관리, 결제 내역, 쿠폰 관리
- **반응형 디자인**: 모바일과 데스크톱 환경 모두 지원

## 🛠 기술 스택

### Frontend Framework
- **Next.js 14** - React 기반 풀스택 프레임워크
- **TypeScript** - 타입 안전성을 위한 정적 타입 검사
- **React 18** - 사용자 인터페이스 구축

### 상태 관리 & 데이터 페칭
- **Valtio** - 간단하고 직관적인 상태 관리
- **TanStack Query** - 서버 상태 관리 및 캐싱
- **React Query DevTools** - 개발 도구

### 스타일링
- **Emotion** - CSS-in-JS 스타일링
- **Sass/SCSS** - CSS 전처리기
- **Normalize.css** - 브라우저 간 일관된 스타일링

### UI/UX
- **GSAP** - 고급 애니메이션
- **Swiper** - 터치 슬라이더
- **React Loading Skeleton** - 로딩 상태 표시
- **NextJS TopLoader** - 페이지 전환 로딩 표시

### 개발 도구
- **ESLint** - 코드 품질 관리
- **Prettier** - 코드 포맷팅
- **Stylelint** - CSS/SCSS 코드 품질 관리

## 📁 프로젝트 구조

```
client/
├── app/                    # Next.js App Router 페이지
│   ├── [lang]/            # 다국어 라우팅
│   │   ├── (auth)/        # 인증 관련 페이지
│   │   ├── account/       # 사용자 계정 페이지
│   │   ├── category/      # 카테고리 페이지
│   │   ├── products/      # 상품 상세 페이지
│   │   ├── purchase/      # 구매 페이지
│   │   └── search/        # 검색 페이지
├── components/            # 재사용 가능한 컴포넌트
│   ├── elements/          # 기본 UI 요소
│   ├── layouts/           # 레이아웃 컴포넌트
│   ├── modules/           # 기능별 모듈 컴포넌트
│   ├── providers/         # Context Provider
│   └── templates/         # 페이지 템플릿
├── hooks/                 # 커스텀 React Hooks
├── store/                 # Valtio 상태 관리
├── types/                 # TypeScript 타입 정의
├── utils/                 # 유틸리티 함수
├── styles/                # 스타일 파일
└── assets/                # 정적 자산 (아이콘 등)
```


## 🔧 개발 스크립트

| 스크립트 | 설명 |
|---------|------|
| `npm run dev` | 개발 서버 실행 (포트 8089) |
| `npm run dev:debug` | 디버그 모드로 개발 서버 실행 |
| `npm run dev:api` | Mock API 서버 실행 (포트 8080) |
| `npm run build` | 프로덕션 빌드 |
| `npm run serve` | 프로덕션 서버 실행 (포트 3000) |
| `npm run lint` | ESLint로 코드 검사 |
| `npm run clean` | 빌드 파일 및 의존성 정리 |

## 🌍 다국어 지원

이 애플리케이션은 다음 언어를 지원합니다:
- 🇺🇸 영어 (en)

언어는 URL 경로를 통해 설정됩니다: `/{언어코드}/페이지경로`

## 📱 주요 페이지

- **홈페이지**: 메인 랜딩 페이지 및 추천 강의
- **카테고리**: 강의 카테고리별 탐색
- **상품 상세**: 강의 상세 정보 및 구매
- **검색**: 강의 검색 및 필터링
- **계정**: 사용자 정보 및 학습 관리
- **구매**: 결제 프로세스
- **교실**: 온라인 학습 환경

## 🧪 테스트

```bash
# 테스트 실행 (추후 추가 예정)
npm test
```

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다
