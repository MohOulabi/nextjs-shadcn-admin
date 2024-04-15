'use client';
import { Button } from '@/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';
import { wait } from '@/utils/wait';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, MailIcon } from 'lucide-react';
import { MessageKeys, useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Validation.email_required' })
    .email({ message: 'Validation.email_invalid' }),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordForm = () => {
  const t = useTranslations();
  const [isPending, setIsPending] = useState(false);
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setIsPending(true);
    await wait(1);
    toast.success(`${t('ForgotPassword.success')}: ${values.email}`, {
      closeButton: true,
    });
    setIsPending(false);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  autoComplete='off'
                />
              </FormControl>
              <FormMessage>
                {error?.message && t(error.message as MessageKeys<IntlMessages, 'Validation'>)}
              </FormMessage>
            </FormItem>
          )}
        />
        <div className='mt-8'>
          <Button disabled={isPending} className='h-12 w-full' type='submit'>
            {isPending && <Loader2 className='h-4 w-4 animate-spin ltr:mr-2 rtl:ml-2' />}
            {t('Common.submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
