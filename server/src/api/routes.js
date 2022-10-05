const express = require('express');
var router = express.Router();
const {
  get
} = require('./controller');


router.get('/', get);

router.use('/*', function(req, res){
  res.status(404).json({msg: 'Resource not found'});
});

module.exports = router;

