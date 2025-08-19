
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Lightbulb,
  Filter,
  Download,
  Share,
  Play,
  Pause,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Info,
  Maximize2,
  RefreshCw,
  Bell,
  Activity
} from 'lucide-react';

interface ExecutiveSummaryMetric {
  id: string;
  title: string;
  value: number;
  threshold: number;
  status: 'critical' | 'warning' | 'good';
  trend: 'up' | 'down' | 'stable';
  change: string;
  urgency: 'immediate' | 'soon' | 'monitor';
  framework: string;
  lastUpdated: string;
  actionable: boolean;
}

interface AIInsight {
  id: string;
  title: string;
  summary: string;
  confidence: number;
  regulation: string;
  impactLevel: 'high' | 'medium' | 'low';
  actionRequired: string;
  timestamp: string;
  sources: string[];
  explainable: boolean;
  agentId: string;
}

interface ActiveAgent {
  id: string;
  name: string;
  status: 'running' | 'idle' | 'error';
  framework: string;
  lastAction: string;
  tasksCompleted: number;
  efficiency: number;
  nextScheduled?: string;
}

const executiveMetrics: ExecutiveSummaryMetric[] = [
  {
    id: 'sfdr-risk',
    title: 'SFDR Compliance Risk',
    value: 85,
    threshold: 70,
    status: 'critical',
    trend: 'up',
    change: '+12% this week',
    urgency: 'immediate',
    framework: 'SFDR',
    lastUpdated: '2 hours ago',
    actionable: true
  },
  {
    id: 'csrd-readiness',
    title: 'CSRD Readiness Score',
    value: 68,
    threshold: 75,
    status: 'warning',
    trend: 'stable',
    change: 'No change',
    urgency: 'soon',
    framework: 'CSRD',
    lastUpdated: '4 hours ago',
    actionable: true
  },
  {
    id: 'taxonomy-alignment',
    title: 'Taxonomy Alignment',
    value: 92,
    threshold: 80,
    status: 'good',
    trend: 'up',
    change: '+5% this month',
    urgency: 'monitor',
    framework: 'EU Taxonomy',
    lastUpdated: '1 hour ago',
    actionable: false
  },
  {
    id: 'tcfd-coverage',
    title: 'TCFD Implementation',
    value: 74,
    threshold: 70,
    status: 'good',
    trend: 'up',
    change: '+8% this quarter',
    urgency: 'monitor',
    framework: 'TCFD',
    lastUpdated: '3 hours ago',
    actionable: false
  }
];

const aiInsights: AIInsight[] = [
  {
    id: 'insight-1',
    title: 'SFDR RTS Update Requires Immediate Action',
    summary: 'New Commission Delegated Regulation (EU) 2022/1288 amendments affect Article 8 fund classifications. 3 portfolio holdings require immediate PAI calculation review.',
    confidence: 96,
    regulation: 'SFDR Article 8 RTS',
    impactLevel: 'high',
    actionRequired: 'Review PAI calculations within 48 hours',
    timestamp: '2 hours ago',
    sources: ['EU Commission Regulation 2022/1288', 'ESMA Q&A Update Dec 2024'],
    explainable: true,
    agentId: 'sfdr-navigator'
  },
  {
    id: 'insight-2',
    title: 'CSRD Double Materiality Assessment Gap',
    summary: 'EFRAG guidance on financial materiality assessment indicates gaps in current approach for 2 business segments. Updated methodology needed for Q1 2025 reporting.',
    confidence: 89,
    regulation: 'CSRD Article 19a',
    impactLevel: 'medium',
    actionRequired: 'Update materiality assessment methodology',
    timestamp: '4 hours ago',
    sources: ['EFRAG IG 2 Implementation Guidance', 'Draft ESRS Updates'],
    explainable: true,
    agentId: 'csrd-analyst'
  }
];

const activeAgents: ActiveAgent[] = [
  {
    id: 'sfdr-classifier',
    name: 'SFDR Product Classifier',
    status: 'running',
    framework: 'SFDR',
    lastAction: 'Analyzed Article 8/9 compliance for 12 funds',
    tasksCompleted: 24,
    efficiency: 94,
    nextScheduled: 'Every 6 hours'
  },
  {
    id: 'csrd-monitor',
    name: 'CSRD Materiality Monitor',
    status: 'running',
    framework: 'CSRD',
    lastAction: 'Scanned 8 regulatory updates',
    tasksCompleted: 18,
    efficiency: 87,
    nextScheduled: 'Daily at 9:00 AM'
  }
];

