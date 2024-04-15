import ky, { BeforeRequestHook } from 'ky';
import { kyConfigs } from './config';
import { cookies } from 'next/headers';
import merge from 'lodash/merge';

const cookieInterceptor: BeforeRequestHook = async (request) => {
  const token = cookies().get('token')?.value;
  const locale = cookies().get('NEXT_LOCALE')?.value;
  if (token) request.headers.set('Authorization', `Bearer ${token}`);
  if (locale) request.headers.set('X-Locale', locale);
};

export const serverFetch = ky.create(
  merge(kyConfigs, {
    hooks: {
      /**
       * Interceptor to add token and locale to the request headers/
       * You can add more interceptors here.
       * Check the documentation for more information: {@link https://github.com/sindresorhus/ky#hooks}
       */
      beforeRequest: [cookieInterceptor],
    },
  })
);
