const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = 6969;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase payload limit

// PostgreSQL connection with retry logic
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:123@localhost:5432/ai_roadmap', {
  logging: false,
  retry: {
    max: 3,
    timeout: 3000
  }
});

// Validate environment variables
const requiredEnvVars = ['GOOGLE_API_KEY', ];
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`${varName} is not configured in environment variables`);
    process.exit(1);
  }
});

// Initialize Google AI with safety settings
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: 'gemini-pro',
  safetySettings: [
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
  ],
});

// Improved AI prompt template
const generateAIPrompt = (jobDescription, careerGoal, experienceLevel) => {
  return `You are an expert career counselor and technical mentor. Create a detailed learning roadmap for a ${experienceLevel} level developer aiming to become a ${careerGoal}.

Job Description: ${jobDescription}

Important Instructions:
1. Focus on practical, industry-relevant skills
2. Include both fundamental concepts and advanced topics
3. Suggest realistic time estimates
4. Include specific, actionable project ideas
5. Recommend high-quality learning resources
6. Structure the learning path progressively

Respond ONLY with a JSON object in the following format, without any additional text or markdown:
{
  "title": "Learning Roadmap for ${careerGoal}",
  "description": "Clear, concise description of the learning path",
  "timeEstimate": "Realistic total duration (e.g., '6 months')",
  "nodes": [
    {
      "title": "Clear milestone title",
      "description": "Detailed description of what to learn",
      "timeEstimate": "Specific duration (e.g., '4 weeks')",
      "difficulty": "Beginner/Intermediate/Advanced",
      "skills": ["Specific skill 1", "Specific skill 2"],
      "courses": [
        {
          "title": "Actual course name",
          "provider": "Platform name (e.g., Udemy, Coursera)",
          "duration": "Course length",
          "level": "Course difficulty",
          "topics": ["Specific topic 1", "Specific topic 2"]
        }
      ],
      "projects": [
        "Detailed project description 1",
        "Detailed project description 2"
      ]
    }
  ]
}`;
};

// Enhanced JSON extraction with better error handling
const extractJSON = (text) => {
  try {
    // Remove any potential UTF-8 BOM and whitespace
    text = text.replace(/^\uFEFF/, '').trim();
    
    // Direct JSON parse attempt
    return JSON.parse(text);
  } catch (e) {
    try {
      // Remove markdown code blocks
      let cleanText = text.replace(/```(?:json)?\s*([\s\S]*?)\s*```/g, '$1').trim();
      
      // Find JSON object boundaries
      const start = cleanText.indexOf('{');
      const end = cleanText.lastIndexOf('}') + 1;
      
      if (start >= 0 && end > start) {
        const jsonString = cleanText.slice(start, end);
        return JSON.parse(jsonString);
      }
      
      throw new Error('No valid JSON structure found in response');
    } catch (err) {
      console.error('Raw response:', text);
      throw new Error(`JSON parsing failed: ${err.message}`);
    }
  }
};

// Validate roadmap data
const validateRoadmapData = (data) => {
  const required = ['title', 'description', 'timeEstimate', 'nodes'];
  const missing = required.filter(field => !data[field]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
  
  if (!Array.isArray(data.nodes) || data.nodes.length === 0) {
    throw new Error('Roadmap must contain at least one node');
  }
};

// API Routes with improved error handling
app.post('/api/generate-roadmap', async (req, res) => {
  try {
    const { jobDescription, careerGoal, experienceLevel } = req.body;

    // Validate input
    if (!jobDescription || !careerGoal || !experienceLevel) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        required: ['jobDescription', 'careerGoal', 'experienceLevel'] 
      });
    }

    // Generate AI response
    const prompt = generateAIPrompt(jobDescription, careerGoal, experienceLevel);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse and validate response
    const roadmapData = extractJSON(text);
    validateRoadmapData(roadmapData);

    // Save to database
    const roadmap = await Roadmap.create({
      title: roadmapData.title,
      description: roadmapData.description,
      careerGoal,
      timeEstimate: roadmapData.timeEstimate,
      nodes: roadmapData.nodes
    });

    res.json(roadmap);
  } catch (error) {
    console.error('Error generating roadmap:', error);
    res.status(error.status || 500).json({ 
      error: 'Failed to generate roadmap', 
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

const Roadmap = sequelize.define('Roadmap', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  careerGoal: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timeEstimate: {
    type: DataTypes.STRING
  },
  nodes: {
    type: DataTypes.JSONB,
    defaultValue: []
  }
});

// Get saved roadmaps
app.get('/api/roadmaps', async (req, res) => {
  try {
    const roadmaps = await Roadmap.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch roadmaps' });
  }
});

// Get specific roadmap
app.get('/api/roadmaps/:id', async (req, res) => {
  try {
    const roadmap = await Roadmap.findByPk(req.params.id);
    if (!roadmap) {
      return res.status(404).json({ error: 'Roadmap not found' });
    }
    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch roadmap' });
  }
});

// Database initialization
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

// Start server
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});