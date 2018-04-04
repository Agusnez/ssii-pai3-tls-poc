const crypto = require('crypto');
const express = require('express');
const reader = require('./readData');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index',{
    data: {},
    errors:{}
  });
});

router.post('/', (req, res) => {
  console.log('Se han recibido los siguientes datos por POST');
  console.log('Usuario: ' + req.body.user);
  console.log('Contraseña: ' + req.body.password);

  var passwordSalted = req.body.password + 'asdk';
  var iterations = 2;
  var saltPepper = passwordSalted;

  for(var i = 0; i < iterations; i++){
    var hash = crypto.createHash('sha256');
    hash.update(saltPepper);
    saltPepper = hash.digest('hex');
  }

  reader.exists(req.body.user,saltPepper, function(exists) {
    if (exists) {
      res.render('exito');
    } else {
      res.render('fallo');
    }
    
  });
});

module.exports = router;