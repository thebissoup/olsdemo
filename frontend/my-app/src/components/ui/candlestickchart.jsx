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
import CustomShapeBarChart from "./customshapebarchart";
import { CandlestickUtils } from "@/lib/candlestickutils";
import { useEffect, useRef, useState } from "react";

export const description = "A line chart with custom dots";

const candlestickConfig = {
  [CandlestickUtils.OPEN]: {
    label: "Open",
    color: "hsl(var(--chart-2))",
  },
  [CandlestickUtils.CLOSE]: {
    label: "Close",
    color: "hsl(var(--chart-1))",
  },
};

const data = CandlestickUtils.generateRandomCandlestickData(100);

export function CandleStickChart() {
  const cardRef = useRef(null);
  const [cardContentWidth, setCardContentWidth] = useState(0);
  const [cardContentHeight, setCardContentHeight] = useState(0);

  const updateCardContentSize = () => {
    if (cardRef.current) {
      setCardContentWidth(cardRef.current.clientWidth);
      setCardContentHeight(cardRef.current.clientHeight);
    }
  };

  useEffect(() => {
    // Update width initially on mount
    updateCardContentSize();

    // Add event listener for window resize
    window.addEventListener("resize", updateCardContentSize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", updateCardContentSize);
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <Card ref={cardRef} className="w-full max-w-4xl mx-auto p-6">
      <CardHeader>
        <CardTitle>CandleStick Chart - Custom Dots</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={candlestickConfig}>
          <CustomShapeBarChart stream={data} />
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
