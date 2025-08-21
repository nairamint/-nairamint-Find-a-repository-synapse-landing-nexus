import { supabase } from '@/integrations/supabase/client';

// Types
export interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'error' | 'loading';
  type: 'sfdr-navigator' | 'csrd-monitor' | 'taxonomy-classifier' | 'aml-checker';
  lastActivity: string;
  efficiency: number;
  tasksCompleted: number;
  currentTask?: string;
  configuration: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface AgentTask {
  id: string;
  agentId: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  dueDate: string;
  progress: number;
  result?: any;
  error?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegulatoryUpdate {
  id: string;
  title: string;
  summary: string;
  impact: 'high' | 'medium' | 'low';
  source: string;
  publishedDate: string;
  actionRequired: boolean;
  deadline?: string;
  affectedAgents: string[];
  tags: string[];
  createdAt: string;
}

export interface AgentMetrics {
  totalTasks: number;
  completedTasks: number;
  successRate: number;
  averageResponseTime: number;
  activeAgents: number;
  complianceScore: number;
  lastUpdated: string;
}

export interface CreateAgentRequest {
  name: string;
  description: string;
  type: Agent['type'];
  configuration: Record<string, any>;
}

export interface UpdateAgentRequest {
  name?: string;
  description?: string;
  configuration?: Record<string, any>;
}

export interface CreateTaskRequest {
  agentId: string;
  title: string;
  description: string;
  priority: AgentTask['priority'];
  dueDate: string;
}

// Error handling
export class AgentServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'AgentServiceError';
  }
}

// Service class
export class AgentService {
  private static instance: AgentService;

  private constructor() {}

  public static getInstance(): AgentService {
    if (!AgentService.instance) {
      AgentService.instance = new AgentService();
    }
    return AgentService.instance;
  }

  // Agent Management
  async getAgents(): Promise<Agent[]> {
    try {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .order('createdAt', { ascending: false });

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error fetching agents:', error);
      throw new AgentServiceError(
        'Failed to fetch agents',
        500,
        'FETCH_AGENTS_ERROR'
      );
    }
  }

