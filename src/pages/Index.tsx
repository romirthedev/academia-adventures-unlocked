import React, { useState, useEffect } from 'react';
import { Search, GraduationCap, Users, TrendingUp, ArrowRight, Sparkles, BookOpen, Target, Zap, Star, Globe, Crown, Award, BarChart, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder';
import UniversityLogosCarousel from '@/components/UniversityLogosCarousel';
import { ShinyButton } from "@/components/ui/shiny-button";
import { useTheme } from "next-themes";
import { LineShadowText } from "@/components/magicui/line-shadow-text";

const benefits = [
  {
    title: "Smart Search",
    price: "Free",
    note: "AI-powered college matching",
    features: [
      "Personalized recommendations",
      "Advanced filters",
      "Instant results",
      "No cost, no ads"
    ]
  },
  {
    title: "Real Insights",
    price: "Free",
    note: "Verified data & reviews",
    features: [
      "Acceptance rates",
      "Tuition & scholarships",
      "Student life info",
      "Current student reviews"
    ]
  },
  {
    title: "Save & Compare",
    price: "Free",
    note: "Decision tools",
    features: [
      "Save favorite schools",
      "Side-by-side comparison",
      "Export options",
      "Unlimited saves"
    ]
  },
  {
    title: "Expert Guidance",
    price: "Free",
    note: "Application support",
    features: [
      "Essay tips",
      "Application timeline",
      "Expert Q&A",
      "Resource library"
    ]
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const shadowColor = resolvedTheme === "dark" ? "white" : "black";

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
    { number: "500+", label: "Universities", icon: Globe },
    { number: "1,200+", label: "Professors", icon: Users },
    { number: "50K+", label: "Data Points", icon: TrendingUp },
    { number: "24/7", label: "AI Support", icon: Sparkles }
  ];

  const searchPlaceholders = [
    "Search universities...",
    "Search programs...", 
    "Search professors..."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* University Logos Carousel */}
      <UniversityLogosCarousel />

      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-400/10 to-amber-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-red-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-300/10 to-orange-500/10 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-amber-400/10 to-orange-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-red-400/10 to-orange-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsIDAsIDAsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10 animate-pulse-soft z-0"></div>
      
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
              <LineShadowText className="text-balance text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl" shadowColor={shadowColor}>
                Discover Your
              </LineShadowText>
              <br />
              <div className="relative inline-block mt-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-100 via-amber-50 to-orange-100 rounded-3xl transform -skew-y-1 shadow-2xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-200/30 via-amber-100/30 to-orange-200/30 rounded-3xl transform skew-y-1 shadow-xl"></div>
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full shadow-lg animate-float"></div>
                  <div className="absolute -top-2 -right-6 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-lg animate-float" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute -bottom-3 left-8 w-5 h-5 bg-gradient-to-br from-orange-500 to-red-500 rounded-full shadow-lg animate-float" style={{ animationDelay: '2s' }}></div>
                  <div className="relative px-12 py-6">
                    <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 inline-block">
                      Academic Excellence
                    </span>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full"></div>
                  </div>
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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12">
              <Button
                onClick={() => navigate('/explore')}
                className="bg-white border-2 border-orange-300 text-gray-900 text-lg px-10 py-5 rounded-2xl hover:bg-orange-50 transition-all duration-300 group"
              >
                <Search className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                Discover Universities
              </Button>

              <Button
                onClick={() => navigate('/compare')}
                className="bg-white border-2 border-orange-300 text-gray-900 text-lg px-10 py-5 rounded-2xl hover:bg-orange-50 transition-all duration-300 group"
              >
                <TrendingUp className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                Compare Schools
              </Button>
            </div>

            {/* Stats Section */}
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
                  <ShinyButton className="w-full">
                    {stat.label}
                  </ShinyButton>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="max-w-4xl mx-auto text-center mt-16">
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

          {/* Features/Benefits Section (Neo-Brutalism Cards) */}
          <div className="max-w-7xl mx-auto mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent inline-block">
                Everything You Need for
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent inline-block">
                Academic Success
              </span>
            </h2>
            <p className="text-xl text-gray-700 text-center mb-16 max-w-3xl mx-auto">
              Discover the tools and insights that will transform your educational journey
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="card bg-gradient-to-br from-orange-200 via-orange-100 to-white border-2 border-orange-600 rounded-xl shadow-lg text-black w-[260px] min-h-[340px] flex flex-col justify-between"
                  style={{ boxShadow: '0.4rem 0.4rem #ffb300' }}
                >
                  <div className="pricing-block-content">
                    <p className="pricing-plan text-lg font-bold text-orange-900">{benefit.title}</p>
                    <div className="price-value text-2xl font-bold text-orange-700">
                      <span className="price-number">{benefit.price}</span>
                    </div>
                    <div className="pricing-note text-sm text-orange-600">{benefit.note}</div>
                    <ul className="check-list mt-2">
                      {benefit.features.map((feature, i) => (
                        <li className="check-list-item flex items-center gap-2" key={i}>
                          <svg
                            version="1.0"
                            preserveAspectRatio="xMidYMid meet"
                            height="16"
                            viewBox="0 0 30 30.000001"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ color: '#ff9100' }}
                          >
                            <g>
                              <path
                                fill="#ff9100"
                                d="M 27.5 7.53125 L 24.464844 4.542969 C 24.15625 4.238281 23.65625 4.238281 23.347656 4.542969 L 11.035156 16.667969 L 6.824219 12.523438 C 6.527344 12.230469 6 12.230469 5.703125 12.523438 L 2.640625 15.539062 C 2.332031 15.84375 2.332031 16.335938 2.640625 16.640625 L 10.445312 24.324219 C 10.59375 24.472656 10.796875 24.554688 11.007812 24.554688 C 11.214844 24.554688 11.417969 24.472656 11.566406 24.324219 L 27.5 8.632812 C 27.648438 8.488281 27.734375 8.289062 27.734375 8.082031 C 27.734375 7.875 27.648438 7.679688 27.5 7.53125 Z M 27.5 7.53125"
                              ></path>
                            </g>
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* University Icons Section */}
      <section className="py-20 bg-background/50">
        {/* ... existing university icons section code ... */}
      </section>

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
