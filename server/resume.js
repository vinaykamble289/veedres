const express = require('express');
const { Pool } = require('pg');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: 'career_portal',
    password: process.env.DB_PASSWORD || '123',
    port: process.env.DB_PORT || 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

const validateResumeData = (data) => {
    const {
        userId,
        title,
        personalInfo,
        professionalSummary,
        experience,
        education,
        skills,
        certifications
    } = data;

    if (!userId || typeof userId !== 'number') {
        throw new Error('Invalid or missing userId');
    }

    if (!title || typeof title !== 'string') {
        throw new Error('Invalid or missing title');
    }

    if (!personalInfo || typeof personalInfo !== 'object') {
        throw new Error('Invalid or missing personalInfo');
    }

    if (!Array.isArray(experience)) {
        throw new Error('Experience must be an array');
    }

    if (!Array.isArray(education)) {
        throw new Error('Education must be an array');
    }

    if (!Array.isArray(certifications)) {
        throw new Error('Certifications must be an array');
    }

    if (!skills || typeof skills !== 'object') {
        throw new Error('Invalid or missing skills');
    }

    return true;
};

app.post('/api/resumes', async (req, res) => {
    try {
        validateResumeData(req.body);

        const {
            userId,
            title,
            personalInfo,
            professionalSummary,
            experience,
            education,
            skills,
            certifications
        } = req.body;

        // Convert objects to strings manually with proper JSON stringification
        const query = `
            INSERT INTO resumes (
                user_id,
                title,
                personal_info,
                professional_summary,
                experience,
                education,
                skills,
                certifications
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id`;

        const values = [
            userId,
            title,
            JSON.stringify(personalInfo),
            professionalSummary,
            JSON.stringify(experience),
            JSON.stringify(education),
            JSON.stringify(skills),
            JSON.stringify(certifications)
        ];

        const result = await pool.query(query, values);
        const resumeId = result.rows[0].id;

        const pdfPath = await generatePDF(resumeId, req.body);

        res.status(201).json({
            success: true,
            resumeId,
            pdfUrl: pdfPath
        });

    } catch (error) {
        console.error('Error creating resume:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Internal server error'
        });
    }
});