  async getAgent(id: string): Promise<Agent> {
    try {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) {
        throw new AgentServiceError('Agent not found', 404, 'AGENT_NOT_FOUND');
      }

      return data;
    } catch (error) {
      console.error('Error fetching agent:', error);
      if (error instanceof AgentServiceError) throw error;
      throw new AgentServiceError(
        'Failed to fetch agent',
        500,
        'FETCH_AGENT_ERROR'
      );
    }
  }

  async createAgent(request: CreateAgentRequest): Promise<Agent> {
    try {
      const { data, error } = await supabase
        .from('agents')
        .insert([{
          ...request,
          status: 'inactive',
          efficiency: 0,
          tasksCompleted: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }])
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error creating agent:', error);
      throw new AgentServiceError(
        'Failed to create agent',
        500,
        'CREATE_AGENT_ERROR'
      );
    }
  }

  async updateAgent(id: string, request: UpdateAgentRequest): Promise<Agent> {
    try {
      const { data, error } = await supabase
        .from('agents')
        .update({
          ...request,
          updatedAt: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!data) {
        throw new AgentServiceError('Agent not found', 404, 'AGENT_NOT_FOUND');
      }

      return data;
    } catch (error) {
      console.error('Error updating agent:', error);
      if (error instanceof AgentServiceError) throw error;
      throw new AgentServiceError(
        'Failed to update agent',
        500,
        'UPDATE_AGENT_ERROR'
      );
    }
  }

  async deleteAgent(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('agents')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting agent:', error);
      throw new AgentServiceError(
        'Failed to delete agent',
        500,
        'DELETE_AGENT_ERROR'
      );
    }
  }

  // Agent Actions
  async startAgent(id: string): Promise<Agent> {
    try {
      const { data, error } = await supabase
        .from('agents')
        .update({
          status: 'active',
          updatedAt: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!data) {
        throw new AgentServiceError('Agent not found', 404, 'AGENT_NOT_FOUND');
      }

      return data;
    } catch (error) {
      console.error('Error starting agent:', error);
      if (error instanceof AgentServiceError) throw error;
      throw new AgentServiceError(
        'Failed to start agent',
        500,
        'START_AGENT_ERROR'
      );
    }
  }

  async stopAgent(id: string): Promise<Agent> {
    try {
      const { data, error } = await supabase
        .from('agents')
        .update({
          status: 'inactive',
          currentTask: null,
          updatedAt: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!data) {
        throw new AgentServiceError('Agent not found', 404, 'AGENT_NOT_FOUND');
      }

      return data;
    } catch (error) {
      console.error('Error stopping agent:', error);
      if (error instanceof AgentServiceError) throw error;
      throw new AgentServiceError(
        'Failed to stop agent',
        500,
        'STOP_AGENT_ERROR'
      );
    }
  }

  async restartAgent(id: string): Promise<Agent> {
    try {
      // First stop the agent
      await this.stopAgent(id);
      
      // Then start it again
      return await this.startAgent(id);
    } catch (error) {
      console.error('Error restarting agent:', error);
      if (error instanceof AgentServiceError) throw error;
      throw new AgentServiceError(
        'Failed to restart agent',
        500,
        'RESTART_AGENT_ERROR'
      );
    }
  }

  // Task Management
  async getTasks(agentId?: string): Promise<AgentTask[]> {
    try {
      let query = supabase
        .from('agent_tasks')
        .select('*')
        .order('createdAt', { ascending: false });

      if (agentId) {
        query = query.eq('agentId', agentId);
      }

      const { data, error } = await query;

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw new AgentServiceError(
        'Failed to fetch tasks',
        500,
        'FETCH_TASKS_ERROR'
      );
    }
  }

  async getTask(id: string): Promise<AgentTask> {
    try {
      const { data, error } = await supabase
        .from('agent_tasks')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) {
        throw new AgentServiceError('Task not found', 404, 'TASK_NOT_FOUND');
      }

      return data;
    } catch (error) {
      console.error('Error fetching task:', error);
      if (error instanceof AgentServiceError) throw error;
      throw new AgentServiceError(
        'Failed to fetch task',
        500,
        'FETCH_TASK_ERROR'
      );
    }
  }

  async createTask(request: CreateTaskRequest): Promise<AgentTask> {
    try {
      const { data, error } = await supabase
        .from('agent_tasks')
        .insert([{
          ...request,
          status: 'pending',
          progress: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }])
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw new AgentServiceError(
        'Failed to create task',
        500,
        'CREATE_TASK_ERROR'
      );
    }
  }

  async updateTask(id: string, updates: Partial<AgentTask>): Promise<AgentTask> {
    try {
      const { data, error } = await supabase
        .from('agent_tasks')
        .update({
          ...updates,
          updatedAt: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!data) {
        throw new AgentServiceError('Task not found', 404, 'TASK_NOT_FOUND');
      }

      return data;
    } catch (error) {
      console.error('Error updating task:', error);
      if (error instanceof AgentServiceError) throw error;
      throw new AgentServiceError(
        'Failed to update task',
        500,
        'UPDATE_TASK_ERROR'
      );
    }
  }

  // Regulatory Updates
  async getRegulatoryUpdates(): Promise<RegulatoryUpdate[]> {
    try {
      const { data, error } = await supabase
        .from('regulatory_updates')
        .select('*')
        .order('publishedDate', { ascending: false });

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error fetching regulatory updates:', error);
      throw new AgentServiceError(
        'Failed to fetch regulatory updates',
        500,
        'FETCH_UPDATES_ERROR'
      );
    }
  }

  // Metrics
  async getMetrics(): Promise<AgentMetrics> {
    try {
      // Get agents count
      const { data: agents, error: agentsError } = await supabase
        .from('agents')
        .select('status');

      if (agentsError) throw agentsError;

      // Get tasks count
      const { data: tasks, error: tasksError } = await supabase
        .from('agent_tasks')
        .select('status');

      if (tasksError) throw tasksError;

      // Calculate metrics
      const activeAgents = agents?.filter(a => a.status === 'active').length || 0;
      const totalTasks = tasks?.length || 0;
      const completedTasks = tasks?.filter(t => t.status === 'completed').length || 0;
      const successRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

      const metrics: AgentMetrics = {
        totalTasks,
        completedTasks,
        successRate: Math.round(successRate * 10) / 10,
        averageResponseTime: 2.3, // This would be calculated from actual data
        activeAgents,
        complianceScore: 87.5, // This would be calculated from actual data
        lastUpdated: new Date().toISOString(),
      };

      return metrics;
    } catch (error) {
      console.error('Error fetching metrics:', error);
      throw new AgentServiceError(
        'Failed to fetch metrics',
        500,
        'FETCH_METRICS_ERROR'
      );
    }
  }

  // Real-time subscriptions
  subscribeToAgentUpdates(callback: (agent: Agent) => void) {
    return supabase
      .channel('agent_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'agents',
        },
        (payload) => {
          callback(payload.new as Agent);
        }
      )
      .subscribe();
  }

  subscribeToTaskUpdates(callback: (task: AgentTask) => void) {
    return supabase
      .channel('task_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'agent_tasks',
        },
        (payload) => {
          callback(payload.new as AgentTask);
        }
      )
      .subscribe();
  }

  // Utility methods
  async healthCheck(): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('agents')
        .select('id')
        .limit(1);

      return !error;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const agentService = AgentService.getInstance();