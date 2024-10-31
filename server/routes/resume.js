// server/routes/resume.js
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const authenticateToken = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'veedres',
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Create resume with enhanced validation and sections
router.post('/create', authenticateToken, async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const {
      title,
      personalInfo,
      objective,
      summary,
      experience,
      education,
      skills,
      certifications,
      languages,
      projects,
      publications,
      awards,
      volunteerWork,
      references,
      customSections
    } = req.body;

    // Validate required fields
    if (!personalInfo || !title) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await client.query(
      `INSERT INTO resumes (
        user_id,
        title,
        personal_info,
        objective,
        summary,
        experience,
        education,
        skills,
        certifications,
        languages,
        projects,
        publications,
        awards,
        volunteer_work,
        references,
        custom_sections,
        created_at,
        updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id`,
      [
        req.user.id,
        title,
        personalInfo,
        objective,
        summary,
        experience,
        education,
        skills,
        certifications,
        languages,
        projects,
        publications,
        awards,
        volunteerWork,
        references,
        customSections
      ]
    );

    await client.query('COMMIT');
    res.status(201).json({
      message: 'Resume created successfully',
      resumeId: result.rows[0].id
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Resume creation error:', error);
    res.status(500).json({ error: 'Failed to create resume' });
  } finally {
    client.release();
  }
});

// Get user's resumes with pagination and filters
router.get('/list', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'created_at', order = 'desc' } = req.query;
    const offset = (page - 1) * limit;

    const resumes = await pool.query(
      `SELECT id, title, created_at, updated_at, 
              personal_info->>'fullName' as full_name,
              CASE WHEN personal_info->>'profileImage' IS NOT NULL THEN true ELSE false END as has_image
       FROM resumes 
       WHERE user_id = $1 
       ORDER BY ${sort} ${order}
       LIMIT $2 OFFSET $3`,
      [req.user.id, limit, offset]
    );

    const totalCount = await pool.query(
      'SELECT COUNT(*) FROM resumes WHERE user_id = $1',
      [req.user.id]
    );

    res.json({
      resumes: resumes.rows,
      total: parseInt(totalCount.rows[0].count),
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount.rows[0].count / limit)
    });
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
});

// Get single resume with full details
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM resumes WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({ error: 'Failed to fetch resume' });
  }
});

// Update resume
router.put('/:id', authenticateToken, async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Check ownership
    const existing = await client.query(
      'SELECT id FROM resumes WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    const {
      title,
      personalInfo,
      objective,
      summary,
      experience,
      education,
      skills,
      certifications,
      languages,
      projects,
      publications,
      awards,
      volunteerWork,
      references,
      customSections
    } = req.body;

    await client.query(
      `UPDATE resumes SET
        title = $1,
        personal_info = $2,
        objective = $3,
        summary = $4,
        experience = $5,
        education = $6,
        skills = $7,
        certifications = $8,
        languages = $9,
        projects = $10,
        publications = $11,
        awards = $12,
        volunteer_work = $13,
        references = $14,
        custom_sections = $15,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $16`,
      [
        title,
        personalInfo,
        objective,
        summary,
        experience,
        education,
        skills,
        certifications,
        languages,
        projects,
        publications,
        awards,
        volunteerWork,
        references,
        customSections,
        req.params.id
      ]
    );

    await client.query('COMMIT');
    res.json({ message: 'Resume updated successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Resume update error:', error);
    res.status(500).json({ error: 'Failed to update resume' });
  } finally {
    client.release();
  }
});

// Delete resume
router.delete('/:id', authenticateToken, async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const result = await client.query(
      'DELETE FROM resumes WHERE id = $1 AND user_id = $2 RETURNING id',
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    await client.query('COMMIT');
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Resume deletion error:', error);
    res.status(500).json({ error: 'Failed to delete resume' });
  } finally {
    client.release();
  }
});

module.exports = router;