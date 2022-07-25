const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const config = require('config');
const jwt = require('jsonwebtoken');


const User = require('../../models/User');
const Account = require('../../models/Account')
const auth = require('../../middleware/auth');

// @route  POST api/users
// @desc   Register a new user
// @Public route
router.post('/', (req, res) => {
  const {name, email, password} = req.body;

  if(!name || !email || !password){
    return res.status(400).json({msg: 'Please enter all fields'})
  }

  const newAccount = new Account({name});
  newAccount.save();

  User.findOne({email})
    .then(user => {
      if(user) return res.status(400).json({msg: 'User already exists'})

      const newUser = new User({
        name,
        email,
        password,
        default_account : newAccount.id,
        accounts : [{"id": newAccount.id, "accepted": true }]
      });

      // Hashing the Password to store in database and generate token for user
       
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {

              jwt.sign(
                {id: user.id },
                config.get('jwtSecret'),
                {expiresIn: 3600},
                (err, token) => {
                  if(err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email
                    }
                  })
                }
              )
            })
        })
      })
    })
});

router.patch('/', auth, ( req, res ) => {
  User.findById(req.user.id)
    .then( user => {
    const index =  user.accounts.findIndex(account => account.id == req.body.account_id);
    user.accounts[index].accepted = true;
    user.save();
    return res.json(user);
    })
})

module.exports = router;