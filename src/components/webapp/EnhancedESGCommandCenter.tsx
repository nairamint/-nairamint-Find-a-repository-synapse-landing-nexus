
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
  Activity,
  Loader2
} from 'lucide-react';
import { useAgents } from '@/hooks/useAgents';
import { AgentCard } from '@/components/agents/AgentCard';
import { AgentMetric, AgentInsight } from '@/types/agent';

const executiveMetrics: AgentMetric[] = [
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
    threshold: 80,
    status: 'warning',
    trend: 'up',
    change: '+5% this week',
    urgency: 'soon',
    framework: 'CSRD',
    lastUpdated: '4 hours ago',
    actionable: true
  },
  {
    id: 'taxonomy-alignment',
    title: 'EU Taxonomy Alignment',
    value: 92,
    threshold: 85,
    status: 'good',
    trend: 'stable',
    change: 'No change',
    urgency: 'monitor',
    framework: 'Taxonomy',
    lastUpdated: '1 day ago',
    actionable: false
  }
];

export const EnhancedESGCommandCenter: React.FC = () => {
  const {
    agents,
    activeAgents,
    insights,
    tasks,
    loading,
    error,
    activateAgent,
    deactivateAgent,
    refreshAgents,
    getAgentInsights,
    getAgentTasks
  } = useAgents();

  const [viewMode, setViewMode] = useState<'executive' | 'detailed'>('executive');
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshAgents();
    } catch (error) {
      console.error('Failed to refresh agents:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleActivateAgent = async (agentId: string) => {
    try {
      await activateAgent(agentId);
    } catch (error) {
      console.error('Failed to activate agent:', error);
    }
  };

  const handleDeactivateAgent = async (agentId: string) => {
    try {
      await deactivateAgent(agentId);
    } catch (error) {
      console.error('Failed to deactivate agent:', error);
    }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600">Loading SFDR agents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertTriangle className="h-8 w-8 mx-auto mb-4 text-red-500" />
          <p className="text-red-600 mb-4">Failed to load agents</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

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
            Executive View
          </Button>
          <Button
            variant={viewMode === 'detailed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('detailed')}
          >
            Detailed View
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Executive Summary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {executiveMetrics.map((metric) => (
              <Card 
                key={metric.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedMetric === metric.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedMetric(metric.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">{metric.title}</h3>
                    <Badge className={getUrgencyBadge(metric.urgency)}>
                      {metric.urgency}
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                    <span className="text-sm text-gray-500">/ {metric.threshold}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <TrendingUp className={`h-4 w-4 ${
                      metric.trend === 'up' ? 'text-green-500' : 
                      metric.trend === 'down' ? 'text-red-500' : 'text-gray-400'
                    }`} />
                    <span className="text-sm text-gray-600">{metric.change}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AI Insights Panel */}
          <Card className="bg-white shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                AI Insights
              </CardTitle>
              <CardDescription>Intelligent regulatory analysis and recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {insights.map((insight) => (
                <div 
                  key={insight.id}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    expandedInsight === insight.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setExpandedInsight(
                    expandedInsight === insight.id ? null : insight.id
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{insight.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge className={getUrgencyBadge(
                        insight.impactLevel === 'high' ? 'immediate' :
                        insight.impactLevel === 'medium' ? 'soon' : 'monitor'
                      )}>
                        {insight.impactLevel}
                      </Badge>
                      <span className={`text-sm font-medium ${getConfidenceColor(insight.confidence)}`}>
                        {insight.confidence}%
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{insight.summary}</p>
                  
                  {expandedInsight === insight.id && (
                    <div className="space-y-3 pt-3 border-t">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Action Required:</p>
                        <p className="text-sm text-gray-600">{insight.actionRequired}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Sources:</p>
                        <ul className="text-sm text-gray-600 list-disc list-inside">
                          {insight.sources.map((source, index) => (
                            <li key={index}>{source}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Agent: {insight.agentId}</span>
                        <span>{new Date(insight.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Agent Gallery */}
          <Card className="bg-white shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Bot className="h-5 w-5 text-purple-600" />
                SFDR Agent Gallery
              </CardTitle>
              <CardDescription>Available intelligent agents for SFDR compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agents.map((agent) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    onActivate={handleActivateAgent}
                    onDeactivate={handleDeactivateAgent}
                    onViewDetails={(agentId) => setSelectedAgent(agentId)}
                    loading={refreshing}
                  />
                ))}
              </div>
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
                        agent.status === 'active' ? 'bg-green-500' :
                        agent.status === 'loading' ? 'bg-yellow-500' : 'bg-red-500'
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
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => handleDeactivateAgent(agent.id)}
                    >
                      {agent.status === 'active' ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
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
