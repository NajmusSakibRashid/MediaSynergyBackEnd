const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  try
  {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json({ message: 'User not found' });
    } else {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (isMatch) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({
          token
        });
      }
      else {
        res.status(401).json({ message: 'Incorrect password' });
      }
    }
  }catch{
    res.status(400).json({ message: 'Error' });
  }
});

module.exports = router;