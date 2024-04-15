import { notFound, redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { LOCALES } from '@/config';

const Home: NextPage = ({ params: { locale } }) => {
  // In case the system requires a login like "STEER App", we can redirect to the login page
  // otherwise, we can remove this line and develop this page.

  // Should use getUser to check if the token is valid, this is just an example

  if (!LOCALES.includes(locale)) return notFound();

  const token = cookies().get('token')?.value;

  if (token) redirect(`/${locale}/dashboard`);
  else redirect(`/${locale}/login`);
};

export default Home;
