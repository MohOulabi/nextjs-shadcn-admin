import type { LoginFormValues } from '@/components/screens/auth/login-form';
import { useMutation } from '@tanstack/react-query';

const _mock_response = {
  data: {
    token: '1234567890abcdef',
  },
};

type LoginAPIResponse = {
  data: {
    [key: string]: any;
  };
};
type LoginReturn = {
  token: string;
  [key: string]: any;
};

const normalizeLogin = (response: LoginAPIResponse): LoginReturn => {
  return response.data as LoginReturn;
};

const login = async (params: LoginFormValues) => {
  // Mock
  const response = new Promise((resolve, reject) =>
    setTimeout(() => {
      if (params.email === 'admin@admin.com' && params.password === 'admin123')
        return resolve(_mock_response);
      reject({ message: 'Invalid email or password' });
    }, 1000)
  );

  const json = (await response) as LoginAPIResponse;
  return normalizeLogin(json);
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: login,
  });
};
