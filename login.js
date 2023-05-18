const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('./user.model');
// const login = require('../middleware/login')
const jsonwebtoken = require('jsonwebtoken');

// interface User {
//   email: string,
//   username: string,
//   password: string
// }

router.route('/').post(async (req, res) => {
    const { password } = req.body;
    
    const user = new User({ password })
    User.find()
      .then((user) => {
        if(password === user[0].password) {
            const token = jsonwebtoken.sign({password}, process.env.TOKEN_SECRET, { expiresIn: '2592000s' });
            res.status(200);
            res.send({message: 'Login Successfull', token: token});
          } else {
            return res.status(422).json({error: 'Invalid password.'}); 
          }
      })
      .catch((err) => {
        console.error(err);
      });
  });

module.exports = router;