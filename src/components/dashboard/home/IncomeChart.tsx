"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/src/components/ui/chart";

const chartConfig = {
  income: {
    label: "Income",
    color: "#2fa53d",
  },
} satisfies ChartConfig;

export function IncomeChart({
  incomeData,
  month,
}: {
  incomeData: { day: number; income: string }[];
  month: string;
}) {
  const roundedMaxExpense =
    Math.ceil(Math.max(...incomeData.map((d) => parseFloat(d.income))) / 50) *
    50;

  return (
    <Card className="bg-white mt-4">
      <CardHeader className="p-2 md:p-6">
        <CardTitle className="text-sm md:text-xl">Income</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          {month}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[95px] ">
          <BarChart
            data={incomeData}
            margin={{
              top: 20,
            }}
          >
            <ChartTooltip
              content={<ChartTooltipContent className="bg-white" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
              domain={[0, roundedMaxExpense]}
            />
            <Bar dataKey="income" fill="var(--color-income)" radius={8}></Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing daily income for this month.
        </div>
      </CardFooter>
    </Card>
  );
}
