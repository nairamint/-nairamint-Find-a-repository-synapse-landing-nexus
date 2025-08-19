import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AgentCard } from '../AgentCard';
import { Agent } from '@/types/agent';

// Mock agent data for testing
const mockAgent: Agent = {
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
};

const mockActivateAgent = jest.fn();
const mockViewDetails = jest.fn();

describe('AgentCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders agent information correctly', () => {
    render(
      <AgentCard
        agent={mockAgent}
        onActivate={mockActivateAgent}
        onViewDetails={mockViewDetails}
      />
    );

    expect(screen.getByText('SFDR Navigator')).toBeInTheDocument();
    expect(screen.getByText('Intelligent SFDR compliance navigation and guidance')).toBeInTheDocument();
    expect(screen.getByText('Compliance')).toBeInTheDocument();
    expect(screen.getByText('SFDR')).toBeInTheDocument();
    expect(screen.getByText('94%')).toBeInTheDocument();
    expect(screen.getByText('24')).toBeInTheDocument();
  });

  it('shows recommended badge when agent is recommended', () => {
    render(
      <AgentCard
        agent={mockAgent}
        onActivate={mockActivateAgent}
        onViewDetails={mockViewDetails}
      />
    );

    expect(screen.getByText('Recommended')).toBeInTheDocument();
  });

  it('shows active badge when agent is activated', () => {
    render(
      <AgentCard
        agent={mockAgent}
        onActivate={mockActivateAgent}
        onViewDetails={mockViewDetails}
      />
    );

    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('shows error badge when agent has error status', () => {
    const errorAgent = { ...mockAgent, status: 'error' as const };
    
    render(
      <AgentCard
        agent={errorAgent}
        onActivate={mockActivateAgent}
        onViewDetails={mockViewDetails}
      />
    );

    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('calls onViewDetails when Open Tasks button is clicked', () => {
    render(
      <AgentCard
        agent={mockAgent}
        onActivate={mockActivateAgent}
        onViewDetails={mockViewDetails}
      />
    );

    const openTasksButton = screen.getByText('Open Tasks');
    fireEvent.click(openTasksButton);

    expect(mockViewDetails).toHaveBeenCalledWith('sfdr-navigator');
  });

  it('shows Activate Agent button when agent is not activated', () => {
    const inactiveAgent = { ...mockAgent, isActivated: false };
    
    render(
      <AgentCard
        agent={inactiveAgent}
        onActivate={mockActivateAgent}
        onViewDetails={mockViewDetails}
      />
    );

    expect(screen.getByText('Activate Agent')).toBeInTheDocument();
  });

  it('calls onActivate when Activate Agent button is clicked', async () => {
    const inactiveAgent = { ...mockAgent, isActivated: false };
    
    render(
      <AgentCard
        agent={inactiveAgent}
        onActivate={mockActivateAgent}
        onViewDetails={mockViewDetails}
      />
    );

    const activateButton = screen.getByText('Activate Agent');
    fireEvent.click(activateButton);

    await waitFor(() => {
      expect(mockActivateAgent).toHaveBeenCalledWith('sfdr-navigator');
    });
  });

  it('shows loading state when loading prop is true', () => {
    const inactiveAgent = { ...mockAgent, isActivated: false };
    
    render(
      <AgentCard
        agent={inactiveAgent}
        onActivate={mockActivateAgent}
        onViewDetails={mockViewDetails}
        loading={true}
      />
    );

    expect(screen.getByText('Activating...')).toBeInTheDocument();
  });

  it('displays use cases correctly', () => {
    render(
      <AgentCard
        agent={mockAgent}
        onActivate={mockActivateAgent}
        onViewDetails={mockViewDetails}
      />
    );

    expect(screen.getByText('Article 8/9 Classification')).toBeInTheDocument();
    expect(screen.getByText('Automated classification of financial products under SFDR')).toBeInTheDocument();
    expect(screen.getByText('15-30 minutes')).toBeInTheDocument();
  });

  it('displays version and last updated information', () => {
    render(
      <AgentCard
        agent={mockAgent}
        onActivate={mockActivateAgent}
        onViewDetails={mockViewDetails}
      />
    );

    expect(screen.getByText('v2.1.0')).toBeInTheDocument();
    // Note: Date formatting depends on locale, so we test for the presence of the date
    expect(screen.getByText(/12\/10\/2024/)).toBeInTheDocument();
  });
});