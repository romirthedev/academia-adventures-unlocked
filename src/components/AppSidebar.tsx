
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Search, Users, BarChart3, ClipboardList, BookmarkCheck, FileText, Sparkles, Crown, Award } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

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

const AppSidebar = () => {
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const isActivePath = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className="border-r border-white/20 bg-black/95 backdrop-blur-md">
      <SidebarContent>
        {/* Logo */}
        <div className="p-4 border-b border-white/20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative p-1">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/20 rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-500 border border-white/20">
                <div className="relative">
                  <Crown className="h-3 w-3 text-white absolute -top-0.5 left-1/2 transform -translate-x-1/2 z-10" />
                  <GraduationCap className="h-5 w-5 text-white mt-1" />
                  <div className="absolute -bottom-0.5 -right-0.5">
                    <Award className="h-2 w-2 text-white/80" />
                  </div>
                </div>
              </div>
            </div>
            {!isCollapsed && (
              <div className="text-left">
                <span className="block text-lg font-thin bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  CollegeAI
                </span>
                <span className="block text-xs font-light text-white/60 tracking-wide uppercase">
                  Excellence
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/60 font-light">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path);
                
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`
                        text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200
                        ${isActive ? 'bg-white/10 text-white shadow-sm border-l-2 border-white' : ''}
                      `}
                    >
                      <Link to={item.path} className="flex items-center space-x-3">
                        <Icon className="h-4 w-4" />
                        {!isCollapsed && <span className="font-light">{item.label}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
