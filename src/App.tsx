
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import Index from "./pages/Index";
import CollegeExplorer from "./pages/CollegeExplorer";
import CollegeDetails from "./pages/CollegeDetails";
import FindProfessors from "./pages/FindProfessors";
import CompareSchools from "./pages/CompareSchools";
import SavedSchools from "./pages/SavedSchools";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  if (isHomePage) {
    return (
      <div className="min-h-screen w-full bg-background">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<CollegeExplorer />} />
          <Route path="/college/:id" element={<CollegeDetails />} />
          <Route path="/professors" element={<FindProfessors />} />
          <Route path="/compare" element={<CompareSchools />} />
          <Route path="/saved" element={<SavedSchools />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 transition-all duration-300 ease-in-out">
          <div className="p-4 border-b border-orange-200/50 bg-white/50 backdrop-blur-sm">
            <SidebarTrigger className="h-8 w-8 p-0 hover:bg-orange-50 transition-all duration-200 text-orange-600" />
          </div>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<CollegeExplorer />} />
            <Route path="/college/:id" element={<CollegeDetails />} />
            <Route path="/professors" element={<FindProfessors />} />
            <Route path="/compare" element={<CompareSchools />} />
            <Route path="/saved" element={<SavedSchools />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </SidebarProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
