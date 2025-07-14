import React, { useState, useEffect } from 'react';
import { Search, GraduationCap, Users, TrendingUp, Sparkles, BookOpen, Target, Star, Globe, Crown, Award, BarChart, Bookmark, Quote, CheckCircle, Menu, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useNavigate } from 'react-router-dom';
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder';
import UniversityLogosCarousel from '@/components/UniversityLogosCarousel';
import AppSidebar from '@/components/AppSidebar';
import { ShinyButton } from "@/components/ui/shiny-button";
import { useTheme } from "next-themes";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import TagCarousel from '@/components/TagCarousel';
import SplashCursor from '@/components/SplashCursor';
import Carousel from '@/components/Carousel';
import Dither from '@/components/Dither';

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
    ],
    icon: Search,
    gradient: "from-blue-500 to-purple-600",
    stats: "95% accuracy"
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
    ],
    icon: BarChart,
    gradient: "from-green-500 to-teal-600",
    stats: "50K+ data points"
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
    ],
    icon: Bookmark,
    gradient: "from-orange-500 to-red-600",
    stats: "Unlimited saves"
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
    ],
    icon: Award,
    gradient: "from-purple-500 to-pink-600",
    stats: "24/7 AI support"
  }
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Harvard '26",
    avatar: "SC",
    content: "CollegeAI helped me find the perfect fit. The AI recommendations were spot-on!",
    rating: 5,
    school: "Harvard University"
  },
  {
    name: "Marcus Rodriguez",
    role: "Stanford '25",
    avatar: "MR",
    content: "The professor search feature connected me with my future research advisor.",
    rating: 5,
    school: "Stanford University"
  },
  {
    name: "Priya Patel",
    role: "MIT '27",
    avatar: "PP",
    content: "Saved me hours of research. The comparison tools are incredible!",
    rating: 5,
    school: "MIT"
  }
];

const quickActions = [
  {
    title: "Explore Universities",
    description: "Browse 500+ universities",
    icon: Globe,
    gradient: "from-blue-500 to-cyan-500",
    link: "/explore",
    stats: "500+ schools"
  },
  {
    title: "Find Professors",
    description: "Connect with researchers",
    icon: Users,
    gradient: "from-green-500 to-emerald-500",
    link: "/professors",
    stats: "1,200+ professors"
  },
  {
    title: "Mock Application",
    description: "Practice your application",
    icon: BookOpen,
    gradient: "from-purple-500 to-violet-500",
    link: "/mock-application",
    stats: "AI evaluation"
  },
  {
    title: "Compare Schools",
    description: "Side-by-side analysis",
    icon: BarChart,
    gradient: "from-orange-500 to-red-500",
    link: "/compare",
    stats: "Unlimited comparisons"
  }
];

const applicationHelpItems = [
  {
    title: "Essay Guidance",
    price: "FREE",
    note: "Craft standout essays",
    features: [
      "Personalized prompts",
      "Sample essays",
      "Editing tips",
      "AI feedback"
    ],
  },
  {
    title: "Timeline Planner",
    price: "FREE",
    note: "Stay on track",
    features: [
      "Custom deadlines",
      "Reminders",
      "Progress tracking",
      "Export to calendar"
    ],
  },
  {
    title: "Interview Prep",
    price: "FREE",
    note: "Ace your interviews",
    features: [
      "Common questions",
      "Mock interviews",
      "Feedback",
      "Tips & tricks"
    ],
  },
  {
    title: "Document Center",
    price: "FREE",
    note: "Organize your files",
    features: [
      "Upload resumes",
      "Store transcripts",
      "Portfolio support",
      "Secure storage"
    ],
  },
];

const dataAnalyticsItems = [
  {
    title: "Acceptance Stats",
    price: "FREE",
    note: "Know your odds",
    features: [
      "Historical rates",
      "Trends by year",
      "Compare schools",
      "Visual charts"
    ],
  },
  {
    title: "Cost Breakdown",
    price: "FREE",
    note: "Plan your finances",
    features: [
      "Tuition & fees",
      "Scholarship data",
      "Net price calc",
      "Aid estimator"
    ],
  },
  {
    title: "Student Outcomes",
    price: "FREE",
    note: "See the results",
    features: [
      "Graduation rates",
      "Employment stats",
      "Alumni earnings",
      "Satisfaction scores"
    ],
  },
  {
    title: "Campus Life Data",
    price: "FREE",
    note: "Beyond academics",
    features: [
      "Clubs & orgs",
      "Housing info",
      "Diversity stats",
      "Safety reports"
    ],
  },
];

const benefitIcons = [
  <span role="img" aria-label="Magnifying Glass">🔍</span>,
  <span role="img" aria-label="Book">📖</span>,
  <span role="img" aria-label="Floppy Disk">💾</span>,
  <span role="img" aria-label="Lightbulb">💡</span>,
];

