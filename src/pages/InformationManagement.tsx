import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { CategoryList } from "@/components/information/CategoryList";
import { AddCategoryModal } from "@/components/information/AddCategoryModal";
import { AddArticleModal } from "@/components/information/AddArticleModal";
import { cn } from "@/lib/utils";

type TabType = "articles" | "qa";

const initialCategories = [
  { id: "1", name: "联系我们" },
  { id: "2", name: "公司介绍" },
  { id: "3", name: "行业动态" },
];

export default function InformationManagement() {
  const [activeTab, setActiveTab] = useState<TabType>("articles");
  const [categories, setCategories] = useState(initialCategories);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddArticle, setShowAddArticle] = useState(false);

  const handleAddCategory = (data: { name: string; thumbnail: File | null }) => {
    const newCategory = {
      id: Date.now().toString(),
      name: data.name,
    };
    setCategories([...categories, newCategory]);
  };

  const handleAddArticle = (data: { name: string; thumbnail: File | null; content: string }) => {
    console.log("Article added:", data);
    // Here you would typically save the article to your backend
  };

  return (
    <AdminLayout>
      <div className="flex h-full">
        {/* Left Tab Panel */}
        <div className="w-44 bg-admin-tab-bg border-r border-border shrink-0">
          <button
            onClick={() => setActiveTab("articles")}
            className={cn(
              "w-full py-4 px-6 text-left font-medium transition-colors",
              activeTab === "articles"
                ? "bg-admin-tab-active text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            文章
          </button>
          <button
            onClick={() => setActiveTab("qa")}
            className={cn(
              "w-full py-4 px-6 text-left font-medium transition-colors",
              activeTab === "qa"
                ? "bg-admin-tab-active text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            问答
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === "articles" && (
            <div className="space-y-4">
              {/* Breadcrumb & Actions */}
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground">首页</div>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-lg text-foreground">文章管理</h2>
                <div className="flex gap-3">
                  <Button onClick={() => setShowAddCategory(true)}>
                    添加分类
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddArticle(true)}>
                    添加文章
                  </Button>
                </div>
              </div>

              {/* Category List */}
              <CategoryList
                categories={categories}
                onCategoryClick={(category) => console.log("Clicked:", category)}
              />
            </div>
          )}

          {activeTab === "qa" && (
            <div className="space-y-4">
              <div className="text-muted-foreground">首页</div>
              <h2 className="text-lg text-foreground">问答管理</h2>
              <div className="bg-card rounded-lg p-8 text-center text-muted-foreground">
                暂无问答内容
              </div>
            </div>
          )}
        </div>
      </div>

      <AddCategoryModal
        open={showAddCategory}
        onOpenChange={setShowAddCategory}
        onSubmit={handleAddCategory}
      />

      <AddArticleModal
        open={showAddArticle}
        onOpenChange={setShowAddArticle}
        onSubmit={handleAddArticle}
      />
    </AdminLayout>
  );
}
