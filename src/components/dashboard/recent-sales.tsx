import { getTranslations } from 'next-intl/server';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const sales = [
  {
    id: '1',
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    avatar: '/avatars/01.png',
    fallback: 'OM',
  },
  {
    id: '2',
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    avatar: '/avatars/02.png',
    fallback: 'JL',
  },
  {
    id: '3',
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    avatar: '/avatars/03.png',
    fallback: 'IN',
  },
  {
    id: '4',
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    avatar: '/avatars/04.png',
    fallback: 'WK',
  },
  {
    id: '5',
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    avatar: '/avatars/05.png',
    fallback: 'SD',
  },
];

export const RecentSales = async () => {
  const t = await getTranslations();
  return (
    <Card className='lg:col-span-3'>
      <CardHeader>
        <CardTitle>{t('Common.recent_sales')}</CardTitle>
        <CardDescription>You made 5 sales in the last 24 hours.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-8'>
          {sales.map((sale) => (
            <div key={sale.id} className='flex items-center'>
              <Avatar className='h-9 w-9'>
                {/* <AvatarImage src={sale.avatar} alt='Avatar' /> */}
                <AvatarFallback>{sale.fallback}</AvatarFallback>
              </Avatar>
              <div className='space-y-1 ltr:ml-4 rtl:mr-4'>
                <p className='text-sm font-medium leading-none'>{sale.name}</p>
                <p className='text-sm text-muted-foreground'>{sale.email}</p>
              </div>
              <div className='font-medium ltr:ml-auto rtl:mr-auto'>{sale.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
