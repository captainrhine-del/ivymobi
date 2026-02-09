import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ParticleBackground } from "@/components/ui/particle-background";
import loginLogo from "@/assets/login-logo.png";

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
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Dark Base Background */}
      <div className="absolute inset-0 bg-slate-950" />
      
      {/* Red-Blue Gradient Overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[60%] h-[50%] bg-gradient-to-br from-red-600/30 via-red-500/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-gradient-to-bl from-blue-600/30 via-blue-500/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[70%] h-[50%] bg-gradient-to-t from-purple-600/20 via-indigo-500/10 to-transparent rounded-full blur-3xl" />
      </div>
      
      {/* Interactive Particle Background */}
      <ParticleBackground 
        particleCount={100}
        minRadius={1}
        maxRadius={3}
        speed={0.4}
        lineDistance={140}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo/Brand Area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-5">
            <img src={loginLogo} alt="样本通" className="h-14 object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">AI产品信息管理平台</h1>
          <p className="text-blue-200/60 mt-2 text-sm">企业级智能产品数据管理解决方案</p>
        </div>

        {/* Login Card */}
        <Card className="border-white/10 shadow-2xl shadow-black/30 backdrop-blur-xl bg-white/10">
          <CardContent className="p-6">
            {mode === "login" ? (
              <>
                <Tabs value={loginTab} onValueChange={setLoginTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/5 border border-white/10">
                    <TabsTrigger value="phone" className="text-xs text-blue-100/70 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
                      <Smartphone className="w-3.5 h-3.5 mr-1" />
                      手机验证码
                    </TabsTrigger>
                    <TabsTrigger value="email" className="text-xs text-blue-100/70 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
                      <Mail className="w-3.5 h-3.5 mr-1" />
                      邮箱验证码
                    </TabsTrigger>
                    <TabsTrigger value="account" className="text-xs text-blue-100/70 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
                      <Lock className="w-3.5 h-3.5 mr-1" />
                      账号密码
                    </TabsTrigger>
                  </TabsList>

                  {/* Phone Login */}
                  <TabsContent value="phone" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm text-blue-100/70">手机号</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="请输入手机号"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-cyan-400 focus:ring-cyan-400/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneCode" className="text-sm text-blue-100/70">验证码</Label>
                      <div className="flex gap-3">
                        <Input
                          id="phoneCode"
                          type="text"
                          placeholder="请输入验证码"
                          value={verifyCode}
                          onChange={(e) => setVerifyCode(e.target.value)}
                          className="h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-cyan-400 focus:ring-cyan-400/20"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleSendCode("phone")}
                          disabled={countdown > 0}
                          className="shrink-0 w-28 h-11 border-cyan-400/50 text-cyan-400 bg-transparent hover:bg-cyan-400/10 hover:text-cyan-300"
                        >
                          {countdown > 0 ? `${countdown}s` : "获取验证码"}
                        </Button>
                      </div>
                    </div>
                    <Button 
                      onClick={handlePhoneLogin} 
                      disabled={loading}
                      className="w-full h-11 mt-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/30 border-0"
                    >
                      {loading ? "登录中..." : "登 录"}
                    </Button>
                  </TabsContent>

                  {/* Email Login */}
                  <TabsContent value="email" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm text-blue-100/70">邮箱地址</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="请输入邮箱地址"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-cyan-400 focus:ring-cyan-400/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emailCode" className="text-sm text-blue-100/70">验证码</Label>
                      <div className="flex gap-3">
                        <Input
                          id="emailCode"
                          type="text"
                          placeholder="请输入验证码"
                          value={verifyCode}
                          onChange={(e) => setVerifyCode(e.target.value)}
                          className="h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-cyan-400 focus:ring-cyan-400/20"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleSendCode("email")}
                          disabled={countdown > 0}
                          className="shrink-0 w-28 h-11 border-cyan-400/50 text-cyan-400 bg-transparent hover:bg-cyan-400/10 hover:text-cyan-300"
                        >
                          {countdown > 0 ? `${countdown}s` : "获取验证码"}
                        </Button>
                      </div>
                    </div>
                    <Button 
                      onClick={handleEmailLogin} 
                      disabled={loading}
                      className="w-full h-11 mt-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/30 border-0"
                    >
                      {loading ? "登录中..." : "登 录"}
                    </Button>
                  </TabsContent>

                  {/* Account Login */}
                  <TabsContent value="account" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="account" className="text-sm text-blue-100/70">账号 / 邮箱</Label>
                      <Input
                        id="account"
                        type="text"
                        placeholder="请输入账号或邮箱"
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                        className="h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-cyan-400 focus:ring-cyan-400/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm text-blue-100/70">密码</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="请输入密码"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-cyan-400 focus:ring-cyan-400/20 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <Button 
                      onClick={handleAccountLogin} 
                      disabled={loading}
                      className="w-full h-11 mt-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/30 border-0"
                    >
                      {loading ? "登录中..." : "登 录"}
                    </Button>
                  </TabsContent>
                </Tabs>

                {/* Forgot Password Link */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setMode("forgot-password")}
                    className="text-sm text-blue-200/60 hover:text-cyan-400 transition-colors"
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
                  className="flex items-center gap-1 text-sm text-blue-200/60 hover:text-cyan-400 transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  返回登录
                </button>

                <div className="text-center mb-6">
                  <h2 className="text-lg font-semibold text-white">重置密码</h2>
                  <p className="text-sm text-blue-200/60 mt-1">请输入您的手机号以重置密码</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resetPhone" className="text-sm text-blue-100/70">手机号</Label>
                  <Input
                    id="resetPhone"
                    type="tel"
                    placeholder="请输入手机号"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-cyan-400 focus:ring-cyan-400/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resetCode" className="text-sm text-blue-100/70">短信验证码</Label>
                  <div className="flex gap-3">
                    <Input
                      id="resetCode"
                      type="text"
                      placeholder="请输入验证码"
                      value={verifyCode}
                      onChange={(e) => setVerifyCode(e.target.value)}
                      className="h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-cyan-400 focus:ring-cyan-400/20"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSendCode("phone")}
                      disabled={countdown > 0}
                      className="shrink-0 w-28 h-11 border-cyan-400/50 text-cyan-400 bg-transparent hover:bg-cyan-400/10 hover:text-cyan-300"
                    >
                      {countdown > 0 ? `${countdown}s` : "获取验证码"}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-sm text-blue-100/70">新密码</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="请输入新密码（至少6位）"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-cyan-400 focus:ring-cyan-400/20 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm text-blue-100/70">确认新密码</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="请再次输入新密码"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-cyan-400 focus:ring-cyan-400/20 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  onClick={handleResetPassword} 
                  disabled={loading}
                  className="w-full h-11 mt-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/30 border-0"
                >
                  {loading ? "重置中..." : "重置密码"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-blue-200/40 mt-6">
          © 2024 AI产品信息管理平台 · 保留所有权利
        </p>
      </div>
    </div>
  );
}
