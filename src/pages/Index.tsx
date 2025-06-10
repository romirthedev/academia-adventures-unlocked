
import React, { useState, useEffect } from 'react';
import { Search, GraduationCap, Users, TrendingUp, ArrowRight, Sparkles, BookOpen, Target, Zap, Star, Globe } from 'lucide-react';
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
      description: "Explore thousands of universities with comprehensive data and real-time insights.",
      gradient: "from-violet-600 to-purple-600"
    },
    {
      icon: Users,
      title: "Professor Networks", 
      description: "Connect with leading researchers and academics in your field of interest.",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      icon: Target,
      title: "Smart Matching",
      description: "AI-powered recommendations based on your academic goals and preferences.",
      gradient: "from-emerald-600 to-teal-600"
    },
    {
      icon: TrendingUp,
      title: "Data Analytics",
      description: "Make informed decisions with detailed statistics and comparison tools.",
      gradient: "from-orange-600 to-red-600"
    }
  ];

  const stats = [
    { number: "7,000+", label: "Universities", icon: Globe },
    { number: "50,000+", label: "Professors", icon: Users },
    { number: "1M+", label: "Data Points", icon: TrendingUp },
    { number: "24/7", label: "AI Support", icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse-soft"></div>
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      
      {/* Hero Section */}
      <main className="relative z-10">
        <div className="container mx-auto px-6 pt-20 pb-16">
          {/* Header */}
          <div className="text-center max-w-5xl mx-auto mb-20">
            <div className="flex items-center justify-center mb-8 animate-fade-in">
              <div className="p-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl mr-4 shadow-2xl shadow-purple-500/25">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
              <span className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                CollegeAI
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-8 animate-slide-up delay-100">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
                Discover Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Academic Future
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 animate-slide-up delay-200 leading-relaxed">
              Explore universities, connect with professors, and make informed decisions 
              about your education with our comprehensive AI-powered platform.
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto mb-16 animate-scale-in delay-300">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-3 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-300 h-6 w-6" />
                      <Input
                        type="text"
                        placeholder="Search universities, programs, professors..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        className="pl-16 pr-6 py-7 text-lg bg-transparent border-0 text-white placeholder-gray-300 focus:ring-0 focus:outline-none"
                      />
                    </div>
                    <Button
                      onClick={handleSearch}
                      className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-10 py-7 text-lg rounded-2xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-105"
                    >
                      <Sparkles className="mr-3 h-6 w-6" />
                      Explore
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-6 mb-24 animate-fade-in delay-400">
              <Button
                onClick={() => navigate('/explore')}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white text-lg px-10 py-5 rounded-2xl shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-105"
              >
                <GraduationCap className="mr-3 h-6 w-6" />
                Browse Colleges
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              <Button
                onClick={() => navigate('/professors')}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-lg px-10 py-5 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <Users className="mr-3 h-6 w-6" />
                Find Professors
              </Button>
              <Button
                onClick={() => navigate('/compare')}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-lg px-10 py-5 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <TrendingUp className="mr-3 h-6 w-6" />
                Compare Schools
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="max-w-7xl mx-auto mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 animate-fade-in delay-500">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Everything You Need for
              </span>
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Academic Success
              </span>
            </h2>
            <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
              Discover the tools and insights that will transform your educational journey
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="relative group bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg"></div>
                  <CardContent className="relative p-8 text-center">
                    <div className={`inline-flex p-5 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-violet-300 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="max-w-6xl mx-auto text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in delay-1000">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Trusted by Students
              </span>
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Worldwide
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-16 max-w-2xl mx-auto">
              Join millions of students who have found their perfect academic match
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="group text-center animate-scale-in hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${1.1 + index * 0.1}s` }}
                >
                  <div className="mb-4">
                    <stat.icon className="h-8 w-8 mx-auto text-violet-400 group-hover:text-cyan-400 transition-colors duration-300" />
                  </div>
                  <div className="text-5xl md:text-6xl font-bold mb-3">
                    <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      {stat.number}
                    </span>
                  </div>
                  <div className="text-gray-300 text-sm uppercase tracking-wider font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-purple-600/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 animate-fade-in delay-1200">
                <div className="flex items-center justify-center mb-6">
                  <Star className="h-6 w-6 text-yellow-400 mr-2" />
                  <Star className="h-6 w-6 text-yellow-400 mr-2" />
                  <Star className="h-6 w-6 text-yellow-400 mr-2" />
                  <Star className="h-6 w-6 text-yellow-400 mr-2" />
                  <Star className="h-6 w-6 text-yellow-400" />
                </div>
                <h2 className="text-4xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Ready to Start Your
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    Academic Journey?
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of students who have transformed their educational path through our AI-powered platform.
                </p>
                <Button
                  onClick={() => navigate('/explore')}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white text-xl px-12 py-6 rounded-2xl shadow-2xl shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-105"
                >
                  <Zap className="mr-3 h-6 w-6" />
                  Get Started Today
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-16 text-center">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="p-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl shadow-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              CollegeAI
            </span>
          </div>
          <p className="text-gray-400 mb-8 text-lg">
            Empowering educational decisions through advanced AI technology
          </p>
          <div className="flex justify-center space-x-12 text-gray-400">
            <a href="#" className="hover:text-violet-400 transition-colors duration-300 text-lg">Privacy</a>
            <a href="#" className="hover:text-violet-400 transition-colors duration-300 text-lg">Terms</a>
            <a href="#" className="hover:text-violet-400 transition-colors duration-300 text-lg">About</a>
            <a href="#" className="hover:text-violet-400 transition-colors duration-300 text-lg">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
