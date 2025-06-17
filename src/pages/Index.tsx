
import React, { useState, useEffect } from 'react';
import { Search, GraduationCap, Users, TrendingUp, ArrowRight, Sparkles, BookOpen, Target, Zap, Star, Globe, Crown, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder';
import UniversityLogosCarousel from '@/components/UniversityLogosCarousel';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      gradient: "from-orange-600 to-red-600"
    },
    {
      icon: Users,
      title: "Professor Networks", 
      description: "Connect with leading researchers and academics in your field of interest.",
      gradient: "from-orange-500 to-amber-600"
    },
    {
      icon: Target,
      title: "Smart Matching",
      description: "AI-powered recommendations based on your academic goals and preferences.",
      gradient: "from-orange-600 to-orange-500"
    },
    {
      icon: TrendingUp,
      title: "Data Analytics",
      description: "Make informed decisions with detailed statistics and comparison tools.",
      gradient: "from-amber-600 to-yellow-600"
    }
  ];

  const stats = [
    { number: "2,847", label: "Universities", icon: Globe },
    { number: "15,623", label: "Professors", icon: Users },
    { number: "850K+", label: "Data Points", icon: TrendingUp },
    { number: "24/7", label: "AI Support", icon: Sparkles }
  ];

  const searchPlaceholders = [
    "Search universities...",
    "Search programs...", 
    "Search professors..."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-white relative overflow-hidden">
      {/* University Logos Carousel */}
      <UniversityLogosCarousel />

      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-red-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-300/15 to-orange-500/15 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-amber-400/25 to-orange-400/25 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-red-400/20 to-orange-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsIDAsIDAsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20 animate-pulse-soft"></div>
      
      {/* Hero Section */}
      <main className="relative z-10">
        <div className="container mx-auto px-6 pt-20 pb-16">
          {/* Header with Enhanced Animations */}
          <div className="text-center max-w-5xl mx-auto mb-20">
            <div className={`flex items-center justify-center mb-8 transition-all duration-1000 transform ${isVisible ? 'animate-scale-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative p-2 mr-4 group">
                {/* Elegant logo with crown and academic elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-amber-500 to-orange-700 rounded-2xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-orange-600 via-amber-500 to-orange-700 rounded-2xl p-4 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <div className="relative">
                    <Crown className="h-8 w-8 text-white absolute -top-1 left-1/2 transform -translate-x-1/2 z-10" />
                    <GraduationCap className="h-10 w-10 text-white mt-2" />
                    <div className="absolute -bottom-1 -right-1">
                      <Award className="h-4 w-4 text-amber-200" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-left">
                <span className="block text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                  CollegeAI
                </span>
                <span className="block text-sm font-medium text-orange-600 tracking-wider uppercase">
                  Excellence in Education
                </span>
              </div>
            </div>

            <h1 className={`text-6xl md:text-7xl font-bold mb-8 transition-all duration-1200 transform ${isVisible ? 'animate-fade-in-up opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} delay-200`}>
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent leading-tight hover:scale-105 transition-transform duration-500 inline-block">
                Discover Your
              </span>
              <br />
              {/* Completely redesigned "Academic Future" section */}
              <div className="relative inline-block mt-4">
                <div className="relative">
                  {/* Elegant background with subtle gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-100 via-amber-50 to-orange-100 rounded-3xl transform -skew-y-1 shadow-2xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-200/30 via-amber-100/30 to-orange-200/30 rounded-3xl transform skew-y-1 shadow-xl"></div>
                  
                  {/* Floating decorative elements */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full shadow-lg animate-float"></div>
                  <div className="absolute -top-2 -right-6 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-lg animate-float" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute -bottom-3 left-8 w-5 h-5 bg-gradient-to-br from-orange-500 to-red-500 rounded-full shadow-lg animate-float" style={{ animationDelay: '2s' }}></div>
                  
                  {/* Main text with sophisticated styling */}
                  <div className="relative px-12 py-6">
                    <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 inline-block">
                      Academic Excellence
                    </span>
                    
                    {/* Subtle accent line */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full"></div>
                  </div>
                  
                  {/* Elegant corner ornaments */}
                  <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-orange-300 rounded-tl-lg"></div>
                  <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-orange-300 rounded-tr-lg"></div>
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-orange-300 rounded-bl-lg"></div>
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-orange-300 rounded-br-lg"></div>
                </div>
              </div>
            </h1>
            
            <p className={`text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-12 transition-all duration-1000 transform ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-15'} delay-400 leading-relaxed hover:text-gray-600 transition-colors duration-300`}>
              Explore universities, connect with professors, and make informed decisions 
              about your education with our comprehensive AI-powered platform.
            </p>

            {/* Enhanced Search Bar with Animated Placeholder */}
            <div className={`max-w-3xl mx-auto mb-16 transition-all duration-1200 transform ${isVisible ? 'animate-scale-in opacity-100' : 'opacity-0 scale-95'} delay-600`}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/30 to-red-600/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/95 backdrop-blur-xl border border-orange-200 rounded-3xl p-3 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] group-hover:border-orange-300">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500 h-6 w-6 group-hover:text-orange-500 transition-colors duration-300 group-hover:scale-110" />
                      <Input
                        type="text"
                        placeholder=""
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        className="pl-16 pr-6 py-7 text-lg bg-transparent border-0 text-gray-900 focus:ring-0 focus:outline-none"
                      />
                      <div className="absolute left-16 top-1/2 transform -translate-y-1/2 text-lg text-gray-500 pointer-events-none">
                        <AnimatedPlaceholder 
                          placeholders={searchPlaceholders}
                          className="transition-colors duration-300"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={handleSearch}
                      className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-10 py-7 text-lg rounded-2xl shadow-lg shadow-orange-500/25 transition-all duration-300 hover:shadow-orange-500/40 hover:scale-105 hover:-translate-y-1 active:scale-95 btn-magic-sparkle"
                    >
                      <Sparkles className="mr-3 h-6 w-6 animate-pulse-soft" />
                      Explore
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className={`flex flex-wrap justify-center gap-6 mb-24 transition-all duration-1000 transform ${isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-800`}>
              <Button
                onClick={() => navigate('/explore')}
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white text-lg px-10 py-5 rounded-2xl shadow-lg shadow-orange-500/25 transition-all duration-300 hover:shadow-orange-500/40 btn-morphing group"
              >
                <GraduationCap className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                Browse Colleges
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                onClick={() => navigate('/professors')}
                className="bg-white border-2 border-orange-300 text-gray-900 text-lg px-10 py-5 rounded-2xl hover:bg-orange-50 transition-all duration-300 group"
              >
                <Users className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                Find Professors
              </Button>
              <Button
                onClick={() => navigate('/compare')}
                className="bg-white border-2 border-orange-300 text-gray-900 text-lg px-10 py-5 rounded-2xl hover:bg-orange-50 transition-all duration-300 group"
              >
                <TrendingUp className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                Compare Schools
              </Button>
            </div>
          </div>

          {/* Enhanced Features Grid */}
          <div className="max-w-7xl mx-auto mb-24">
            <h2 className={`text-4xl md:text-5xl font-bold text-center mb-6 transition-all duration-1000 transform ${isVisible ? 'animate-fade-in-up opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} delay-1000`}>
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 inline-block">
                Everything You Need for
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 inline-block">
                Academic Success
              </span>
            </h2>
            <p className="text-xl text-gray-700 text-center mb-16 max-w-3xl mx-auto hover:text-gray-600 transition-colors duration-300">
              Discover the tools and insights that will transform your educational journey
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`relative group bg-white/90 backdrop-blur-xl border border-orange-200 hover:border-orange-300 transition-all duration-500 hover:scale-110 hover:-translate-y-4 shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 cursor-pointer ${isVisible ? 'animate-fade-in-up opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                  style={{ animationDelay: `${1.2 + index * 0.2}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-orange-50/50 rounded-lg group-hover:from-orange-50/70 group-hover:to-orange-100/70 transition-all duration-500"></div>
                  <CardContent className="relative p-8 text-center">
                    <div className={`inline-flex p-5 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 shadow-lg group-hover:scale-125 group-hover:rotate-6 transition-all duration-500`}>
                      <feature.icon className="h-8 w-8 text-white group-hover:animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-orange-700 transition-colors duration-300 group-hover:scale-105">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="max-w-6xl mx-auto text-center mb-24">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-1000 transform ${isVisible ? 'animate-fade-in-up opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} delay-1800`}>
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 inline-block">
                Trusted by Students
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 inline-block">
                Worldwide
              </span>
            </h2>
            <p className="text-xl text-gray-700 mb-16 max-w-2xl mx-auto hover:text-gray-600 transition-colors duration-300">
              Join millions of students who have found their perfect academic match
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`group text-center hover:scale-110 hover:-translate-y-2 transition-all duration-500 cursor-pointer ${isVisible ? 'animate-scale-in opacity-100' : 'opacity-0 scale-75'}`}
                  style={{ animationDelay: `${2.0 + index * 0.2}s` }}
                >
                  <div className="mb-4">
                    <stat.icon className="h-8 w-8 mx-auto text-orange-600 group-hover:text-amber-600 transition-colors duration-300 group-hover:scale-125" />
                  </div>
                  <div className="text-5xl md:text-6xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300">
                    <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                      {stat.number}
                    </span>
                  </div>
                  <div className="text-gray-600 text-sm uppercase tracking-wider font-medium group-hover:text-orange-600 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <div className={`relative transition-all duration-1200 transform ${isVisible ? 'animate-scale-in opacity-100' : 'opacity-0 scale-95'} delay-2400`}>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/10 rounded-3xl blur-xl animate-pulse-soft"></div>
              <div className="relative bg-white/95 backdrop-blur-xl border border-orange-200 rounded-3xl p-12 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 group">
                <div className="flex items-center justify-center mb-6">
                  <Star className="h-6 w-6 text-yellow-500 mr-2 group-hover:scale-125 transition-transform duration-300" />
                  <Star className="h-6 w-6 text-yellow-500 mr-2 group-hover:scale-125 transition-transform duration-300" style={{ animationDelay: '0.1s' }} />
                  <Star className="h-6 w-6 text-yellow-500 mr-2 group-hover:scale-125 transition-transform duration-300" style={{ animationDelay: '0.2s' }} />
                  <Star className="h-6 w-6 text-yellow-500 mr-2 group-hover:scale-125 transition-transform duration-300" style={{ animationDelay: '0.3s' }} />
                  <Star className="h-6 w-6 text-yellow-500 group-hover:scale-125 transition-transform duration-300" style={{ animationDelay: '0.4s' }} />
                </div>
                <h2 className="text-4xl font-bold mb-6 group-hover:scale-105 transition-transform duration-300">
                  <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Ready to Start Your
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    Academic Journey?
                  </span>
                </h2>
                <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
                  Join thousands of students who have transformed their educational path through our AI-powered platform.
                </p>
                <Button
                  onClick={() => navigate('/explore')}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white text-xl px-12 py-6 rounded-2xl shadow-2xl shadow-orange-500/25 transition-all duration-300 hover:shadow-orange-500/40 btn-quantum-ripple group/btn"
                >
                  <Zap className="mr-3 h-6 w-6 group-hover/btn:scale-110 transition-transform duration-300" />
                  Get Started Today
                  <ArrowRight className="ml-3 h-5 w-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-orange-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-16 text-center">
          <div className="flex items-center justify-center space-x-4 mb-8 group">
            <div className="relative p-2 group">
              {/* Updated footer logo */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-amber-500 to-orange-700 rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-orange-600 via-amber-500 to-orange-700 rounded-xl p-3 shadow-lg group-hover:scale-110 transition-transform duration-500">
                <div className="relative">
                  <Crown className="h-5 w-5 text-white absolute -top-0.5 left-1/2 transform -translate-x-1/2 z-10" />
                  <GraduationCap className="h-6 w-6 text-white mt-1" />
                  <div className="absolute -bottom-0.5 -right-0.5">
                    <Award className="h-3 w-3 text-amber-200" />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-left">
              <span className="block text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                CollegeAI
              </span>
              <span className="block text-xs font-medium text-orange-600 tracking-wider uppercase">
                Excellence in Education
              </span>
            </div>
          </div>
          <p className="text-gray-600 mb-8 text-lg hover:text-gray-700 transition-colors duration-300">
            Empowering educational decisions through advanced AI technology
          </p>
          <div className="flex justify-center space-x-12 text-gray-600">
            <a href="#" className="hover:text-orange-600 transition-all duration-300 text-lg hover:scale-110 hover:-translate-y-1">Privacy</a>
            <a href="#" className="hover:text-orange-600 transition-all duration-300 text-lg hover:scale-110 hover:-translate-y-1">Terms</a>
            <a href="#" className="hover:text-orange-600 transition-all duration-300 text-lg hover:scale-110 hover:-translate-y-1">About</a>
            <a href="#" className="hover:text-orange-600 transition-all duration-300 text-lg hover:scale-110 hover:-translate-y-1">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
