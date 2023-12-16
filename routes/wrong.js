const router = require('express').Router();
const { wrongPath } = require('../controllers/wrong');

router.use('/', wrongPath);

module.exports = router;
