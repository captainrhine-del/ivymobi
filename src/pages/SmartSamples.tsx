import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { FlaskConical } from "lucide-react";

export default function SmartSamples() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">智能样本</h1>
        </div>

        <Card className="p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <FlaskConical className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-lg font-medium mb-2">智能样本管理</h2>
          <p className="text-muted-foreground max-w-md">
            智能样本功能正在开发中，敬请期待。您可以在此管理和分析样本数据。
          </p>
        </Card>
      </div>
    </AdminLayout>
  );
}
