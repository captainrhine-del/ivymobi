import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronRight, GripVertical, Image, Play, Box, Plus, ChevronLeft, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  type: string;
  thumbnail: string;
}

// Mock data
const mockProducts: Product[] = [
  { id: "1", name: "LCS系列-谐波减速机1430", type: "产品", thumbnail: "/placeholder.svg" },
  { id: "2", name: "LCS系列-谐波减速机1450", type: "产品", thumbnail: "/placeholder.svg" },
  { id: "3", name: "LCS系列-谐波减速机1480", type: "产品", thumbnail: "/placeholder.svg" },
  { id: "4", name: "LCS系列-谐波减速机1730", type: "产品", thumbnail: "/placeholder.svg" },
  { id: "5", name: "LCS系列-谐波减速机1750", type: "产品", thumbnail: "/placeholder.svg" },
  { id: "6", name: "LCS系列-谐波减速机1780", type: "产品", thumbnail: "/placeholder.svg" },
  { id: "7", name: "LCS系列-谐波减速机2080", type: "产品", thumbnail: "/placeholder.svg" },
  { id: "8", name: "LCS系列-谐波减速机20120", type: "产品", thumbnail: "/placeholder.svg" },
];

const productTabs = ["技术参数", "产品概览", "产品应用", "规格参数", "产品特征"];

export default function ProductManagement() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(mockProducts[1]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("技术参数");

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Panel - Product List */}
        <div className="w-[480px] border-r border-border flex flex-col bg-background">
          {/* Header */}
          <div className="p-4 border-b border-border space-y-3">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold">产品管理</h1>
              <Button variant="outline" size="sm">
                筛选管理
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Product List */}
          <div className="flex-1 overflow-auto">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className={cn(
                  "flex items-center gap-3 p-3 border-b border-border cursor-pointer transition-colors",
                  selectedProduct?.id === product.id 
                    ? "bg-accent" 
                    : "hover:bg-muted/50"
                )}
              >
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                <img 
                  src={product.thumbnail} 
                  alt={product.name}
                  className="w-14 h-14 object-cover rounded border border-border bg-muted"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.type}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Product Detail */}
        <div className="flex-1 overflow-auto bg-muted/30">
          {selectedProduct ? (
            <div className="p-6 space-y-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="hover:text-foreground cursor-pointer">首页</span>
                <ChevronRight className="h-4 w-4" />
                <span className="hover:text-foreground cursor-pointer">减速机</span>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">{selectedProduct.name}</span>
              </div>

              {/* Product Card */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">{selectedProduct.name}</h2>
                
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="w-80 h-60 bg-muted rounded-lg flex items-center justify-center border border-border">
                      <img 
                        src={selectedProduct.thumbnail} 
                        alt={selectedProduct.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    {/* Media Type Buttons */}
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="icon" className="h-12 w-12">
                        <Image className="h-5 w-5" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-12 w-12">
                        <Play className="h-5 w-5" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-12 w-12">
                        <Box className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Product Description */}
                  <div className="flex-1">
                    <p className="text-muted-foreground leading-relaxed">
                      谐波减速机，主要由波发生器、柔性齿轮、柔性轴承、刚性齿轮四个基本构件组成，谐波传动减速器，是一种靠波发生器装配上柔性轴承使柔性齿轮产生可控弹性变形，并与刚性齿轮相啮合来传递运动和动力的齿轮传动。应用学科：机械工程（一级学科）；传动（二级学科）；齿轮传动（三级学科）谐波齿轮传动减速器是利用行星齿轮传动原理发展起来的一种新型减速器。谐波齿轮传动（简称谐波传动）。
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      LCS系列 谐波减速机主要在航空、航天、能源、航海、造船、仿生机械、常用军械、机床、仪表、电子设备、矿山冶金、交通运输、起重机械、石油化工机械、纺织机械、农业机械以及...
                    </p>
                    <Button variant="ghost" className="mt-4 text-primary">
                      <Plus className="h-4 w-4 mr-1" />
                      修改产品简要说明
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Tabs Section */}
              <Card className="p-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 flex items-center gap-1 overflow-x-auto">
                    {productTabs.map((tab) => (
                      <div key={tab} className="flex items-center">
                        <Button
                          variant="ghost"
                          onClick={() => setActiveTab(tab)}
                          className={cn(
                            "whitespace-nowrap",
                            activeTab === tab && "text-primary font-medium"
                          )}
                        >
                          {tab}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" className="text-primary">
                    <Plus className="h-4 w-4 mr-1" />
                    添加
                  </Button>
                </div>

                {/* Tab Content Placeholder */}
                <div className="mt-4 min-h-[200px] flex items-center justify-center text-muted-foreground">
                  {activeTab} 内容区域
                </div>
              </Card>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              请选择一个产品查看详情
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
