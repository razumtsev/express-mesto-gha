const router = require('express').Router();
const { wrongPath } = require('../controllers/wrong');

router.get('/', wrongPath);
router.post('/', wrongPath);
router.put('/', wrongPath);
router.patch('/', wrongPath);
router.delete('/', wrongPath);

module.exports = router;
