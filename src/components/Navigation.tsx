import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, Search, Users, BarChart3, BookmarkCheck, Menu, X, Crown, Award, FileText, Bell, User, Settings, LogOut, Sparkles, TrendingUp, BookOpen, Target, ChevronDown, Sun, Moon, Monitor, ClipboardList, Camera, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New college data available', read: false },
    { id: 2, message: 'Your saved search has new results', read: false },
  ]);

  const navItems = [
    { path: '/', label: 'Home', icon: GraduationCap, description: 'Discover your academic path' },
    { path: '/explore', label: 'Explore', icon: Search, description: 'Find universities' },
    { path: '/features', label: 'Features', icon: Sparkles, description: 'Platform features',
      dropdown: [
        { path: '/professors', label: 'Professors', description: 'Connect with researchers' },
        { path: '/compare', label: 'Compare', description: 'Compare schools' },
        { path: '/applications', label: 'Applications', description: 'Track your applications' },
        { path: '/saved', label: 'Saved', description: 'Your saved schools' },
        { path: '/mock-application', label: 'Mock App', description: 'Practice applications' },
        { path: '/recommendations', label: 'Recommended', description: 'Personalized college matches' },
      ]
    },
    { path: '/about', label: 'About', icon: Award, description: 'About the platform' },
  ];

  const quickActions = [
    { label: 'Find Engineering Schools', query: 'engineering', icon: TrendingUp },
    { label: 'Top Business Programs', query: 'business', icon: Target },
    { label: 'Liberal Arts Colleges', query: 'liberal arts', icon: BookOpen },
  ];

  const isActivePath = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  const handleQuickAction = (query: string) => {
    navigate(`/explore?q=${encodeURIComponent(query)}`);
    setShowSearch(false);
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <TooltipProvider>
      <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/20 shadow-sm" data-navbar>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative p-1 group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/20 rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-500 border border-white/20">
                  <div className="relative">
                    <Crown className="h-4 w-4 text-white absolute -top-0.5 left-1/2 transform -translate-x-1/2 z-10" />
                    <GraduationCap className="h-6 w-6 text-white mt-1" />
                    <div className="absolute -bottom-0.5 -right-0.5">
                      <Award className="h-3 w-3 text-white/80" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-left">
                <span className="block text-xl font-thin bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  CollegeAI
                </span>
                <span className="block text-xs font-light text-white/60 tracking-wide uppercase">
                  Excellence
                </span>
              </div>
            </Link>

            {/* Desktop Navigation with Collapsible */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path);
                const [showDropdown, setShowDropdown] = React.useState(false);
                const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
                return (
                  <div
                    key={item.path}
                    className="relative group"
                    onMouseEnter={() => {
                      if (item.dropdown) {
                        hoverTimeout.current = setTimeout(() => setShowDropdown(true), 350);
                      }
                    }}
                    onMouseLeave={() => {
                      if (item.dropdown) {
                        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                        setShowDropdown(false);
                      }
                    }}
                  >
                    <Link
                      to={item.path}
                      className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl text-base font-light transition-all duration-200 group
                        ${isActive ? 'bg-white/10 text-white shadow-sm' : 'text-white/80 hover:text-white hover:bg-white/5'}`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                      {/* Animated underline */}
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white to-white/80 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
                      {/* Active state underline */}
                      {isActive && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white to-white/80 rounded-full"></div>
                      )}
                    </Link>
                    {/* Dropdown for features */}
                    {item.dropdown && showDropdown && (
                      <div className="absolute left-0 top-full mt-2 w-56 bg-black/95 border border-white/20 rounded-xl shadow-lg z-50 p-2 animate-fade-in">
                        {item.dropdown.map((feature) => (
                          <Link
                            key={feature.path}
                            to={feature.path}
                            className="block px-4 py-2 text-white/80 hover:bg-white/10 rounded-lg transition-colors duration-200"
                          >
                            <div className="font-medium">{feature.label}</div>
                            <div className="text-xs text-white/50">{feature.description}</div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white hover:bg-white/10"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <div className="py-4 border-t border-white/20">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                  <Input
                    placeholder="Search colleges, programs, or professors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10 pr-4 bg-white/10 border-white/20 text-white placeholder-white/40"
                  />
                </div>
                <Button onClick={handleSearch} className="bg-white text-black hover:bg-white/90">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              
              {/* Quick Actions */}
              <div className="mt-3">
                <p className="text-sm text-white/60 mb-2">Quick Actions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action.query)}
                      className="text-xs border-white/20 text-white hover:bg-white/10"
                    >
                      <action.icon className="h-3 w-3 mr-1" />
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/20 shadow-lg">
              <div className="px-4 py-2 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActivePath(item.path);
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`
                        relative flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-light transition-all duration-200 group
                        ${isActive 
                          ? 'bg-white/10 text-white shadow-sm' 
                          : 'text-white/80 hover:text-white hover:bg-white/5'
                        }
                      `}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                      
                      {/* Animated underline for mobile */}
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white to-white/80 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
                      
                      {/* Active state underline for mobile */}
                      {isActive && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white to-white/80 rounded-full"></div>
                      )}
                    </Link>
                  );
                })}
                
                {/* Mobile Search */}
                <div className="pt-4 border-t border-white/20">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/40"
                    />
                    <Button onClick={handleSearch} size="sm" className="bg-white text-black hover:bg-white/90">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </TooltipProvider>
  );
};

export default Navigation;
