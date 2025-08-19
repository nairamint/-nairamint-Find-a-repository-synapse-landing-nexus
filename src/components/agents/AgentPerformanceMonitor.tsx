import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Zap,
  BarChart3,
  RefreshCw,
  Settings
} from 'lucide-react';
import { AgentPerformance, Agent } from '@/types/agent';

interface AgentPerformanceMonitorProps {
  agent: Agent;
  onRefresh?: () => void;
  className?: string;
}

interface PerformanceMetrics {
  uptime: number;
  responseTime: number;
  accuracy: number;
  tasksProcessed: number;
  errorsCount: number;
  lastCheck: string;
  trend: 'up' | 'down' | 'stable';
}

export const AgentPerformanceMonitor: React.FC<AgentPerformanceMonitorProps> = ({
  agent,
  onRefresh,
  className = ''
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    uptime: 99.8,
    responseTime: 245,
    accuracy: 94.2,
    tasksProcessed: agent.tasksCompleted,
    errorsCount: 2,
    lastCheck: new Date().toISOString(),
    trend: 'up'
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Simulate API call to get fresh metrics
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update metrics with simulated fresh data
      setMetrics(prev => ({
        ...prev,
        uptime: Math.random() > 0.5 ? 99.9 : 99.7,
        responseTime: Math.floor(Math.random() * 100) + 200,
        accuracy: Math.random() > 0.5 ? 95.1 : 93.8,
        tasksProcessed: prev.tasksProcessed + Math.floor(Math.random() * 3),
        lastCheck: new Date().toISOString()
      }));
      
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error('Failed to refresh performance metrics:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const getStatusColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return 'text-green-600';
    if (value >= thresholds.warning) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusIcon = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (value >= thresholds.warning) return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    return <AlertTriangle className="h-4 w-4 text-red-500" />;
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card className={`bg-white shadow-sm border-0 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg font-semibold">Performance Monitor</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            Agent: {agent.name}
          </Badge>
          <Badge variant="outline" className="text-xs">
            Last updated: {new Date(metrics.lastCheck).toLocaleTimeString()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Key Performance Indicators */}
        <div className="grid grid-cols-2 gap-4">
          {/* Uptime */}
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-900">Uptime</span>
              {getStatusIcon(metrics.uptime, { good: 99.5, warning: 99.0 })}
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-bold ${getStatusColor(metrics.uptime, { good: 99.5, warning: 99.0 })}`}>
                {metrics.uptime}%
              </span>
            </div>
            <Progress value={metrics.uptime} className="h-2 mt-2" />
          </div>

          {/* Response Time */}
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900">Response Time</span>
              {getStatusIcon(metrics.responseTime, { good: 300, warning: 500 })}
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-bold ${getStatusColor(metrics.responseTime, { good: 300, warning: 500 })}`}>
                {metrics.responseTime}ms
              </span>
            </div>
            <div className="flex items-center gap-1 mt-2">
              {getTrendIcon(metrics.trend)}
              <span className="text-xs text-gray-600">-12ms from last check</span>
            </div>
          </div>

          {/* Accuracy */}
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-purple-900">Accuracy</span>
              {getStatusIcon(metrics.accuracy, { good: 95, warning: 90 })}
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-bold ${getStatusColor(metrics.accuracy, { good: 95, warning: 90 })}`}>
                {metrics.accuracy}%
              </span>
            </div>
            <Progress value={metrics.accuracy} className="h-2 mt-2" />
          </div>

          {/* Tasks Processed */}
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-amber-900">Tasks Processed</span>
              <Zap className="h-4 w-4 text-amber-500" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-amber-900">
                {metrics.tasksProcessed}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-2">
              {getTrendIcon(metrics.trend)}
              <span className="text-xs text-gray-600">+3 this hour</span>
            </div>
          </div>
        </div>

        {/* Error Rate */}
        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-red-900">Error Rate</span>
            <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
              {metrics.errorsCount} errors
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-red-900">
              {((metrics.errorsCount / metrics.tasksProcessed) * 100).toFixed(2)}%
            </span>
            <span className="text-sm text-red-700">
              ({metrics.errorsCount} of {metrics.tasksProcessed} tasks)
            </span>
          </div>
          {metrics.errorsCount > 0 && (
            <div className="mt-2 text-xs text-red-600">
              Last error: 2 hours ago - Network timeout
            </div>
          )}
        </div>

        {/* Performance Trends */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900">Performance Trends</h4>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-2 bg-gray-50 rounded">
              <div className="text-xs text-gray-600">1 Hour</div>
              <div className="text-sm font-medium text-green-600">+2.1%</div>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <div className="text-xs text-gray-600">24 Hours</div>
              <div className="text-sm font-medium text-green-600">+5.3%</div>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <div className="text-xs text-gray-600">7 Days</div>
              <div className="text-sm font-medium text-red-600">-1.2%</div>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">System Health</span>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              Healthy
            </Badge>
          </div>
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Memory Usage</span>
              <span className="text-gray-900">45%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">CPU Load</span>
              <span className="text-gray-900">23%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Network Latency</span>
              <span className="text-gray-900">12ms</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};