
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Users, Lightbulb, CheckCircle } from 'lucide-react';

interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  earned: boolean;
  progress?: number;
  color: string;
}

interface BadgeTrackerProps {
  userRole: string;
}

const badges: BadgeData[] = [
  {
    id: 'first-steps',
    name: 'Compliance Explorer',
    description: 'Activated your first agent',
    icon: Target,
    earned: true,
    color: 'text-blue-600'
  },
  {
    id: 'insight-seeker',
    name: 'Insight Seeker',
    description: 'Used Dara for regulatory guidance',
    icon: Lightbulb,
    earned: true,
    color: 'text-yellow-600'
  },
  {
    id: 'compliance-champion',
    name: 'Compliance Champion',
    description: 'Complete 5 compliance tasks',
    icon: Trophy,
    earned: false,
    progress: 60,
    color: 'text-purple-600'
  },
  {
    id: 'community-builder',
    name: 'Community Builder',
    description: 'Invite 3 peers to join',
    icon: Users,
    earned: false,
    progress: 33,
    color: 'text-green-600'
  }
];

export const BadgeTracker: React.FC<BadgeTrackerProps> = ({ userRole }) => {
  const weeklyScore = 156;
  const weeklyGoal = 200;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Trophy size={20} className="text-primary" />
          Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Weekly Score */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Weekly Impact Score</span>
            <span className="text-lg font-bold text-primary">{weeklyScore}</span>
          </div>
          <Progress value={(weeklyScore / weeklyGoal) * 100} className="h-2" />
          <p className="text-xs text-gray-500 mt-1">
            {weeklyGoal - weeklyScore} points to reach your weekly goal
          </p>
        </div>

        {/* Badges */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Badges</h4>
          {badges.map((badge) => (
            <div key={badge.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                badge.earned ? 'bg-primary/10' : 'bg-gray-200'
              }`}>
                <badge.icon size={16} className={badge.earned ? badge.color : 'text-gray-400'} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${badge.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                    {badge.name}
                  </span>
                  {badge.earned && <CheckCircle size={14} className="text-green-600" />}
                </div>
                <p className="text-xs text-gray-500">{badge.description}</p>
                {!badge.earned && badge.progress && (
                  <div className="mt-1">
                    <Progress value={badge.progress} className="h-1" />
                    <span className="text-xs text-gray-400">{badge.progress}% complete</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
