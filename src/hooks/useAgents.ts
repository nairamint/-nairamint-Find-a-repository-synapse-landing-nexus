import { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  agentService, 
  Agent, 
  AgentTask, 
  RegulatoryUpdate, 
  AgentMetrics,
  CreateAgentRequest,
  UpdateAgentRequest,
  CreateTaskRequest,
  AgentServiceError 
} from '@/services/agentService';
import { useToast } from '@/hooks/use-toast';

// Query keys for React Query
export const agentQueryKeys = {
  all: ['agents'] as const,
  lists: () => [...agentQueryKeys.all, 'list'] as const,
  list: (filters: string) => [...agentQueryKeys.lists(), { filters }] as const,
  details: () => [...agentQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...agentQueryKeys.details(), id] as const,
  tasks: () => [...agentQueryKeys.all, 'tasks'] as const,
  task: (id: string) => [...agentQueryKeys.tasks(), id] as const,
  updates: () => [...agentQueryKeys.all, 'updates'] as const,
  metrics: () => [...agentQueryKeys.all, 'metrics'] as const,
};

export const useAgents = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const subscriptionRef = useRef<any>(null);

  // Fetch all agents
  const {
    data: agents = [],
    isLoading: agentsLoading,
    error: agentsError,
    refetch: refetchAgents,
  } = useQuery({
    queryKey: agentQueryKeys.lists(),
    queryFn: () => agentService.getAgents(),
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: false,
  });

  // Fetch metrics
  const {
    data: metrics,
    isLoading: metricsLoading,
    error: metricsError,
    refetch: refetchMetrics,
  } = useQuery({
    queryKey: agentQueryKeys.metrics(),
    queryFn: () => agentService.getMetrics(),
    staleTime: 60000, // 1 minute
    refetchOnWindowFocus: false,
  });

  // Fetch tasks
  const {
    data: tasks = [],
    isLoading: tasksLoading,
    error: tasksError,
    refetch: refetchTasks,
  } = useQuery({
    queryKey: agentQueryKeys.tasks(),
    queryFn: () => agentService.getTasks(),
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: false,
  });

  // Fetch regulatory updates
  const {
    data: updates = [],
    isLoading: updatesLoading,
    error: updatesError,
    refetch: refetchUpdates,
  } = useQuery({
    queryKey: agentQueryKeys.updates(),
    queryFn: () => agentService.getRegulatoryUpdates(),
    staleTime: 300000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Create agent mutation
  const createAgentMutation = useMutation({
    mutationFn: (request: CreateAgentRequest) => agentService.createAgent(request),
    onSuccess: (newAgent) => {
      queryClient.setQueryData(agentQueryKeys.lists(), (old: Agent[] = []) => [newAgent, ...old]);
      toast({
        title: "Success",
        description: `Agent "${newAgent.name}" created successfully`,
      });
    },
    onError: (error: AgentServiceError) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create agent",
        variant: "destructive",
      });
    },
  });

  // Update agent mutation
  const updateAgentMutation = useMutation({
    mutationFn: ({ id, request }: { id: string; request: UpdateAgentRequest }) =>
      agentService.updateAgent(id, request),
    onSuccess: (updatedAgent) => {
      queryClient.setQueryData(agentQueryKeys.lists(), (old: Agent[] = []) =>
        old.map(agent => agent.id === updatedAgent.id ? updatedAgent : agent)
      );
      queryClient.setQueryData(agentQueryKeys.detail(updatedAgent.id), updatedAgent);
      toast({
        title: "Success",
        description: `Agent "${updatedAgent.name}" updated successfully`,
      });
    },
    onError: (error: AgentServiceError) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update agent",
        variant: "destructive",
      });
    },
  });

  // Delete agent mutation
  const deleteAgentMutation = useMutation({
    mutationFn: (id: string) => agentService.deleteAgent(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(agentQueryKeys.lists(), (old: Agent[] = []) =>
        old.filter(agent => agent.id !== deletedId)
      );
      queryClient.removeQueries({ queryKey: agentQueryKeys.detail(deletedId) });
      toast({
        title: "Success",
        description: "Agent deleted successfully",
      });
    },
    onError: (error: AgentServiceError) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete agent",
        variant: "destructive",
      });
    },
  });

  // Start agent mutation
  const startAgentMutation = useMutation({
    mutationFn: (id: string) => agentService.startAgent(id),
    onSuccess: (updatedAgent) => {
      queryClient.setQueryData(agentQueryKeys.lists(), (old: Agent[] = []) =>
        old.map(agent => agent.id === updatedAgent.id ? updatedAgent : agent)
      );
      queryClient.setQueryData(agentQueryKeys.detail(updatedAgent.id), updatedAgent);
      toast({
        title: "Success",
        description: `Agent "${updatedAgent.name}" started successfully`,
      });
    },
    onError: (error: AgentServiceError) => {
      toast({
        title: "Error",
        description: error.message || "Failed to start agent",
        variant: "destructive",
      });
    },
  });

  // Stop agent mutation
  const stopAgentMutation = useMutation({
    mutationFn: (id: string) => agentService.stopAgent(id),
    onSuccess: (updatedAgent) => {
      queryClient.setQueryData(agentQueryKeys.lists(), (old: Agent[] = []) =>
        old.map(agent => agent.id === updatedAgent.id ? updatedAgent : agent)
      );
      queryClient.setQueryData(agentQueryKeys.detail(updatedAgent.id), updatedAgent);
      toast({
        title: "Success",
        description: `Agent "${updatedAgent.name}" stopped successfully`,
      });
    },
    onError: (error: AgentServiceError) => {
      toast({
        title: "Error",
        description: error.message || "Failed to stop agent",
        variant: "destructive",
      });
    },
  });

  // Restart agent mutation
  const restartAgentMutation = useMutation({
    mutationFn: (id: string) => agentService.restartAgent(id),
    onSuccess: (updatedAgent) => {
      queryClient.setQueryData(agentQueryKeys.lists(), (old: Agent[] = []) =>
        old.map(agent => agent.id === updatedAgent.id ? updatedAgent : agent)
      );
      queryClient.setQueryData(agentQueryKeys.detail(updatedAgent.id), updatedAgent);
      toast({
        title: "Success",
        description: `Agent "${updatedAgent.name}" restarted successfully`,
      });
    },
    onError: (error: AgentServiceError) => {
      toast({
        title: "Error",
        description: error.message || "Failed to restart agent",
        variant: "destructive",
      });
    },
  });

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: (request: CreateTaskRequest) => agentService.createTask(request),
    onSuccess: (newTask) => {
      queryClient.setQueryData(agentQueryKeys.tasks(), (old: AgentTask[] = []) => [newTask, ...old]);
      toast({
        title: "Success",
        description: `Task "${newTask.title}" created successfully`,
      });
    },
    onError: (error: AgentServiceError) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create task",
        variant: "destructive",
      });
    },
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<AgentTask> }) =>
      agentService.updateTask(id, updates),
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(agentQueryKeys.tasks(), (old: AgentTask[] = []) =>
        old.map(task => task.id === updatedTask.id ? updatedTask : task)
      );
      queryClient.setQueryData(agentQueryKeys.task(updatedTask.id), updatedTask);
      toast({
        title: "Success",
        description: `Task "${updatedTask.title}" updated successfully`,
      });
    },
    onError: (error: AgentServiceError) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update task",
        variant: "destructive",
      });
    },
  });

  // Real-time subscriptions
  useEffect(() => {
    // Subscribe to agent updates
    subscriptionRef.current = agentService.subscribeToAgentUpdates((updatedAgent) => {
      queryClient.setQueryData(agentQueryKeys.lists(), (old: Agent[] = []) =>
        old.map(agent => agent.id === updatedAgent.id ? updatedAgent : agent)
      );
      queryClient.setQueryData(agentQueryKeys.detail(updatedAgent.id), updatedAgent);
    });

    // Subscribe to task updates
    const taskSubscription = agentService.subscribeToTaskUpdates((updatedTask) => {
      queryClient.setQueryData(agentQueryKeys.tasks(), (old: AgentTask[] = []) =>
        old.map(task => task.id === updatedTask.id ? updatedTask : task)
      );
      queryClient.setQueryData(agentQueryKeys.task(updatedTask.id), updatedTask);
    });

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
      if (taskSubscription) {
        taskSubscription.unsubscribe();
      }
    };
  }, [queryClient]);

  // Utility functions
  const getAgentById = useCallback((id: string) => {
    return agents.find(agent => agent.id === id);
  }, [agents]);

  const getTasksByAgentId = useCallback((agentId: string) => {
    return tasks.filter(task => task.agentId === agentId);
  }, [tasks]);

  const getActiveAgents = useCallback(() => {
    return agents.filter(agent => agent.status === 'active');
  }, [agents]);

  const getAgentsByType = useCallback((type: Agent['type']) => {
    return agents.filter(agent => agent.type === type);
  }, [agents]);

  const isLoading = agentsLoading || metricsLoading || tasksLoading || updatesLoading;
  const hasError = agentsError || metricsError || tasksError || updatesError;

  return {
    // Data
    agents,
    metrics,
    tasks,
    updates,
    
    // Loading states
    isLoading,
    agentsLoading,
    metricsLoading,
    tasksLoading,
    updatesLoading,
    
    // Error states
    hasError,
    agentsError,
    metricsError,
    tasksError,
    updatesError,
    
    // Mutations
    createAgent: createAgentMutation.mutate,
    updateAgent: updateAgentMutation.mutate,
    deleteAgent: deleteAgentMutation.mutate,
    startAgent: startAgentMutation.mutate,
    stopAgent: stopAgentMutation.mutate,
    restartAgent: restartAgentMutation.mutate,
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    
    // Mutation states
    isCreatingAgent: createAgentMutation.isPending,
    isUpdatingAgent: updateAgentMutation.isPending,
    isDeletingAgent: deleteAgentMutation.isPending,
    isStartingAgent: startAgentMutation.isPending,
    isStoppingAgent: stopAgentMutation.isPending,
    isRestartingAgent: restartAgentMutation.isPending,
    isCreatingTask: createTaskMutation.isPending,
    isUpdatingTask: updateTaskMutation.isPending,
    
    // Refetch functions
    refetchAgents,
    refetchMetrics,
    refetchTasks,
    refetchUpdates,
    
    // Utility functions
    getAgentById,
    getTasksByAgentId,
    getActiveAgents,
    getAgentsByType,
  };
};

