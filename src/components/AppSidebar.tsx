
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { GraduationCap, Search, Users, BarChart3, BookmarkCheck, Crown, Award } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
} from '@/components/ui/sidebar';

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

  const isActivePath = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className="border-r border-orange-200/50">
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative p-1 group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-amber-500 to-orange-700 rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-gradient-to-br from-orange-600 via-amber-500 to-orange-700 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-500">
              <div className="relative">
                <Crown className="h-3 w-3 text-white absolute -top-0.5 left-1/2 transform -translate-x-1/2 z-10" />
                <GraduationCap className="h-5 w-5 text-white mt-1" />
                <div className="absolute -bottom-0.5 -right-0.5">
                  <Award className="h-2 w-2 text-amber-200" />
                </div>
              </div>
            </div>
          </div>
          <div className="text-left">
            <span className="block text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              ScAI
            </span>
            <span className="block text-xs font-medium text-orange-600/80 tracking-wide uppercase">
              Excellence
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = isActivePath(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`
                        ${isActive 
                          ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-600' 
                          : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50'
                        }
                      `}
                    >
                      <Link to={item.url} className="flex items-center space-x-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
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
