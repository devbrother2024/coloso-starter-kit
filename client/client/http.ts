import { getApiUrl, shouldUseExpressApi, debugLog } from '@/config/api';
import { cache } from '@/policy/site';
import {
  ApiResponse,
  normalizeMockResponse,
  normalizeExpressResponse,
  createErrorResponse,
  ApiError,
} from '@/types/api';

interface fetchType {
  url: string;
  options?: Record<string, unknown>;
  params?: Record<string, string> | [string, string][] | URLSearchParams;
  ssr?: false;
}

// TODO: move to policies
const isServer = !process.browser;

const getToken = () => {
  if (isServer) return;
  return import('./auth').then((module) => module.getLocalToken());
};

const fallbackError: ApiError = {
  code: 500,
  message: 'INTERNAL SERVER ERROR',
  cause: 'UNKNOWN ERROR',
};

const _fetch = async ({ url, options, params }: fetchType): Promise<ApiResponse> => {
  const token = await getToken();
  const query = params ? `?` + new URLSearchParams(params) : ''; // dynamic typing

  // 하이브리드 구조: 엔드포인트에 따라 API 서버 결정
  const baseUrl = getApiUrl(url);
  const input = `${baseUrl}${url}${query}`;
  const useExpressApi = shouldUseExpressApi(url);

  debugLog(`API Request: ${url}`, {
    baseUrl,
    fullUrl: input,
    useExpress: useExpressApi,
    params: params,
  });

  // Express API 사용 시 인증 헤더 추가
  const authHeader: Record<string, string> = token && useExpressApi ? { authorization: `Bearer ${token}` } : {};

  // 기본 헤더와 인증 헤더 병합
  const headers: Record<string, string> = {
    ...((options?.headers as Record<string, string>) || {}),
    ...authHeader,
  };

  const requestOptions: RequestInit = {
    ...options,
    headers,
  };

  return fetch(input, requestOptions).then((response: Response) => {
    return response.text().then((text) => {
      debugLog(`API Response: ${url}`, {
        status: response.status,
        ok: response.ok,
        responseText: text.substring(0, 200) + (text.length > 200 ? '...' : ''),
      });

      if (!text) {
        return useExpressApi ? normalizeExpressResponse(null) : normalizeMockResponse(null);
      }

      try {
        const data = JSON.parse(text);

        if (!response.ok) {
          const error = data.error ?? fallbackError;
          debugLog(`API Error: ${url}`, error);
          return Promise.reject(createErrorResponse(error));
        }

        // 응답 정규화: Mock API vs Express API
        return useExpressApi ? normalizeExpressResponse(data) : normalizeMockResponse(data);
      } catch (err) {
        debugLog(`JSON Parse Error: ${url}`, err);
        return Promise.reject(createErrorResponse(fallbackError));
      }
    });
  });
};

const _get = (url: string, params?: [string, string][], options?: Record<string, string>): Promise<ApiResponse> => {
  const _options = {
    method: 'GET',
    headers: {},
    next: { revalidate: options?.cache === cache.noStore ? 0 : cache.revalidate },
  };

  return _fetch({ url, params, options: _options });
};

const _post = (url: string, body: {}): Promise<ApiResponse> => {
  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  };

  return _fetch({ url, options });
};

const _put = (url: string, body: {}): Promise<ApiResponse> => {
  const options = {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  };

  return _fetch({ url, options });
};

const _delete = (url: string): Promise<ApiResponse> => {
  const options = {
    method: 'DELETE',
    headers: {},
  };

  return _fetch({ url, options });
};

const http = {
  get: _get,
  post: _post,
  put: _put,
  delete: _delete,
};

export default http;
