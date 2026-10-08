const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/land_db',
});

// Routes
app.get('/api/health', (req, res) => res.json({ status: 'OK', timestamp: Date.now() }));

app.get('/api/land/:qrId', async (req, res) => {
  const { qrId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM land_records WHERE qr_code = $1', [qrId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Land record not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/dispute', async (req, res) => {
  const { qrId, reporterName, description, contact } = req.body;
  try {
    await pool.query(
      'INSERT INTO disputes (qr_id, reporter_name, description, contact, status, created_at) VALUES ($1,$2,$3,$4,$5,NOW())',
      [qrId, reporterName, description, contact, 'pending']
    );
    res.json({ success: true, message: 'Dispute registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register dispute' });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('✅ Land Mirror Backend running on port 3000');
});