"use client";

import { GitCommitVertical, TrendingUp } from "lucide-react";
import { CartesianGrid, Area, AreaChart, Line, LineChart, XAxis, YAxis } from "recharts";

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

function generateRandomCandlestickData(entries = 100) {
  const candlestickData = [];
  let lastClose = 220; // Starting price

  for (let i = 0; i < entries; i++) {
    const open = lastClose + (Math.random() - 0.5) * 0.2;  // Small variation from the last close
    const close = open + (Math.random() - 0.5) * 0.2;     // Small variation from open
    const high = Math.max(open, close) + Math.random() * 0.1; // High is at least as high as open or close
    const low = Math.min(open, close) - Math.random() * 0.1;  // Low is at least as low as open or close
    const volume = Math.floor(Math.random() * 10000) + 1000;  // Random volume between 1000 and 11000

    candlestickData.push({
      d: "forex",
      p: "finazon",
      ch: "bars",
      f: "1s",
      aggr: "1m",
      s: "EUR/USD",
      t: i, // Time index (or timestamp if you prefer)
      o: open.toFixed(2),
      h: high.toFixed(2),
      l: low.toFixed(2),
      c: close.toFixed(2),
      v: volume
    });

    lastClose = close;  // Update the last close for the next iteration
  }

  return candlestickData;
}

const candlestickData = generateRandomCandlestickData(50);



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
          <AreaChart
            accessibilityLayer
            data={candlestickData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="t" // Point of Concern
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <svg></svg>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-c)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-c)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-o)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-o)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="o"
              type="natural"
              fill="url(#fillMobile)"
              fillOpacity={0.4}
              stroke="var(--color-o)"
              stackId="a"
            />
            <Area
              dataKey="c"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-c)"
              stackId="a"
            />
          </AreaChart>
          {/* <LineChart
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
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Line
              dataKey="o" //Point of Concern
              type="natural"
              stroke="var(--color-o)" //Point of Concern
              strokeWidth={2}
              dot={({ cx, cy, payload }) => {
                const r = 24;
                return (
                  <GitCommitVertical
                    key={payload.t}
                    x={cx - r / 2}
                    y={cy - r / 2}
                    width={r}
                    height={r}
                    fill="hsl(var(--background))"
                    stroke="var(--color-)"
                  />
                );
              }}
            />
            <Line
              dataKey="c" //Point of Concern
              type="natural"
              stroke="var(--color-c)" //Point of Concern
              strokeWidth={2}
              dot={({ cx, cy, payload }) => {
                const r = 24;
                return (
                  <GitCommitVertical
                    key={payload.t}
                    x={cx - r / 2}
                    y={cy - r / 2}
                    width={r}
                    height={r}
                    fill="hsl(var(--background))"
                    stroke="var(--color-)"
                  />
                );
              }}
            />
          </LineChart> */}
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
