
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp, Users, CheckCircle } from 'lucide-react';

interface Role {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  specialties: string[];
  color: string;
}

const roles: Role[] = [
  {
    id: 'kyc-analyst',
    title: 'KYC Analyst',
    description: 'Navigate customer due diligence and AML compliance',
    icon: Shield,
    specialties: ['AML/CTF', 'Customer Screening', 'Risk Assessment'],
    color: 'bg-blue-50 border-blue-200 text-blue-700'
  },
  {
    id: 'esg-officer',
    title: 'ESG Officer',
    description: 'Drive sustainability reporting and ESG compliance',
    icon: TrendingUp,
    specialties: ['SFDR', 'Taxonomy', 'Sustainability Reporting'],
    color: 'bg-green-50 border-green-200 text-green-700'
  },
  {
    id: 'compliance-lead',
    title: 'Compliance Lead',
    description: 'Oversee regulatory strategy and team coordination',
    icon: Users,
    specialties: ['MiFID II', 'GDPR', 'Cross-jurisdiction'],
    color: 'bg-purple-50 border-purple-200 text-purple-700'
  }
];

interface RoleSelectorProps {
  open: boolean;
  onRoleSelect: (roleId: string) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ open, onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            Welcome to Synapses
          </DialogTitle>
          <p className="text-gray-600 text-center">
            Let's personalize your experience. What's your primary role in GRC?
          </p>
        </DialogHeader>
        
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {roles.map((role) => (
            <Card 
              key={role.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedRole === role.id 
                  ? 'ring-2 ring-primary shadow-md' 
                  : 'hover:ring-1 hover:ring-gray-300'
              }`}
              onClick={() => setSelectedRole(role.id)}
            >
              <CardHeader className="text-center pb-3">
                <div className={`w-16 h-16 rounded-full ${role.color} flex items-center justify-center mx-auto mb-3`}>
                  <role.icon size={24} />
                </div>
                <CardTitle className="text-lg font-semibold">
                  {role.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-4 text-center">
                  {role.description}
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {role.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                {selectedRole === role.id && (
                  <div className="flex items-center justify-center mt-3 text-primary">
                    <CheckCircle size={16} className="mr-1" />
                    <span className="text-sm font-medium">Selected</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button 
            onClick={handleContinue}
            disabled={!selectedRole}
            className="px-8 py-2"
          >
            Continue to Dashboard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
