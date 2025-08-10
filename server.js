const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static('public'));

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

// Простая авторизация для админки
function basicAuth(req, res, next) {
  // Проверяем, что переменные окружения установлены
  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
    return res.status(500).json({
      error: 'Configuration error',
      message: 'Admin username and password must be set'
    });
  }
  
  const auth = req.headers.authorization;
  
  if (!auth || !auth.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).send('Authentication required');
  }
  
  const credentials = Buffer.from(auth.slice(6), 'base64').toString().split(':');
  const username = credentials[0];
  const password = credentials[1];
  
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
    res.status(401).send('Invalid credentials');
  }
}

// Админская страница со списком лидов
app.get('/admin', basicAuth, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, email, phone, company, source, 
             utm_source, utm_medium, utm_campaign, 
             status, ip_address, created_at
      FROM leads 
      ORDER BY created_at DESC
    `);
    
    const leads = result.rows;
    
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Zen Pipeline - Admin</title>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { border-collapse: collapse; width: 100%; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            .stats { display: flex; gap: 20px; margin-bottom: 20px; }
            .stat-card { padding: 15px; background: #f5f5f5; border-radius: 5px; }
            .status-new { color: #007bff; }
            .status-contacted { color: #28a745; }
            .status-converted { color: #dc3545; }
        </style>
    </head>
    <body>
        <h1>Zen Pipeline - Админка</h1>
        
        <div class="stats">
            <div class="stat-card">
                <strong>Всего лидов:</strong> ${leads.length}
            </div>
            <div class="stat-card">
                <strong>Новых:</strong> ${leads.filter(l => l.status === 'new').length}
            </div>
            <div class="stat-card">
                <strong>Контактировали:</strong> ${leads.filter(l => l.status === 'contacted').length}
            </div>
            <div class="stat-card">
                <strong>Конвертировали:</strong> ${leads.filter(l => l.status === 'converted').length}
            </div>
        </div>
        
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Дата</th>
                    <th>Имя</th>
                    <th>Email</th>
                    <th>Телефон</th>
                    <th>Компания</th>
                    <th>UTM Source</th>
                    <th>Статус</th>
                    <th>IP</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                ${leads.map(lead => `
                    <tr>
                        <td>${lead.id}</td>
                        <td>${new Date(lead.created_at).toLocaleString('ru-RU')}</td>
                        <td>${lead.name || '-'}</td>
                        <td>${lead.email}</td>
                        <td>${lead.phone || '-'}</td>
                        <td>${lead.company || '-'}</td>
                        <td>${lead.utm_source || '-'}</td>
                        <td><span class="status-${lead.status}">${lead.status}</span></td>
                        <td>${lead.ip_address || '-'}</td>
                        <td>
                          <button class="btn-delete" data-id="${lead.id}" style="color:#dc3545;cursor:pointer;background:none;border:1px solid #dc3545;padding:4px 8px;border-radius:4px">Удалить</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <p style="margin-top: 30px; color: #666;">
            Для выхода закройте браузер или очистите кэш
        </p>

        <script>
          document.addEventListener('DOMContentLoaded', function () {
            function handleDeleteClick(event) {
              const button = event.target.closest('.btn-delete');
              if (!button) return;
              const id = button.getAttribute('data-id');
              if (!id) return;
              if (!confirm('Удалить лид #' + id + ' безвозвратно?')) return;
              fetch('/admin/api/leads/' + id, { method: 'DELETE' })
                .then(async (res) => {
                  if (!res.ok) {
                    const data = await res.json().catch(() => ({}));
                    const msg = data && data.error ? data.error : 'Ошибка удаления';
                    throw new Error(msg);
                  }
                  // remove row
                  const row = button.closest('tr');
                  if (row && row.parentNode) row.parentNode.removeChild(row);
                })
                .catch((err) => {
                  alert('Не удалось удалить: ' + err.message);
                });
            }
            document.body.addEventListener('click', handleDeleteClick);
          });
        </script>
    </body>
    </html>
    `;
    
    res.send(html);
    
  } catch (error) {
    console.error('Error in admin panel:', error);
    res.status(500).send('Database error');
  }
});

// API для обновления статуса лида
app.put('/admin/api/leads/:id/status', basicAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['new', 'contacted', 'converted'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const updateQuery = `
      UPDATE leads 
      SET status = $1, updated_at = NOW(),
          contacted_at = CASE WHEN $1 = 'contacted' AND contacted_at IS NULL THEN NOW() ELSE contacted_at END,
          converted_at = CASE WHEN $1 = 'converted' AND converted_at IS NULL THEN NOW() ELSE converted_at END
      WHERE id = $2
      RETURNING *
    `;
    
    const result = await pool.query(updateQuery, [status, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    
    res.json({ success: true, lead: result.rows[0] });
    
  } catch (error) {
    console.error('Error updating lead status:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Удаление лида
app.delete('/admin/api/leads/:id', basicAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM leads WHERE id = $1 RETURNING id', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: {
      commit: process.env.GIT_COMMIT || 'unknown',
      branch: process.env.GIT_BRANCH || 'unknown',
      buildTime: process.env.BUILD_TIME || 'unknown',
      version: process.env.APP_VERSION || '1.0.0'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Landing server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
}); 