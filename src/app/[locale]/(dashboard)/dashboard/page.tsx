import { OverviewChart } from '@/components/screens/dashboard/overview-chart';
import { RecentSales } from '@/components/screens/dashboard/recent-sales';
import { StatsWidget, StatsWidgetProps } from '@/components/screens/dashboard/stats-widget';
import { Button } from '@/ui/button';
import { DollarSignIcon, UsersIcon, ActivityIcon, CreditCardIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

const stats_widgets: StatsWidgetProps[] = [
  {
    title: 'total_revenue',
    content: '+35,320',
    subContent: '+5.4% from last month',
    icon: <DollarSignIcon className='size-4 text-muted-foreground' />,
  },
  {
    title: 'subscriptions',
    content: '+1,200',
    subContent: '+12% from last month',
    icon: <UsersIcon className='size-4 text-muted-foreground' />,
  },
  {
    title: 'sales',
    content: '+17,901',
    subContent: '+8.2% from last month',
    icon: <CreditCardIcon className='size-4 text-muted-foreground' />,
  },
  {
    title: 'active_users',
    content: '510',
    subContent: '+61 since last hour',
    icon: <ActivityIcon className='size-4 text-muted-foreground' />,
  },
];

const DashboardPage: NextPage = async () => {
  const t = await getTranslations('Common');

  return (
    <>
      <div className='flex items-center justify-between space-y-2'>
        <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>{t('dashboard')}</h1>
        <div className='flex items-center'>
          <Button>{t('download')}</Button>
        </div>
      </div>
      <div className='flex flex-1 flex-col gap-4 pt-4 xl:gap-6'>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6'>
          {stats_widgets.map(({ title, ...widget }, index) => (
            <StatsWidget key={index} title={t(title as TranslationKey)} {...widget} />
          ))}
        </div>
        <div className='flex flex-col gap-4 lg:grid lg:grid-cols-7 xl:gap-6'>
          <OverviewChart title={t('sales_overview')} />
          <RecentSales />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
