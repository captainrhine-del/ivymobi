import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Mail, Lock, ArrowLeft, Eye, EyeOff, ShieldCheck, Cpu, Network, CircuitBoard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type AuthMode = "login" | "forgot-password";

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [loginTab, setLoginTab] = useState("phone");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Form states
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countdown, setCountdown] = useState(0);

  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendCode = async (type: "phone" | "email") => {
    if (type === "phone" && !phone) {
      toast({ title: "请输入手机号", variant: "destructive" });
      return;
    }
    if (type === "email" && !email) {
      toast({ title: "请输入邮箱", variant: "destructive" });
      return;
    }
    
    startCountdown();
    toast({ title: "验证码已发送", description: "请查收您的验证码" });
  };

  const handlePhoneLogin = async () => {
    if (!phone || !verifyCode) {
      toast({ title: "请填写完整信息", variant: "destructive" });
      return;
    }
    setLoading(true);
    // Simulate login - in production, integrate with actual SMS verification
    setTimeout(() => {
      setLoading(false);
      toast({ title: "登录成功" });
      navigate("/");
    }, 1000);
  };

  const handleEmailLogin = async () => {
    if (!email || !verifyCode) {
      toast({ title: "请填写完整信息", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: verifyCode,
        type: "email",
      });
      if (error) throw error;
      toast({ title: "登录成功" });
      navigate("/");
    } catch (error: any) {
      toast({ title: "登录失败", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleAccountLogin = async () => {
    if (!account || !password) {
      toast({ title: "请填写完整信息", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: account,
        password,
      });
      if (error) throw error;
      toast({ title: "登录成功" });
      navigate("/");
    } catch (error: any) {
      toast({ title: "登录失败", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!phone || !verifyCode || !newPassword || !confirmPassword) {
      toast({ title: "请填写完整信息", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "两次密码输入不一致", variant: "destructive" });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: "密码长度至少6位", variant: "destructive" });
      return;
    }
    setLoading(true);
    // Simulate password reset
    setTimeout(() => {
      setLoading(false);
      toast({ title: "密码重置成功", description: "请使用新密码登录" });
      setMode("login");
      setPhone("");
      setVerifyCode("");
      setNewPassword("");
      setConfirmPassword("");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      {/* Industrial/Tech Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} 
        />
        
        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-primary/8 via-transparent to-transparent rounded-full translate-x-1/3 translate-y-1/3" />
        
        {/* Floating Tech Elements */}
        <div className="absolute top-20 left-20 text-primary/10">
          <CircuitBoard className="w-32 h-32" />
        </div>
        <div className="absolute top-40 right-32 text-primary/8">
          <Network className="w-24 h-24" />
        </div>
        <div className="absolute bottom-32 left-40 text-primary/6">
          <Cpu className="w-20 h-20" />
        </div>
        <div className="absolute bottom-20 right-20 text-primary/10">
          <CircuitBoard className="w-28 h-28 rotate-45" />
        </div>
        
        {/* Animated Lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="30%" x2="100%" y2="30%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" />
          <line x1="0" y1="70%" x2="100%" y2="70%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '1s' }} />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo/Brand Area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25 mb-4">
            <ShieldCheck className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">智能营销管理平台</h1>
          <p className="text-muted-foreground mt-1 text-sm">企业级数字化营销解决方案</p>
        </div>

        {/* Login Card */}
        <Card className="border-border/50 shadow-2xl shadow-black/5 backdrop-blur-sm bg-card/95">
          <CardContent className="p-6">
            {mode === "login" ? (
              <>
                <Tabs value={loginTab} onValueChange={setLoginTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/50">
                    <TabsTrigger value="phone" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <Smartphone className="w-3.5 h-3.5 mr-1" />
                      手机验证码
                    </TabsTrigger>
                    <TabsTrigger value="email" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <Mail className="w-3.5 h-3.5 mr-1" />
                      邮箱验证码
                    </TabsTrigger>
                    <TabsTrigger value="account" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <Lock className="w-3.5 h-3.5 mr-1" />
                      账号密码
                    </TabsTrigger>
                  </TabsList>

                  {/* Phone Login */}
                  <TabsContent value="phone" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm text-muted-foreground">手机号</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="请输入手机号"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-11 bg-muted/30 border-border/50 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneCode" className="text-sm text-muted-foreground">验证码</Label>
                      <div className="flex gap-3">
                        <Input
                          id="phoneCode"
                          type="text"
                          placeholder="请输入验证码"
                          value={verifyCode}
                          onChange={(e) => setVerifyCode(e.target.value)}
                          className="h-11 bg-muted/30 border-border/50 focus:border-primary"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleSendCode("phone")}
                          disabled={countdown > 0}
                          className="shrink-0 w-28 h-11 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          {countdown > 0 ? `${countdown}s` : "获取验证码"}
                        </Button>
                      </div>
                    </div>
                    <Button 
                      onClick={handlePhoneLogin} 
                      disabled={loading}
                      className="w-full h-11 mt-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25"
                    >
                      {loading ? "登录中..." : "登 录"}
                    </Button>
                  </TabsContent>

                  {/* Email Login */}
                  <TabsContent value="email" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm text-muted-foreground">邮箱地址</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="请输入邮箱地址"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 bg-muted/30 border-border/50 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emailCode" className="text-sm text-muted-foreground">验证码</Label>
                      <div className="flex gap-3">
                        <Input
                          id="emailCode"
                          type="text"
                          placeholder="请输入验证码"
                          value={verifyCode}
                          onChange={(e) => setVerifyCode(e.target.value)}
                          className="h-11 bg-muted/30 border-border/50 focus:border-primary"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleSendCode("email")}
                          disabled={countdown > 0}
                          className="shrink-0 w-28 h-11 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          {countdown > 0 ? `${countdown}s` : "获取验证码"}
                        </Button>
                      </div>
                    </div>
                    <Button 
                      onClick={handleEmailLogin} 
                      disabled={loading}
                      className="w-full h-11 mt-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25"
                    >
                      {loading ? "登录中..." : "登 录"}
                    </Button>
                  </TabsContent>

                  {/* Account Login */}
                  <TabsContent value="account" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="account" className="text-sm text-muted-foreground">账号 / 邮箱</Label>
                      <Input
                        id="account"
                        type="text"
                        placeholder="请输入账号或邮箱"
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                        className="h-11 bg-muted/30 border-border/50 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm text-muted-foreground">密码</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="请输入密码"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="h-11 bg-muted/30 border-border/50 focus:border-primary pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <Button 
                      onClick={handleAccountLogin} 
                      disabled={loading}
                      className="w-full h-11 mt-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25"
                    >
                      {loading ? "登录中..." : "登 录"}
                    </Button>
                  </TabsContent>
                </Tabs>

                {/* Forgot Password Link */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setMode("forgot-password")}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    忘记密码？
                  </button>
                </div>
              </>
            ) : (
              /* Forgot Password Mode */
              <div className="space-y-4">
                <button
                  onClick={() => setMode("login")}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  返回登录
                </button>

                <div className="text-center mb-6">
                  <h2 className="text-lg font-semibold text-foreground">重置密码</h2>
                  <p className="text-sm text-muted-foreground mt-1">请输入您的手机号以重置密码</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resetPhone" className="text-sm text-muted-foreground">手机号</Label>
                  <Input
                    id="resetPhone"
                    type="tel"
                    placeholder="请输入手机号"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-11 bg-muted/30 border-border/50 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resetCode" className="text-sm text-muted-foreground">短信验证码</Label>
                  <div className="flex gap-3">
                    <Input
                      id="resetCode"
                      type="text"
                      placeholder="请输入验证码"
                      value={verifyCode}
                      onChange={(e) => setVerifyCode(e.target.value)}
                      className="h-11 bg-muted/30 border-border/50 focus:border-primary"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSendCode("phone")}
                      disabled={countdown > 0}
                      className="shrink-0 w-28 h-11 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      {countdown > 0 ? `${countdown}s` : "获取验证码"}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-sm text-muted-foreground">新密码</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="请输入新密码（至少6位）"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="h-11 bg-muted/30 border-border/50 focus:border-primary pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm text-muted-foreground">确认新密码</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="请再次输入新密码"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-11 bg-muted/30 border-border/50 focus:border-primary pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  onClick={handleResetPassword} 
                  disabled={loading}
                  className="w-full h-11 mt-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25"
                >
                  {loading ? "重置中..." : "重置密码"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          © 2024 智能营销管理平台 · 保留所有权利
        </p>
      </div>
    </div>
  );
}
