import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import Loading from "./Loading";
import { useQuery } from "@tanstack/react-query";
import { fetchOrdersByRestaurant } from "@/services/orderService";

const chartConfig = {
  views: {
    label: "כמות",
  },
  desktop: {
    label: "הכנסות",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "הזמנות",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const Chart = ({ id }: { id: string }) => {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["ordersByRestaurant", id],
    queryFn: () => fetchOrdersByRestaurant(id),
    enabled: !!id,
  });

  const chartData = React.useMemo(() => {
    const result: { date: string; incoming: number; orders: number }[] = [];

    if (data) {
      data.forEach((order) => {
        const date = new Date(order.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

        const existingEntry = result.find((entry) => entry.date === date);

        if (existingEntry) {
          existingEntry.incoming += order.total_amount;
          existingEntry.orders += 1;
        } else {
          result.push({
            date,
            incoming: order.total_amount,
            orders: 1,
          });
        }
      });
    }

    return result;
  }, [data]);

  const total = React.useMemo(
    () => ({
      desktop: `₪` + chartData.reduce((acc, curr) => acc + curr.incoming, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.orders, 0),
    }),
    [chartData]
  );

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading</div>;
  if (!data) return <div>No data available</div>;

  return (
    <Card className="mb-12">
      <CardHeader className="flex flex-col items-stretch p-0 space-y-0 border-b sm:flex-row">
        <div className="flex flex-col justify-center flex-1 gap-1 px-6 py-5 sm:py-6">
          <CardTitle>תרשים זרימה עסקי</CardTitle>
          <CardDescription>
            מדוד את כמות ההזמנות אל מול כמות ההכנסות{" "}
          </CardDescription>
        </div>
        <div className="flex">
          {["desktop", "mobile"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <Tooltip
                labelFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                }
              />
              <Bar
                dataKey={activeChart === "desktop" ? "incoming" : "orders"}
                fill={`var(--color-${activeChart})`}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default Chart;
