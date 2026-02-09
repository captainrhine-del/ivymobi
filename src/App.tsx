import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import InformationManagement from "./pages/InformationManagement";
import CompanyMaterials from "./pages/CompanyMaterials";
import Activities from "./pages/Activities";
import Members from "./pages/Members";
import Statistics from "./pages/Statistics";
import MiniProgram from "./pages/MiniProgram";
import Notifications from "./pages/Notifications";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/information" element={<InformationManagement />} />
          <Route path="/company" element={<CompanyMaterials />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/members" element={<Members />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/miniprogram" element={<MiniProgram />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/auth" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
