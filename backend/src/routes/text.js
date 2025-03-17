import express from 'express';
import { nanoid } from 'nanoid';
import { auth } from '../middleware/auth.js';
import Text from '../models/Text.js';

const router = express.Router();

// Create a new text share
router.post('/', auth, async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const slug = nanoid(10); // Generate a unique slug
    
    const text = new Text({
      content,
      slug,
      userId: req.userId
    });

    await text.save();

    res.status(201).json(text);
  } catch (error) {
    console.error('Error creating text:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a text share by slug
router.get('/:slug', async (req, res) => {
  try {
    const text = await Text.findOne({ slug: req.params.slug });
    
    if (!text) {
      return res.status(404).json({ message: 'Text not found' });
    }

    res.json(text);
  } catch (error) {
    console.error('Error fetching text:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all texts for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const texts = await Text.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(texts);
  } catch (error) {
    console.error('Error fetching texts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a text share
router.put('/:id', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const text = await Text.findOne({ _id: req.params.id, userId: req.userId });

    if (!text) {
      return res.status(404).json({ message: 'Text not found or unauthorized' });
    }

    text.content = content;
    await text.save();

    res.json(text);
  } catch (error) {
    console.error('Error updating text:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a text share
router.delete('/:id', auth, async (req, res) => {
  try {
    const text = await Text.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!text) {
      return res.status(404).json({ message: 'Text not found or unauthorized' });
    }

    res.json({ message: 'Text deleted successfully' });
  } catch (error) {
    console.error('Error deleting text:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;