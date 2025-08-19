
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Zap, ArrowRight, Star, Clock, AlertTriangle } from 'lucide-react';
import { Agent } from '@/types/agent';

interface AgentCardProps {
  agent: Agent;
  onActivate: (agentId: string) => Promise<void>;
  onViewDetails: (agentId: string) => void;
  onDeactivate?: (agentId: string) => Promise<void>;
  loading?: boolean;
}

export const AgentCard: React.FC<AgentCardProps> = ({
  agent,
  onActivate,
  onViewDetails,
  onDeactivate,
  loading = false
}) => {
  const handleActivate = async () => {
    try {
      await onActivate(agent.id);
    } catch (error) {
      console.error('Failed to activate agent:', error);
    }
  };

  const handleDeactivate = async () => {
    if (onDeactivate) {
      try {
        await onDeactivate(agent.id);
      } catch (error) {
        console.error('Failed to deactivate agent:', error);
      }
    }
  };

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-400';
      case 'error': return 'bg-red-500';
      case 'loading': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-600';
    if (efficiency >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${
      agent.isRecommended ? 'ring-2 ring-primary/20' : ''
    } ${agent.status === 'error' ? 'border-red-200 bg-red-50' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className={`w-12 h-12 rounded-xl ${agent.color} flex items-center justify-center relative`}>
            <Bot size={20} className="text-white" />
            {agent.status === 'loading' && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse" />
            )}
          </div>
          <div className="flex gap-1">
            {agent.isRecommended && (
              <Badge variant="default" className="bg-primary/10 text-primary border-primary/20">
                <Star size={12} className="mr-1" />
                Recommended
              </Badge>
            )}
            {agent.isActivated && (
              <Badge variant="default" className="bg-green-100 text-green-700 border-green-200">
                <Zap size={12} className="mr-1" />
                Active
              </Badge>
            )}
            {agent.status === 'error' && (
              <Badge variant="default" className="bg-red-100 text-red-700 border-red-200">
                <AlertTriangle size={12} className="mr-1" />
                Error
              </Badge>
            )}
          </div>
        </div>
        <CardTitle className="text-lg font-semibold mt-3">{agent.name}</CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs w-fit">
            {agent.category}
          </Badge>
          <Badge variant="outline" className="text-xs w-fit">
            {agent.framework}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{agent.description}</p>
        
        {/* Agent Status and Performance */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Efficiency:</span>
            <span className={`font-medium ${getEfficiencyColor(agent.efficiency)}`}>
              {agent.efficiency}%
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Tasks Completed:</span>
            <span className="font-medium text-gray-900">{agent.tasksCompleted}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Last Action:</span>
            <span className="text-xs text-gray-500 truncate max-w-[150px]">
              {agent.lastAction}
            </span>
          </div>
        </div>

        {/* Use Cases */}
        <div className="space-y-2 mb-4">
          <h4 className="text-sm font-medium text-gray-900">Use Cases:</h4>
          {agent.useCases.slice(0, 2).map((useCase) => (
            <div key={useCase.id} className="text-xs text-gray-600 bg-gray-50 p-2 rounded-md">
              <div className="flex items-center justify-between mb-1">
                <strong>{useCase.title}</strong>
                <span className="text-xs text-gray-500">{useCase.estimatedTime}</span>
              </div>
              <p>{useCase.description}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {!agent.isActivated ? (
            <Button 
              onClick={handleActivate}
              disabled={loading || agent.status === 'loading'}
              className="flex-1 text-sm"
            >
              {loading ? 'Activating...' : 'Activate Agent'}
            </Button>
          ) : (
            <>
              <Button 
                onClick={() => onViewDetails(agent.id)}
                variant="outline"
                className="flex-1 text-sm"
              >
                Open Tasks <ArrowRight size={14} className="ml-1" />
              </Button>
              {onDeactivate && (
                <Button 
                  onClick={handleDeactivate}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  Stop
                </Button>
              )}
            </>
          )}
        </div>

        {/* Version and Last Updated */}
        <div className="flex items-center justify-between text-xs text-gray-500 mt-3 pt-3 border-t">
          <span>v{agent.version}</span>
          <span className="flex items-center gap-1">
            <Clock size={10} />
            {new Date(agent.lastUpdated).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
