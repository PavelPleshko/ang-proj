var express = require('express');
var router = express.Router();
var profileCtrl = require('../controllers/profile');
var auth = require('../middlewares/authentication');

router.param('userId',profileCtrl.getById);
router.get('/profiles/me',auth.bearer(),profileCtrl.getMyProfile);
router.get('/profiles/:userId',profileCtrl.getProfile);
module.exports = router;