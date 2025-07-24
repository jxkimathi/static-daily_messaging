const express = require('express');
const router = express.Router();
const { messageService } = require('../models/Message');

// GET all messages
router.get('/', async (req, res) => {
  try {
    const messages = await messageService.findAll();
    res.json(messages);
  } catch (err) {
    console.error('Error in GET /api/messages:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// POST a new message
router.post('/', async (req, res) => {
  try {
    const { text, link } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required and must be a string' });
    }
    
    // Validate link if provided
    if (link && typeof link !== 'string') {
      return res.status(400).json({ error: 'Link must be a string' });
    }
    
    const newMessage = await messageService.create({ text, link });
    res.status(201).json(newMessage);
  } catch (err) {
    console.error('Error in POST /api/messages:', err);
    res.status(500).json({ error: 'Failed to create message' });
  }
});

module.exports = router;
