
import React, { useState } from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Bot, 
  CheckSquare, 
  Calendar, 
  Trophy, 
  Users, 
  Settings,
  ChevronRight,
  Zap,
  Clock,
  Target
} from 'lucide-react';

interface SidebarItemProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  id: string;
  isActive?: boolean;
  badge?: string | number;
  notification?: boolean;
  subItems?: Array<{ title: string; count?: number }>;
}

const navigationItems: SidebarItemProps[] = [
  {
    title: "ESG Command Center",
    icon: LayoutDashboard,
    id: "dashboard",
    isActive: true,
    subItems: [
      { title: "Risk Pulse", count: 3 },
      { title: "AI Insights" },
      { title: "Active Agents", count: 2 }
    ]
  },
  {
    title: "Agent Gallery",
    icon: Bot,
    id: "agents",
    badge: "5 New",
    subItems: [
      { title: "SFDR Agents", count: 4 },
      { title: "CSRD Agents", count: 2 },
      { title: "Taxonomy", count: 3 }
    ]
  },
  {
    title: "Smart Tasks",
    icon: CheckSquare,
    id: "tasks",
    notification: true,
    badge: 7,
    subItems: [
      { title: "High Priority", count: 2 },
      { title: "In Review", count: 3 },
      { title: "AI-Drafted", count: 2 }
    ]
  },
  {
    title: "Regulatory Calendar",
    icon: Calendar,
    id: "calendar",
    badge: "Today",
    subItems: [
      { title: "SFDR Deadlines", count: 1 },
      { title: "CSRD Updates", count: 2 }
    ]
  },
  {
    title: "Achievement Hub",
    icon: Trophy,
    id: "badges",
    subItems: [
      { title: "Progress", count: 85 },
      { title: "Streaks" }
    ]
  },
  {
    title: "Collaboration",
    icon: Users,
    id: "team",
    notification: true,
    subItems: [
      { title: "Live Activity" },
      { title: "Shared Vault", count: 12 },
      { title: "Approvals", count: 3 }
    ]
  }
];

const quickActions = [
  { icon: Zap, label: "Horizon Scan", shortcut: "⌘H" },
  { icon: Target, label: "SFDR Task", shortcut: "⌘S" },
  { icon: Clock, label: "Risk Check", shortcut: "⌘R" }
];

export const AdvancedWebAppSidebar: React.FC = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>("dashboard");

  const handleItemClick = (itemId: string) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  return (
    <Sidebar className="border-r border-gray-200 bg-white shadow-sm">
      <SidebarHeader className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Synapses</h2>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs px-2 py-0 bg-green-50 text-green-700 border-green-200">
                ESG Pro
              </Badge>
            </div>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2 py-4">
        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Quick Actions
          </SidebarGroupLabel>
          <div className="px-3 mb-4">
            <div className="grid grid-cols-3 gap-1">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-full p-1 flex flex-col items-center justify-center text-xs hover:bg-blue-50 hover:text-blue-700"
                  title={`${action.label} (${action.shortcut})`}
                >
                  <action.icon className="h-3 w-3 mb-1" />
                  <span className="truncate">{action.label.split(' ')[0]}</span>
                </Button>
              ))}
            </div>
          </div>
        </SidebarGroup>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    isActive={item.isActive}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full justify-start px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                      item.isActive 
                        ? 'bg-blue-50 text-blue-700 font-medium shadow-sm' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <item.icon className={`w-5 h-5 mr-3 ${
                          item.isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                        }`} />
                        <span className="text-sm font-medium">{item.title}</span>
                        {item.notification && (
                          <div className="w-2 h-2 bg-red-500 rounded-full ml-2"></div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <Badge 
                            variant={item.isActive ? "default" : "secondary"}
                            className={`text-xs px-2 py-0 ${
                              item.isActive 
                                ? 'bg-blue-100 text-blue-700 border-blue-200' 
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {item.badge}
                          </Badge>
                        )}
                        {item.subItems && (
                          <ChevronRight className={`w-4 h-4 transition-transform ${
                            expandedItem === item.id ? 'rotate-90' : ''
                          } ${item.isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                        )}
                      </div>
                    </div>
                  </SidebarMenuButton>

                  {/* Sub-items */}
                  {item.subItems && expandedItem === item.id && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.subItems.map((subItem, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start h-8 px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                        >
                          <span className="truncate">{subItem.title}</span>
                          {subItem.count !== undefined && (
                            <Badge variant="outline" className="ml-auto text-xs px-1.5 py-0 bg-gray-50">
                              {subItem.count}
                            </Badge>
                          )}
                        </Button>
                      ))}
                    </div>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account Section */}
        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                  <Settings className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-sm">Settings & Preferences</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Alex" />
            <AvatarFallback className="bg-blue-100 text-blue-700 text-sm font-medium">
              AC
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 truncate">Alex Chen</p>
            <p className="text-xs text-gray-500 truncate">ESG Officer • EU Focus</p>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-500">Online</span>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
