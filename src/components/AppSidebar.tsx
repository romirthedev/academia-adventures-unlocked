
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { GraduationCap, Search, Users, BarChart3, BookmarkCheck, Crown, Award, PanelLeft } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const menuItems = [
  {
    title: 'Explore Colleges',
    url: '/explore',
    icon: Search,
  },
  {
    title: 'Find Professors',
    url: '/professors',
    icon: Users,
  },
  {
    title: 'Compare Schools',
    url: '/compare',
    icon: BarChart3,
  },
  {
    title: 'Saved Schools',
    url: '/saved',
    icon: BookmarkCheck,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { state, isMobile } = useSidebar();

  const isActivePath = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className="border-r border-orange-200/50 transition-all duration-300 ease-in-out">
      <SidebarHeader className="p-4 transition-all duration-300 ease-in-out">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group transition-all duration-300 ease-in-out">
            <div className="relative p-1 group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-amber-500 to-orange-700 rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition-all duration-500 ease-in-out"></div>
              <div className="relative bg-gradient-to-br from-orange-600 via-amber-500 to-orange-700 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-all duration-500 ease-in-out">
                <div className="relative">
                  <Crown className="h-3 w-3 text-white absolute -top-0.5 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-300" />
                  <GraduationCap className="h-5 w-5 text-white mt-1 transition-all duration-300" />
                  <div className="absolute -bottom-0.5 -right-0.5">
                    <Award className="h-2 w-2 text-amber-200 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </div>
            <div className={`text-left transition-all duration-300 ease-in-out ${state === 'collapsed' && !isMobile ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
              <span className="block text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                ScAI
              </span>
              <span className="block text-xs font-medium text-orange-600/80 tracking-wide uppercase">
                Excellence
              </span>
            </div>
          </Link>
          {!isMobile && (
            <SidebarTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 hover:bg-orange-50 transition-all duration-200"
              >
                <PanelLeft className="h-4 w-4 text-orange-600" />
              </Button>
            </SidebarTrigger>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="transition-all duration-300 ease-in-out">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => {
                const isActive = isActivePath(item.url);
                return (
                  <SidebarMenuItem key={item.title} className="transition-all duration-300 ease-in-out" style={{ animationDelay: `${index * 50}ms` }}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`
                        transition-all duration-300 ease-in-out transform hover:scale-105
                        ${isActive 
                          ? 'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-600 border-r-4 border-orange-600 shadow-sm' 
                          : 'text-slate-600 hover:text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100'
                        }
                      `}
                    >
                      <Link to={item.url} className="flex items-center space-x-3 w-full">
                        <item.icon className="h-4 w-4 transition-all duration-300 ease-in-out" />
                        <span className={`transition-all duration-300 ease-in-out ${state === 'collapsed' && !isMobile ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                          {item.title}
                        </span>
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
}
