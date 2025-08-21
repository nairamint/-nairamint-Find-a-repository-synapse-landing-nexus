-- Create agents table
CREATE TABLE IF NOT EXISTS agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'inactive' CHECK (status IN ('active', 'inactive', 'error', 'loading')),
    type VARCHAR(100) NOT NULL CHECK (type IN ('sfdr-navigator', 'csrd-monitor', 'taxonomy-classifier', 'aml-checker')),
    last_activity TIMESTAMP WITH TIME ZONE,
    efficiency DECIMAL(5,2) DEFAULT 0 CHECK (efficiency >= 0 AND efficiency <= 100),
    tasks_completed INTEGER DEFAULT 0 CHECK (tasks_completed >= 0),
    current_task TEXT,
    configuration JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create agent_tasks table
CREATE TABLE IF NOT EXISTS agent_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(50) NOT NULL DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed', 'failed')),
    due_date DATE NOT NULL,
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    result JSONB,
    error TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create regulatory_updates table
CREATE TABLE IF NOT EXISTS regulatory_updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    summary TEXT NOT NULL,
    impact VARCHAR(50) NOT NULL DEFAULT 'medium' CHECK (impact IN ('high', 'medium', 'low')),
    source VARCHAR(255) NOT NULL,
    published_date DATE NOT NULL,
    action_required BOOLEAN DEFAULT FALSE,
    deadline DATE,
    affected_agents TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status);
CREATE INDEX IF NOT EXISTS idx_agents_type ON agents(type);
CREATE INDEX IF NOT EXISTS idx_agents_created_at ON agents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_agent_id ON agent_tasks(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_status ON agent_tasks(status);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_priority ON agent_tasks(priority);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_due_date ON agent_tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_regulatory_updates_published_date ON regulatory_updates(published_date DESC);
CREATE INDEX IF NOT EXISTS idx_regulatory_updates_impact ON regulatory_updates(impact);
CREATE INDEX IF NOT EXISTS idx_regulatory_updates_action_required ON regulatory_updates(action_required);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agent_tasks_updated_at BEFORE UPDATE ON agent_tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO agents (name, description, status, type, last_activity, efficiency, tasks_completed, current_task, configuration) VALUES
('SFDR Navigator Agent', 'Intelligent agent for SFDR compliance monitoring and reporting', 'active', 'sfdr-navigator', NOW() - INTERVAL '2 minutes', 94.5, 127, 'Analyzing Article 8 compliance for Fund XYZ', '{"monitoring_frequency": "hourly", "alert_threshold": 0.8}'),
('CSRD Monitor Agent', 'Comprehensive CSRD materiality assessment and reporting agent', 'active', 'csrd-monitor', NOW() - INTERVAL '5 minutes', 87.2, 89, 'Materiality assessment for Q1 2025', '{"assessment_frequency": "daily", "reporting_cycle": "quarterly"}'),
('Taxonomy Classifier Agent', 'EU Taxonomy classification and alignment agent', 'inactive', 'taxonomy-classifier', NOW() - INTERVAL '1 hour', 92.1, 203, NULL, '{"classification_method": "automated", "review_required": true}'),
('AML Checker Agent', 'Anti-money laundering compliance monitoring agent', 'error', 'aml-checker', NOW() - INTERVAL '30 minutes', 78.9, 45, NULL, '{"risk_threshold": "medium", "scan_frequency": "real-time"}');

INSERT INTO agent_tasks (agent_id, title, description, priority, status, due_date, progress) VALUES
((SELECT id FROM agents WHERE name = 'SFDR Navigator Agent'), 'SFDR Article 8 Classification Review', 'Review and update classification for 12 funds based on new RTS requirements', 'high', 'in-progress', '2024-12-20', 65),
((SELECT id FROM agents WHERE name = 'CSRD Monitor Agent'), 'CSRD Double Materiality Assessment', 'Conduct comprehensive materiality assessment for 3 business segments', 'medium', 'pending', '2024-12-25', 0),
((SELECT id FROM agents WHERE name = 'Taxonomy Classifier Agent'), 'EU Taxonomy Alignment Review', 'Review taxonomy alignment for 8 investment portfolios', 'medium', 'completed', '2024-12-15', 100),
((SELECT id FROM agents WHERE name = 'SFDR Navigator Agent'), 'PAI Calculation Update', 'Update Principal Adverse Impact calculations for Article 8 funds', 'high', 'pending', '2024-12-22', 0);

INSERT INTO regulatory_updates (title, summary, impact, source, published_date, action_required, deadline, affected_agents, tags) VALUES
('New SFDR RTS Technical Standards', 'Commission Delegated Regulation (EU) 2022/1288 amendments affecting Article 8 fund classifications', 'high', 'EU Commission', '2024-12-15', true, '2024-12-30', ARRAY['sfdr-navigator'], ARRAY['SFDR', 'RTS', 'Article 8']),
('EFRAG Implementation Guidance Update', 'Updated guidance on financial materiality assessment methodology', 'medium', 'EFRAG', '2024-12-10', false, NULL, ARRAY['csrd-monitor'], ARRAY['CSRD', 'Materiality', 'EFRAG']),
('EU Taxonomy Climate Delegated Act Amendments', 'Updated climate criteria for taxonomy alignment assessment', 'medium', 'EU Commission', '2024-12-08', true, '2024-12-28', ARRAY['taxonomy-classifier'], ARRAY['Taxonomy', 'Climate', 'Alignment']),
('AML Directive 6 Updates', 'New requirements for enhanced due diligence procedures', 'high', 'EU Parliament', '2024-12-12', true, '2024-12-31', ARRAY['aml-checker'], ARRAY['AML', 'Due Diligence', 'Compliance']);

-- Enable Row Level Security (RLS)
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE regulatory_updates ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (basic read/write for authenticated users)
CREATE POLICY "Allow authenticated users to read agents" ON agents
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert agents" ON agents
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update agents" ON agents
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete agents" ON agents
    FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to read agent_tasks" ON agent_tasks
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert agent_tasks" ON agent_tasks
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update agent_tasks" ON agent_tasks
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete agent_tasks" ON agent_tasks
    FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to read regulatory_updates" ON regulatory_updates
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert regulatory_updates" ON regulatory_updates
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update regulatory_updates" ON regulatory_updates
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete regulatory_updates" ON regulatory_updates
    FOR DELETE USING (auth.role() = 'authenticated');