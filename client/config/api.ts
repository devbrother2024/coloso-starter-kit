export type ApiMode = 'mock' | 'hybrid' | 'live';

export interface ApiConfig {
  mode: ApiMode;
  mockApiUrl: string;
  expressApiUrl: string;
  expressEndpoints: string[];
  debug: boolean;
}

// 환경 변수에서 API 설정 로드
const getApiConfig = (): ApiConfig => {
  const mode = (process.env.NEXT_PUBLIC_API_MODE || 'mock') as ApiMode;
  const mockApiUrl = process.env.NEXT_PUBLIC_MOCK_API_URL || 'http://localhost:8080';
  const expressApiUrl = process.env.NEXT_PUBLIC_EXPRESS_API_URL || 'http://localhost:5001';
  const expressEndpoints = process.env.NEXT_PUBLIC_EXPRESS_ENDPOINTS
    ? process.env.NEXT_PUBLIC_EXPRESS_ENDPOINTS.split(',').map((e) => e.trim())
    : [];
  const debug = process.env.NEXT_PUBLIC_API_DEBUG === 'true';

  const config = {
    mode,
    mockApiUrl,
    expressApiUrl,
    expressEndpoints,
    debug,
  };

  // 디버깅을 위한 설정 로그 출력
  if (debug) {
    console.log('[API Config]', {
      mode,
      mockApiUrl,
      expressApiUrl,
      expressEndpoints,
      debug,
      env: {
        NEXT_PUBLIC_API_MODE: process.env.NEXT_PUBLIC_API_MODE,
        NEXT_PUBLIC_EXPRESS_ENDPOINTS: process.env.NEXT_PUBLIC_EXPRESS_ENDPOINTS,
        NEXT_PUBLIC_API_DEBUG: process.env.NEXT_PUBLIC_API_DEBUG,
      },
    });
  }

  return config;
};

export const apiConfig = getApiConfig();

// API 엔드포인트가 Express 서버를 사용해야 하는지 확인
export const shouldUseExpressApi = (endpoint: string): boolean => {
  const config = apiConfig;

  if (config.mode === 'live') {
    return true;
  }

  if (config.mode === 'mock') {
    return false;
  }

  // hybrid 모드: 설정된 엔드포인트만 Express 사용
  if (config.mode === 'hybrid') {
    return config.expressEndpoints.some(
      (expressEndpoint) => endpoint.startsWith(`/${expressEndpoint}`) || endpoint.startsWith(expressEndpoint),
    );
  }

  return false;
};

// API URL 결정
export const getApiUrl = (endpoint: string): string => {
  const config = apiConfig;

  if (shouldUseExpressApi(endpoint)) {
    return config.expressApiUrl;
  }

  return config.mockApiUrl;
};

// 디버그 로깅
export const debugLog = (message: string, data?: any): void => {
  if (apiConfig.debug) {
    console.log(`[API Debug] ${message}`, data || '');
  }
};
