import { apiServer } from '@/client/policy';
import { cache } from '@/policy/site';

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

const fallbackError = {
  code: 500,
  message: 'INTERNAL SERVER ERROR',
  cause: 'UNKNOWN ERROR',
};

const _fetch = async ({ url, options, params }: fetchType) => {
  const token = await getToken();
  const query = params ? `?` + new URLSearchParams(params) : ''; // dynamic typing
  const input = `${apiServer}${url}${query}`;

  /*
   * TODO: Set authHeader in productuion
   * const authHeader = token ? { authorization: `bearer ${token}` } : {};
   * options?.headers && Object.assign(options?.headers, authHeader);
   * */

  return fetch(input, { ...options }).then((response: Response) => {
    return response.text().then((text) => {
      if (!text) return;

      try {
        const data = JSON.parse(text);
        if (!response.ok) {
          const error = data.error ?? fallbackError;
          return Promise.reject(error);
        }
        return data;
      } catch (err) {
        return Promise.reject(fallbackError);
      }
    });
  });
};

const _get = (url: string, params?: [string, string][], options?: Record<string, string>) => {
  const _options = {
    method: 'GET',
    headers: {},
    next: { revalidate: options?.cache === cache.noStore ? 0 : cache.revalidate },
  };

  return _fetch({ url, params, options: _options });
};

const _post = (url: string, body: {}) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  };

  return _fetch({ url, options });
};

const _put = (url: string, body: {}) => {
  const options = {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  };

  return _fetch({ url, options });
};

const _delete = (url: string) => {
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
