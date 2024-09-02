'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../../ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useDir } from '@/hooks/use-dir';

const data = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 2000 },
  { month: 'Apr', sales: 2780 },
  { month: 'May', sales: 1890 },
  { month: 'Jun', sales: 2390 },
  { month: 'Jul', sales: 3490 },
  { month: 'Aug', sales: 4000 },
  { month: 'Sep', sales: 3000 },
  { month: 'Oct', sales: 2000 },
  { month: 'Nov', sales: 2780 },
  { month: 'Dec', sales: 1890 },
];

type OverviewChartProps = {
  title: string;
};

export const OverviewChart = ({ title }: OverviewChartProps) => {
  const direction = useDir();

  useEffect(() => {
    // Suppressing defaultProps warning from recharts until it's fixed
    const error = console.error;
    console.error = (...args: any) => {
      if (/defaultProps/.test(args[0])) return;
      error(...args);
    };
  }, []);

  const chartConfig = {
    sales: { label: 'Sales', color: 'hsl(var(--primary))' },
  } satisfies ChartConfig;

  return (
    <Card className='flex flex-col justify-between lg:col-span-4'>
      <CardHeader>{title}</CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              width={500}
              height={300}
              style={{ direction: 'ltr' }}
              margin={{ left: 0, right: 0 }}
              data={data}>
              <XAxis
                tickLine={false}
                axisLine={false}
                dataKey='month'
                strokeWidth={0}
                className='fill-accent-foreground text-sm ltr:font-inter rtl:font-cairo'
                style={{
                  fill: 'var(--accent-foreground)',
                  fontFamily: 'var(--font-inter)',
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                orientation={direction === 'rtl' ? 'right' : 'left'}
                className='fill-accent-foreground text-sm'
                tickFormatter={(v) => `$${v}`}
                style={{
                  fill: 'var(--accent-foreground)',
                }}
              />
              <ChartTooltip
                wrapperClassName='!bg-popover !rounded-md !border-border !text-popover-foreground'
                labelClassName='!text-popover-foreground'
                content={<ChartTooltipContent />}
                cursor={{
                  className: 'fill-accent',
                }}
              />
              <Bar dataKey='sales' fill='hsl(var(--primary))' radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
