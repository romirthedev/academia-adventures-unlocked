
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, GraduationCap, Crown } from 'lucide-react';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location !== displayLocation) {
      setIsLoading(true);
    }
  }, [location, displayLocation]);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading, location]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white via-orange-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-red-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-300/15 to-orange-500/15 rounded-full blur-3xl animate-pulse-soft"></div>
        </div>

        {/* Loading Content */}
        <div className="relative z-10 text-center">
          {/* Enhanced Logo Animation */}
          <div className="flex items-center justify-center mb-8 animate-scale-bounce">
            <div className="relative p-2 group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-amber-500 to-orange-700 rounded-2xl blur-sm opacity-70 animate-pulse-scale"></div>
              <div className="relative bg-gradient-to-br from-orange-600 via-amber-500 to-orange-700 rounded-2xl p-4 shadow-2xl animate-wave">
                <div className="relative">
                  <Crown className="h-8 w-8 text-white absolute -top-1 left-1/2 transform -translate-x-1/2 z-10 animate-bounce" />
                  <GraduationCap className="h-12 w-12 text-white mt-2 animate-pulse" />
                  <div className="absolute -bottom-1 -right-1">
                    <Sparkles className="h-4 w-4 text-amber-200 animate-spin" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2 animate-text-shimmer">
              Loading Excellence
            </h2>
            <p className="text-gray-600 dark:text-gray-400 animate-fade-in">
              Preparing your academic journey...
            </p>
          </div>

          {/* Enhanced Loading Animation */}
          <div className="flex justify-center items-center space-x-2 mb-8">
            <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>

          {/* Progress Bar */}
          <div className="w-64 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full animate-gradient-x"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {React.cloneElement(children as React.ReactElement, { key: displayLocation.pathname })}
    </div>
  );
};

export default PageTransition;
