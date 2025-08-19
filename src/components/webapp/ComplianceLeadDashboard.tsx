
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AgentCard } from '../agents/AgentCard';
import { TaskButton } from '../tasks/TaskButton';
import { BadgeTracker } from '../gamification/BadgeTracker';
import { RegulatoryCalendar } from '../widgets/RegulatoryCalendar';
import { Users, Building2, Plus, BarChart3, Globe } from 'lucide-react';

const complianceAgents = [
  {
    id: 'mifid-agent',
    name: 'MiFID II Navigator',
    description: 'Navigate Markets in Financial Instruments Directive requirements',
    category: 'Investment Services',
    color: 'bg-purple-600',
    isRecommended: true,
    isActivated: true,
    useCases: [
      {
        title: 'Best Execution Analysis',
        description: 'Review execution quality and reporting requirements'
      },
      {
        title: 'Client Categorization',
        description: 'Assess professional vs retail client classifications'
      }
    ]
  },
  {
    id: 'gdpr-agent',
    name: 'GDPR Compliance Assistant',
    description: 'Manage data protection and privacy compliance',
    category: 'Data Protection',
    color: 'bg-indigo-600',
    isRecommended: false,
    isActivated: false,
    useCases: [
      {
        title: 'Privacy Impact Assessment',
        description: 'Conduct DPIA for new data processing activities'
      },
      {
        title: 'Data Subject Rights',
        description: 'Handle access, rectification, and erasure requests'
      }
    ]
  }
];

const leadTasks = [
  {
    title: 'Cross-jurisdiction regulatory mapping',
    description: 'Compare EU, UK, and US requirements for new product launch',
    complexity: 'Complex' as const,
    estimatedTime: '20 min'
  },
  {
    title: 'Team training gap analysis',
    description: 'Identify compliance training needs across departments',
    complexity: 'Moderate' as const,
    estimatedTime: '10 min'
  },
  {
    title: 'Regulatory change impact assessment',
    description: 'Analyze new ESA guidelines on operational resilience',
    complexity: 'Complex' as const,
    estimatedTime: '15 min'
  }
];

export const ComplianceLeadDashboard: React.FC = () => {
  const [activeAgents, setActiveAgents] = useState(['mifid-agent']);

  const handleActivateAgent = (agentId: string) => {
    setActiveAgents([...activeAgents, agentId]);
  };

  const handleTaskClick = (taskTitle: string) => {
    console.log('Opening Dara for task:', taskTitle);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Users size={16} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Synapses</h1>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                Compliance Lead
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Users size={14} className="mr-2" />
                Invite Team
              </Button>
              <Button variant="outline" size="sm">
                <Building2 size={14} className="mr-2" />
                Enterprise Demo
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome Banner */}
            <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Welcome back, Maria! 👥
                    </h2>
                    <p className="text-gray-600">
                      Your team has completed 8 compliance tasks this week.
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                      <BarChart3 size={12} className="mr-1" />
                      Team Score: 234
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Strategic Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe size={20} className="text-primary" />
                  Strategic Compliance Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {leadTasks.map((task, index) => (
                    <TaskButton
                      key={index}
                      title={task.title}
                      description={task.description}
                      complexity={task.complexity}
                      estimatedTime={task.estimatedTime}
                      onClick={() => handleTaskClick(task.title)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Agent Gallery */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Agent Gallery</CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus size={14} className="mr-2" />
                    Browse All Agents
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {complianceAgents.map((agent) => (
                    <AgentCard
                      key={agent.id}
                      {...agent}
                      isActivated={activeAgents.includes(agent.id)}
                      onActivate={handleActivateAgent}
                      onViewDetails={(id) => console.log('View details for:', id)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <BadgeTracker userRole="compliance-lead" />
            <RegulatoryCalendar />
          </div>
        </div>
      </main>
    </div>
  );
};
