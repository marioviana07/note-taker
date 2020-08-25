const router = require('express').Router();
const noteRouters = require('../apiRouters/noteRoutes');

router.use(noteRouters);

module.exports = router;