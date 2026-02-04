import { Megaphone, Eye, Users, Clock, Download, Heart, FileText } from "lucide-react";
import { StatisticsCard } from "./StatisticsCard";
import { TrendChart } from "./TrendChart";
import { BarChartCard } from "./BarChartCard";
import { PieChartCard } from "./PieChartCard";
import { DataTable } from "./DataTable";

interface ActivityStatisticsProps {
  dateRange: { from: Date; to: Date };
  timeUnit: "day" | "week" | "month" | "year";
}

const trendData = [
  { name: "1月", value: 850, previousValue: 620 },
  { name: "2月", value: 1200, previousValue: 850 },
  { name: "3月", value: 1580, previousValue: 1100 },
  { name: "4月", value: 1350, previousValue: 1200 },
  { name: "5月", value: 1920, previousValue: 1400 },
  { name: "6月", value: 1680, previousValue: 1550 },
  { name: "7月", value: 2150, previousValue: 1750 },
];

const activityTypeData = [
  { name: "线上活动", value: 45 },
  { name: "线下活动", value: 30 },
  { name: "混合活动", value: 25 },
];

const topActivitiesData = [
  { name: "年度大会", value: 3250 },
  { name: "产品发布会", value: 2480 },
  { name: "技术分享会", value: 1890 },
  { name: "客户答谢会", value: 1520 },
  { name: "行业峰会", value: 1280 },
];

const leadsSourceData = [
  { name: "年度大会", value: 520 },
  { name: "产品发布会", value: 380 },
  { name: "技术分享会", value: 290 },
  { name: "客户答谢会", value: 210 },
  { name: "行业峰会", value: 180 },
];

const activitiesTableData = [
  {
    id: "1",
    name: "2024年度客户大会",
    visitCount: 3250,
    leadsCount: 520,
    materialViews: 8920,
    materialDuration: "245h",
    materialDownloads: 1450,
    materialInterests: 380,
  },
  {
    id: "2",
    name: "新产品发布会",
    visitCount: 2480,
    leadsCount: 380,
    materialViews: 6540,
    materialDuration: "180h",
    materialDownloads: 1120,
    materialInterests: 290,
  },
  {
    id: "3",
    name: "技术创新分享会",
    visitCount: 1890,
    leadsCount: 290,
    materialViews: 4320,
    materialDuration: "120h",
    materialDownloads: 780,
    materialInterests: 210,
  },
  {
    id: "4",
    name: "VIP客户答谢晚宴",
    visitCount: 1520,
    leadsCount: 210,
    materialViews: 2890,
    materialDuration: "85h",
    materialDownloads: 520,
    materialInterests: 145,
  },
  {
    id: "5",
    name: "行业发展峰会",
    visitCount: 1280,
    leadsCount: 180,
    materialViews: 2450,
    materialDuration: "68h",
    materialDownloads: 420,
    materialInterests: 120,
  },
];

const tableColumns = [
  { key: "name", label: "活动名称" },
  { key: "visitCount", label: "访问量", className: "text-center" },
  { key: "leadsCount", label: "获得潜客", className: "text-center" },
  { key: "materialViews", label: "资料浏览", className: "text-center" },
  { key: "materialDuration", label: "浏览时长", className: "text-center" },
  { key: "materialDownloads", label: "资料下载", className: "text-center" },
  { key: "materialInterests", label: "感兴趣", className: "text-center" },
];

export function ActivityStatistics({ dateRange, timeUnit }: ActivityStatisticsProps) {
  return (
    <div className="space-y-6">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatisticsCard
          title="活动总访问量"
          value="10,420"
          change={18.5}
          icon={Eye}
          gradient="blue"
        />
        <StatisticsCard
          title="获得潜客总数"
          value="1,580"
          change={12.3}
          icon={Users}
          gradient="green"
        />
        <StatisticsCard
          title="资料浏览总数"
          value="25,120"
          change={9.8}
          icon={FileText}
          gradient="purple"
        />
        <StatisticsCard
          title="资料浏览总时长"
          value="698h"
          change={15.2}
          icon={Clock}
          gradient="orange"
        />
      </div>

      {/* Secondary Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatisticsCard
          title="资料下载总数"
          value="4,290"
          change={8.5}
          icon={Download}
          gradient="blue"
        />
        <StatisticsCard
          title="感兴趣总数"
          value="1,145"
          change={6.2}
          icon={Heart}
          gradient="pink"
        />
        <StatisticsCard
          title="活动总数"
          value="45"
          change={22.2}
          icon={Megaphone}
          gradient="green"
        />
      </div>

      {/* Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TrendChart
          title="活动访问量趋势"
          data={trendData}
          color="blue"
          showComparison
        />
        <TrendChart
          title="获得潜客趋势"
          data={trendData.map((d) => ({ ...d, value: Math.floor(d.value * 0.15) }))}
          color="green"
          showComparison
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TrendChart
          title="资料浏览趋势"
          data={trendData.map((d) => ({ ...d, value: d.value * 2.5 }))}
          color="purple"
        />
        <TrendChart
          title="资料下载趋势"
          data={trendData.map((d) => ({ ...d, value: Math.floor(d.value * 0.4) }))}
          color="orange"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PieChartCard title="活动类型分布" data={activityTypeData} />
        <BarChartCard title="活动访问量Top5" data={topActivitiesData} color="gradient" />
        <BarChartCard title="活动获客量Top5" data={leadsSourceData} color="blue" layout="horizontal" />
      </div>

      {/* Data Table */}
      <DataTable
        title="活动明细"
        data={activitiesTableData}
        columns={tableColumns}
        searchKey="name"
        pageSize={10}
      />
    </div>
  );
}
