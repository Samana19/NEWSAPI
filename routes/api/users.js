const express = require('express')
const router = express.Router()
require('dotenv').config()

const User = require('../../models/User')

// Get all users
router.get('/getAllUser', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  

// Update a user
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email } = req.body;
    
      let user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the logged-in user ID matches the user ID being updated
      if (req.user.id !== user.id) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    
      user.username = username;
      user.email = email;
      
    
      await user.save();
    
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // Delete a user
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
    
      let user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the logged-in user ID matches the user ID being deleted
      if (req.user.id !== user.id) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    
      await user.remove();
    
      res.json({ msg: 'User removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  

module.exports = router

