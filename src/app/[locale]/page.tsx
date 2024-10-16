import { notFound, redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { LOCALES } from '@/config';

const Home: NextPage = ({ params: { locale } }) => {


  if (!LOCALES.includes(locale)) return notFound();

  const token = cookies().get('token')?.value;

  if (token) redirect(`/${locale}/dashboard`);
  else redirect(`/${locale}/login`);
};

export default Home;
