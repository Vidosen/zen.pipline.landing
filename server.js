const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'zen_pipeline',
  user: process.env.DB_USER || 'zen_api',
  password: process.env.DB_PASSWORD || 'change-in-production-123'
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
    return;
  }
  console.log('Successfully connected to PostgreSQL');
  release();
});

// Create leads table if not exists
async function initDatabase() {
  const createTableQuery = `
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
    
    CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
    CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
    CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
    CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
  `;
  
  try {
    await pool.query(createTableQuery);
    console.log('Leads table ready');
  } catch (err) {
    console.error('Error creating leads table:', err);
  }
}

initDatabase();

// Обработчик заявок
app.post('/api/leads', async (req, res) => {
  try {
    const {
      name, email, phone, company,
      utm_source, utm_medium, utm_campaign, utm_content, utm_term
    } = req.body;
    
    const ip = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];

    const insertQuery = `
      INSERT INTO leads (
        name, email, phone, company, source, ip_address,
        utm_source, utm_medium, utm_campaign, utm_content, utm_term
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id, created_at
    `;
    
    const values = [
      name, email, phone, company, 'landing-page', ip,
      utm_source, utm_medium, utm_campaign, utm_content, utm_term
    ];
    
    const result = await pool.query(insertQuery, values);
    const lead = result.rows[0];
    
    console.log('Lead created successfully:', {
      id: lead.id,
      email: email,
      created_at: lead.created_at
    });
    
    res.json({ 
      success: true, 
      id: lead.id,
      message: 'Lead saved successfully'
    });
    
  } catch (error) {
    console.error('Error saving lead:', error);
    
    // Handle unique constraint violation (duplicate email)
    if (error.code === '23505') {
      return res.status(409).json({ 
        error: 'Email already exists',
        message: 'Этот email уже зарегистрирован'
      });
    }
    
    res.status(500).json({ 
      error: 'Database error',
      message: 'Ошибка сохранения данных'
    });
  }
});

// Эндпоинт для просмотра заявок (для отладки)
app.get('/api/leads', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, email, phone, company, source, 
             utm_source, utm_medium, utm_campaign, 
             status, created_at
      FROM leads 
      ORDER BY created_at DESC
      LIMIT 100
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Landing server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
}); 