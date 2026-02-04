import { FileText, Eye, Clock, Download, Heart, Share2, Bookmark, Package } from "lucide-react";
import { StatisticsCard } from "./StatisticsCard";
import { TrendChart } from "./TrendChart";
import { BarChartCard } from "./BarChartCard";
import { PieChartCard } from "./PieChartCard";
import { DataTable } from "./DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ContentStatisticsProps {
  dateRange: { from: Date; to: Date };
  timeUnit: "day" | "week" | "month" | "year";
}

const trendData = [
  { name: "1月", value: 2400, previousValue: 1800 },
  { name: "2月", value: 3200, previousValue: 2200 },
  { name: "3月", value: 4100, previousValue: 2800 },
  { name: "4月", value: 3800, previousValue: 3200 },
  { name: "5月", value: 5200, previousValue: 3600 },
  { name: "6月", value: 4800, previousValue: 4000 },
  { name: "7月", value: 6100, previousValue: 4500 },
];

const contentTypeData = [
  { name: "PDF", value: 45 },
  { name: "视频", value: 25 },
  { name: "图片", value: 18 },
  { name: "PPT", value: 12 },
];

const topProductsData = [
  { name: "产品A", value: 1250 },
  { name: "产品B", value: 980 },
  { name: "产品C", value: 750 },
  { name: "产品D", value: 620 },
  { name: "产品E", value: 480 },
];

const topMaterialsData = [
  { name: "白皮书2024", value: 2340 },
  { name: "产品手册", value: 1890 },
  { name: "案例集锦", value: 1520 },
  { name: "技术文档", value: 1180 },
  { name: "视频教程", value: 920 },
];

const productsTableData = [
  {
    id: "1",
    name: "企业级解决方案",
    visitorViews: 1250,
    memberViews: 320,
    memberShares: 85,
    memberFavorites: 45,
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    name: "智能分析平台",
    visitorViews: 980,
    memberViews: 280,
    memberShares: 72,
    memberFavorites: 38,
    createdAt: "2024-01-05",
  },
  {
    id: "3",
    name: "数据管理系统",
    visitorViews: 750,
    memberViews: 210,
    memberShares: 56,
    memberFavorites: 29,
    createdAt: "2024-01-10",
  },
];

const materialsTableData = [
  {
    id: "1",
    name: "2024年度白皮书",
    type: "PDF",
    visitorViews: 2340,
    visitorDuration: "45h",
    visitorDownloads: 890,
    visitorInterests: 234,
    memberViews: 450,
    memberDuration: "12h",
    memberDownloads: 120,
    memberShares: 85,
    memberFavorites: 67,
  },
  {
    id: "2",
    name: "产品介绍视频",
    type: "视频",
    visitorViews: 1890,
    visitorDuration: "120h",
    visitorDownloads: 0,
    visitorInterests: 178,
    memberViews: 320,
    memberDuration: "28h",
    memberDownloads: 0,
    memberShares: 92,
    memberFavorites: 54,
  },
  {
    id: "3",
    name: "客户案例集锦",
    type: "PDF",
    visitorViews: 1520,
    visitorDuration: "38h",
    visitorDownloads: 650,
    visitorInterests: 145,
    memberViews: 280,
    memberDuration: "8h",
    memberDownloads: 95,
    memberShares: 68,
    memberFavorites: 42,
  },
];

const articlesTableData = [
  {
    id: "1",
    title: "行业趋势分析2024",
    visitorViews: 3450,
    memberViews: 520,
  },
  {
    id: "2",
    title: "技术创新实践",
    visitorViews: 2890,
    memberViews: 410,
  },
  {
    id: "3",
    title: "最佳实践指南",
    visitorViews: 2340,
    memberViews: 380,
  },
];

const productColumns = [
  { key: "name", label: "产品名称" },
  { key: "visitorViews", label: "访客浏览", className: "text-center" },
  { key: "memberViews", label: "成员浏览", className: "text-center" },
  { key: "memberShares", label: "成员分享", className: "text-center" },
  { key: "memberFavorites", label: "成员收藏", className: "text-center" },
  { key: "createdAt", label: "创建时间" },
];

