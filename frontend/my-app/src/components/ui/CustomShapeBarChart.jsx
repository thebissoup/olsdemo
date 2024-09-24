import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

import { CandleBody, TopWick, BottomWick, Candlestick } from "./candlestick";

import { CandlestickUtils } from "@/lib/candlestickutils";

// Define a color palette to be used in the chart
const colors = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
];

// Prepare data by transforming the raw data to include openClose array for candlestick usage
const reshapeDataStream = (data) => {
  return data.map((item) => {
    const {
      [CandlestickUtils.OPEN]: open,
      [CandlestickUtils.CLOSE]: close,
      ...other
    } = item;

    return {
      ...other,
      [CandlestickUtils.OPEN]: open,
      [CandlestickUtils.CLOSE]: close,
      [CandlestickUtils.OPEN_CLOSE]: [open, close], // Use the dynamic key name from the class
    };
  });
};

// Main component to render the custom bar chart with candlestick shapes
const CustomShapeBarChart = ({ stream }) => {
  console.log(stream);
  stream = reshapeDataStream(stream); // Prepare the data for the chart
  // Calculate min and max values for the Y axis
  const minValue = CandlestickUtils.getMinimumValue(stream);
  const maxValue = CandlestickUtils.getMaximumValue(stream);

  console.log(minValue);
  console.log(maxValue);
  console.log(stream);

  // Render the BarChart component with customized candlestick shape
  return (
    <BarChart width={700} height={400} data={stream}>
      <XAxis dataKey="ts" />
      <YAxis domain={[minValue, maxValue]} />
      <CartesianGrid strokeDasharray="2 2" />
      <Bar
        dataKey={CandlestickUtils.OPEN_CLOSE}
        fill="#8884d8"
        shape={<Candlestick />} // Use the Candlestick component for each bar
      >
        {stream.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default CustomShapeBarChart;
