import { UserCheck, Share2, Eye, Clock, Download, Bookmark, FileText, HelpCircle } from "lucide-react";
import { StatisticsCard } from "./StatisticsCard";
import { TrendChart } from "./TrendChart";
import { BarChartCard } from "./BarChartCard";
import { PieChartCard } from "./PieChartCard";
import { DataTable } from "./DataTable";

interface MemberStatisticsProps {
  dateRange: { from: Date; to: Date };
  timeUnit: "day" | "week" | "month" | "year";
}

const trendData = [
  { name: "1月", value: 1200, previousValue: 900 },
  { name: "2月", value: 1580, previousValue: 1150 },
  { name: "3月", value: 1890, previousValue: 1400 },
  { name: "4月", value: 1720, previousValue: 1550 },
  { name: "5月", value: 2150, previousValue: 1800 },
  { name: "6月", value: 1980, previousValue: 1900 },
  { name: "7月", value: 2450, previousValue: 2100 },
];

const groupDistributionData = [
  { name: "销售团队", value: 35 },
  { name: "市场团队", value: 28 },
  { name: "技术团队", value: 22 },
  { name: "管理层", value: 15 },
];

const topSharersData = [
  { name: "张三", value: 156 },
  { name: "李四", value: 128 },
  { name: "王五", value: 98 },
  { name: "赵六", value: 85 },
  { name: "孙七", value: 72 },
];

const contentEngagementData = [
  { name: "资料浏览", value: 4580 },
  { name: "产品浏览", value: 3220 },
  { name: "文章浏览", value: 2150 },
  { name: "问答浏览", value: 890 },
  { name: "资料分享", value: 1250 },
];

const membersTableData = [
  {
    id: "1",
    name: "张三",
    group: "销售团队",
    shareCount: 156,
    productViews: 245,
    productShares: 45,
    productFavorites: 28,
    materialViews: 380,
    materialDuration: "45h",
    materialDownloads: 68,
    materialShares: 92,
    materialFavorites: 34,
    articleViews: 120,
    qaViews: 45,
  },
  {
    id: "2",
    name: "李四",
    group: "市场团队",
    shareCount: 128,
    productViews: 198,
    productShares: 38,
    productFavorites: 22,
    materialViews: 320,
    materialDuration: "38h",
    materialDownloads: 55,
    materialShares: 78,
    materialFavorites: 28,
    articleViews: 95,
    qaViews: 38,
  },
  {
    id: "3",
    name: "王五",
    group: "技术团队",
    shareCount: 98,
    productViews: 165,
    productShares: 28,
    productFavorites: 18,
    materialViews: 280,
    materialDuration: "32h",
    materialDownloads: 42,
    materialShares: 56,
    materialFavorites: 22,
    articleViews: 85,
    qaViews: 52,
  },
  {
    id: "4",
    name: "赵六",
    group: "管理层",
    shareCount: 85,
    productViews: 142,
    productShares: 22,
    productFavorites: 15,
    materialViews: 250,
    materialDuration: "28h",
    materialDownloads: 35,
    materialShares: 48,
    materialFavorites: 18,
    articleViews: 72,
    qaViews: 28,
  },
  {
    id: "5",
    name: "孙七",
    group: "销售团队",
    shareCount: 72,
    productViews: 125,
    productShares: 18,
    productFavorites: 12,
    materialViews: 215,
    materialDuration: "24h",
    materialDownloads: 28,
    materialShares: 38,
    materialFavorites: 15,
    articleViews: 58,
    qaViews: 22,
  },
];

const tableColumns = [
  { key: "name", label: "姓名" },
  { key: "group", label: "所属群组" },
  { key: "shareCount", label: "分享次数", className: "text-center" },
  { key: "productViews", label: "产品浏览", className: "text-center" },
  { key: "materialViews", label: "资料浏览", className: "text-center" },
  { key: "materialDuration", label: "浏览时长", className: "text-center" },
  { key: "materialDownloads", label: "资料下载", className: "text-center" },
  { key: "materialShares", label: "资料分享", className: "text-center" },
  { key: "articleViews", label: "文章浏览", className: "text-center" },
];

export function MemberStatistics({ dateRange, timeUnit }: MemberStatisticsProps) {
  return (
    <div className="space-y-6">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatisticsCard
          title="成员总数"
          value="256"
          change={5.2}
          icon={UserCheck}
          gradient="blue"
        />
        <StatisticsCard
          title="产品浏览总数"
          value="8,920"
          change={12.5}
          icon={Eye}
          gradient="green"
        />
        <StatisticsCard
          title="产品分享总数"
          value="2,450"
          change={18.3}
          icon={Share2}
          gradient="purple"
        />
        <StatisticsCard
          title="产品收藏总数"
          value="1,280"
          change={8.7}
          icon={Bookmark}
          gradient="orange"
        />
      </div>

      {/* Secondary Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatisticsCard
          title="资料浏览总数"
          value="15,450"
          change={10.2}
          icon={FileText}
          gradient="blue"
        />
        <StatisticsCard
          title="资料浏览总时长"
          value="1,850h"
          change={14.5}
          icon={Clock}
          gradient="green"
        />
        <StatisticsCard
          title="资料下载总数"
          value="3,280"
          change={7.8}
          icon={Download}
          gradient="pink"
        />
        <StatisticsCard
          title="资料分享总数"
          value="4,120"
          change={22.1}
          icon={Share2}
          gradient="purple"
        />
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatisticsCard
          title="资料收藏总数"
          value="1,560"
          change={9.3}
          icon={Bookmark}
          gradient="orange"
        />
        <StatisticsCard
          title="文章浏览总数"
          value="5,280"
          change={11.2}
          icon={FileText}
          gradient="blue"
        />
        <StatisticsCard
          title="问答浏览总数"
          value="2,140"
          change={6.8}
          icon={HelpCircle}
          gradient="green"
        />
        <StatisticsCard
          title="总分享次数"
          value="6,570"
          change={15.5}
          icon={Share2}
          gradient="pink"
        />
      </div>

      {/* Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TrendChart
          title="产品浏览趋势"
          data={trendData}
          color="blue"
          showComparison
        />
        <TrendChart
          title="产品分享趋势"
          data={trendData.map((d) => ({ ...d, value: Math.floor(d.value * 0.28) }))}
          color="purple"
          showComparison
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TrendChart
          title="资料浏览趋势"
          data={trendData.map((d) => ({ ...d, value: Math.floor(d.value * 1.7) }))}
          color="green"
        />
        <TrendChart
          title="资料分享趋势"
          data={trendData.map((d) => ({ ...d, value: Math.floor(d.value * 0.45) }))}
          color="orange"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PieChartCard title="成员群组分布" data={groupDistributionData} />
        <BarChartCard title="分享达人Top5" data={topSharersData} color="gradient" />
        <BarChartCard title="内容互动统计" data={contentEngagementData} color="blue" layout="horizontal" />
      </div>

      {/* Data Table */}
      <DataTable
        title="成员明细"
        data={membersTableData}
        columns={tableColumns}
        searchKey="name"
        pageSize={10}
      />
    </div>
  );
}
