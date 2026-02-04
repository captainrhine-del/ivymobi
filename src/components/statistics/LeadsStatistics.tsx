import { Users, Eye, Clock, Download, Heart, ShoppingBag, FileText, HelpCircle } from "lucide-react";
import { StatisticsCard } from "./StatisticsCard";
import { TrendChart } from "./TrendChart";
import { BarChartCard } from "./BarChartCard";
import { PieChartCard } from "./PieChartCard";
import { DataTable } from "./DataTable";

interface LeadsStatisticsProps {
  dateRange: { from: Date; to: Date };
  timeUnit: "day" | "week" | "month" | "year";
}

// Mock data
const trendData = [
  { name: "1月", value: 120, previousValue: 80 },
  { name: "2月", value: 180, previousValue: 120 },
  { name: "3月", value: 250, previousValue: 180 },
  { name: "4月", value: 320, previousValue: 220 },
  { name: "5月", value: 280, previousValue: 260 },
  { name: "6月", value: 420, previousValue: 300 },
  { name: "7月", value: 380, previousValue: 340 },
];

const industryData = [
  { name: "科技", value: 35 },
  { name: "金融", value: 25 },
  { name: "制造", value: 20 },
  { name: "零售", value: 12 },
  { name: "其他", value: 8 },
];

const sourceData = [
  { name: "官网", value: 450 },
  { name: "活动", value: 320 },
  { name: "分享", value: 280 },
  { name: "小程序", value: 180 },
  { name: "其他", value: 90 },
];

const behaviorData = [
  { name: "资料浏览", value: 1580 },
  { name: "产品浏览", value: 1200 },
  { name: "文章浏览", value: 890 },
  { name: "问答浏览", value: 450 },
  { name: "资料下载", value: 320 },
];

const leadsTableData = [
  {
    id: "1",
    name: "张三",
    phone: "138****1234",
    email: "zhang***@example.com",
    company: "科技有限公司",
    position: "产品经理",
    industry: "科技",
    businessType: "B2B",
    source: "官网留资",
    registerTime: "2024-01-15",
    lastVisit: "2024-01-20",
    viewCount: 45,
    downloadCount: 12,
    viewDuration: "2h 30m",
  },
  {
    id: "2",
    name: "李四",
    phone: "139****5678",
    email: "li***@example.com",
    company: "金融集团",
    position: "VP",
    industry: "金融",
    businessType: "B2B",
    source: "活动",
    registerTime: "2024-01-12",
    lastVisit: "2024-01-19",
    viewCount: 32,
    downloadCount: 8,
    viewDuration: "1h 45m",
  },
  {
    id: "3",
    name: "王五",
    phone: "137****9012",
    email: "wang***@example.com",
    company: "制造企业",
    position: "总监",
    industry: "制造",
    businessType: "B2B",
    source: "分享",
    registerTime: "2024-01-10",
    lastVisit: "2024-01-18",
    viewCount: 28,
    downloadCount: 5,
    viewDuration: "1h 20m",
  },
  {
    id: "4",
    name: "赵六",
    phone: "136****3456",
    email: "zhao***@example.com",
    company: "零售公司",
    position: "经理",
    industry: "零售",
    businessType: "B2C",
    source: "小程序",
    registerTime: "2024-01-08",
    lastVisit: "2024-01-17",
    viewCount: 22,
    downloadCount: 3,
    viewDuration: "50m",
  },
];

const tableColumns = [
  { key: "name", label: "姓名" },
  { key: "phone", label: "手机号" },
  { key: "company", label: "公司" },
  { key: "position", label: "职位" },
  { key: "industry", label: "行业" },
  { key: "source", label: "来源" },
  { key: "viewCount", label: "浏览次数", className: "text-center" },
  { key: "downloadCount", label: "下载次数", className: "text-center" },
  { key: "lastVisit", label: "最后访问" },
];

export function LeadsStatistics({ dateRange, timeUnit }: LeadsStatisticsProps) {
  return (
    <div className="space-y-6">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatisticsCard
          title="潜在客户总数"
          value="1,320"
          change={12.5}
          icon={Users}
          gradient="blue"
        />
        <StatisticsCard
          title="资料浏览总数"
          value="45,820"
          change={8.3}
          icon={Eye}
          gradient="green"
        />
        <StatisticsCard
          title="浏览总时长"
          value="2,480h"
          change={15.2}
          icon={Clock}
          gradient="purple"
        />
        <StatisticsCard
          title="资料下载总数"
          value="3,560"
          change={-2.1}
          icon={Download}
          gradient="orange"
        />
      </div>

      {/* Secondary Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatisticsCard
          title="感兴趣总数"
          value="890"
          change={5.8}
          icon={Heart}
          gradient="pink"
        />
        <StatisticsCard
          title="产品浏览总数"
          value="12,450"
          change={10.2}
          icon={ShoppingBag}
          gradient="blue"
        />
        <StatisticsCard
          title="文章浏览总数"
          value="8,920"
          change={7.5}
          icon={FileText}
          gradient="green"
        />
        <StatisticsCard
          title="问答浏览总数"
          value="2,340"
          change={3.1}
          icon={HelpCircle}
          gradient="purple"
        />
      </div>

      {/* Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TrendChart
          title="潜在客户增长趋势"
          data={trendData}
          color="blue"
          showComparison
        />
        <TrendChart
          title="资料浏览趋势"
          data={trendData.map((d) => ({ ...d, value: d.value * 30 }))}
          color="green"
          showComparison
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TrendChart
          title="资料下载趋势"
          data={trendData.map((d) => ({ ...d, value: d.value * 2 }))}
          color="orange"
        />
        <TrendChart
          title="感兴趣趋势"
          data={trendData.map((d) => ({ ...d, value: Math.floor(d.value * 0.7) }))}
          color="purple"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PieChartCard title="行业分布" data={industryData} />
        <BarChartCard title="来源渠道" data={sourceData} color="gradient" />
        <BarChartCard title="行为统计" data={behaviorData} color="blue" layout="horizontal" />
      </div>

      {/* Data Table */}
      <DataTable
        title="潜在客户明细"
        data={leadsTableData}
        columns={tableColumns}
        searchKey="name"
        pageSize={10}
      />
    </div>
  );
}
