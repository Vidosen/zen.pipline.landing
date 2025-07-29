-- PostgreSQL initialization script
-- Note: Database and user are created by environment variables in docker-compose.yml

-- The database 'zen_pipeline' and user 'zen_api' are already created by PostgreSQL container
-- We just need to set up the tables and permissions

-- Grant schema permissions
GRANT ALL ON SCHEMA public TO zen_api;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO zen_api;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO zen_api;

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    source VARCHAR(100) DEFAULT 'landing-page',
    ip_address INET,
    
    -- UTM tracking
    utm_source VARCHAR(255),
    utm_medium VARCHAR(255),
    utm_campaign VARCHAR(255),
    utm_content VARCHAR(255),
    utm_term VARCHAR(255),
    
    -- Status tracking
    status VARCHAR(50) DEFAULT 'new',
    notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    contacted_at TIMESTAMP WITH TIME ZONE,
    converted_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);

-- Grant permissions on the leads table
GRANT ALL PRIVILEGES ON leads TO zen_api;
GRANT USAGE, SELECT ON SEQUENCE leads_id_seq TO zen_api; 