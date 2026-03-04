/**
 * Sidecar API - Express + PostgreSQL
 * Simple backend for form submissions
 */

const express = require('express');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection (Supabase)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Email setup (Gmail)
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Handle form submission
app.post('/submit', async (req, res) => {
  try {
    const { name, email, phone, business, website, challenge } = req.body;
    
    // 1. Save to database
    const result = await pool.query(
      `INSERT INTO leads (name, email, phone, business, website, challenge, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, 'New Lead', NOW())
       RETURNING id`,
      [name, email, phone, business, website, challenge]
    );
    
    const leadId = result.rows[0].id;
    
    // 2. Send notification to you
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `🎯 New Lead: ${business}`,
      text: `
New audit request:

Name: ${name}
Email: ${email}
Phone: ${phone}
Business: ${business}
Website: ${website}
Challenge: ${challenge}

Time: ${new Date().toLocaleString()}
      `
    });
    
    // 3. Send confirmation to lead
    await transporter.sendMail({
      from: `"Martin from Sidecar" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `${name}, your audit is generating...`,
      text: `Hey ${name},

Thanks for requesting a free website audit for ${business}.

Your audit is being generated and will arrive in 5-10 minutes.

— Martin
Sidecar: Your growth co-pilot`,
      replyTo: process.env.EMAIL_USER
    });
    
    // 4. Redirect to thank you page
    res.redirect('https://sidecar-landing-production.up.railway.app/thank-you.html');
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing submission');
  }
});

// Health check
app.get('/', (req, res) => {
  res.send('Sidecar API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Create table on startup
pool.query(`
  CREATE TABLE IF NOT EXISTS leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    business VARCHAR(255),
    website VARCHAR(255),
    challenge TEXT,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
  )
`).then(() => {
  console.log('Database table ready');
}).catch(err => {
  console.error('Database error:', err);
});
