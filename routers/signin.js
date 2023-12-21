const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const router = express.Router();
const User = require('../models/User');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.json({ message: 'User not found' });
  } else {
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({
        token
      });
    }
    else {
      res.json({ message: 'Incorrect password' });
    }
  }
});

module.exports = router;