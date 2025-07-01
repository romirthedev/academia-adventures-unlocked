import React, { useEffect, useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import CollegeExplorer from "./pages/CollegeExplorer";
import CollegeDetails from "./pages/CollegeDetails";
import FindProfessors from "./pages/FindProfessors";
import CollegeComparison from "./pages/CollegeComparison";
import ApplicationTracker from "./pages/ApplicationTracker";
import SavedSchools from "./pages/SavedSchools";
import MockApplication from "./pages/MockApplication";
import NotFound from "./pages/NotFound";
import Loader from "@/components/Loader";
import Recommendations from "./pages/Recommendations";

const queryClient = new QueryClient();

function AppWithLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLoading(true);
    if (timer) clearTimeout(timer);
    // Ensure loader is visible for at least 1 second
    const t = setTimeout(() => setLoading(false), 1000);
    setTimer(t);
    return () => clearTimeout(t);
  }, [location]);

  return (
    <>
      {loading && <Loader />}
      <div className="min-h-screen w-full bg-background">
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<CollegeExplorer />} />
          <Route path="/college/:id" element={<CollegeDetails />} />
          <Route path="/professors" element={<FindProfessors />} />
          <Route path="/compare" element={<CollegeComparison />} />
          <Route path="/applications" element={<ApplicationTracker />} />
          <Route path="/saved" element={<SavedSchools />} />
          <Route path="/mock-application" element={<MockApplication />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppWithLoader />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
