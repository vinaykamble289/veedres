// server/routes/resume.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const authenticateToken = require('../middleware/auth');

// Create resume
router.post('/api/resume/create', authenticateToken, async (req, res) => {
  try {
    const { personalInfo, summary, experience, education, skills } = req.body;
    const userId = req.user.id;

    // Store resume in database
    const sql = `
      INSERT INTO resumes (
        user_id, 
        personal_info, 
        summary, 
        experience, 
        education, 
        skills
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        userId,
        JSON.stringify(personalInfo),
        summary,
        JSON.stringify(experience),
        JSON.stringify(education),
        JSON.stringify(skills)
      ],
      (err, result) => {
        if (err) {
          console.error('Error creating resume:', err);
          return res.status(500).json({ message: 'Error creating resume' });
        }
        res.status(201).json({ message: 'Resume created successfully', id: result.insertId });
      }
    );
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's resumes
router.get('/api/resume', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const sql = 'SELECT * FROM resumes WHERE user_id = ?';
  
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching resumes:', err);
      return res.status(500).json({ message: 'Error fetching resumes' });
    }
    res.json(results);
  });
});

module.exports = router;