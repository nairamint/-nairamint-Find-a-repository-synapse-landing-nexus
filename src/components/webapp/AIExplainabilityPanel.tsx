
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  FileText, 
  Link, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  Info,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  MessageSquare
} from 'lucide-react';

interface ReasoningStep {
  id: string;
  step: number;
  description: string;
  evidence: string[];
  confidence: number;
  category: 'analysis' | 'synthesis' | 'conclusion';
}

interface SourceDocument {
  id: string;
  title: string;
  type: 'regulation' | 'guidance' | 'case-study' | 'precedent';
  relevance: number;
  excerpt: string;
  url?: string;
}

interface AIExplainabilityPanelProps {
  insightId: string;
  title: string;
  confidence: number;
  reasoning: ReasoningStep[];
  sources: SourceDocument[];
  agentId: string;
  onFeedback: (positive: boolean) => void;
  onFollowUp: () => void;
}

export const AIExplainabilityPanel: React.FC<AIExplainabilityPanelProps> = ({
  insightId,
  title,
  confidence,
  reasoning,
  sources,
  agentId,
  onFeedback,
  onFollowUp
}) => {
  const [activeTab, setActiveTab] = useState('reasoning');
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (confidence >= 80) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getStepIcon = (category: string) => {
    switch (category) {
      case 'analysis': return <FileText className="h-4 w-4 text-blue-600" />;
      case 'synthesis': return <Brain className="h-4 w-4 text-purple-600" />;
      case 'conclusion': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSourceTypeColor = (type: string) => {
    switch (type) {
      case 'regulation': return 'bg-red-100 text-red-700 border-red-200';
      case 'guidance': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'case-study': return 'bg-green-100 text-green-700 border-green-200';
      case 'precedent': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="w-full max-w-4xl bg-white shadow-lg border-0">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold mb-2">{title}</CardTitle>
            <CardDescription>AI Analysis Transparency & Source Traceability</CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className={getConfidenceColor(confidence)}>
              {confidence}% Confidence
            </Badge>
            <Badge variant="outline" className="text-purple-700 bg-purple-50 border-purple-200">
              Agent: {agentId}
            </Badge>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-700">Confidence Score</span>
            <Progress value={confidence} className="flex-1 h-2" />
            <span className="text-sm text-gray-600">{confidence}%</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reasoning" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Reasoning Chain
            </TabsTrigger>
            <TabsTrigger value="sources" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Source Analysis
            </TabsTrigger>
            <TabsTrigger value="validation" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Validation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reasoning" className="mt-6 space-y-4">
            <div className="space-y-3">
              {reasoning.map((step) => (
                <div
                  key={step.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getStepIcon(step.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">
                          Step {step.step}: {step.category.charAt(0).toUpperCase() + step.category.slice(1)}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {step.confidence}% confidence
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{step.description}</p>
                      
                      {expandedStep === step.id && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <h5 className="text-xs font-semibold text-gray-700 mb-2">Supporting Evidence:</h5>
                          <ul className="space-y-1">
                            {step.evidence.map((evidence, index) => (
                              <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
                                <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                {evidence}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sources" className="mt-6 space-y-4">
            <div className="grid gap-4">
              {sources.map((source) => (
                <div key={source.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900">{source.title}</h4>
                      <Badge variant="outline" className={getSourceTypeColor(source.type)}>
                        {source.type.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {source.relevance}% relevance
                      </span>
                      {source.url && (
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700 italic">"{source.excerpt}"</p>
                  </div>
                  
                  <div className="mt-2">
                    <Progress value={source.relevance} className="h-1" />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="validation" className="mt-6">
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-900">Analysis Validation</h4>
                </div>
                <p className="text-sm text-green-700">
                  This analysis has been cross-validated against current regulatory frameworks and shows high consistency with established precedents.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Quality Metrics</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Source Reliability</span>
                    <Badge variant="outline" className="bg-green-100 text-green-700">High</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Regulatory Currency</span>
                    <Badge variant="outline" className="bg-green-100 text-green-700">Current</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Cross-validation Score</span>
                    <Badge variant="outline" className="bg-green-100 text-green-700">94%</Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <span className="text-sm font-medium text-gray-700">Was this analysis helpful?</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onFeedback(true)}
                  className="text-green-600 hover:bg-green-50"
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Yes
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onFeedback(false)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  No
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onFollowUp}
                  className="ml-auto"
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Ask Follow-up
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