app.get('/api/resumes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM resumes WHERE id = $1';
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Resume not found'
            });
        }

        // Parse JSON strings back to objects
        const resume = result.rows[0];
        resume.personal_info = JSON.parse(resume.personal_info);
        resume.experience = JSON.parse(resume.experience);
        resume.education = JSON.parse(resume.education);
        resume.skills = JSON.parse(resume.skills);
        resume.certifications = JSON.parse(resume.certifications);

        res.json({
            success: true,
            resume
        });

    } catch (error) {
        console.error('Error fetching resume:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.put('/api/resumes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            personalInfo,
            professionalSummary,
            experience,
            education,
            skills,
            certifications
        } = req.body;

        const query = `
            UPDATE resumes
            SET 
                title = $1,
                personal_info = $2,
                professional_summary = $3,
                experience = $4,
                education = $5,
                skills = $6,
                certifications = $7,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $8
            RETURNING *`;

        const values = [
            title,
            JSON.stringify(personalInfo),
            professionalSummary,
            JSON.stringify(experience),
            JSON.stringify(education),
            JSON.stringify(skills),
            JSON.stringify(certifications),
            id
        ];

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Resume not found'
            });
        }

        // Parse JSON strings back to objects for response
        const resume = result.rows[0];
        resume.personal_info = JSON.parse(resume.personal_info);
        resume.experience = JSON.parse(resume.experience);
        resume.education = JSON.parse(resume.education);
        resume.skills = JSON.parse(resume.skills);
        resume.certifications = JSON.parse(resume.certifications);

        const pdfPath = await generatePDF(id, req.body);

        res.json({
            success: true,
            resume,
            pdfUrl: pdfPath
        });

    } catch (error) {
        console.error('Error updating resume:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.delete('/api/resumes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM resumes WHERE id = $1 RETURNING id';
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Resume not found'
            });
        }

        const pdfPath = path.join(__dirname, 'public', 'pdfs', `resume_${id}.pdf`);
        if (fs.existsSync(pdfPath)) {
            fs.unlinkSync(pdfPath);
        }

        res.json({
            success: true,
            message: 'Resume deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting resume:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get('/api/users/:userId/resumes', async (req, res) => {
    try {
        const { userId } = req.params;
        const query = 'SELECT * FROM resumes WHERE user_id = $1 ORDER BY updated_at DESC';
        const result = await pool.query(query, [userId]);

        // Parse JSON strings back to objects for each resume
        const resumes = result.rows.map(resume => ({
            ...resume,
            personal_info: JSON.parse(resume.personal_info),
            experience: JSON.parse(resume.experience),
            education: JSON.parse(resume.education),
            skills: JSON.parse(resume.skills),
            certifications: JSON.parse(resume.certifications)
        }));

        res.json({
            success: true,
            resumes
        });

    } catch (error) {
        console.error('Error fetching user resumes:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

async function generatePDF(resumeId, data) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const pdfDir = path.join(__dirname, 'public', 'pdfs');
        
        // Create pdfs directory if it doesn't exist
        if (!fs.existsSync(pdfDir)) {
            fs.mkdirSync(pdfDir, { recursive: true });
        }
        
        const pdfPath = path.join(pdfDir, `resume_${resumeId}.pdf`);
        const writeStream = fs.createWriteStream(pdfPath);

        doc.pipe(writeStream);

        // Personal Information
        doc.fontSize(24).text(data.personalInfo.fullName, { align: 'center' });
        doc.moveDown();
        
        doc.fontSize(10)
            .text(data.personalInfo.email)
            .text(data.personalInfo.phone)
            .text(data.personalInfo.location)
            .text(data.personalInfo.linkedin || '')
            .text(data.personalInfo.portfolio || '');
        
        doc.moveDown();

        // Professional Summary
        if (data.professionalSummary) {
            doc.fontSize(16).text('Professional Summary', { underline: true });
            doc.fontSize(10).text(data.professionalSummary);
            doc.moveDown();
        }

        // Experience
        if (data.experience && data.experience.length > 0) {
            doc.fontSize(16).text('Professional Experience', { underline: true });
            data.experience.forEach(exp => {
                doc.fontSize(12).text(`${exp.position} at ${exp.company}`);
                doc.fontSize(10)
                    .text(`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`)
                    .text(exp.description);
                
                if (exp.achievements && exp.achievements.length > 0) {
                    doc.moveDown(0.5);
                    doc.text('Key Achievements:');
                    exp.achievements.forEach(achievement => {
                        doc.text(`• ${achievement}`);
                    });
                }
                doc.moveDown();
            });
        }

        // Education
        if (data.education && data.education.length > 0) {
            doc.fontSize(16).text('Education', { underline: true });
            data.education.forEach(edu => {
                doc.fontSize(12).text(`${edu.degree} in ${edu.field}`);
                doc.fontSize(10)
                    .text(edu.institution)
                    .text(`GPA: ${edu.gpa || 'N/A'}`);
                doc.moveDown();
            });
        }

        // Skills
        if (data.skills) {
            doc.fontSize(16).text('Skills', { underline: true });
            Object.entries(data.skills).forEach(([type, skills]) => {
                if (skills && skills.length > 0) {
                    doc.fontSize(12).text(type.charAt(0).toUpperCase() + type.slice(1));
                    doc.fontSize(10).text(skills.join(', '));
                    doc.moveDown();
                }
            });
        }

        // Certifications
        if (data.certifications && data.certifications.length > 0) {
            doc.fontSize(16).text('Certifications', { underline: true });
            data.certifications.forEach(cert => {
                doc.fontSize(12).text(cert.name);
                doc.fontSize(10)
                    .text(`Issued by ${cert.issuer}`)
                    .text(`Date: ${cert.date}`);
                doc.moveDown();
            });
        }

        doc.end();

        writeStream.on('finish', () => {
            resolve(`/pdfs/resume_${resumeId}.pdf`);
        });

        writeStream.on('error', reject);
    });
}

// Serve static files
app.use('/pdfs', express.static(path.join(__dirname, 'public', 'pdfs')));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});