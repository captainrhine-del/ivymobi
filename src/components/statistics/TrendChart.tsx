import { useMemo } from "react";
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

export function TrendChart({
  title,
  data,
  color = "blue",
  showComparison = false,
  className,
  height = 200,
}: TrendChartProps) {
  const colors = colorMap[color];

  const gradientId = useMemo(() => `gradient-${Math.random().toString(36).slice(2)}`, []);
  const previousGradientId = useMemo(() => `prev-gradient-${Math.random().toString(36).slice(2)}`, []);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
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
