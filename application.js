const fs = require('fs');
const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');
const application = express();
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const session = require('express-session');
const models = require("./models");
const moment = require('moment');
moment().format('MMMM Do YYYY, h:mm:ss a');
const cookieParser = require('cookie-parser');


application.engine('mustache', mustacheExpress());
application.set('view engine', 'mustache');
application.set('views', './views');
application.use('/files', express.static(path.join(__dirname, 'public')));

application.use(bodyParser.urlencoded({
  extended: false
}));
application.use(cookieParser());

application.use(session({
  secret: "gabble",
  resave: false,
  saveUninitialized: true
}));

application.use (function(request, response, next){
  if(request.session.user){
    request.session.isAuthenticated = true;
  }else{
    request.session.isAuthenticated = false;
  }
  next()
});

// application.get('/', (request, response) => {
//   response.render('home');
// });

application.get('/login', (request, response) => {
  response.render('login');
});

application.get('/signup', function (request, response) {
  response.render('signup');
});

application.get('/newgab', function (request, response) {
  response.render('newgab');
});
application.get('/liked', (request, response) => {
  response.render('liked');
});




// application.post('/login', function (req, res) {
//   if (req.session && req.session.authenticated) {
//     var user = models.users.findOne({
//       where: {
//         username: req.session.username,
//         password: req.session.password
//       }
//     })
//     console.log(user)
//     .then(function (user) {
//       if (users) {
//         req.session.username = req.body.username;
//         req.session.userId = users.dataValues.id;
//         let username = req.session.username;
//         let userid = req.session.userId;
//         res.render('home', {
//           user: user
//         });
//       }
//     });
//   } else {
//     res.redirect('/login')
//   }
// });

application.post('/login', async(req, res) => {
  console.log(req.body.email);
  let email = req.body.email;
  let password = req.body.password;
  console.log(email);

  try {
    const user = await models.Users.findOne({
      where: {
        email: email,
        password: password
      }
    });

    req.session.user = user.email;
    req.session.isAuthenticated = true;
    req.session.userId = user.displayname;

    return res.redirect('/newgab');

  } catch (e) {
    res.redirect('/signup');
    console.log("This is my session", req.session)
  }
});





application.post('/signup', function (req, res) {
  const users = models.Users.build({
    name: req.body.name,
    email: req.body.email,
    displayname: req.body.displayname,
    password: req.body.password
  })
  // console.log(req.body);

  users.save().then(function (Users) {
    req.username = users.username;
    req.session.authenticated = true;
    res.redirect('/login')
    // console.log(req.session);
  })
});

application.post('/newgab', async (req, res) => {
  // console.log(req.body.message);
  // console.log(req.session.userId);
  // console.log('newGab');
  const gab = await models.gabs.create({
    messageId: req.session.userId,
    message: req.body.message
  })
  
   //console.log(gab);
    res.redirect('/');
});

application.get('/', async (req, res) => {
  // if (req.session.user) {
 var userGabs = await models.gabs.findAll({
  order: [['createdAt', 'DESC']],
  // include: [models.Users, models.Like]
    });
    // const coffee = { userGabs: userGabs, name: request.session.name };
    console.log(userGabs);
   var coffee = {};
   coffee.userGabs = userGabs;
    console.log(coffee)
    console.log(coffee.dataValues)
    
    
    res.render('home', {coffee});
// }else {
//     res.redirect('/signup');
//   }
});

// application.get('/newgab', function (req, res) {
//   if(req.session.user){
    
//    else {
//      res.redirect('/login');
//    }
// });

// application.post('/home', function (req, res) {
//   const post = models.post.build({
//     title: req.body.gabtitle = req.session.post,
//     body: req.body.gabbody = req.session.post,
//   })
//   console.log(req.session.post);

//   post.save();
//   res.redirect('/home')
// });

// application.post('/liked', function (req, res) {
//   const like = models.like.build({
//     like: true,
//     userId: req.session.userId,
//     postId: req.body.submitbtn,

//   })
//   like.save().then(function (like) {
//     console.log(like);
//   })
// });


// application.get('/liked', function (req, res) {
//   models.like.findAll({
//     include: [{
//       model: models.user,
//       as: 'user'
//     }]
//   }).then(function (likes) {
//     console.log(likes);
//     res.render('liked', {
//       likes: likes
//     })
//   });


// });

// application.get('/logout', function (req, res) {
//   req.session.destroy(function (err) {})
//   res.render('/login');
//   console.log(req.session);
// });

application.listen(3000, function () {
  console.log('Successfully started express application!');
});