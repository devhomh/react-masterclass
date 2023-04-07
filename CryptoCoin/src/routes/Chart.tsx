import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  const exceptData = data ?? [];
  const chartData = exceptData?.map((i) => {
    return {
      x: i.time_close,
      y: [i.open, i.high, i.low, i.close],
    };
  });
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexCharts
          type="candlestick"
          // -----------------type="line"-------------------- //
          /* series={[
            {
              name: "Price",
              data: data?.map((price) => price.close) as number[],
            },
          ]} */
          series={[
            {
              data: chartData,
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
            },
            stroke: {
              curve: "smooth",
              width: 2,
            },
            xaxis: {
              type: "datetime",
              categories: data?.map((price) => price.time_close * 1000),
            },
            tooltip: {
              y: {
                formatter: (value) => `$ ${value}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}
export default Chart;
