'use client';
import {
  BarChart,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartConfig,
  ChartTooltipContent,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import * as React from 'react';

export const ChartsPageContent = () => {
  const lineChartData = [
    { name: 'January', Sales: 65, Expenses: 30 },
    { name: 'February', Sales: 59, Expenses: 20 },
    { name: 'March', Sales: 80, Expenses: 50 },
    { name: 'April', Sales: 81, Expenses: 40 },
    { name: 'May', Sales: 56, Expenses: 30 },
    { name: 'June', Sales: 55, Expenses: 20 },
    { name: 'July', Sales: 70, Expenses: 50 },
    { name: 'August', Sales: 90, Expenses: 60 },
    { name: 'September', Sales: 100, Expenses: 70 },
    { name: 'October', Sales: 110, Expenses: 80 },
    { name: 'November', Sales: 120, Expenses: 90 },
    { name: 'December', Sales: 130, Expenses: 100 },
  ];

  const barChartData = [
    { name: 'Red', Votes: 12 },
    { name: 'Blue', Votes: 19 },
    { name: 'Yellow', Votes: 3 },
    { name: 'Green', Votes: 5 },
    { name: 'Purple', Votes: 2 },
    { name: 'Orange', Votes: 3 },
    { name: 'Pink', Votes: 8 },
    { name: 'Brown', Votes: 6 },
  ];

  const pieChartData = [
    { name: 'Group A', value: 400, color: '#0088FE' },
    { name: 'Group B', value: 300, color: '#00C49F' },
    { name: 'Group C', value: 300, color: '#FFBB28' },
    { name: 'Group D', value: 200, color: '#FF8042' },
    { name: 'Group E', value: 100, color: '#FF6384' },
    { name: 'Group F', value: 50, color: '#36A2EB' },
  ];

  const areaChartData = [
    { month: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { month: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { month: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { month: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { month: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { month: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { month: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
    { month: 'Aug', uv: 4000, pv: 2400, amt: 2400 },
    { month: 'Sep', uv: 3000, pv: 1398, amt: 2210 },
    { month: 'Oct', uv: 2000, pv: 9800, amt: 2290 },
    { month: 'Nov', uv: 2780, pv: 3908, amt: 2000 },
    { month: 'Dec', uv: 1890, pv: 4800, amt: 2181 },
  ];

  const radarChartData = [
    { subject: 'Math', A: 120, B: 110, fullMark: 150 },
    { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
    { subject: 'English', A: 86, B: 130, fullMark: 150 },
    { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
    { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
    { subject: 'History', A: 65, B: 85, fullMark: 150 },
    { subject: 'Biology', A: 90, B: 95, fullMark: 150 },
    { subject: 'Chemistry', A: 80, B: 85, fullMark: 150 },
  ];

  const scatterChartData = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
    { x: 130, y: 220, z: 300 },
    { x: 160, y: 350, z: 450 },
  ];

  const pieChartConfig = pieChartData.reduce(
    (acc, item) => {
      acc[item.name] = { label: item.name, color: item.color };
      return acc;
    },
    {} as Record<string, { label: string; color: string }>
  );

  const chartConfig = {
    Sales: { label: 'Sales', color: 'hsl(var(--primary))' },
    Expenses: { label: 'Expenses', color: 'hsl(var(--secondary))' },
    Votes: { label: 'Votes', color: 'hsl(var(--primary))' },
    uv: { label: 'UV', color: 'hsl(var(--primary))' },
    pv: { label: 'PV', color: 'hsl(var(--secondary))' },
    ...pieChartConfig,
  } satisfies ChartConfig;

  return (
    <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
      <Card>
        <CardHeader>
          <CardTitle>Line Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line type='monotone' dataKey='Sales' stroke='hsl(var(--primary))' />
              <Line type='monotone' dataKey='Expenses' stroke='hsl(var(--secondary))' />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Bar Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              style={{ direction: 'ltr' }}
              margin={{ left: 0, right: 0 }}
              data={barChartData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey='Votes' fill='hsl(var(--primary))' radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Pie Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx='50%'
                cy='50%'
                labelLine={false}
                fill='hsl(var(--primary))'
                dataKey='value'>
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartLegend content={<ChartLegendContent className='flex-wrap' />} />
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Area Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart data={areaChartData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='month' />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Area
                type='monotone'
                dataKey='uv'
                stroke='hsl(var(--primary))'
                fill='hsl(var(--primary))'
              />
              <Area
                type='monotone'
                dataKey='pv'
                stroke='hsl(var(--secondary))'
                fill='hsl(var(--secondary))'
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Radar Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <RadarChart data={radarChartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey='subject' />
              <PolarRadiusAxis />
              <Radar
                name='A'
                dataKey='A'
                stroke='hsl(var(--primary))'
                fill='hsl(var(--primary))'
                fillOpacity={0.6}
              />
              <Radar
                name='B'
                dataKey='B'
                stroke='hsl(var(--secondary))'
                fill='hsl(var(--secondary))'
                fillOpacity={0.6}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Scatter Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis type='number' dataKey='x' name='stature' unit='cm' />
              <YAxis type='number' dataKey='y' name='weight' unit='kg' />
              <ZAxis type='number' dataKey='z' range={[60, 400]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Scatter name='A school' data={scatterChartData} fill='hsl(var(--primary))' />
            </ScatterChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
