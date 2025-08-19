import { useState, useEffect, useCallback } from 'react';
import { Agent, AgentInsight, AgentTask, AgentError } from '@/types/agent';

interface UseAgentsReturn {
  agents: Agent[];
  activeAgents: Agent[];
  insights: AgentInsight[];
  tasks: AgentTask[];
  errors: AgentError[];
  loading: boolean;
  error: string | null;
  activateAgent: (agentId: string) => Promise<void>;
  deactivateAgent: (agentId: string) => Promise<void>;
  refreshAgents: () => Promise<void>;
  getAgentById: (agentId: string) => Agent | undefined;
  getAgentInsights: (agentId: string) => AgentInsight[];
  getAgentTasks: (agentId: string) => AgentTask[];
}

// Mock data - replace with actual API calls
const mockAgents: Agent[] = [
  {
    id: 'sfdr-navigator',
    name: 'SFDR Navigator',
    description: 'Intelligent SFDR compliance navigation and guidance',
    category: 'Compliance',
    framework: 'SFDR',
    status: 'active',
    useCases: [
      {
        id: 'uc-1',
        title: 'Article 8/9 Classification',
        description: 'Automated classification of financial products under SFDR',
        complexity: 'medium',
        estimatedTime: '15-30 minutes'
      },
      {
        id: 'uc-2',
        title: 'PAI Calculation',
        description: 'Principal Adverse Impact calculation and reporting',
        complexity: 'high',
        estimatedTime: '1-2 hours'
      }
    ],
    isActivated: true,
    isRecommended: true,
    color: 'bg-purple-500',
    efficiency: 94,
    lastAction: 'Analyzed Article 8 compliance for 12 funds',
    tasksCompleted: 24,
    nextScheduled: 'Every 6 hours',
    version: '2.1.0',
    lastUpdated: '2024-12-10T10:30:00Z'
  },
  {
    id: 'sfdr-classifier',
    name: 'SFDR Product Classifier',
    description: 'Automated SFDR product classification and categorization',
    category: 'Classification',
    framework: 'SFDR',
    status: 'active',
    useCases: [
      {
        id: 'uc-3',
        title: 'Product Categorization',
        description: 'Automatic categorization of financial products',
        complexity: 'low',
        estimatedTime: '5-10 minutes'
      }
    ],
    isActivated: true,
    isRecommended: false,
    color: 'bg-blue-500',
    efficiency: 87,
    lastAction: 'Classified 45 products in last 24 hours',
    tasksCompleted: 156,
    nextScheduled: 'Continuous',
    version: '1.8.2',
    lastUpdated: '2024-12-10T09:15:00Z'
  },
  {
    id: 'csrd-analyst',
    name: 'CSRD Materiality Analyst',
    description: 'CSRD double materiality assessment and reporting',
    category: 'Analysis',
    framework: 'CSRD',
    status: 'active',
    useCases: [
      {
        id: 'uc-4',
        title: 'Materiality Assessment',
        description: 'Double materiality assessment for CSRD reporting',
        complexity: 'high',
        estimatedTime: '2-4 hours'
      }
    ],
    isActivated: false,
    isRecommended: true,
    color: 'bg-green-500',
    efficiency: 92,
    lastAction: 'Completed materiality assessment for 3 business units',
    tasksCompleted: 8,
    nextScheduled: 'Weekly',
    version: '1.5.1',
    lastUpdated: '2024-12-09T16:45:00Z'
  }
];

const mockInsights: AgentInsight[] = [
  {
    id: 'insight-1',
    title: 'SFDR RTS Update Requires Immediate Action',
    summary: 'New Commission Delegated Regulation (EU) 2022/1288 amendments affect Article 8 fund classifications. 3 portfolio holdings require immediate PAI calculation review.',
    confidence: 96,
    regulation: 'SFDR Article 8 RTS',
    impactLevel: 'high',
    actionRequired: 'Review PAI calculations within 48 hours',
    timestamp: '2024-12-10T08:30:00Z',
    sources: ['EU Commission Regulation 2022/1288', 'ESMA Q&A Update Dec 2024'],
    explainable: true,
    agentId: 'sfdr-navigator'
  }
];

const mockTasks: AgentTask[] = [
  {
    id: 'task-1',
    title: 'Review PAI Calculations',
    description: 'Review Principal Adverse Impact calculations for Article 8 funds',
    status: 'in_progress',
    priority: 'high',
    assignedAgent: 'sfdr-navigator',
    createdAt: '2024-12-10T08:00:00Z',
    dueDate: '2024-12-12T17:00:00Z',
    progress: 65
  }
];

export const useAgents = (): UseAgentsReturn => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [insights, setInsights] = useState<AgentInsight[]>([]);
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [errors, setErrors] = useState<AgentError[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeAgents = agents.filter(agent => agent.isActivated);

  const fetchAgents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAgents(mockAgents);
      setInsights(mockInsights);
      setTasks(mockTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch agents');
      console.error('Error fetching agents:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const activateAgent = useCallback(async (agentId: string) => {
    try {
      setAgents(prev => prev.map(agent => 
        agent.id === agentId 
          ? { ...agent, isActivated: true, status: 'active' }
          : agent
      ));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log(`Agent ${agentId} activated successfully`);
    } catch (err) {
      console.error(`Error activating agent ${agentId}:`, err);
      throw err;
    }
  }, []);

  const deactivateAgent = useCallback(async (agentId: string) => {
    try {
      setAgents(prev => prev.map(agent => 
        agent.id === agentId 
          ? { ...agent, isActivated: false, status: 'inactive' }
          : agent
      ));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log(`Agent ${agentId} deactivated successfully`);
    } catch (err) {
      console.error(`Error deactivating agent ${agentId}:`, err);
      throw err;
    }
  }, []);

  const refreshAgents = useCallback(async () => {
    await fetchAgents();
  }, [fetchAgents]);

  const getAgentById = useCallback((agentId: string): Agent | undefined => {
    return agents.find(agent => agent.id === agentId);
  }, [agents]);

  const getAgentInsights = useCallback((agentId: string): AgentInsight[] => {
    return insights.filter(insight => insight.agentId === agentId);
  }, [insights]);

  const getAgentTasks = useCallback((agentId: string): AgentTask[] => {
    return tasks.filter(task => task.assignedAgent === agentId);
  }, [tasks]);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  return {
    agents,
    activeAgents,
    insights,
    tasks,
    errors,
    loading,
    error,
    activateAgent,
    deactivateAgent,
    refreshAgents,
    getAgentById,
    getAgentInsights,
    getAgentTasks
  };
};