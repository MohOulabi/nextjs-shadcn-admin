'use client';
import { useLogin } from '@/apis/auth/use-login.mutation';
import { Button } from '@/ui/button';
import { Checkbox } from '@/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, LockIcon, MailIcon } from 'lucide-react';
import { MessageKeys, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { NextLink } from '@/components/common';
import { toast } from 'sonner';
import { useRouter } from '@/i18n';
import jsCookie from 'js-cookie';
import { DEFAULT_REMEMBER_ME } from '@/config';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Validation.email_required' })
    .email({ message: 'Validation.email_invalid' }),
  password: z.string().min(1, { message: 'Validation.password_required' }),
  remember: z.optional(z.boolean()),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const t = useTranslations();
  const { mutate, isPending } = useLogin();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@admin.com',
      password: 'admin123',
      remember: false,
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    mutate(values, {
      onError: (e) => toast.error(e.message, { closeButton: true }),
      onSuccess: ({ token }) => {
        toast.success(t('Login.success'), {
          id: 'login-success',
          closeButton: true,
        });
        jsCookie.set('token', token, { expires: DEFAULT_REMEMBER_ME || 1, path: '/' });
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
            name='email'
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{t('Common.email')}</FormLabel>
                <FormControl>
                  <Input
                    startIcon={<MailIcon />}
                    error={!!error?.message}
                    placeholder={t('Common.email')}
                    {...field}
                    autoComplete='email'
                  />
                </FormControl>
                <FormMessage>
                  {error?.message && t(error.message as MessageKeys<IntlMessages, 'Validation'>)}
                </FormMessage>
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
                    autoComplete='current-password'
                  />
                </FormControl>
                <FormMessage>
                  {error?.message && t(error.message as MessageKeys<IntlMessages, 'Validation'>)}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
        <div className='mb-8 mt-6 flex justify-between'>
          <FormField
            control={form.control}
            name='remember'
            render={({ field }) => (
              <FormItem className='flex items-center gap-2 space-y-0'>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className='text-muted-foreground'>{t('Login.remember_me')}</FormLabel>
              </FormItem>
            )}
          />
          <NextLink
            href='/forgot-password'
            className='text-sm font-semibold text-primary focus:underline focus:outline-none'>
            {t('Common.forgot_password')}
          </NextLink>
        </div>
        <div>
          <Button disabled={isPending} className='h-12 w-full' type='submit'>
            {isPending && <Loader2 className='h-4 w-4 animate-spin ltr:mr-2 rtl:ml-2' />}
            {t('Common.login')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
