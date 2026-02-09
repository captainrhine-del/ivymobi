import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselImage {
  id: string;
  file: File | null;
  preview: string | null;
}

export default function MiniProgram() {
  const [programName, setProgramName] = useState("");
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [activeLanguage, setActiveLanguage] = useState("中文");
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);
  const [requireVisitorInfo, setRequireVisitorInfo] = useState(false);

  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setIconPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setCoverPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteCover = () => {
    setCoverFile(null);
    setCoverPreview(null);
  };

  const handleAddCarousel = () => {
    if (carouselImages.length < 5) {
      setCarouselImages([...carouselImages, { id: Date.now().toString(), file: null, preview: null }]);
    }
  };

  const handleCarouselUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCarouselImages(prev => prev.map(img => 
          img.id === id ? { ...img, file, preview: event.target?.result as string } : img
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveCarousel = (id: string) => {
    setCarouselImages(prev => prev.filter(img => img.id !== id));
  };

  const handleSave = () => {
    console.log("Saving mini program settings...", {
      programName,
      iconFile,
      coverFile,
      carouselImages,
      requireVisitorInfo
    });
  };

  return (
    <AdminLayout>
      <div className="flex h-full">
        {/* Left Form Section */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-xl font-semibold text-foreground">专属小程序</h1>
              <span className="text-sm text-primary">企业版团队可申请专属资料库小程序，详情请咨询您的销售经理</span>
            </div>
          </div>

          {/* Publishing Section */}
          <div className="mb-8">
            <h2 className="text-base font-medium text-foreground mb-2">小程序发布托管</h2>
            <p className="text-sm text-muted-foreground mb-1">
              将需要在微信小程序管理平台上与发布的扫码授权等相关操作托管给样本通，
            </p>
            <p className="text-sm text-muted-foreground">
              托管不包括本页面其他内容的配置，若需托管请用微信小程序管理员的微信扫码授权{" "}
              <button className="text-primary hover:underline">获取二维码</button>
            </p>
          </div>

          {/* Mini Program Name */}
          <div className="mb-6">
            <Input
              placeholder="小程序名称 *"
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {/* Icon Upload */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Label className="text-sm text-foreground">小程序图标:</Label>
              <span className="text-sm text-muted-foreground">推荐分辨率 512*512像素</span>
            </div>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleIconUpload}
                className="hidden"
              />
              <div className={cn(
                "w-24 h-24 rounded-full border-2 border-dashed border-border flex items-center justify-center",
                "hover:border-primary hover:bg-primary/5 transition-colors",
                iconPreview && "border-solid border-primary/30"
              )}>
                {iconPreview ? (
                  <img src={iconPreview} alt="Icon" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-sm text-muted-foreground text-center px-2">点击上传图标</span>
                )}
              </div>
            </label>
          </div>

          {/* Cover Upload */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Label className="text-sm text-foreground">小程序封面:</Label>
            </div>
            <div className="flex items-start gap-4">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  className="hidden"
                />
                <div className={cn(
                  "w-40 h-28 border-2 border-dashed border-border rounded-lg flex items-center justify-center",
                  "hover:border-primary hover:bg-primary/5 transition-colors",
                  coverPreview && "border-solid border-primary/30"
                )}>
                  {coverPreview ? (
                    <img src={coverPreview} alt="Cover" className="w-full h-full rounded-lg object-cover" />
                  ) : (
                    <span className="text-sm text-muted-foreground">点击上传图标</span>
                  )}
                </div>
              </label>
              {coverPreview && (
                <button
                  onClick={handleDeleteCover}
                  className="text-destructive text-sm hover:underline mt-8"
                >
                  删除
                </button>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-2">用于分享后显示，推荐分辨率 500*400像素</p>
          </div>

          {/* Language Tabs */}
          <div className="mb-8 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <button
                className={cn(
                  "px-8 py-2 rounded-md border text-sm transition-colors",
                  activeLanguage === "中文"
                    ? "border-primary bg-background text-foreground"
                    : "border-border text-muted-foreground hover:border-primary"
                )}
                onClick={() => setActiveLanguage("中文")}
              >
                中文
              </button>
              <Button variant="default" className="px-6">
                添加语言
              </Button>
            </div>
          </div>

          {/* Carousel Images */}
          <div className="mb-8">
            <h3 className="text-base font-medium text-foreground mb-4">首页轮播图（最多五个）</h3>
            <div className="flex flex-wrap gap-4">
              {carouselImages.map((img) => (
                <div key={img.id} className="relative">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleCarouselUpload(img.id, e)}
                      className="hidden"
                    />
                    <div className={cn(
                      "w-40 h-28 border-2 border-dashed border-border rounded-lg flex items-center justify-center",
                      "hover:border-primary hover:bg-primary/5 transition-colors",
                      img.preview && "border-solid border-primary/30"
                    )}>
                      {img.preview ? (
                        <img src={img.preview} alt="Carousel" className="w-full h-full rounded-lg object-cover" />
                      ) : (
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                  </label>
                  <button
                    onClick={() => handleRemoveCarousel(img.id)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {carouselImages.length < 5 && (
                <button
                  onClick={handleAddCarousel}
                  className="w-40 h-28 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <span className="text-primary text-sm">添加轮播图</span>
                </button>
              )}
            </div>
          </div>

          {/* Resource Library */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-base font-medium text-foreground">小程序资料库</h3>
              <Button variant="default" size="sm">添加文件</Button>
              <Button variant="default" size="sm">添加小程序链接</Button>
            </div>
            <p className="text-sm text-muted-foreground">首页</p>
          </div>

          {/* Visitor Info Toggle */}
          <div className="mb-8 flex items-center gap-4">
            <Label className="text-sm font-medium text-foreground">要求访客提交个人信息</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">否</span>
              <Switch
                checked={requireVisitorInfo}
                onCheckedChange={setRequireVisitorInfo}
              />
              <span className="text-sm text-muted-foreground">是</span>
            </div>
          </div>

          {/* Save Button */}
          <Button onClick={handleSave} className="px-8">
            保存
          </Button>
        </div>

        {/* Right Preview Section */}
        <div className="w-80 border-l border-border p-6 bg-muted/30">
          <h3 className="text-base font-medium text-foreground mb-4">预览</h3>
          
          {/* Phone Frame */}
          <div className="relative mx-auto" style={{ width: "220px" }}>
            {/* Phone outer frame */}
            <div className="relative bg-foreground rounded-[2.5rem] p-2 shadow-xl">
              {/* Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-foreground rounded-full z-10" />
              
              {/* Screen */}
              <div className="bg-background rounded-[2rem] overflow-hidden" style={{ height: "440px" }}>
                {/* Status bar */}
                <div className="h-10 flex items-end justify-center pb-1">
                  <div className="w-16 h-1 bg-muted rounded-full" />
                </div>
                
                {/* Content */}
                <div className="p-4 space-y-4">
                  {/* Header placeholder */}
                  <div className="h-8 bg-muted rounded-lg" />
                  
                  {/* Grid items */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-16 bg-muted rounded-lg" />
                    <div className="h-16 bg-muted rounded-lg" />
                    <div className="h-16 bg-muted rounded-lg" />
                    <div className="h-16 bg-muted rounded-lg" />
                    <div className="h-16 bg-muted rounded-lg" />
                    <div className="h-16 bg-muted rounded-lg" />
                  </div>
                  
                  {/* Bottom card */}
                  <div className="h-10 bg-muted rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
