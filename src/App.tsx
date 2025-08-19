
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Partners from "./pages/Partners";
import Dashboard from "./pages/Dashboard";
import AskDara from "./pages/AskDara";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { AuthProvider } from "./contexts/AuthContext";
import { WebAppLayout } from "./components/webapp/WebAppLayout";

// Legal pages
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import SecurityPolicy from "./pages/legal/SecurityPolicy";
import CookiePolicy from "./pages/legal/CookiePolicy";

// Resources pages
import Blog from "./pages/resources/Blog";
import BlogArticleDetails from "./components/blog/BlogArticleDetails";
import Documentation from "./pages/resources/Documentation";
import FAQ from "./pages/resources/FAQ";

// Company pages
import About from "./pages/company/About";
import Contact from "./pages/company/Contact";
import Careers from "./pages/company/Careers";

// Platform pages
import Features from "./pages/platform/Features";
import Solutions from "./pages/platform/Solutions";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/webapp" element={<WebAppLayout />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ask-dara" element={<AskDara />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Legal Routes */}
            <Route path="/legal/privacy" element={<PrivacyPolicy />} />
            <Route path="/legal/terms" element={<TermsOfService />} />
            <Route path="/legal/security" element={<SecurityPolicy />} />
            <Route path="/legal/cookies" element={<CookiePolicy />} />
            
            {/* Resources Routes */}
            <Route path="/resources/blog" element={<Blog />} />
            <Route path="/resources/blog/:id" element={<BlogArticleDetails />} />
            <Route path="/resources/documentation" element={<Documentation />} />
            <Route path="/resources/faq" element={<FAQ />} />
            
            {/* Company Routes */}
            <Route path="/company/about" element={<About />} />
            <Route path="/company/contact" element={<Contact />} />
            <Route path="/company/careers" element={<Careers />} />
            
            {/* Platform Routes */}
            <Route path="/platform/features" element={<Features />} />
            <Route path="/platform/solutions" element={<Solutions />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