// Hook for a single agent
export const useAgent = (id: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    data: agent,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: agentQueryKeys.detail(id),
    queryFn: () => agentService.getAgent(id),
    enabled: !!id,
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: false,
  });

  const updateAgentMutation = useMutation({
    mutationFn: (request: UpdateAgentRequest) => agentService.updateAgent(id, request),
    onSuccess: (updatedAgent) => {
      queryClient.setQueryData(agentQueryKeys.detail(id), updatedAgent);
      queryClient.setQueryData(agentQueryKeys.lists(), (old: Agent[] = []) =>
        old.map(agent => agent.id === id ? updatedAgent : agent)
      );
      toast({
        title: "Success",
        description: `Agent "${updatedAgent.name}" updated successfully`,
      });
    },
    onError: (error: AgentServiceError) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update agent",
        variant: "destructive",
      });
    },
  });

  const startAgentMutation = useMutation({
    mutationFn: () => agentService.startAgent(id),
    onSuccess: (updatedAgent) => {
      queryClient.setQueryData(agentQueryKeys.detail(id), updatedAgent);
      queryClient.setQueryData(agentQueryKeys.lists(), (old: Agent[] = []) =>
        old.map(agent => agent.id === id ? updatedAgent : agent)
      );
      toast({
        title: "Success",
        description: `Agent "${updatedAgent.name}" started successfully`,
      });
    },
    onError: (error: AgentServiceError) => {
      toast({
        title: "Error",
        description: error.message || "Failed to start agent",
        variant: "destructive",
      });
    },
  });

  const stopAgentMutation = useMutation({
    mutationFn: () => agentService.stopAgent(id),
    onSuccess: (updatedAgent) => {
      queryClient.setQueryData(agentQueryKeys.detail(id), updatedAgent);
      queryClient.setQueryData(agentQueryKeys.lists(), (old: Agent[] = []) =>
        old.map(agent => agent.id === id ? updatedAgent : agent)
      );
      toast({
        title: "Success",
        description: `Agent "${updatedAgent.name}" stopped successfully`,
      });
    },
    onError: (error: AgentServiceError) => {
      toast({
        title: "Error",
        description: error.message || "Failed to stop agent",
        variant: "destructive",
      });
    },
  });

  return {
    agent,
    isLoading,
    error,
    refetch,
    updateAgent: updateAgentMutation.mutate,
    startAgent: startAgentMutation.mutate,
    stopAgent: stopAgentMutation.mutate,
    isUpdating: updateAgentMutation.isPending,
    isStarting: startAgentMutation.isPending,
    isStopping: stopAgentMutation.isPending,
  };
};

// Hook for a single task
export const useTask = (id: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    data: task,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: agentQueryKeys.task(id),
    queryFn: () => agentService.getTask(id),
    enabled: !!id,
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: false,
  });

  const updateTaskMutation = useMutation({
    mutationFn: (updates: Partial<AgentTask>) => agentService.updateTask(id, updates),
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(agentQueryKeys.task(id), updatedTask);
      queryClient.setQueryData(agentQueryKeys.tasks(), (old: AgentTask[] = []) =>
        old.map(task => task.id === id ? updatedTask : task)
      );
      toast({
        title: "Success",
        description: `Task "${updatedTask.title}" updated successfully`,
      });
    },
    onError: (error: AgentServiceError) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update task",
        variant: "destructive",
      });
    },
  });

  return {
    task,
    isLoading,
    error,
    refetch,
    updateTask: updateTaskMutation.mutate,
    isUpdating: updateTaskMutation.isPending,
  };
};