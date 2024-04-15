import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

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
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{content}</div>
        {subContent && <p className='text-xs text-muted-foreground'>{subContent}</p>}
      </CardContent>
    </Card>
  );
};
