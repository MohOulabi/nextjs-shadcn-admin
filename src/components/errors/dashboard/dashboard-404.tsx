import { useTranslations } from 'next-intl';

export const Dashboard404 = () => {
  const t = useTranslations('Error');

  return (
    <div className='pt-12 text-center'>
      <h1 className='mb-2 text-2xl font-bold leading-none md:text-3xl'>{t('404_title')}</h1>
      <p>{t('404_message')}</p>
    </div>
  );
};
