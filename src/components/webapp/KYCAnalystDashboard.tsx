
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AgentCard } from '../agents/AgentCard';
import { TaskButton } from '../tasks/TaskButton';
import { BadgeTracker } from '../gamification/BadgeTracker';
import { RegulatoryCalendar } from '../widgets/RegulatoryCalendar';
import { Shield, Building2, Users, Plus, Search, AlertTriangle } from 'lucide-react';

const kycAgents = [
  {
    id: 'aml-agent',
    name: 'AML/CTF Specialist',
    description: 'Navigate anti-money laundering and counter-terrorism financing',
    category: 'AML/CTF',
    color: 'bg-blue-600',
    isRecommended: true,
    isActivated: true,
    useCases: [
      {
        title: 'Customer Risk Assessment',
        description: 'Evaluate customer risk profiles and PEP status'
      },
      {
        title: 'Transaction Monitoring',
        description: 'Analyze suspicious transaction patterns'
      }
    ]
  },
  {
    id: 'sanctions-agent',
    name: 'Sanctions Screening Assistant',
    description: 'Screen against global sanctions lists and manage compliance',
    category: 'Sanctions',
    color: 'bg-red-600',
    isRecommended: false,
    isActivated: false,
    useCases: [
      {
        title: 'Real-time Screening',
        description: 'Check customers against updated sanctions lists'
      },
      {
        title: 'False Positive Resolution',
        description: 'Resolve screening alerts efficiently'
      }
    ]
  }
];

const amlTasks = [
  {
    title: 'Assess customer risk profile',
    description: 'Analyze new corporate client for AML risk factors',
    complexity: 'Moderate' as const,
    estimatedTime: '5 min'
  },
  {
    title: 'Explain PEP identification requirements',
    description: 'Get guidance on politically exposed person screening',
    complexity: 'Simple' as const,
    estimatedTime: '3 min'
  },
  {
    title: 'Draft SAR filing recommendation',
    description: 'Prepare suspicious activity report documentation',
    complexity: 'Complex' as const,
    estimatedTime: '15 min'
  }
];

export const KYCAnalystDashboard: React.FC = () => {
  const [activeAgents, setActiveAgents] = useState(['aml-agent']);

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
                <Shield size={16} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Synapses</h1>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                KYC Analyst
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
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Welcome back, Alex! 🛡️
                    </h2>
                    <p className="text-gray-600">
                      2 high-priority cases require your attention today.
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-red-100 text-red-700 border-red-200">
                      <AlertTriangle size={12} className="mr-1" />
                      2 Alerts
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AML Agent Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search size={20} className="text-primary" />
                  AML/CTF Agent Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {amlTasks.map((task, index) => (
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
                  {kycAgents.map((agent) => (
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
            <BadgeTracker userRole="kyc-analyst" />
            <RegulatoryCalendar />
          </div>
        </div>
      </main>
    </div>
  );
};
