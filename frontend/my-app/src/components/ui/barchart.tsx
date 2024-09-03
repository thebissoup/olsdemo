"use client";

import { GitCommitVertical, TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A line chart with custom dots";

const candlestickData = [
  {
    d: "forex",
    p: "finazon",
    ch: "bars",
    f: "1s",
    aggr: "1m",
    s: "EUR/USD",
    t: 20,
    o: 220.06,
    h: 220.13,
    l: 219.92,
    c: 219.96,
    v: 4572,
  },
  {
    d: "forex",
    p: "finazon",
    ch: "bars",
    f: "1s",
    aggr: "1m",
    s: "EUR/USD",
    t: 21,
    o: 219.96,
    h: 220.08,
    l: 219.9,
    c: 220.05,
    v: 4821,
  },
  {
    d: "forex",
    p: "finazon",
    ch: "bars",
    f: "1s",
    aggr: "1m",
    s: "EUR/USD",
    t: 22,
    o: 220.05,
    h: 220.15,
    l: 219.98,
    c: 220.12,
    v: 5100,
  },
  {
    d: "forex",
    p: "finazon",
    ch: "bars",
    f: "1s",
    aggr: "1m",
    s: "EUR/USD",
    t: 23,
    o: 220.12,
    h: 220.2,
    l: 220.07,
    c: 220.18,
    v: 4978,
  },
  {
    d: "forex",
    p: "finazon",
    ch: "bars",
    f: "1s",
    aggr: "1m",
    s: "EUR/USD",
    t: 24,
    o: 220.18,
    h: 220.25,
    l: 220.1,
    c: 220.22,
    v: 5231,
  },
];


const candlestickConfig = {
  o: {
    label: "Open",
    color: "hsl(var(--chart-1))",
  },
  c: {
    label: "Close",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;


export function BarChart() {
  return (
    <Card className="w-full max-w-4xl mx-auto p-6">
      <CardHeader>
        <CardTitle>Line Chart - Custom Dots</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={candlestickConfig}>
          <LineChart
            accessibilityLayer
            data={candlestickData}
            margin={{
              left: 12,
              right: 12,
            }}
            width={800}
            height={400}
          >
            <CartesianGrid vertical={true} />
            <YAxis domain={[218,221]}/> // Point of Concern
            <XAxis
              dataKey="t" // Point of Concern
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="o" //Point of Concern
              type="natural"
              stroke="var(--color-o)" //Point of Concern
              strokeWidth={2}
              dot={({ cx, cy, payload }) => {
                const r = 24;
                return (
                  <GitCommitVertical
                    key={payload.month}
                    x={cx - r / 2}
                    y={cy - r / 2}
                    width={r}
                    height={r}
                    fill="hsl(var(--background))"
                    stroke="var(--color-o)"
                  />
                );
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
