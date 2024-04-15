'use client';
import { useLogin } from '@/apis/auth/use-login.mutation';
import { Button } from '@/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaptionsIcon, Loader2, LockIcon, MailIcon, UserIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from '@/i18n';
import jsCookie from 'js-cookie';
import { DEFAULT_REMEMBER_ME } from '@/config';

const loginSchema = (t: (key: IntlPath) => string) =>
  z
    .object({
      full_name: z.string().min(4, { message: t('Validation.full_name_required') }),
      username: z.string().min(4, { message: t('Validation.username_required') }),
      email: z
        .string()
        .min(1, { message: t('Validation.email_required') })
        .email({ message: t('Validation.email_invalid') }),
      password: z.string().min(1, { message: t('Validation.password_required') }),
      password_confirmation: z
        .string()
        .min(1, { message: t('Validation.password_confirmation_required') }),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: t('Validation.password_mismatch'),
      path: ['password_confirmation'],
    });
export type SignupFormValues = z.infer<ReturnType<typeof loginSchema>>;

export const SignupForm = () => {
  const t = useTranslations();
  const { mutate, isPending } = useLogin();
  const router = useRouter();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(loginSchema(t)),
    defaultValues: {
      email: '',
      password: '',
      password_confirmation: '',
      full_name: '',
      username: '',
    },
  });

  const onSubmit = (values: SignupFormValues) => {
    mutate(values, {
      onError: (e) => toast.error(e.message, { closeButton: true }),
      onSuccess: ({ token }) => {
        toast.success(t('Signup.success'), {
          id: 'signup-success',
          closeButton: true,
        });
        jsCookie.set('token', token, {
          expires: DEFAULT_REMEMBER_ME || 1,
          path: '/',
        });
        router.replace('/dashboard');
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='username'
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{t('Common.username')}</FormLabel>
                <FormControl>
                  <Input
                    startIcon={<UserIcon />}
                    error={!!error?.message}
                    placeholder={t('Common.username')}
                    {...field}
                    autoComplete='username'
                  />
                </FormControl>
                <FormMessage>{error?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='full_name'
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{t('Common.full_name')}</FormLabel>
                <FormControl>
                  <Input
                    startIcon={<CaptionsIcon />}
                    error={!!error?.message}
                    placeholder={t('Common.full_name')}
                    {...field}
                    autoComplete='full_name'
                  />
                </FormControl>
                <FormMessage>{error?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{t('Common.email')}</FormLabel>
                <FormControl>
                  <Input
                    inputMode='email'
                    startIcon={<MailIcon />}
                    error={!!error?.message}
                    placeholder={t('Common.email')}
                    {...field}
                    autoComplete='email'
                  />
                </FormControl>
                <FormMessage>{error?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{t('Common.password')}</FormLabel>
                <FormControl>
                  <Input
                    startIcon={<LockIcon />}
                    error={!!error?.message}
                    placeholder={t('Common.password')}
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage>{error?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password_confirmation'
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{t('Common.password_confirmation')}</FormLabel>
                <FormControl>
                  <Input
                    startIcon={<LockIcon />}
                    error={!!error?.message}
                    placeholder={t('Common.password_confirmation')}
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage>{error?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>
        <div>
          <Button disabled={isPending} className='mt-8 h-12 w-full' type='submit'>
            {isPending && <Loader2 className='h-4 w-4 animate-spin ltr:mr-2 rtl:ml-2' />}
            {t('Common.signup')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
