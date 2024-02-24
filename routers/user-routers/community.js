const express = require('express');

const router = express.Router();
const Content = require('../../models/Content');
const Community = require('../../models/Community');
const formatDate = require('../../utility/format-date');

const publishRouter = require('./content-routers/publish');
const scheduleRouter = require('./content-routers/schedule');

router.use('/publish', publishRouter);
router.use('/schedule', scheduleRouter);

router.get('/', async (req, res) => {
    try {
        const contents = await Content.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contents);
    } catch {const express = require('express');
    const router = express.Router();
    const Content = require('../../models/Content');
    const Community = require('../../models/Community');
    const formatDate = require('../../utility/format-date');
    const publishRouter = require('./content-routers/publish');
    const scheduleRouter = require('./content-routers/schedule');
    
    router.use('/publish', publishRouter);
    router.use('/schedule', scheduleRouter);
    
    router.get('/', async (req, res) => {
        try {
            const contents = await Content.find({ user: req.user.id }).sort({ date: -1 });
            res.json(contents);
        } catch {
            res.json({ message: 'Error' });
        }
    });
    
    // Create an instance of the Express application
    const app = express();
    
    // Mount the router on the app
    app.use('/api', router);
    
    // Define a port
    const PORT = process.env.PORT || 3000;
    
    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    
        res.json({ message: 'Error' });
    }
});

module.exports = router;