import en from '../messages/en.json';

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}

declare namespace NodeJS {
  interface ProcessEnv {
    // Add your environment variables here
    NEXT_PUBLIC_ENV: 'development' | 'testing' | 'production';
    NEXT_PUBLIC_API_URL: string;
  }
}
