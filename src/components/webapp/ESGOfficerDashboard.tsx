
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
  Zap
} from 'lucide-react';

export const ESGOfficerDashboard: React.FC = () => {
  const [activeAgents, setActiveAgents] = useState(2);

  return (
    <div className="space-y-6">
      {/* Welcome Section with Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Active Agents</p>
                <p className="text-2xl font-bold text-blue-900">{activeAgents}</p>
              </div>
              <Bot className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Tasks Completed</p>
                <p className="text-2xl font-bold text-green-900">12</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700">Pending Reviews</p>
                <p className="text-2xl font-bold text-amber-900">5</p>
              </div>
              <Clock className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Impact Score</p>
                <p className="text-2xl font-bold text-purple-900">847</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Primary Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Priority Tasks */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Priority Tasks</CardTitle>
                <Badge variant="destructive" className="text-xs">2 High Priority</Badge>
              </div>
              <CardDescription>Complete these tasks to maintain compliance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-gray-900">SFDR Article 8 Classification Review</p>
                    <p className="text-sm text-gray-600">Luxembourg fund disclosure update required</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-100 text-red-700 border-red-200">Due Today</Badge>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Ask Dara
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium text-gray-900">ESG Data Collection Q4</p>
                    <p className="text-sm text-gray-600">Portfolio companies missing sustainability metrics</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-700 border-amber-200">3 Days Left</Badge>
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4 mr-1" />
                    Review
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Taxonomy Alignment Report</p>
                    <p className="text-sm text-gray-600">EU Taxonomy screening completed</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-700 border-green-200">Completed</Badge>
                  <Button size="sm" variant="ghost">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agent Recommendations */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Recommended Agents</CardTitle>
              <CardDescription>Activate these agents to streamline your workflow</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">SFDR Classifier</h4>
                    <p className="text-sm text-gray-600">Auto-categorize fund products</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Automatically classify funds as Article 6, 8, or 9 based on investment strategy and ESG criteria.
                </p>
                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                  <Zap className="h-4 w-4 mr-1" />
                  Activate Agent
                </Button>
              </div>

              <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">ESG Data Analyst</h4>
                    <p className="text-sm text-gray-600">Extract insights from reports</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Parse ESG reports and extract key metrics, risks, and opportunities for portfolio analysis.
                </p>
                <Button size="sm" variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-100">
                  <ArrowRight className="h-4 w-4 mr-1" />
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Secondary Info */}
        <div className="space-y-6">
          {/* Weekly Progress */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Weekly Progress</CardTitle>
              <CardDescription>Your compliance activities this week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Tasks Completed</span>
                  <span className="text-sm text-gray-600">8/10</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Agent Usage</span>
                  <span className="text-sm text-gray-600">6/8</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Regulatory Updates</span>
                  <span className="text-sm text-gray-600">3/5</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>

              <div className="pt-3 border-t">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  <span className="text-sm font-medium">Next Badge: Compliance Champion</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Complete 2 more tasks this week</p>
              </div>
            </CardContent>
          </Card>

          {/* Regulatory Calendar */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Upcoming Deadlines</CardTitle>
              <CardDescription>Important regulatory dates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                <Calendar className="h-5 w-5 text-red-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">SFDR RTS Update</p>
                  <p className="text-xs text-gray-600">SEC Filing - Today</p>
                </div>
                <Badge className="bg-red-100 text-red-700 text-xs">Critical</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                <Calendar className="h-5 w-5 text-amber-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Q4 ESG Report</p>
                  <p className="text-xs text-gray-600">Internal - Dec 15</p>
                </div>
                <Badge className="bg-amber-100 text-amber-700 text-xs">High</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Taxonomy Review</p>
                  <p className="text-xs text-gray-600">EU - Dec 20</p>
                </div>
                <Badge className="bg-blue-100 text-blue-700 text-xs">Medium</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Team Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Team Activity</CardTitle>
              <CardDescription>Recent activity from your colleagues</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-green-100 text-green-700 text-xs">SM</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">Sarah Martinez</p>
                  <p className="text-xs text-gray-600">Completed TCFD risk assessment</p>
                </div>
                <span className="text-xs text-gray-500">2h ago</span>
              </div>

              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">DK</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">David Kim</p>
                  <p className="text-xs text-gray-600">Activated new SFDR agent</p>
                </div>
                <span className="text-xs text-gray-500">4h ago</span>
              </div>

              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-purple-100 text-purple-700 text-xs">LR</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">Lisa Rodriguez</p>
                  <p className="text-xs text-gray-600">Shared ESG data template</p>
                </div>
                <span className="text-xs text-gray-500">1d ago</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
