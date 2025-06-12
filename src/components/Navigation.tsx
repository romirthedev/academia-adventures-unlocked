
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Search, Users, BarChart3, BookmarkCheck, Menu, X, Crown, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: GraduationCap },
    { path: '/explore', label: 'Explore', icon: Search },
    { path: '/professors', label: 'Professors', icon: Users },
    { path: '/compare', label: 'Compare', icon: BarChart3 },
    { path: '/saved', label: 'Saved', icon: BookmarkCheck },
  ];

  const isActivePath = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-orange-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Updated Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative p-1 group">
              {/* Elegant logo with crown and academic elements */}
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
                ScAI
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
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-orange-50 text-orange-600 shadow-sm' 
                      : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
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

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-orange-200/50 shadow-lg">
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
                      flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                      ${isActive 
                        ? 'bg-orange-50 text-orange-600 shadow-sm' 
                        : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50'
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
