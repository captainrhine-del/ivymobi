import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BarChartCardProps {
  title: string;
  data: Array<{ name: string; value: number }>;
  color?: "blue" | "green" | "purple" | "orange" | "gradient";
  layout?: "vertical" | "horizontal";
  className?: string;
  height?: number;
}

const colorMap = {
  blue: "hsl(209, 100%, 55%)",
  green: "hsl(142, 76%, 36%)",
  purple: "hsl(280, 100%, 55%)",
  orange: "hsl(25, 95%, 53%)",
};

const gradientColors = [
  "hsl(209, 100%, 55%)",
  "hsl(209, 100%, 60%)",
  "hsl(209, 100%, 65%)",
  "hsl(209, 100%, 70%)",
  "hsl(209, 100%, 75%)",
  "hsl(209, 100%, 80%)",
];

export function BarChartCard({
  title,
  data,
  color = "blue",
  layout = "vertical",
  className,
  height = 250,
}: BarChartCardProps) {
  const isHorizontal = layout === "horizontal";
  const fillColor = color === "gradient" ? undefined : colorMap[color as keyof typeof colorMap];

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={data}
            layout={isHorizontal ? "vertical" : "horizontal"}
            margin={
              isHorizontal
                ? { top: 5, right: 30, left: 60, bottom: 5 }
                : { top: 10, right: 10, left: -10, bottom: 0 }
            }
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            {isHorizontal ? (
              <>
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  width={55}
                />
              </>
            ) : (
              <>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              </>
            )}
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              cursor={{ fill: "hsl(var(--muted))", opacity: 0.5 }}
            />
            <Bar dataKey="value" radius={[4, 4, 4, 4]} fill={fillColor}>
              {color === "gradient" &&
                data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={gradientColors[index % gradientColors.length]} />
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