const appHelpIcons = [
  <span role="img" aria-label="Pencil">✏️</span>,
  <span role="img" aria-label="Calendar">📅</span>,
  <span role="img" aria-label="Microphone">🎤</span>,
  <span role="img" aria-label="File Folder">🗂️</span>,
];

const analyticsIcons = [
  <span role="img" aria-label="Chart">📊</span>,
  <span role="img" aria-label="Money Bag">💰</span>,
  <span role="img" aria-label="Briefcase">💼</span>,
  <span role="img" aria-label="House">🏠</span>,
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [hoveredAction, setHoveredAction] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const shadowColor = resolvedTheme === "dark" ? "white" : "black";

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
      setShowMobileSearch(false);
    }
  };

  const features = [
    {
      icon: BookOpen,
      title: "University Discovery",
      description: "Explore thousands of universities with comprehensive data and real-time insights.",
      gradient: "from-orange-600 to-red-600",
      stats: "500+ universities"
    },
    {
      icon: Users,
      title: "Professor Networks", 
      description: "Connect with leading researchers and academics in your field of interest.",
      gradient: "from-orange-500 to-amber-600",
      stats: "1,200+ professors"
    },
    {
      icon: Target,
      title: "Smart Matching",
      description: "AI-powered recommendations based on your academic goals and preferences.",
      gradient: "from-orange-600 to-orange-500",
      stats: "95% accuracy"
    },
    {
      icon: TrendingUp,
      title: "Data Analytics",
      description: "Make informed decisions with detailed statistics and comparison tools.",
      gradient: "from-amber-600 to-yellow-600",
      stats: "50K+ data points"
    }
  ];

  const stats = [
    { number: "500+", label: "Universities", icon: Globe, description: "Comprehensive database" },
    { number: "1,200+", label: "Professors", icon: Users, description: "Leading researchers" },
    { number: "50K+", label: "Data Points", icon: TrendingUp, description: "Real-time insights" },
    { number: "24/7", label: "AI Support", icon: Sparkles, description: "Always available" }
  ];

  const searchPlaceholders = [
    "Search universities...",
    "Find professors...",
    "Compare colleges...",
    "Explore programs..."
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-x-hidden">
        {/* Add SplashCursor component */}
        <SplashCursor />
        
        <div className="flex min-h-screen w-full">
          <main className="flex-1">
            {/* Hero Section with Dither Background */}
            <section className="relative px-4 sm:px-6 lg:px-8 pt-8 lg:pt-20 pb-16 lg:pb-32 overflow-hidden">
              {/* Dither Background */}
              <div className="absolute inset-0 w-full h-full">
                <Dither 
                  waveSpeed={0.02}
                  waveFrequency={2}
                  waveAmplitude={0.4}
                  waveColor={[0.2, 0.3, 0.6]}
                  colorNum={6}
                  pixelSize={3}
                  disableAnimation={false}
                  enableMouseInteraction={true}
                  mouseRadius={0.8}
                />
              </div>
              
              {/* Content overlay */}
              <div className="relative z-10 max-w-7xl mx-auto">
                {/* Main Content */}
                <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
                  <div className="lg:w-1/2 lg:pr-12">
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                        <span className="relative inline-block">
                          <span className="gradient-text">Discover Your</span>
                          <span className="absolute left-0 bottom-0 w-full h-2 pointer-events-none">
                            <svg width="100%" height="8" viewBox="0 0 100 8" preserveAspectRatio="none" className="w-full h-2">
                              <rect x="0" y="4" width="100" height="4" fill="url(#whiteHighlight)" rx="2">
                                <animate attributeName="width" from="0" to="100" dur="1s" fill="freeze" />
                              </rect>
                              <defs>
                                <linearGradient id="whiteHighlight" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                                  <stop stopColor="#fff" />
                                  <stop offset="1" stopColor="#fff" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </span>
                        </span>
                        <br />
                        <span className="relative inline-block">
                          <span className="gradient-text">Perfect College</span>
                          <span className="absolute left-0 bottom-0 w-full h-2 pointer-events-none">
                            <svg width="100%" height="8" viewBox="0 0 100 8" preserveAspectRatio="none" className="w-full h-2">
                              <rect x="0" y="4" width="100" height="4" fill="url(#whiteHighlight2)" rx="2">
                                <animate attributeName="width" from="0" to="100" dur="1s" fill="freeze" />
                              </rect>
                              <defs>
                                <linearGradient id="whiteHighlight2" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                                  <stop stopColor="#fff" />
                                  <stop offset="1" stopColor="#fff" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </span>
                        </span>
                      </h1>
                      
                      <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                        AI-powered college discovery platform helping students find their ideal academic path with comprehensive data, expert insights, and personalized recommendations.
                      </p>

                      {/* Desktop Search */}
                      <div className="hidden lg:block mb-8">
                        <div className="relative max-w-2xl">
                          <AnimatedPlaceholder 
                            placeholders={searchPlaceholders}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg pointer-events-none"
                          />
                          <Input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-0 bg-white/80 backdrop-blur-sm focus:bg-white shadow-lg transition-all duration-300"
                          />
                          <Button
                            onClick={handleSearch}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 college-gradient text-white px-6 py-2 rounded-xl hover:scale-105 transition-transform duration-200"
                          >
                            <Search className="mr-2 h-5 w-5" />
                            Search
                          </Button>
                        </div>
                      </div>

                      {/* Mobile Search */}
                      <div className="lg:hidden mb-8">
                        <div className="relative">
                          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <Input
                            type="text"
                            placeholder="Search universities, professors, or programs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className="w-full pl-12 pr-4 py-3 text-base rounded-xl border-0 bg-white/80 backdrop-blur-sm focus:bg-white shadow-lg transition-all duration-300"
                          />
                          <Button
                            onClick={handleSearch}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 college-gradient text-white px-4 py-1.5 rounded-lg hover:scale-105 transition-transform duration-200"
                          >
                            <Search className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Animated Tag Carousel */}
                      <div className="mt-8">
                        <TagCarousel />
                      </div>

                      {/* Quick Actions */}
                      <ul className="list-disc list-inside text-left text-lg text-gray-700 mb-8 ml-4">
                        <li className="flex items-center gap-3 text-white text-lg font-medium">
                          Explore and compare hundreds of universities with real data and insights
                        </li>
                        <li className="flex items-center gap-3 text-white text-lg font-medium">
                          Connect with professors and discover your best-fit academic path
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Visual Elements */}
                  <div className="lg:w-1/2 lg:pl-12 mt-12 lg:mt-0">
                    <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                      <div className="relative">
                        {/* Main Card */}
                        <Card className="glass-card p-6 lg:p-8 shadow-2xl">
                          <CardContent className="p-0">
                            <div className="text-center mb-6">
                              <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-4">
                                <Sparkles className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
                              </div>
                              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                                AI-Powered Recommendations
                              </h3>
                              <p className="text-gray-600 text-sm lg:text-base">
                                Get personalized college matches based on your academic profile and preferences
                              </p>
                            </div>
                            
                            <div className="space-y-4">
                              {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm">
                                  <div className={`p-2 rounded-lg bg-gradient-to-br ${feature.gradient}`}>
                                    <feature.icon className="h-5 w-5 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 text-sm lg:text-base">{feature.title}</h4>
                                    <p className="text-gray-600 text-xs lg:text-sm">{feature.description}</p>
                                  </div>
                                  <Badge variant="secondary" className="text-xs">
                                    {feature.stats}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Floating Elements */}
                        <div className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6">
                          <Card className="glass-card p-3 lg:p-4 shadow-lg">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              <span className="text-xs lg:text-sm font-medium text-gray-700">Live Data</span>
                            </div>
                          </Card>
                        </div>
                        
                        <div className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6">
                          <Card className="glass-card p-3 lg:p-4 shadow-lg">
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-xs lg:text-sm font-medium text-gray-700">4.9/5 Rating</span>
                            </div>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* University Logos */}
            <section className="px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 lg:mb-12">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    Trusted by Top Universities
                  </h2>
                  <p className="text-gray-600 text-sm lg:text-base">
                    Comprehensive data from leading institutions worldwide
                  </p>
                </div>
                <UniversityLogosCarousel />
              </div>
            </section>

            {/* Stats Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-8 lg:py-16 bg-black">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className={`text-center transition-all duration-1000 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-black border-2 border-white rounded-2xl mb-4">
                        <stat.icon className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                      </div>
                      <div className="text-2xl lg:text-3xl font-bold text-white mb-2">{stat.number}</div>
                      <div className="text-sm lg:text-base font-medium text-white mb-1">{stat.label}</div>
                      <div className="text-xs lg:text-sm text-white/70">{stat.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 lg:mb-16">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 relative inline-block">
                    <span className="relative z-10">Everything You Need to Succeed</span>
                    <span className="absolute left-0 bottom-0 w-full h-2 pointer-events-none">
                      <svg width="100%" height="8" viewBox="0 0 100 8" preserveAspectRatio="none" className="w-full h-2">
                        <rect x="0" y="4" width="100" height="4" fill="url(#whiteHighlightSection)" rx="2">
                          <animate attributeName="width" from="0" to="100" dur="1s" fill="freeze" />
                        </rect>
                        <defs>
                          <linearGradient id="whiteHighlightSection" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#fff" />
                            <stop offset="1" stopColor="#fff" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </span>
                  </h2>
                  <p className="text-gray-600 text-lg lg:text-xl max-w-3xl mx-auto">
                    Comprehensive tools and insights to guide your college journey from discovery to decision
                  </p>
                </div>
                <div className="flex flex-col md:flex-row justify-center gap-8 w-full my-12">
                  <Carousel baseWidth={340} icons={benefitIcons} />
                  <Carousel baseWidth={340} items={applicationHelpItems} icons={appHelpIcons} />
                  <Carousel baseWidth={340} items={dataAnalyticsItems} icons={analyticsIcons} />
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
