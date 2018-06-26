var express = require('express');
var router = express.Router();
var tagCtrl = require('../controllers/tag');
var auth = require('../middlewares/authentication');


router.get('/tags/all', tagCtrl.getAllTags);
router.post('/tag/new',auth.bearer(), tagCtrl.createTag);
router.get('/checkunique/tag/:tagTitle',auth.bearer(), tagCtrl.isAllowed);

module.exports = router;