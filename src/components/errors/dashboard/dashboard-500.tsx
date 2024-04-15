import { Button } from '@/ui/button';
import { useTranslations } from 'next-intl';

export const Dashboard500 = (props: ErrorFileProps) => {
  const t = useTranslations('Error');

  return (
    <div className='pt-12 text-center'>
      <h1 className='text-2xl font-bold leading-none md:text-3xl'>{t('500_title')}</h1>
      <p className='mb-4 mt-2'>{JSON.stringify(props.error.message)}</p>
      <Button className='w-36' onClick={props.reset}>
        {t('reset_button')}
      </Button>
    </div>
  );
};
