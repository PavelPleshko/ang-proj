var express = require('express');
var router = express.Router();
var categoryCtrl = require('../controllers/category');
var auth = require('../middlewares/authentication');



router.post('/category/new',auth.bearer(), categoryCtrl.createCategory);
router.get('/categories/all', categoryCtrl.getAllCategories);
router.get('/checkunique/category/:categoryTitle',auth.bearer(), categoryCtrl.isAllowed);

module.exports = router;