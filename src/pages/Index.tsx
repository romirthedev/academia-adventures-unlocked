
import React, { useState, useEffect } from 'react';
import { Search, GraduationCap, Users, MapPin, TrendingUp, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const navigate = useNavigate();

  const placeholders = [
    "Find a college...",
    "Explore research labs...",
    "Compare schools...",
    "Discover professors..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const features = [
    {
      icon: GraduationCap,
      title: "Comprehensive College Data",
      description: "Access detailed information on thousands of U.S. colleges including admissions, costs, and outcomes.",
      color: "text-college-primary"
    },
    {
      icon: Users,
      title: "Professor & Research Labs",
      description: "Connect with faculty and research opportunities across universities.",
      color: "text-college-gold"
    },
    {
      icon: TrendingUp,
      title: "Smart Comparisons",
      description: "Compare colleges side-by-side with interactive charts and visualizations.",
      color: "text-college-teal"
    },
    {
      icon: Star,
      title: "Personalized Dashboard",
      description: "Save favorites, take notes, and organize your college search journey.",
      color: "text-college-purple"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="floating-blob w-64 h-64 top-10 left-10 animate-float" style={{ animationDelay: '0s' }} />
      <div className="floating-blob w-96 h-96 top-1/2 right-10 animate-float" style={{ animationDelay: '2s' }} />
      <div className="floating-blob w-48 h-48 bottom-20 left-1/3 animate-float" style={{ animationDelay: '4s' }} />

      {/* Header */}
      <header className="relative z-10 p-6">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-college-primary animate-bounce-soft" />
            <span className="text-2xl font-bold gradient-text">CollegeCompass</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <Button variant="ghost" className="hover:text-college-primary transition-colors">
              Explore
            </Button>
            <Button variant="ghost" className="hover:text-college-primary transition-colors">
              Compare
            </Button>
            <Button variant="ghost" className="hover:text-college-primary transition-colors">
              Research
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Discover Your</span>
            <br />
            <span className="text-college-primary">Perfect College</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Explore thousands of colleges, connect with professors, and make informed decisions 
            about your academic future with comprehensive data and powerful search tools.
          </p>

          {/* Main Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="glass-card rounded-2xl p-8 animate-scale-in">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder={placeholders[placeholderIndex]}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-12 pr-32 py-4 text-lg rounded-xl border-0 bg-white/50 backdrop-blur-sm focus:bg-white/70 transition-all duration-300"
                />
                <Button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 college-gradient text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform duration-200"
                >
                  Search
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            <Button
              onClick={() => navigate('/explore')}
              variant="outline"
              size="lg"
              className="glass border-college-primary/30 hover:bg-college-primary hover:text-white transition-all duration-300 hover:scale-105"
            >
              <GraduationCap className="mr-2 h-5 w-5" />
              Browse Colleges
            </Button>
            <Button
              onClick={() => navigate('/professors')}
              variant="outline"
              size="lg"
              className="glass border-college-gold/30 hover:bg-college-gold hover:text-white transition-all duration-300 hover:scale-105"
            >
              <Users className="mr-2 h-5 w-5" />
              Find Professors
            </Button>
            <Button
              onClick={() => navigate('/compare')}
              variant="outline"
              size="lg"
              className="glass border-college-teal/30 hover:bg-college-teal hover:text-white transition-all duration-300 hover:scale-105"
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Compare Schools
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glass-card border-0 hover:scale-105 transition-all duration-300 cursor-pointer group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center">
                <feature.icon className={`h-12 w-12 mx-auto mb-4 ${feature.color} group-hover:animate-bounce-soft`} />
                <CardTitle className="text-lg font-semibold text-gray-800">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-32 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Trusted by Students Nationwide</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "7,000+", label: "Colleges" },
              { number: "50,000+", label: "Professors" },
              { number: "100K+", label: "Data Points" },
              { number: "24/7", label: "Access" }
            ].map((stat, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="text-3xl md:text-4xl font-bold text-college-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-white/80 backdrop-blur-sm border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <GraduationCap className="h-6 w-6 text-college-primary" />
            <span className="text-xl font-bold gradient-text">CollegeCompass</span>
          </div>
          <p className="text-gray-600 mb-4">
            Powered by U.S. Department of Education College Scorecard data
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-college-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-college-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-college-primary transition-colors">About</a>
            <a href="#" className="hover:text-college-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
