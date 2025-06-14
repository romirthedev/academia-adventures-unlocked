
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background transition-colors duration-300">
        {/* McLaren Animated Background */}
        <div className="absolute inset-0 animated-grid opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mclaren-papaya/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-mclaren-papaya/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-mclaren-papaya/8 rounded-full blur-3xl animate-pulse-soft"></div>
        </div>

        {/* Loading Content */}
        <div className="relative z-10 text-center">
          {/* Enhanced Logo Animation with McLaren styling */}
          <div className="flex items-center justify-center mb-8 animate-scale-bounce">
            <div className="relative p-2 group">
              <div className="absolute inset-0 gradient-bg rounded-2xl blur-sm opacity-70 animate-pulse-scale"></div>
              <div className="relative gradient-bg rounded-2xl p-4 shadow-2xl animate-wave">
                <div className="relative">
                  <Crown className="h-8 w-8 text-white absolute -top-1 left-1/2 transform -translate-x-1/2 z-10 animate-bounce" />
                  <GraduationCap className="h-12 w-12 text-white mt-2 animate-pulse" />
                  <div className="absolute -bottom-1 -right-1">
                    <Sparkles className="h-4 w-4 text-white animate-spin" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gradient mb-2 animate-text-shimmer">
              Loading Excellence
            </h2>
            <p className="text-muted-foreground animate-fade-in">
              Preparing your academic journey...
            </p>
          </div>

          {/* Enhanced Loading Animation with McLaren colors */}
          <div className="flex justify-center items-center space-x-2 mb-8">
            {[0, 0.1, 0.2, 0.3, 0.4].map((delay, index) => (
              <div 
                key={index}
                className="w-3 h-3 gradient-bg rounded-full animate-bounce" 
                style={{ animationDelay: `${delay}s` }}
              ></div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-64 h-1 bg-muted rounded-full overflow-hidden mx-auto">
            <div className="h-full gradient-bg rounded-full animate-gradient-x"></div>
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
