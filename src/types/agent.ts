export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  framework: 'SFDR' | 'CSRD' | 'TCFD' | 'GRI' | 'Other';
  status: 'active' | 'inactive' | 'error' | 'loading';
  useCases: AgentUseCase[];
  isActivated?: boolean;
  isRecommended?: boolean;
  color: string;
  efficiency: number;
  lastAction: string;
  tasksCompleted: number;
  nextScheduled?: string;
  version: string;
  lastUpdated: string;
}

export interface AgentUseCase {
  id: string;
  title: string;
  description: string;
  complexity: 'low' | 'medium' | 'high';
  estimatedTime: string;
}

export interface AgentInsight {
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

export interface AgentMetric {
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

export interface AgentTask {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedAgent: string;
  createdAt: string;
  dueDate?: string;
  completedAt?: string;
  progress: number;
}

export interface AgentConfiguration {
  id: string;
  agentId: string;
  settings: Record<string, unknown>;
  enabled: boolean;
  schedule?: string;
  notifications: boolean;
  autoActivate: boolean;
}

export interface AgentError {
  id: string;
  agentId: string;
  error: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolved: boolean;
  stackTrace?: string;
}

export interface AgentPerformance {
  agentId: string;
  uptime: number;
  responseTime: number;
  accuracy: number;
  tasksProcessed: number;
  errorsCount: number;
  lastPerformanceCheck: string;
}