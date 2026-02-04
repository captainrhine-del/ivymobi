import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Download, CalendarIcon, Users, FileText, Megaphone, UserCheck } from "lucide-react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { LeadsStatistics } from "@/components/statistics/LeadsStatistics";
import { ContentStatistics } from "@/components/statistics/ContentStatistics";
import { ActivityStatistics } from "@/components/statistics/ActivityStatistics";
import { MemberStatistics } from "@/components/statistics/MemberStatistics";

export default function Statistics() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [timeUnit, setTimeUnit] = useState<"day" | "week" | "month" | "year">("day");

  const handleExport = () => {
    // Export functionality placeholder
    console.log("Exporting data...");
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header with filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-foreground">数据统计</h1>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Date Range Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(dateRange.from, "yyyy/MM/dd", { locale: zhCN })} - {format(dateRange.to, "yyyy/MM/dd", { locale: zhCN })}
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
                />
              </PopoverContent>
            </Popover>

            {/* Time Unit Selector */}
            <Select value={timeUnit} onValueChange={(v) => setTimeUnit(v as typeof timeUnit)}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">日</SelectItem>
                <SelectItem value="week">周</SelectItem>
                <SelectItem value="month">月</SelectItem>
                <SelectItem value="year">年</SelectItem>
              </SelectContent>
            </Select>

            {/* Export Button */}
            <Button onClick={handleExport} className="gap-2">
              <Download className="h-4 w-4" />
              导出数据
            </Button>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4 h-12 p-1 bg-muted/50 rounded-xl">
            <TabsTrigger 
              value="leads" 
              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">潜在客户</span>
            </TabsTrigger>
            <TabsTrigger 
              value="content"
              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">内容</span>
            </TabsTrigger>
            <TabsTrigger 
              value="activities"
              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
            >
              <Megaphone className="h-4 w-4" />
              <span className="hidden sm:inline">活动</span>
            </TabsTrigger>
            <TabsTrigger 
              value="members"
              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
            >
              <UserCheck className="h-4 w-4" />
              <span className="hidden sm:inline">成员</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads">
            <LeadsStatistics dateRange={dateRange} timeUnit={timeUnit} />
          </TabsContent>

          <TabsContent value="content">
            <ContentStatistics dateRange={dateRange} timeUnit={timeUnit} />
          </TabsContent>

          <TabsContent value="activities">
            <ActivityStatistics dateRange={dateRange} timeUnit={timeUnit} />
          </TabsContent>

          <TabsContent value="members">
            <MemberStatistics dateRange={dateRange} timeUnit={timeUnit} />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
