
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';

export const WebAppPromoBar: React.FC = () => {
  return (
    <div className="bg-purple-600 text-white px-4 py-2 text-center text-sm">
      <div className="flex items-center justify-center gap-2">
        <Trophy size={16} className="text-yellow-300" />
        <span className="font-medium">
          Limited-time access: Earn early adopter badge by activating 3 agents this week.
        </span>
        <Badge variant="outline" className="bg-white/10 text-white border-white/20 ml-2">
          2 days left
        </Badge>
      </div>
    </div>
  );
};
