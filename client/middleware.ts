import { NextResponse } from 'next/server';

import { LanguageCodes } from '@/policy/language';
import { siteLocaleCookieName } from '@/policy/site';

import type { NextRequest } from 'next/server';

const allowLocaleTokens = LanguageCodes.map((language) => language.toLowerCase());

const localeLanguageTokens: Record<string, string> = LanguageCodes.reduce((acc, cur) => {
  return {
    ...acc,
    [cur.toLocaleLowerCase()]: cur,
  };
}, {});

/* 언어 우선 순위 정책
 * 1. url에 언어 포함 -> url의 언어로 redirect
 * 2. url에 언어 미포함, cookie에 언어 존재 -> cookie 값 redirect
 * 3. url, cookie 값 미포함 -> 기본 언어 redirect
 * */

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const [, lang] = pathname.split('/');
  if (LanguageCodes.includes(lang)) return;

  const standardizedPathname = pathname.toLowerCase().replace('_', '-');
  const [, allowedLang] = standardizedPathname.split('/');

  if (allowLocaleTokens.includes(allowedLang)) {
    const [, exceptLangPathname] = standardizedPathname.split(`/${allowedLang}`);
    const convertLanguageToken = localeLanguageTokens[allowedLang];
    return NextResponse.redirect(new URL(`/${convertLanguageToken}${exceptLangPathname}${search}`, request.url));
  }

  const languageCookie = request.cookies.get(siteLocaleCookieName)?.value;
  if (languageCookie) return NextResponse.redirect(new URL(`/${languageCookie}${pathname}${search}`, request.url));

  return NextResponse.redirect(new URL(`/en${pathname}${search}`, request.url));
}

export const config = {
  matcher: ['/((?!api|_next|favicon|local-favicon).*)'],
};
