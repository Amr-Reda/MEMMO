const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const keys = require('./keys');
const passport = require('passport');
const googleUser = require('../models/googleUser-model');
const facebookUser = require('../models/facebookUser-model');
const User = require('../models/user-model');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  googleUser.findById(id, function(err, user) {
    if (user) {
      done(err, user);
    }else {
      facebookUser.findById(id,function (err,user) {
        if (user) {
          done(err,user);
        }else {
          User.findById(id,function (err,user) {
            done(err,user);
          });
        }
      });
    }
  });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    googleUser.findOne({googleId:profile.id})
    .then((user)=>{
      if (user) {
        done(null,user)
      }else {
        new googleUser({
          userName:profile.displayName,
          googleId:profile.id,
          email:profile.emails[0].value
        }).save().then(newUser=>{
          done(null,newUser);
        });
      }})
      .catch(err=>{
      console.log(err);
    });
  }
));

passport.use(new FacebookStrategy({
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    facebookUser.findOne({facebookId:profile.id})
    .then((user)=>{
      if (user) {
        done(null,user)
      }else {
        new facebookUser({
          userName:profile.displayName,
          facebookId:profile.id,
        }).save().then(newUser=>{
          done(null,newUser);
        })
      }})
      .catch(err=>{
      console.log(err);
    });
  }
));

passport.use(new LocalStrategy(
  function(username, password, done) {

  }
));
