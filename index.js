const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth-route');;
const profileRouter = require('./routes/profile-route');;
const keys = require('./config/keys');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const cookieSession = require('cookie-session');
const passportSetup = require('./config/passport-setup');
// const expressValidator = require('express-validator');

// app.set('views','./templates');
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname , 'assets')));

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(cookieSession({
  name: 'session',
  keys: [keys.sessionId],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth',authRouter);
app.use('/profile',profileRouter);

// app.use(expressValidator({
//   errorFormatter: function(param, msg, value) {
//       var namespace = param.split('.')
//       , root    = namespace.shift()
//       , formParam = root;
//
//     while(namespace.length) {
//       formParam += '[' + namespace.shift() + ']';
//     }
//     return {
//       param : formParam,
//       msg   : msg,
//       value : value
//     };
//   }
// }));

app.get('/',(req,res)=>{
  res.render('home',{user:req.user});
});

mongoose.connect(keys.mongodbURI,()=>{
  console.log("db connected");
});

app.listen(3000,()=>{
  console.log('app running on port 3000...');
});
