import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

export type StatsWidgetProps = {
  title: string;
  content: string;
  subContent?: string;
  icon: React.ReactNode;
};

export const StatsWidget = ({ content, icon, subContent, title }: StatsWidgetProps) => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='font-medium sm:text-base xl:text-xl'>{title}</CardTitle>
        <div className='shrink-0'>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className='text-xl font-bold sm:text-xl xl:text-2xl'>{content}</div>
        {subContent && <p className='text-xs text-muted-foreground'>{subContent}</p>}
      </CardContent>
    </Card>
  );
};
