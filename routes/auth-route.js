const express = require('express');
const router = express.Router();
const passport = require('passport');
// const bcrypt = require('bcryptjs');
// const User = require('../models/user-model');
const { check, validationResult } = require('express-validator/check');

router.post('/signup',[
  check('userName','username is required').not().isEmpty(),
  check('userName','username should start and end with character').matches(/^[(A-Z)|(a-z)][(A-Z)|(a-z)| ]*[(A-Z)|(a-z)]$/,"i"),
  check('email','email is required').not().isEmpty(),
  check('email','invalid email').isEmail(),
  check('password','password is required').not().isEmpty(),
  check('password','password should be 8 or more characters').isLength({ min: 8 })
],(req,res)=>{
  console.log(req.query);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth-views/sign-up',{user:req.user,errors: errors.array()});
  }
  res.redirect('/');
 //    bcrypt.genSalt(10, function(err, salt){
 //   bcrypt.hash(newUser.password, salt, function(err, hash){
 //     if(err){
 //       console.log(err);
 //     }
 //     newUser.password = hash;
 //     newUser.save(function(err){
 //       if(err){
 //         console.log(err);
 //         return;
 //       } else {
 //         req.flash('success','You are now registered and can log in');
 //         res.redirect('/users/login');
 //       }
 //     });
 //   });
 // });
});

// router.post('/login',(req,res)=>{
//
// });

router.get('/login',(req,res)=>{
  res.render('auth-views/sign-in',{user:req.user})
});

router.get('/signup',(req,res)=>{
  res.render('auth-views/sign-up',{user:req.user,errors: req.errors})
});

router.get('/logout',(req,res)=>{
  req.logout();
  res.redirect('/');
});

router.get('/google',passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback',passport.authenticate('google', { failureRedirect: '/auth/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/facebook',passport.authenticate('facebook'));

router.get('/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/auth/login' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/');
});

module.exports=router;
