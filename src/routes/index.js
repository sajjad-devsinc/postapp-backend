var express = require('express');
var router = express.Router();
const {getPosts} = require('../controllers/posts');
/* GET home page. */
router.get('/',getPosts );

module.exports = router;
