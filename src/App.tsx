import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StudentSignup from "./pages/auth/StudentSignup";
import HomeTutorSignup from "./pages/auth/HomeTutorSignup";
import OnlineTutorSignup from "./pages/auth/OnlineTutorSignup";
import Login from "./pages/auth/Login";
import AdminLogin from "./pages/auth/AdminLogin";
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import TutorDashboard from "./pages/dashboards/TutorDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import Terms from "./pages/compliance/Terms";
import Privacy from "./pages/compliance/Privacy";
import RefundPolicy from "./pages/compliance/RefundPolicy";
import RazorpayTerms from "./pages/compliance/RazorpayTerms";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/student-signup" element={<StudentSignup />} />
          <Route path="/home-tutor-signup" element={<HomeTutorSignup />} />
          <Route path="/online-tutor-signup" element={<OnlineTutorSignup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/tutor-dashboard" element={<TutorDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/razorpay-terms" element={<RazorpayTerms />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
