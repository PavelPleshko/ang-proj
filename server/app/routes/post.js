var express = require('express');
var router = express.Router();
var postCtrl = require('../controllers/post');
var auth = require('../middlewares/authentication');



router.post('/post/new',auth.bearer(), postCtrl.createPost);
router.get('/posts/all',postCtrl.getAllPosts);
router.post('/posts/filter-by', postCtrl.filterPostsBy);
router.get('/:userId/posts',auth.bearer(),postCtrl.getAuthorizedUserPosts);
router.post('/post/:postId/likes',auth.bearer(), postCtrl.likePost);
router.post('/post/:postId/dislikes',auth.bearer(), postCtrl.dislikePost);
router.post('/post/:postId/stars',auth.bearer(), postCtrl.starPost);
module.exports = router;