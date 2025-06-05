
import React, { useState, useEffect } from 'react';
import { Search, GraduationCap, Users, MapPin, TrendingUp, Star, ArrowRight, Sparkles, Zap, Globe, Brain, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const navigate = useNavigate();

  const heroTexts = [
    "Discover Your Future",
    "Explore Universities",
    "Find Your Path",
    "Shape Tomorrow"
  ];

  useEffect(() => {
    const text = heroTexts[textIndex];
    let i = 0;
    
    const typeTimer = setInterval(() => {
      if (i < text.length) {
        setCurrentText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeTimer);
        setTimeout(() => {
          setTextIndex((prev) => (prev + 1) % heroTexts.length);
          setCurrentText('');
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeTimer);
  }, [textIndex]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Advanced machine learning algorithms analyze thousands of data points to provide personalized recommendations.",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      icon: Globe,
      title: "Global University Network",
      description: "Access comprehensive data from universities worldwide with real-time updates and verified information.",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      icon: Zap,
      title: "Instant Matching",
      description: "Lightning-fast search technology connects you with perfect academic opportunities in milliseconds.",
      gradient: "from-orange-600 to-red-600"
    },
    {
      icon: Rocket,
      title: "Future-Ready Analytics",
      description: "Predictive models forecast career outcomes and industry trends to guide your educational journey.",
      gradient: "from-green-600 to-emerald-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/80" />
      
      {/* Floating Particles */}
      <div className="particles-bg absolute inset-0" />
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-3/4 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />

      {/* Hero Section */}
      <main className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6">
        <div className="text-center max-w-6xl mx-auto">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center mb-8 animate-fade-in-up">
            <div className="p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mr-4 glow-effect">
              <GraduationCap className="h-12 w-12 text-white" />
            </div>
            <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              CollegeAI
            </span>
          </div>

          {/* Dynamic Hero Text */}
          <div className="mb-8 animate-fade-in-up stagger-1">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                {currentText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Experience the future of education discovery with AI-powered insights, 
              quantum-speed search, and personalized pathways to your dream university.
            </p>
          </div>

          {/* Futuristic Search Bar */}
          <div className="max-w-3xl mx-auto mb-16 animate-scale-in stagger-2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 h-6 w-6" />
                  <Input
                    type="text"
                    placeholder="Search universities, programs, professors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-16 pr-40 py-6 text-lg bg-white/5 border-white/10 text-white placeholder-slate-400 focus:border-purple-400 focus:ring-purple-400/30 rounded-xl"
                  />
                  <Button
                    onClick={handleSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 btn-futuristic text-white px-8 py-3 rounded-lg font-semibold"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Explore
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-6 mb-20 animate-fade-in-up stagger-3">
            <Button
              onClick={() => navigate('/explore')}
              size="lg"
              className="btn-futuristic text-white px-8 py-4 text-lg font-semibold rounded-xl"
            >
              <GraduationCap className="mr-3 h-6 w-6" />
              <span className="animated-underline">Browse Colleges</span>
            </Button>
            <Button
              onClick={() => navigate('/professors')}
              size="lg"
              className="btn-futuristic text-white px-8 py-4 text-lg font-semibold rounded-xl"
            >
              <Users className="mr-3 h-6 w-6" />
              <span className="animated-underline">Find Professors</span>
            </Button>
            <Button
              onClick={() => navigate('/compare')}
              size="lg"
              className="btn-futuristic text-white px-8 py-4 text-lg font-semibold rounded-xl"
            >
              <TrendingUp className="mr-3 h-6 w-6" />
              <span className="animated-underline">Compare Schools</span>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="w-full max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in-up stagger-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 morphing-border"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 glow-effect`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 animated-underline">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="w-full max-w-6xl mx-auto mt-32 animate-fade-in-up stagger-5">
          <h2 className="text-4xl font-bold text-center text-white mb-12 animated-underline">
            Powering the Future of Education
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "7,000+", label: "Universities", icon: GraduationCap },
              { number: "50,000+", label: "Professors", icon: Users },
              { number: "1M+", label: "Data Points", icon: Star },
              { number: "24/7", label: "AI Support", icon: Zap }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center group animate-fade-in-up" 
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 mb-4 group-hover:scale-110 transition-transform duration-300 glow-effect">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-400 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-900/80 backdrop-blur-xl border-t border-white/10 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl glow-effect">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              CollegeAI
            </span>
          </div>
          <p className="text-slate-400 mb-6">
            Powered by advanced AI and comprehensive education data
          </p>
          <div className="flex justify-center space-x-8 text-sm text-slate-500">
            <a href="#" className="animated-underline hover:text-purple-400 transition-colors">Privacy</a>
            <a href="#" className="animated-underline hover:text-purple-400 transition-colors">Terms</a>
            <a href="#" className="animated-underline hover:text-purple-400 transition-colors">About</a>
            <a href="#" className="animated-underline hover:text-purple-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
