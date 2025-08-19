
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Zap, ArrowRight, Star } from 'lucide-react';

interface UseCase {
  title: string;
  description: string;
}

interface AgentCardProps {
  id: string;
  name: string;
  description: string;
  category: string;
  useCases: UseCase[];
  isActivated?: boolean;
  isRecommended?: boolean;
  color: string;
  onActivate: (agentId: string) => void;
  onViewDetails: (agentId: string) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({
  id,
  name,
  description,
  category,
  useCases,
  isActivated = false,
  isRecommended = false,
  color,
  onActivate,
  onViewDetails
}) => {
  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${isRecommended ? 'ring-2 ring-primary/20' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
            <Bot size={20} className="text-white" />
          </div>
          <div className="flex gap-1">
            {isRecommended && (
              <Badge variant="default" className="bg-primary/10 text-primary border-primary/20">
                <Star size={12} className="mr-1" />
                Recommended
              </Badge>
            )}
            {isActivated && (
              <Badge variant="default" className="bg-green-100 text-green-700 border-green-200">
                <Zap size={12} className="mr-1" />
                Active
              </Badge>
            )}
          </div>
        </div>
        <CardTitle className="text-lg font-semibold mt-3">{name}</CardTitle>
        <Badge variant="outline" className="text-xs w-fit">
          {category}
        </Badge>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        
        <div className="space-y-2 mb-4">
          <h4 className="text-sm font-medium text-gray-900">Use Cases:</h4>
          {useCases.slice(0, 2).map((useCase, index) => (
            <div key={index} className="text-xs text-gray-600 bg-gray-50 p-2 rounded-md">
              <strong>{useCase.title}:</strong> {useCase.description}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          {!isActivated ? (
            <Button 
              onClick={() => onActivate(id)}
              className="flex-1 text-sm"
            >
              Activate Agent
            </Button>
          ) : (
            <Button 
              onClick={() => onViewDetails(id)}
              variant="outline"
              className="flex-1 text-sm"
            >
              Open Tasks <ArrowRight size={14} className="ml-1" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