export const EnhancedESGCommandCenter: React.FC = () => {
  const [viewMode, setViewMode] = useState<'executive' | 'detailed'>('executive');
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => setRefreshing(false), 1500);
  };

  const getStatusColor = (status: 'critical' | 'warning' | 'good') => {
    switch (status) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-900';
      case 'warning': return 'bg-amber-50 border-amber-200 text-amber-900';
      case 'good': return 'bg-green-50 border-green-200 text-green-900';
    }
  };

  const getUrgencyBadge = (urgency: 'immediate' | 'soon' | 'monitor') => {
    switch (urgency) {
      case 'immediate': return 'bg-red-100 text-red-700 border-red-200';
      case 'soon': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'monitor': return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 80) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Enhanced Header with Executive Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ESG Command Center</h1>
          <p className="text-gray-600">Intelligent regulatory oversight and strategic decision support</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="text-gray-600 hover:text-gray-900"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            variant={viewMode === 'executive' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('executive')}
          >
            <Eye className="h-4 w-4 mr-2" />
            Executive
          </Button>
          <Button
            variant={viewMode === 'detailed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('detailed')}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Detailed
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Customize
          </Button>
        </div>
      </div>

      {/* Executive Summary - Critical Metrics */}
      <Card className="bg-white shadow-sm border-0">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Shield className="h-6 w-6 text-blue-600" />
                Executive Risk Dashboard
              </CardTitle>
              <CardDescription>
                Real-time regulatory exposure across critical frameworks
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Activity className="h-3 w-3 mr-1" />
              Live Monitoring
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {executiveMetrics.map((metric) => (
              <div
                key={metric.id}
                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                  selectedMetric === metric.id
                    ? 'border-blue-300 bg-blue-50'
                    : getStatusColor(metric.status)
                }`}
                onClick={() => setSelectedMetric(selectedMetric === metric.id ? null : metric.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-sm">{metric.framework}</h4>
                  <div className="flex items-center gap-2">
                    <Badge className={getUrgencyBadge(metric.urgency)} variant="outline">
                      {metric.urgency.toUpperCase()}
                    </Badge>
                    {metric.actionable && (
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">{metric.value}</span>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">{metric.change}</div>
                      <div className="text-xs text-gray-400">{metric.lastUpdated}</div>
                    </div>
                  </div>
                  
                  <Progress value={metric.value} className="h-2" />
                  
                  <div className="text-xs font-medium text-gray-700">
                    {metric.title}
                  </div>
                  
                  {metric.actionable && (
                    <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                      <Zap className="h-3 w-3 mr-1" />
                      Take Action
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI-Powered Insights with Explainability */}
        <div className="lg:col-span-2">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <Lightbulb className="h-6 w-6 text-amber-500" />
                    Strategic AI Insights
                  </CardTitle>
                  <CardDescription>
                    Dara's prioritized analysis with full traceability
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Ask Dara
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            insight.impactLevel === 'high' ? 'bg-red-100 text-red-700 border-red-200' :
                            insight.impactLevel === 'medium' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                            'bg-green-100 text-green-700 border-green-200'
                          }`}
                        >
                          {insight.impactLevel.toUpperCase()} IMPACT
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{insight.summary}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {insight.regulation}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {insight.timestamp}
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          <span className={getConfidenceColor(insight.confidence)}>
                            {insight.confidence}% confidence
                          </span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setExpandedInsight(expandedInsight === insight.id ? null : insight.id)}
                          className="text-xs"
                        >
                          <Info className="h-3 w-3 mr-1" />
                          {expandedInsight === insight.id ? 'Hide' : 'Show'} Sources
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Bot className="h-3 w-3 mr-1" />
                          Agent: {insight.agentId}
                        </Button>
                      </div>

                      {expandedInsight === insight.id && (
                        <div className="bg-white p-3 rounded-lg border border-gray-200 mb-3">
                          <h5 className="text-xs font-semibold text-gray-700 mb-2">Source Analysis:</h5>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {insight.sources.map((source, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                                {source}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Zap className="h-3 w-3 mr-1" />
                      {insight.actionRequired}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="h-3 w-3 mr-1" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Agent Orchestration Panel */}
        <div className="space-y-6">
          <Card className="bg-white shadow-sm border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Bot className="h-5 w-5 text-purple-600" />
                  Active Agents
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>AI workforce status and orchestration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeAgents.map((agent) => (
                <div key={agent.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        agent.status === 'running' ? 'bg-green-500' :
                        agent.status === 'idle' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">{agent.name}</p>
                        <p className="text-xs text-gray-600">{agent.framework}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {agent.efficiency}% efficiency
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-gray-600">{agent.lastAction}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{agent.tasksCompleted} tasks completed</span>
                      {agent.nextScheduled && <span>Next: {agent.nextScheduled}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      {agent.status === 'running' ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      <Settings className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full">
                <Bot className="h-4 w-4 mr-2" />
                Browse Agent Gallery
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions Panel */}
          <Card className="bg-white shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
                <MessageSquare className="h-4 w-4 mr-2" />
                Launch Horizon Scan
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Generate SFDR Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Compliance Review
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Team Collaboration Hub
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