const materialColumns = [
  { key: "name", label: "资料名称" },
  { key: "type", label: "类型" },
  { key: "visitorViews", label: "访客浏览", className: "text-center" },
  { key: "visitorDownloads", label: "访客下载", className: "text-center" },
  { key: "visitorInterests", label: "感兴趣", className: "text-center" },
  { key: "memberViews", label: "成员浏览", className: "text-center" },
  { key: "memberShares", label: "成员分享", className: "text-center" },
];

const articleColumns = [
  { key: "title", label: "文章标题" },
  { key: "visitorViews", label: "访客浏览", className: "text-center" },
  { key: "memberViews", label: "成员浏览", className: "text-center" },
];

export function ContentStatistics({ dateRange, timeUnit }: ContentStatisticsProps) {
  return (
    <div className="space-y-6">
      {/* Top Summary Cards - Visitor Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatisticsCard
          title="产品访问总数(访客)"
          value="28,450"
          change={14.2}
          icon={Package}
          gradient="blue"
        />
        <StatisticsCard
          title="资料浏览总数(访客)"
          value="156,820"
          change={9.8}
          icon={Eye}
          gradient="green"
        />
        <StatisticsCard
          title="资料下载总数(访客)"
          value="12,340"
          change={6.5}
          icon={Download}
          gradient="purple"
        />
        <StatisticsCard
          title="感兴趣总数(访客)"
          value="4,560"
          change={11.3}
          icon={Heart}
          gradient="orange"
        />
      </div>

      {/* Member Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatisticsCard
          title="产品浏览总数(成员)"
          value="8,920"
          change={7.2}
          icon={Eye}
          gradient="blue"
        />
        <StatisticsCard
          title="资料分享总数(成员)"
          value="3,450"
          change={15.8}
          icon={Share2}
          gradient="pink"
        />
        <StatisticsCard
          title="资料收藏总数(成员)"
          value="2,180"
          change={8.9}
          icon={Bookmark}
          gradient="green"
        />
        <StatisticsCard
          title="浏览总时长(成员)"
          value="1,240h"
          change={12.1}
          icon={Clock}
          gradient="purple"
        />
      </div>

      {/* Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TrendChart
          title="产品访问趋势(访客)"
          data={trendData}
          color="blue"
          showComparison
        />
        <TrendChart
          title="资料浏览趋势(访客)"
          data={trendData.map((d) => ({ ...d, value: d.value * 5 }))}
          color="green"
          showComparison
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TrendChart
          title="成员分享趋势"
          data={trendData.map((d) => ({ ...d, value: Math.floor(d.value * 0.3) }))}
          color="purple"
        />
        <TrendChart
          title="文章浏览趋势"
          data={trendData.map((d) => ({ ...d, value: Math.floor(d.value * 1.2) }))}
          color="orange"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PieChartCard title="资料类型分布" data={contentTypeData} />
        <BarChartCard title="热门产品Top5" data={topProductsData} color="blue" />
        <BarChartCard title="热门资料Top5" data={topMaterialsData} color="gradient" layout="horizontal" />
      </div>

      {/* Data Tables with Tabs */}
      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">产品统计</TabsTrigger>
          <TabsTrigger value="materials">资料统计</TabsTrigger>
          <TabsTrigger value="articles">文章统计</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <DataTable
            title="产品明细"
            data={productsTableData}
            columns={productColumns}
            searchKey="name"
          />
        </TabsContent>

        <TabsContent value="materials">
          <DataTable
            title="资料明细"
            data={materialsTableData}
            columns={materialColumns}
            searchKey="name"
          />
        </TabsContent>

        <TabsContent value="articles">
          <DataTable
            title="文章明细"
            data={articlesTableData}
            columns={articleColumns}
            searchKey="title"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
