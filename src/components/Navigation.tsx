import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, Search, Users, BarChart3, BookmarkCheck, Menu, X, Crown, Award, FileText, Bell, User, Settings, LogOut, Sparkles, TrendingUp, BookOpen, Target, ChevronDown, Sun, Moon, Monitor, ClipboardList, Camera, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTheme } from 'next-themes';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New college data available', read: false },
    { id: 2, message: 'Your saved search has new results', read: false },
  ]);

  const navItems = [
    { path: '/', label: 'Home', icon: GraduationCap, description: 'Discover your academic path' },
    { path: '/explore', label: 'Explore', icon: Search, description: 'Find universities' },
    { path: '/professors', label: 'Professors', icon: Users, description: 'Connect with researchers' },
    { path: '/compare', label: 'Compare', icon: BarChart3, description: 'Compare schools' },
    { path: '/applications', label: 'Applications', icon: ClipboardList, description: 'Track your applications' },
    { path: '/saved', label: 'Saved', icon: BookmarkCheck, description: 'Your saved schools' },
    { path: '/mock-application', label: 'Mock App', icon: FileText, description: 'Practice applications' },
    { path: '/recommendations', label: 'Recommended', icon: Sparkles, description: 'Personalized college matches' },
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
      <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-orange-200/50 dark:border-orange-800/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative p-1 group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-amber-500 to-orange-700 rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-orange-600 via-amber-500 to-orange-700 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <div className="relative">
                    <Crown className="h-4 w-4 text-white absolute -top-0.5 left-1/2 transform -translate-x-1/2 z-10" />
                    <GraduationCap className="h-6 w-6 text-white mt-1" />
                    <div className="absolute -bottom-0.5 -right-0.5">
                      <Award className="h-3 w-3 text-amber-200" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-left">
                <span className="block text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  CollegeAI
                </span>
                <span className="block text-xs font-medium text-orange-600/80 tracking-wide uppercase">
                  Excellence
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path);
                
                return (
                  <Tooltip key={item.path}>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        className={`
                          relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 group
                          ${isActive 
                            ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 shadow-sm' 
                            : 'text-slate-600 dark:text-slate-300 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20'
                          }
                        `}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                        
                        {/* Animated underline */}
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
                        
                        {/* Active state underline */}
                        {isActive && (
                          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
                        )}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.description}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2"
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
            <div className="py-4 border-t border-orange-200/50 dark:border-orange-800/50">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search colleges, programs, or professors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10 pr-4"
                  />
                </div>
                <Button onClick={handleSearch} className="bg-orange-600 hover:bg-orange-700">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              
              {/* Quick Actions */}
              <div className="mt-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Quick Actions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action.query)}
                      className="text-xs"
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
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-orange-200/50 dark:border-orange-800/50 shadow-lg">
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
                        relative flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                        ${isActive 
                          ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 shadow-sm' 
                          : 'text-slate-600 dark:text-slate-300 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20'
                        }
                      `}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                      
                      {/* Animated underline for mobile */}
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
                      
                      {/* Active state underline for mobile */}
                      {isActive && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
                      )}
                    </Link>
                  );
                })}
                
                {/* Mobile Search */}
                <div className="pt-4 border-t border-orange-200/50 dark:border-orange-800/50">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="flex-1"
                    />
                    <Button onClick={handleSearch} size="sm">
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
