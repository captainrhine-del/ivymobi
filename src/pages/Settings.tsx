import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Folder, XCircle, GripVertical } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Industry {
  id: string;
  name: string;
}

const initialIndustries: Industry[] = [
  { id: "1", name: "机加工" },
  { id: "2", name: "低压配电" },
  { id: "3", name: "自动化" },
  { id: "4", name: "暖通空调" },
  { id: "5", name: "流体控制" },
  { id: "6", name: "仪器仪表" },
  { id: "7", name: "医疗器械" },
  { id: "8", name: "家居" },
  { id: "9", name: "工程机械" },
];

// Sortable Industry Item Component
function SortableIndustryItem({ industry, onDelete }: { industry: Industry; onDelete: () => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: industry.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between px-4 py-3 bg-muted rounded-lg"
    >
      <div className="flex items-center gap-3">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab text-muted-foreground hover:text-foreground touch-none"
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <span className="text-foreground">{industry.name}</span>
      </div>
      <button
        onClick={onDelete}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <XCircle className="h-5 w-5" />
      </button>
    </div>
  );
}

export default function Settings() {
  const { viColor: globalViColor, setViColor: setGlobalViColor } = useTheme();
  
  const [companyName, setCompanyName] = useState("北京品冠天成科技有限公司");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [viColor, setViColor] = useState(globalViColor);
  const [backgroundStyle, setBackgroundStyle] = useState<"light" | "dark">("dark");
  const [folderIcon, setFolderIcon] = useState<"default" | "custom">("default");
  const [customFolderIcon, setCustomFolderIcon] = useState<string | null>(null);
  const [showLatestUpdate, setShowLatestUpdate] = useState(false);
  const [address, setAddress] = useState("北京市丰台区南三环西路丰台文化科技创新大厦科技2号楼");
  const [website, setWebsite] = useState("www.yangbentong.com");
  
  // Industry state
  const [industries, setIndustries] = useState(initialIndustries);
  const [newIndustry, setNewIndustry] = useState("");
  const [showAddIndustry, setShowAddIndustry] = useState(false);
  
  // Business type state
  const [businessTypes, setBusinessTypes] = useState<Industry[]>([]);
  const [newBusinessType, setNewBusinessType] = useState("");
  const [showAddBusinessType, setShowAddBusinessType] = useState(false);

  // Apply VI color in real-time as user picks color
  const handleViColorChange = (color: string) => {
    setViColor(color);
    setGlobalViColor(color);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setLogoPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleResetLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
  };

  const handleCustomFolderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomFolderIcon(e.target?.result as string);
        setFolderIcon("custom");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Saving settings...", {
      companyName,
      viColor,
      backgroundStyle,
      folderIcon,
      showLatestUpdate,
      address,
      website
    });
  };

  return (
    <AdminLayout>
      <div className="h-full flex flex-col">
        {/* Tabs */}
        <Tabs defaultValue="basic" className="flex-1 flex flex-col">
          <div className="border-b border-border px-6">
            <TabsList className="bg-transparent h-auto p-0 gap-0">
              <TabsTrigger 
                value="basic" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3"
              >
                基本信息
              </TabsTrigger>
              <TabsTrigger 
                value="industry" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3"
              >
                行业
              </TabsTrigger>
              <TabsTrigger 
                value="business" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3"
              >
                业务类型
              </TabsTrigger>
              <TabsTrigger 
                value="agreement" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3"
              >
                用户协议
              </TabsTrigger>
              <TabsTrigger 
                value="tags" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3"
              >
                标签管理
              </TabsTrigger>
              <TabsTrigger 
                value="languages" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3"
              >
                多语言
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="basic" className="flex-1 overflow-auto mt-0">
            <div className="p-6 max-w-2xl space-y-6">
              {/* Company Name */}
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">企业名称 *</Label>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="max-w-lg"
                />
              </div>

              {/* Logo Upload */}
              <div className="space-y-3">
                <div className="flex items-end gap-4">
                  <div className="w-36 h-24 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo" className="w-full h-full object-contain" />
                    ) : (
                      <div className="text-center">
                        <div className="text-primary font-bold text-lg">样本通</div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <div className="px-6 py-1.5 bg-muted text-muted-foreground text-sm rounded hover:bg-muted/80 transition-colors text-center">
                        上传
                      </div>
                    </label>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleResetLogo}
                    >
                      恢复默认
                    </Button>
                  </div>
                </div>
              </div>

              {/* VI Color */}
              <div className="flex items-center gap-4">
                <Label className="text-sm text-foreground">VI色：</Label>
                <input
                  type="color"
                  value={viColor}
                  onChange={(e) => handleViColorChange(e.target.value)}
                  className="w-16 h-8 rounded cursor-pointer border-0"
                />
              </div>

              {/* 3D Background Color */}
              <div className="flex items-center gap-4">
                <Label className="text-sm text-foreground">3D文件背景色</Label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                      backgroundStyle === "light" ? "border-primary" : "border-muted-foreground"
                    )}>
                      {backgroundStyle === "light" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className="text-sm text-foreground">明亮</span>
                    <input
                      type="radio"
                      name="background"
                      value="light"
                      checked={backgroundStyle === "light"}
                      onChange={() => setBackgroundStyle("light")}
                      className="hidden"
                    />
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                      backgroundStyle === "dark" ? "border-primary" : "border-muted-foreground"
                    )}>
                      {backgroundStyle === "dark" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className="text-sm text-foreground">暗色</span>
                    <input
                      type="radio"
                      name="background"
                      value="dark"
                      checked={backgroundStyle === "dark"}
                      onChange={() => setBackgroundStyle("dark")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Folder Icon */}
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-foreground">文件夹图标</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    文件夹图标将同步至公司资料、收藏夹和分享页的文件夹
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  {/* Default Folder Option */}
                  <label className="cursor-pointer">
                    <div className={cn(
                      "w-48 h-32 border-2 rounded-lg flex items-center justify-center",
                      folderIcon === "default" ? "border-primary/30" : "border-border"
                    )}>
                      <Folder className="w-16 h-16 text-amber-400 fill-amber-400" />
                    </div>
                    <div className="flex justify-center mt-2">
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        folderIcon === "default" ? "border-primary" : "border-muted-foreground"
                      )}>
                        {folderIcon === "default" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        )}
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="folderIcon"
                      value="default"
                      checked={folderIcon === "default"}
                      onChange={() => setFolderIcon("default")}
                      className="hidden"
                    />
                  </label>

                  {/* Custom Folder Option */}
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/png,image/jpg,image/ico,image/svg+xml"
                      onChange={handleCustomFolderUpload}
                      className="hidden"
                    />
                    <div className={cn(
                      "w-48 h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center",
                      folderIcon === "custom" ? "border-primary/30" : "border-border"
                    )}>
                      {customFolderIcon ? (
                        <img src={customFolderIcon} alt="Custom folder" className="w-16 h-16 object-contain" />
                      ) : (
                        <>
                          <span className="text-sm text-foreground">+ 自定义</span>
                          <span className="text-xs text-muted-foreground mt-1">支持png、jpg、ico、svg格式</span>
                          <span className="text-xs text-muted-foreground">推荐尺寸254px*354px</span>
                        </>
                      )}
                    </div>
                    {customFolderIcon && (
                      <div className="flex justify-center mt-2">
                        <div className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                          folderIcon === "custom" ? "border-primary" : "border-muted-foreground"
                        )}>
                          {folderIcon === "custom" && (
                            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                          )}
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Latest Upload/Update Toggle */}
              <div className="flex items-center gap-4">
                <Label className="text-sm text-foreground">最新上传/更新</Label>
                <Switch
                  checked={showLatestUpdate}
                  onCheckedChange={setShowLatestUpdate}
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">地址</Label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="max-w-lg"
                />
              </div>

              {/* Website */}
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">网站</Label>
                <Input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="max-w-lg"
                />
              </div>

              {/* Save Button */}
              <Button 
                onClick={handleSave} 
                variant="outline"
                className="w-full max-w-lg"
              >
                保存
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="industry" className="flex-1 overflow-auto mt-0">
            <div className="p-6 max-w-2xl space-y-6">
              {/* Description */}
              <p className="text-muted-foreground">
                设置客户行业，可以让客户快速输入自己所在行业，以收集客户信息
              </p>

              {/* Add Industry Button */}
              <div>
                {showAddIndustry ? (
                  <div className="flex items-center gap-2 max-w-md">
                    <Input
                      value={newIndustry}
                      onChange={(e) => setNewIndustry(e.target.value)}
                      placeholder="输入行业名称"
                      className="flex-1"
                    />
                    <Button
                      onClick={() => {
                        if (newIndustry.trim()) {
                          setIndustries([...industries, { id: Date.now().toString(), name: newIndustry.trim() }]);
                          setNewIndustry("");
                          setShowAddIndustry(false);
                        }
                      }}
                    >
                      确定
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddIndustry(false)}>
                      取消
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" onClick={() => setShowAddIndustry(true)}>
                    添加行业
                  </Button>
                )}
              </div>

              {/* Industry List with Drag & Drop */}
              <DndContext
                sensors={useSensors(
                  useSensor(PointerSensor),
                  useSensor(KeyboardSensor, {
                    coordinateGetter: sortableKeyboardCoordinates,
                  })
                )}
                collisionDetection={closestCenter}
                onDragEnd={(event: DragEndEvent) => {
                  const { active, over } = event;
                  if (over && active.id !== over.id) {
                    const oldIndex = industries.findIndex((i) => i.id === active.id);
                    const newIndex = industries.findIndex((i) => i.id === over.id);
                    setIndustries(arrayMove(industries, oldIndex, newIndex));
                  }
                }}
              >
                <SortableContext items={industries.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-2">
                    {industries.map((industry) => (
                      <SortableIndustryItem
                        key={industry.id}
                        industry={industry}
                        onDelete={() => setIndustries(industries.filter((i) => i.id !== industry.id))}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          </TabsContent>

          <TabsContent value="business" className="flex-1 overflow-auto mt-0">
            <div className="p-6 max-w-2xl space-y-6">
              {/* Description */}
              <p className="text-muted-foreground">
                设置业务类型，可以让客户快速输入自己所属业务类型，以收集客户信息
              </p>

              {/* Add Business Type Button */}
              <div>
                {showAddBusinessType ? (
                  <div className="flex items-center gap-2 max-w-md">
                    <Input
                      value={newBusinessType}
                      onChange={(e) => setNewBusinessType(e.target.value)}
                      placeholder="输入业务类型名称"
                      className="flex-1"
                    />
                    <Button
                      onClick={() => {
                        if (newBusinessType.trim()) {
                          setBusinessTypes([...businessTypes, { id: Date.now().toString(), name: newBusinessType.trim() }]);
                          setNewBusinessType("");
                          setShowAddBusinessType(false);
                        }
                      }}
                    >
                      确定
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddBusinessType(false)}>
                      取消
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" onClick={() => setShowAddBusinessType(true)}>
                    添加
                  </Button>
                )}
              </div>

              {/* Business Type List with Drag & Drop */}
              {businessTypes.length > 0 && (
                <DndContext
                  sensors={useSensors(
                    useSensor(PointerSensor),
                    useSensor(KeyboardSensor, {
                      coordinateGetter: sortableKeyboardCoordinates,
                    })
                  )}
                  collisionDetection={closestCenter}
                  onDragEnd={(event: DragEndEvent) => {
                    const { active, over } = event;
                    if (over && active.id !== over.id) {
                      const oldIndex = businessTypes.findIndex((i) => i.id === active.id);
                      const newIndex = businessTypes.findIndex((i) => i.id === over.id);
                      setBusinessTypes(arrayMove(businessTypes, oldIndex, newIndex));
                    }
                  }}
                >
                  <SortableContext items={businessTypes.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-2">
                      {businessTypes.map((businessType) => (
                        <SortableIndustryItem
                          key={businessType.id}
                          industry={businessType}
                          onDelete={() => setBusinessTypes(businessTypes.filter((i) => i.id !== businessType.id))}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          </TabsContent>

          <TabsContent value="agreement" className="flex-1 overflow-auto mt-0">
            <div className="p-6">
              <p className="text-muted-foreground">用户协议设置内容</p>
            </div>
          </TabsContent>

          <TabsContent value="tags" className="flex-1 overflow-auto mt-0">
            <div className="p-6">
              <p className="text-muted-foreground">标签管理设置内容</p>
            </div>
          </TabsContent>

          <TabsContent value="languages" className="flex-1 overflow-auto mt-0">
            <div className="p-6">
              <p className="text-muted-foreground">多语言设置内容</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
