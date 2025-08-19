
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  Bot, 
  Calendar,
  Target,
  Award,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  FileText,
  Zap,
  Settings,
  Eye,
  BarChart3,
  Shield,
  Lightbulb
} from 'lucide-react';

interface RiskPulseData {
  framework: string;
  status: 'high' | 'medium' | 'low';
  score: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdate: string;
}

interface AIInsight {
  title: string;
  summary: string;
  confidence: number;
  regulation: string;
  action: string;
  timestamp: string;
}

const riskPulseData: RiskPulseData[] = [
  { framework: 'SFDR', status: 'high', score: 85, trend: 'up', lastUpdate: '2 hours ago' },
  { framework: 'CSRD', status: 'medium', score: 68, trend: 'stable', lastUpdate: '4 hours ago' },
  { framework: 'EU Taxonomy', status: 'low', score: 32, trend: 'down', lastUpdate: '1 hour ago' },
  { framework: 'TCFD', status: 'medium', score: 74, trend: 'up', lastUpdate: '3 hours ago' }
];

const aiInsights: AIInsight[] = [
  {
    title: "New SFDR RTS Technical Standards",
    summary: "Commission Delegated Regulation affects Article 8 fund classifications. Review required for 3 portfolio holdings.",
    confidence: 94,
    regulation: "SFDR Article 8",
    action: "Review PAI calculations",
    timestamp: "2 hours ago"
  },
  {
    title: "CSRD Scope 3 Reporting Update",
    summary: "EFRAG clarifies materiality assessment for financial services. New guidance impacts value chain analysis.",
    confidence: 87,
    regulation: "CSRD Article 19a",
    action: "Update materiality matrix",
    timestamp: "4 hours ago"
  },
  {
    title: "EU Taxonomy Climate Criteria",
    summary: "Technical screening criteria updated for sustainable activities. 2 investments require re-evaluation.",
    confidence: 91,
    regulation: "Taxonomy Regulation",
    action: "Re-assess alignment",
    timestamp: "6 hours ago"
  }
];

export const ESGCommandCenter: React.FC = () => {
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);

  const getStatusColor = (status: 'high' | 'medium' | 'low') => {
    switch (status) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-green-500 rotate-180" />;
      case 'stable': return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with View Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ESG Command Center</h1>
          <p className="text-gray-600 mt-1">Real-time regulatory risk monitoring and intelligent insights</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant={viewMode === 'overview' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('overview')}
          >
            <Eye className="h-4 w-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={viewMode === 'detailed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('detailed')}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Detailed
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Customize
          </Button>
        </div>
      </div>

      {/* ESG Risk Pulse Dashboard */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                ESG Risk Pulse
              </CardTitle>
              <CardDescription>Firm-level regulatory exposure across key frameworks</CardDescription>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Live Updates
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {riskPulseData.map((item) => (
              <div
                key={item.framework}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedFramework === item.framework
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedFramework(
                  selectedFramework === item.framework ? null : item.framework
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{item.framework}</h4>
                  {getTrendIcon(item.trend)}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">{item.score}</span>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <Progress value={item.score} className="h-2" />
                  
                  <p className="text-xs text-gray-500">Updated {item.lastUpdate}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights Panel */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                Today's AI Insights
              </CardTitle>
              <CardDescription>Dara's analysis of latest regulatory developments</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Ask Dara
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {aiInsights.map((insight, index) => (
            <div
              key={index}
              className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
                  <p className="text-sm text-gray-700 mb-2">{insight.summary}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      {insight.regulation}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {insight.timestamp}
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      {insight.confidence}% confidence
                    </span>
                  </div>
                </div>
                <Button size="sm" className="ml-4 bg-blue-600 hover:bg-blue-700">
                  {insight.action}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Active Agents & Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Agents */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Bot className="h-5 w-5 text-purple-600" />
              Active Agents
            </CardTitle>
            <CardDescription>Currently running ESG analysis agents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">SFDR Classifier</p>
                  <p className="text-sm text-gray-600">Running Article 8/9 analysis</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700">Active</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">CSRD Materiality</p>
                  <p className="text-sm text-gray-600">Analyzing double materiality</p>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-700">Processing</Badge>
            </div>

            <Button variant="outline" className="w-full mt-3">
              <Bot className="h-4 w-4 mr-2" />
              Browse Agent Gallery
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-red-600" />
              Upcoming Deadlines
            </CardTitle>
            <CardDescription>Critical regulatory dates and milestones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="w-2 h-8 bg-red-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">SFDR RTS Compliance</p>
                <p className="text-xs text-gray-600">PAI data submission - Today</p>
              </div>
              <Badge className="bg-red-100 text-red-700">Critical</Badge>
            </div>

            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="w-2 h-8 bg-amber-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">CSRD Report Draft</p>
                <p className="text-xs text-gray-600">Initial assessment - Dec 15</p>
              </div>
              <Badge className="bg-amber-100 text-amber-700">High</Badge>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Taxonomy Alignment</p>
                <p className="text-xs text-gray-600">Q4 Review - Dec 20</p>
              </div>
              <Badge className="bg-blue-100 text-blue-700">Medium</Badge>
            </div>

            <Button variant="outline" className="w-full mt-3">
              <Calendar className="h-4 w-4 mr-2" />
              View Full Calendar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
