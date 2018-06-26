var express = require('express');
var router = express.Router();
var authCtrl = require('../controllers/account');
var auth = require('../middlewares/authentication');


router.post('/signin', authCtrl.singinLocal);
router.post('/signinwithtoken',auth.bearer(), authCtrl.signinBearer);
router.post('/checkifexists', authCtrl.isAllowed);
router.post('/register', authCtrl.register);
router.post('/logout',auth.bearer(),authCtrl.logout);


module.exports = router;