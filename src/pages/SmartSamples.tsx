import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Grid3X3, FileText, Link2, Users, TrendingUp, FolderOpen, Gem, UserCircle } from "lucide-react";

interface ContentItem {
  id: string;
  name: string;
  icon: string | null;
  dataType: string;
  linkedContent: string;
}

interface VisitorField {
  id: string;
  label: string;
  enabled: boolean;
  required: boolean;
}

export default function SmartSamples() {
  const [domain, setDomain] = useState("demoidc");
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [webLabel, setWebLabel] = useState("智能样本");
  const [iconImage, setIconImage] = useState<string | null>(null);
  const [activeLanguage, setActiveLanguage] = useState("zh");
  const [requireVisitorInfo, setRequireVisitorInfo] = useState(true);
  const [triggerTiming, setTriggerTiming] = useState("browse-download");

  const [contentItems, setContentItems] = useState<ContentItem[]>([
    { id: "1", name: "关于IVY", icon: null, dataType: "资料", linkedContent: "PDF Squeezer.app.zip" },
    { id: "2", name: "联系我们", icon: null, dataType: "资料", linkedContent: "小型线性平台" },
  ]);

  const [visitorFields, setVisitorFields] = useState<VisitorField[]>([
    { id: "phone", label: "手机号", enabled: true, required: true },
    { id: "email", label: "Email", enabled: true, required: false },
    { id: "name", label: "姓名", enabled: true, required: false },
    { id: "company", label: "公司名称", enabled: false, required: false },
    { id: "position", label: "职位信息", enabled: false, required: false },
    { id: "industry", label: "所属行业", enabled: true, required: true },
    { id: "business", label: "业务类型", enabled: false, required: false },
  ]);

  const toggleFieldEnabled = (id: string) => {
    setVisitorFields(prev => prev.map(field =>
      field.id === id ? { ...field, enabled: !field.enabled } : field
    ));
  };

  const toggleFieldRequired = (id: string) => {
    setVisitorFields(prev => prev.map(field =>
      field.id === id ? { ...field, required: !field.required } : field
    ));
  };

  const addContentItem = () => {
    const newItem: ContentItem = {
      id: Date.now().toString(),
      name: "",
      icon: null,
      dataType: "资料",
      linkedContent: "",
    };
    setContentItems([...contentItems, newItem]);
  };

  const updateContentItem = (id: string, field: keyof ContentItem, value: string) => {
    setContentItems(prev => prev.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const deleteContentItem = (id: string) => {
    setContentItems(prev => prev.filter(item => item.id !== id));
  };

  const moveContentItem = (id: string, direction: "left" | "right") => {
    const index = contentItems.findIndex(item => item.id === id);
    if (direction === "left" && index > 0) {
      const newItems = [...contentItems];
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
      setContentItems(newItems);
    } else if (direction === "right" && index < contentItems.length - 1) {
      const newItems = [...contentItems];
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
      setContentItems(newItems);
    }
  };

  return (
    <AdminLayout>
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Panel - Configuration */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          <h1 className="text-xl font-semibold">Intelligent Sample eCatalog</h1>

          {/* Domain Section */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">域名：</span>
            <span className="text-sm">{domain}</span>
            <span className="text-sm text-muted-foreground">.yangben.cn</span>
            <Button size="sm">编辑域名</Button>
          </div>

          {/* Background Image Upload */}
          <div className="flex items-start gap-4">
            <div>
              <span className="text-sm font-medium">上传背景图</span>
              <span className="text-sm text-muted-foreground ml-2">推荐像素1920 * 1080</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 h-16 bg-muted border border-border rounded flex items-center justify-center">
                {backgroundImage ? (
                  <img src={backgroundImage} alt="背景图" className="w-full h-full object-cover rounded" />
                ) : (
                  <Upload className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Button size="sm">重新上传</Button>
                <Button size="sm" variant="outline">删除</Button>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">内容</span>
              <span className="text-sm text-muted-foreground">以下内容保存后生效</span>
            </div>

            {/* Language Tabs */}
            <Tabs value={activeLanguage} onValueChange={setActiveLanguage}>
              <TabsList>
                <TabsTrigger value="zh">中文</TabsTrigger>
                <TabsTrigger value="ru">русский</TabsTrigger>
              </TabsList>

              <TabsContent value="zh" className="space-y-6 mt-4">
                {/* Web Label Section */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium">网页标签</h3>
                    <p className="text-sm text-muted-foreground">
                      配置的标签和图标将在"智能样本"网页版中生效，不会对微信小程序和团队成员登录的Lite产生影响。
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Label className="w-12">标签:</Label>
                    <Input
                      value={webLabel}
                      onChange={(e) => setWebLabel(e.target.value)}
                      className="max-w-xs"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Label className="w-12">Icon：</Label>
                    <div className="w-12 h-12 bg-gradient-to-br from-primary via-destructive to-accent rounded flex items-center justify-center">
                      {iconImage ? (
                        <img src={iconImage} alt="Icon" className="w-full h-full object-cover rounded" />
                      ) : null}
                    </div>
                    <Button size="sm">重新上传</Button>
                  </div>
                </div>

                {/* Content Configuration */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">内容配置</span>
                    <Button size="sm" onClick={addContentItem}>添加</Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {contentItems.map((item) => (
                      <Card key={item.id} className="p-4 space-y-3">
                        <div className="flex justify-between text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() => moveContentItem(item.id, "left")}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              左移
                            </button>
                            <button
                              onClick={() => moveContentItem(item.id, "right")}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              右移
                            </button>
                          </div>
                          <button
                            onClick={() => deleteContentItem(item.id)}
                            className="text-destructive hover:text-destructive/80"
                          >
                            删除
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <Label className="text-sm shrink-0">名称</Label>
                          <Input
                            value={item.name}
                            onChange={(e) => updateContentItem(item.id, "name", e.target.value)}
                            placeholder="请输入名称"
                          />
                        </div>
                        <p className="text-xs text-destructive">当前语言名称支持最大10 个字符</p>

                        <div className="space-y-2">
                          <Label className="text-sm">图标上传:</Label>
                          <p className="text-xs text-muted-foreground">(推荐像素: 64*64)</p>
                          <div className="flex items-center gap-3">
                            <div className="w-16 h-16 bg-muted border border-dashed border-border rounded flex items-center justify-center">
                              <FileText className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <button className="text-sm text-primary hover:underline">更换</button>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Label className="text-sm shrink-0">数据类型：</Label>
                          <Select
                            value={item.dataType}
                            onValueChange={(value) => updateContentItem(item.id, "dataType", value)}
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="资料">资料</SelectItem>
                              <SelectItem value="产品">产品</SelectItem>
                              <SelectItem value="文章">文章</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center gap-2">
                          <Label className="text-sm shrink-0">关联内容：</Label>
                          <span className="text-sm text-primary hover:underline cursor-pointer">重新关联</span>
                          <span className="text-sm text-destructive hover:underline cursor-pointer">清除</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{item.linkedContent || "未关联"}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ru" className="mt-4">
                <p className="text-muted-foreground">俄语内容配置...</p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Visitor Information Section */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center gap-4">
              <span className="font-medium">要求访客提交个人信息</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">否</span>
                <Switch
                  checked={requireVisitorInfo}
                  onCheckedChange={setRequireVisitorInfo}
                />
                <span className="text-sm text-muted-foreground">是</span>
              </div>
            </div>

            {requireVisitorInfo && (
              <div className="space-y-3">
                {visitorFields.map((field) => (
                  <div key={field.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={field.id}
                        checked={field.enabled}
                        onCheckedChange={() => toggleFieldEnabled(field.id)}
                      />
                      <Label htmlFor={field.id} className="cursor-pointer">{field.label}</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">必填</span>
                      <span className="text-sm text-muted-foreground">否</span>
                      <Switch
                        checked={field.required}
                        onCheckedChange={() => toggleFieldRequired(field.id)}
                        disabled={!field.enabled}
                      />
                      <span className="text-sm text-muted-foreground">是</span>
                    </div>
                  </div>
                ))}

                {/* Trigger Timing */}
                <div className="pt-4 space-y-3">
                  <span className="font-medium">触发时机</span>
                  <RadioGroup value={triggerTiming} onValueChange={setTriggerTiming}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="browse-download" id="browse-download" />
                      <Label htmlFor="browse-download">浏览文件和下载文件时</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="download-only" id="download-only" />
                      <Label htmlFor="download-only">下载文件时</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            <Button className="mt-4">保存</Button>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="w-[480px] border-l border-border bg-muted/30 p-6">
          <h2 className="text-lg font-medium mb-4">预览</h2>
          <div className="bg-gradient-to-br from-muted-foreground to-foreground rounded-lg overflow-hidden aspect-[9/16] max-h-[600px] relative">
            {/* Mock Preview Header */}
            <div className="p-4">
              <span className="text-white/80 text-sm font-medium">ivydemo</span>
            </div>

            {/* Mock Preview Content */}
            <div className="px-4 py-8 flex flex-col items-center justify-center">
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center"
                  >
                    <div className="w-10 h-10 bg-white/30 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Mock Preview Navigation */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/95 p-4">
              <div className="grid grid-cols-3 gap-2">
                {contentItems.slice(0, 6).map((item, i) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 p-2 bg-white border border-border rounded-lg shadow-sm"
                  >
                    <div className="w-6 h-6 bg-muted rounded flex items-center justify-center">
                      {i === 0 && <FileText className="h-3 w-3" />}
                      {i === 1 && <Users className="h-3 w-3" />}
                      {i === 2 && <TrendingUp className="h-3 w-3" />}
                      {i === 3 && <FolderOpen className="h-3 w-3" />}
                      {i === 4 && <Gem className="h-3 w-3" />}
                      {i === 5 && <UserCircle className="h-3 w-3" />}
                    </div>
                    <span className="text-xs truncate">{item.name || "未命名"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
