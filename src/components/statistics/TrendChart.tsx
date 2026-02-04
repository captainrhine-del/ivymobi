import { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface TrendChartProps {
  title: string;
  data: Array<{ name: string; value: number; previousValue?: number }>;
  color?: "blue" | "green" | "purple" | "orange";
  showComparison?: boolean;
  className?: string;
  height?: number;
}

const colorMap = {
  blue: {
    stroke: "hsl(209, 100%, 55%)",
    fill: "hsl(209, 100%, 55%)",
    previousStroke: "hsl(209, 100%, 80%)",
    previousFill: "hsl(209, 100%, 80%)",
  },
  green: {
    stroke: "hsl(142, 76%, 36%)",
    fill: "hsl(142, 76%, 36%)",
    previousStroke: "hsl(142, 76%, 70%)",
    previousFill: "hsl(142, 76%, 70%)",
  },
  purple: {
    stroke: "hsl(280, 100%, 55%)",
    fill: "hsl(280, 100%, 55%)",
    previousStroke: "hsl(280, 100%, 80%)",
    previousFill: "hsl(280, 100%, 80%)",
  },
  orange: {
    stroke: "hsl(25, 95%, 53%)",
    fill: "hsl(25, 95%, 53%)",
    previousStroke: "hsl(25, 95%, 75%)",
    previousFill: "hsl(25, 95%, 75%)",
  },
};

const timeUnits = [
  { value: "day", label: "日" },
  { value: "week", label: "周" },
  { value: "month", label: "月" },
  { value: "year", label: "年" },
];

export function TrendChart({
  title,
  data,
  color = "blue",
  showComparison = false,
  className,
  height = 200,
}: TrendChartProps) {
  const colors = colorMap[color];
  const [timeUnit, setTimeUnit] = useState<string>("month");
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });

  const gradientId = useMemo(() => `gradient-${Math.random().toString(36).slice(2)}`, []);
  const previousGradientId = useMemo(() => `prev-gradient-${Math.random().toString(36).slice(2)}`, []);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <div className="flex items-center gap-2">
            {/* Date Range Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 px-2">
                  <CalendarIcon className="h-3 w-3" />
                  <span className="hidden sm:inline">
                    {format(dateRange.from, "MM/dd", { locale: zhCN })} - {format(dateRange.to, "MM/dd", { locale: zhCN })}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="range"
                  selected={{ from: dateRange.from, to: dateRange.to }}
                  onSelect={(range) => {
                    if (range?.from && range?.to) {
                      setDateRange({ from: range.from, to: range.to });
                    }
                  }}
                  locale={zhCN}
                  numberOfMonths={2}
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            {/* Time Unit Selector */}
            <div className="flex rounded-md border border-border overflow-hidden">
              {timeUnits.map((unit) => (
                <button
                  key={unit.value}
                  onClick={() => setTimeUnit(unit.value)}
                  className={cn(
                    "px-2 py-1 text-xs transition-colors",
                    timeUnit === unit.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-muted"
                  )}
                >
                  {unit.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors.fill} stopOpacity={0.3} />
                <stop offset="100%" stopColor={colors.fill} stopOpacity={0} />
              </linearGradient>
              {showComparison && (
                <linearGradient id={previousGradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={colors.previousFill} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={colors.previousFill} stopOpacity={0} />
                </linearGradient>
              )}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            {showComparison && (
              <Area
                type="monotone"
                dataKey="previousValue"
                stroke={colors.previousStroke}
                strokeWidth={2}
                fill={`url(#${previousGradientId})`}
                strokeDasharray="5 5"
                name="上期"
              />
            )}
            <Area
              type="monotone"
              dataKey="value"
              stroke={colors.stroke}
              strokeWidth={2.5}
              fill={`url(#${gradientId})`}
              name="本期"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
