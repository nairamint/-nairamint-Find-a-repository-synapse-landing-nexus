
import React, { useState, useEffect } from 'react';
import { RoleSelector } from '../onboarding/RoleSelector';
import { EnhancedESGCommandCenter } from './EnhancedESGCommandCenter';
import { KYCAnalystDashboard } from './KYCAnalystDashboard';
import { ComplianceLeadDashboard } from './ComplianceLeadDashboard';
import { AdvancedWebAppSidebar } from './AdvancedWebAppSidebar';
import { WebAppPromoBar } from './WebAppPromoBar';
import { WebAppTopNav } from './WebAppTopNav';
import { SidebarProvider } from '@/components/ui/sidebar';

export const WebAppLayout: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showRoleSelector, setShowRoleSelector] = useState(true);
  const [userName, setUserName] = useState('Alex');

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setShowRoleSelector(false);
    localStorage.setItem('userRole', roleId);
  };

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setSelectedRole(storedRole);
      setShowRoleSelector(false);
    }
  }, []);

  const renderDashboard = () => {
    switch (selectedRole) {
      case 'esg-officer':
        return <EnhancedESGCommandCenter />;
      case 'kyc-analyst':
        return <KYCAnalystDashboard />;
      case 'compliance-lead':
        return <ComplianceLeadDashboard />;
      default:
        return <EnhancedESGCommandCenter />;
    }
  };

  if (showRoleSelector) {
    return <RoleSelector open={showRoleSelector} onRoleSelect={handleRoleSelect} />;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex flex-col w-full bg-gray-50">
        {/* Promo Bar */}
        <WebAppPromoBar />
        
        {/* Main Layout with Sidebar */}
        <div className="flex flex-1">
          <AdvancedWebAppSidebar />
          
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Top Navigation */}
            <WebAppTopNav userName={userName} />
            
            {/* Dashboard Content */}
            <main className="flex-1 overflow-auto">
              {renderDashboard()}
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};
