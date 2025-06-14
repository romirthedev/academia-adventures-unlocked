
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navigation from "./components/Navigation";
import PageTransition from "./components/PageTransition";
import Index from "./pages/Index";
import CollegeExplorer from "./pages/CollegeExplorer";
import CollegeDetails from "./pages/CollegeDetails";
import FindProfessors from "./pages/FindProfessors";
import CompareSchools from "./pages/CompareSchools";
import SavedSchools from "./pages/SavedSchools";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen w-full bg-background transition-colors duration-300">
            <Navigation />
            <PageTransition>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/explore" element={<CollegeExplorer />} />
                <Route path="/college/:id" element={<CollegeDetails />} />
                <Route path="/professors" element={<FindProfessors />} />
                <Route path="/compare" element={<CompareSchools />} />
                <Route path="/saved" element={<SavedSchools />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
