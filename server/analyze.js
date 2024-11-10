// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 6060;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json({ limit: '50mb' }));

// Check if API key is configured
if (!process.env.GOOGLE_API_KEY) {
  console.error('GOOGLE_API_KEY is not configured in environment variables');
  process.exit(1);
}

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post('/api/analyze-resume', async (req, res) => {
  try {
    const { pdf, jobDescription, prompt } = req.body;

    if (!pdf || !jobDescription || !prompt) {
      return res.status(400).json({ 
        error: 'Missing required fields: pdf, jobDescription, and prompt are required' 
      });
    }

    // Initialize the model with the new gemini-1.5-flash
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Prepare the image data
    const imageData = {
      inlineData: {
        data: pdf,
        mimeType: 'application/pdf'
      }
    };

    try {
      // Generate content
      const result = await model.generateContent([prompt, imageData, jobDescription]);
      const response = await result.response;
      
      res.json({ response: response.text() });
    } catch (modelError) {
      // Handle specific model errors
      if (modelError.message.includes('not supported')) {
        // If PDF processing is not supported by gemini-1.5-flash, try extracting text
        console.log('Attempting alternative processing method...');
        // Here you could add PDF text extraction logic if needed
        throw new Error('PDF processing not supported by current model. Please try a different format.');
      }
      throw modelError;
    }
  } catch (error) {
    console.error('Error analyzing resume:', error);
    
    // Specific error handling
    if (error.message.includes('UNAUTHENTICATED')) {
      return res.status(401).json({ 
        error: 'Authentication failed',
        message: 'Invalid API key or authentication error'
      });
    }

    if (error.message.includes('not supported')) {
      return res.status(400).json({
        error: 'Format not supported',
        message: error.message
      });
    }

    res.status(500).json({ 
      error: 'Failed to analyze resume', 
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ 
    error: 'Internal server error', 
    message: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred'
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log('Available endpoints:');
  console.log('  - GET  /health');
  console.log('  - POST /api/analyze-resume');
});