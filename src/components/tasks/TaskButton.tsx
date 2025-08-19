
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Sparkles } from 'lucide-react';

interface TaskButtonProps {
  title: string;
  description: string;
  complexity?: 'Simple' | 'Moderate' | 'Complex';
  estimatedTime?: string;
  onClick: () => void;
  disabled?: boolean;
}

export const TaskButton: React.FC<TaskButtonProps> = ({
  title,
  description,
  complexity = 'Simple',
  estimatedTime,
  onClick,
  disabled = false
}) => {
  const complexityColors = {
    Simple: 'bg-green-100 text-green-700 border-green-200',
    Moderate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Complex: 'bg-red-100 text-red-700 border-red-200'
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-primary/30">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Sparkles size={14} className="text-primary" />
          </div>
          <h3 className="font-medium text-gray-900">{title}</h3>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className={complexityColors[complexity]}>
            {complexity}
          </Badge>
          {estimatedTime && (
            <Badge variant="outline" className="text-xs">
              {estimatedTime}
            </Badge>
          )}
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      
      <Button 
        onClick={onClick}
        disabled={disabled}
        variant="outline"
        className="w-full group-hover:bg-primary group-hover:text-white transition-colors duration-200"
      >
        <MessageSquare size={14} className="mr-2" />
        Ask Dara
      </Button>
    </div>
  );
};
