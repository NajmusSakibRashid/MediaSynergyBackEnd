const express = require('express');
const router = express.Router();
const Community = require('../../models/Community');

// Route to fetch all communities
router.get('/communities', async (req, res) => {
//   try {
//     const communities = await Community.find().populate('admin').populate('posts').populate('users');
//     console.log(communities);
//     res.json(communities);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }

    console.log('hi');
    print('helloo');
});

module.exports = router;
