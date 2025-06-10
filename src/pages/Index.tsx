
import React, { useState, useEffect } from 'react';
import { Search, GraduationCap, Users, TrendingUp, ArrowRight, Sparkles, BookOpen, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const features = [
    {
      icon: BookOpen,
      title: "University Discovery",
      description: "Explore thousands of universities with comprehensive data and real-time insights."
    },
    {
      icon: Users,
      title: "Professor Networks",
      description: "Connect with leading researchers and academics in your field of interest."
    },
    {
      icon: Target,
      title: "Smart Matching",
      description: "AI-powered recommendations based on your academic goals and preferences."
    },
    {
      icon: TrendingUp,
      title: "Data Analytics",
      description: "Make informed decisions with detailed statistics and comparison tools."
    }
  ];

  const stats = [
    { number: "7,000+", label: "Universities" },
    { number: "50,000+", label: "Professors" },
    { number: "1M+", label: "Data Points" },
    { number: "24/7", label: "AI Support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Hero Section */}
      <main className="relative">
        <div className="container mx-auto px-6 pt-20 pb-16">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="flex items-center justify-center mb-8 animate-fade-in">
              <div className="p-3 bg-primary rounded-xl mr-3 shadow-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <span className="text-3xl font-bold text-foreground">CollegeAI</span>
            </div>

            <h1 className="heading-xl mb-6 animate-slide-up delay-100">
              Discover Your Academic Future
            </h1>
            <p className="text-xl text-muted max-w-3xl mx-auto mb-12 animate-slide-up delay-200">
              Explore universities, connect with professors, and make informed decisions 
              about your education with our comprehensive platform.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12 animate-scale-in delay-300">
              <div className="glass-card rounded-2xl p-2">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Search universities, programs, professors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="pl-12 pr-4 py-6 text-lg border-0 bg-transparent focus:ring-0 focus:outline-none"
                    />
                  </div>
                  <Button
                    onClick={handleSearch}
                    className="btn-primary px-8 py-6 text-lg"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Explore
                  </Button>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-20 animate-fade-in delay-400">
              <Button
                onClick={() => navigate('/explore')}
                className="btn-primary text-lg px-8 py-4"
              >
                <GraduationCap className="mr-2 h-5 w-5" />
                Browse Colleges
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={() => navigate('/professors')}
                className="btn-secondary text-lg px-8 py-4"
              >
                <Users className="mr-2 h-5 w-5" />
                Find Professors
              </Button>
              <Button
                onClick={() => navigate('/compare')}
                className="btn-secondary text-lg px-8 py-4"
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                Compare Schools
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="max-w-6xl mx-auto mb-20">
            <h2 className="heading-lg text-center mb-12 animate-fade-in delay-500">
              Everything You Need for Academic Success
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="glass-card border-0 hover-lift animate-fade-in"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-6">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-12 animate-fade-in delay-1000">
              Trusted by Students Worldwide
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center animate-scale-in"
                  style={{ animationDelay: `${1.1 + index * 0.1}s` }}
                >
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bg-gradient-to-b from-transparent to-slate-100 py-20">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-foreground animate-fade-in">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg text-muted mb-8 animate-fade-in delay-100">
                Join thousands of students who have found their perfect academic match through our platform.
              </p>
              <Button
                onClick={() => navigate('/explore')}
                className="btn-primary text-lg px-12 py-4 animate-scale-in delay-200"
              >
                <Zap className="mr-2 h-5 w-5" />
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-2 bg-primary rounded-lg">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">CollegeAI</span>
          </div>
          <p className="text-slate-400 mb-6">
            Empowering educational decisions through technology
          </p>
          <div className="flex justify-center space-x-8 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
