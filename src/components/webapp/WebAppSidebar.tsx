
import React from 'react';
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
import { 
  LayoutDashboard, 
  Bot, 
  CheckSquare, 
  Calendar, 
  Trophy, 
  Users, 
  Settings,
  User
} from 'lucide-react';

const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    id: "dashboard",
    isActive: true
  },
  {
    title: "Agents",
    icon: Bot,
    id: "agents"
  },
  {
    title: "Tasks",
    icon: CheckSquare,
    id: "tasks"
  },
  {
    title: "Calendar",
    icon: Calendar,
    id: "calendar"
  },
  {
    title: "Badges",
    icon: Trophy,
    id: "badges"
  },
  {
    title: "Team",
    icon: Users,
    id: "team"
  }
];

export const WebAppSidebar: React.FC = () => {
  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Synapses</h2>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu className="space-y-1">
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    isActive={item.isActive}
                    className={`w-full justify-start px-3 py-2 rounded-lg transition-colors ${
                      item.isActive 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 mr-3 ${
                      item.isActive ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <span className="text-sm">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                  <Settings className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-sm">Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Alex" />
            <AvatarFallback className="bg-blue-100 text-blue-700 text-sm font-medium">
              A
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Alex Chen</p>
            <p className="text-xs text-gray-500 truncate">ESG Officer</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
