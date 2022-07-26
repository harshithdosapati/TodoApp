const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');


const User = require('../../models/User');

// @route  POST api/auth
// @desc   Authenticate a User
// @Public route
router.post('/', (req, res) => {
  const { email, password} = req.body;

  if(!email || !password){
    return res.status(400).json({msg: 'Please enter all fields'})
  }

  User.findOne({email})
    .then(user => {
      if(!user) return res.status(400).json({msg: 'User does not exist'})

      // Compare user entered password with hashed password and return a token is password is verified

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({msg: 'Invalid Credentials'});

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
                  email: user.email,
                  default_account: user.default_account,
                  accounts: user.accounts
                }
              })
            }
          )
        })
    })
});


// @route  GET api/auth/user
// @desc   Get user data
// @Private route
router.get('/user', auth, (req,res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
})


module.exports = router;

//@route GET api/auth/account
//@desc Get all users for an account
// @Private route
router.get('/account', auth, (req,res) => {
  User.find({"accounts.id": req.account_id, "accounts.name": req.account_name, "accounts.accepted": true})
    .then(users => res.json(users));
})


router.patch('/account', auth, (req,res) => {
  const email = req.body.email
  User.findOne({email})
    .then(user => {
      const newAccount = {"id": req.account_id, "name": req.account_name, "accepted": false}
      user.accounts.push(newAccount);
      user.save();
      return res.json(user.accounts);
    })
    .catch(err => res.status(404).json({msg: 'User does not exist'}));
})

router.post('/account', auth, (req,res) => {
  const name = req.body.account_name;
  const newAccount = new Account({name: name});
  newAccount.save();
  User.findById(req.user.id)
   .then(user => {
    const account = {"id": newAccount._id, "name": newAccount.name, "accepted": true}
    user.accounts.push(account);
    user.save();
    return res.json(user.accounts);
   })
})