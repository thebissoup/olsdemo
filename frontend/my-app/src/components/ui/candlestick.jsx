import { CandlestickUtils } from "@/lib/candlestickutils";

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
  [CandlestickUtils.LOW]: low, // Use dynamic key for low price
  [CandlestickUtils.HIGH]: high, // Use dynamic key for high price
  [CandlestickUtils.OPEN_CLOSE]: [open, close],
}) => {
  const isGrowing = CandlestickUtils.getGrowing(open, close); // Determine if the stock price is rising or falling
  const color = CandlestickUtils.getColor(isGrowing); // Set the color based on price movement
  const ratio = CandlestickUtils.getRatio(open, close, height); // Calculate ratio for scaling

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

export { CandleBody, BottomWick, TopWick, Candlestick };
