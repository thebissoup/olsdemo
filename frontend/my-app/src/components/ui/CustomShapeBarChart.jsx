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

class CandlestickKeys {
  static DATA_TYPE = "d";
  static PROVIDER = "p";
  static CHART_TYPE = "ch";
  static FREQUENCY = "f";
  static AGGREGATION = "aggr";
  static SYMBOL = "s";
  static TIMESTAMP = "t";
  static OPEN = "o";
  static HIGH = "h";
  static LOW = "l";
  static CLOSE = "c";
  static VOLUME = "v";
  static OPEN_CLOSE = "oc";
}

function generateRandomCandlestickData(entries = 100) {
  const candlestickData = [];
  let lastClose = 220; // Starting price

  for (let i = 0; i < entries; i++) {
    const open = lastClose + (Math.random() - 0.5) * 0.2; // Small variation from the last close
    const close = open + (Math.random() - 0.5) * 0.2; // Small variation from open
    const high = Math.max(open, close) + Math.random() * 0.1; // High is at least as high as open or close
    const low = Math.min(open, close) - Math.random() * 0.1; // Low is at least as low as open or close
    const volume = Math.floor(Math.random() * 10000) + 1000; // Random volume between 1000 and 11000

    candlestickData.push({
      [CandlestickKeys.DATA_TYPE]: "forex",
      [CandlestickKeys.PROVIDER]: "finazon",
      [CandlestickKeys.CHART_TYPE]: "bars",
      [CandlestickKeys.FREQUENCY]: "1s",
      [CandlestickKeys.AGGREGATION]: "1m",
      [CandlestickKeys.SYMBOL]: "EUR/USD",
      [CandlestickKeys.TIMESTAMP]: i, // Time index (or timestamp if you prefer)
      [CandlestickKeys.OPEN]: open.toFixed(2),
      [CandlestickKeys.HIGH]: high.toFixed(2),
      [CandlestickKeys.LOW]: low.toFixed(2),
      [CandlestickKeys.CLOSE]: close.toFixed(2),
      [CandlestickKeys.VOLUME]: volume,
    });

    lastClose = close; // Update the last close for the next iteration
  }

  return candlestickData;
}

let candlestickData = generateRandomCandlestickData(50);

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

const getGrowing = (open, close) => {
  return open < close;
};
const getColor = (isGrowing) =>
  isGrowing ? "var(--color-o)" : "var(--color-c)";
const getRatio = (open, close, height) => {
  return Math.abs(height / (open - close));
};
const CandleBody = ({ x, y, width, height }) => {
  return (
    <path
      d={`M ${x},${y} L ${x},${y + height} L ${x + width},${y + height} L ${
        x + width
      },${y} L ${x},${y}`}
    />
  );
};

const BottomWick = ({
  isGrowing,
  x,
  y,
  width,
  height,
  low,
  open,
  close,
  ratio,
}) => {
  return isGrowing ? (
    <path d={`M ${x + width / 2}, ${y + height} v ${(open - low) * ratio}`} />
  ) : (
    <path d={`M ${x + width / 2}, ${y} v ${(close - low) * ratio}`} />
  );
};

const TopWick = ({
  isGrowing,
  x,
  y,
  width,
  height,
  high,
  open,
  close,
  ratio,
}) => {
  return isGrowing ? (
    <path d={`M ${x + width / 2}, ${y} v ${(close - high) * ratio}`} />
  ) : (
    <path d={`M ${x + width / 2}, ${y + height} v ${(open - high) * ratio}`} />
  );
};

// Candlestick component - draws the candlestick based on open, close, high, low prices
const Candlestick = ({
  fill,
  x,
  y,
  width,
  height,
  [CandlestickKeys.LOW]: low, // Use dynamic key for low price
  [CandlestickKeys.HIGH]: high, // Use dynamic key for high price
  [CandlestickKeys.OPEN_CLOSE]: [open, close],
}) => {
  const isGrowing = getGrowing(open, close); // Determine if the stock price is rising or falling
  const color = getColor(isGrowing); // Set the color based on price movement
  const ratio = getRatio(open, close, height); // Calculate ratio for scaling

  return (
    <g stroke={color} fill="none" strokeWidth="2">
      <CandleBody x={x} y={y} height={height} width={width} />
      <BottomWick
        isGrowing={isGrowing}
        x={x}
        y={y}
        width={width}
        height={height}
        low={low}
        open={open}
        close={close}
        ratio={ratio}
      />
      <TopWick
        isGrowing={isGrowing}
        x={x}
        y={y}
        width={width}
        height={height}
        high={high}
        open={open}
        close={close}
        ratio={ratio}
      />
    </g>
  );
};

// Prepare data by transforming the raw data to include openClose array for candlestick usage
const reshapeDataStream = (data) => {
  return data.map((item) => {
    const {
      [CandlestickKeys.OPEN]: open,
      [CandlestickKeys.CLOSE]: close,
      ...other
    } = item;

    return {
      ...other,
      [CandlestickKeys.OPEN_CLOSE]: [open, close], // Use the dynamic key name from the class
    };
  });
};

const getMinimumValue = (data) => {
  return data.reduce((minValue, point) => {
    const currentMin = Math.min(
      point[CandlestickKeys.LOW],
      point[CandlestickKeys.OPEN],
      point[CandlestickKeys.CLOSE]
    );
    return minValue === null || currentMin < minValue ? currentMin : minValue;
  }, null);
};

const getMaximumValue = (data) => {
  const maxValue = data.reduce((maxValue, point) => {
    const currentMax = Math.max(
      point[CandlestickKeys.HIGH],
      point[CandlestickKeys.OPEN],
      point[CandlestickKeys.CLOSE]
    );
    return currentMax > maxValue ? currentMax : maxValue;
  });
  return maxValue;
};

// Main component to render the custom bar chart with candlestick shapes
const CustomShapeBarChart = () => {
  const data = reshapeDataStream(candlestickData); // Prepare the data for the chart
  // Calculate min and max values for the Y axis
  const minValue = getMinimumValue(data);
  const maxValue = getMaximumValue(data);

  // Render the BarChart component with customized candlestick shape
  return (
    <BarChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="ts" />
      <YAxis domain={[minValue, maxValue]} />
      <CartesianGrid strokeDasharray="2 2" />
      <Bar
        dataKey={CandlestickKeys.OPEN_CLOSE}
        fill="#8884d8"
        shape={<Candlestick />} // Use the Candlestick component for each bar
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default CustomShapeBarChart;
