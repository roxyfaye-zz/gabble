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
application.set('views','./views');
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

application.get('/', (request, response) => {
    response.render('home');
});


application.get('/login', function (req, res) {
  if (req.session && req.session.authenticated) {
    var user = models.user.findOne({
      where: {
        username: req.session.username,
        password: req.session.password
      }
    }).then(function (user) {
      if (user) {
        req.session.username = req.body.username;
        req.session.userId = user.dataValues.id;
        let username = req.session.username;
        let userid = req.session.userId;
        res.render('home', {
          user: user
        });
      }
    });
  } else {
    res.redirect('/login')
  }
});

application.post('/login', function (req, res) {
  let username = req.body.username;
  let password = req.body.password;

  models.user.findOne({
    where: {
      username: username,
      password: password
    }
  }).then(user => {
    if (user.password == password) {
      req.session.username = username;
      req.session.userId = user.dataValues.id;
      req.session.authenticated = true;
      console.log(req.session);

      res.redirect('/home');
    } else {
      res.redirect('/login');
      console.log("This is my session", req.session)
    }
  })
});

application.post('/signup', function (req, res) {
  const user = models.user.build({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  })
  console.log(req.body);

  user.save().then(function (user) {
    req.username = user.username;
    req.session.authenticated = true;
    res.redirect('/login')
    console.log(req.session);
  })
});

// application.post('/newgab', function (req, res) {
//   const post = models.post.build({
//     userId: req.session.userId,
//     title: req.body.gabtitle,
//     body: req.body.gabbody
//   })
//   post.save().then(function (post) {
//     console.log(post);
//   })
// });

// application.get('/home', function (req, res) {
//   models.post.findAll().then(function (posts) {
//     res.render('home', {
//       posts: posts,
//       name: req.session.username
//     })
//   })
// });

// application.get('/newgab', function (req, res) {
//   models.post.findAll().then(function (posts) {
//     res.render('newgab', {
//       posts: posts,
//       name: req.session.username
//     })
//   })
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
//   res.render('home');
//   console.log(req.session);
// });

application.listen(3000, function () {
  console.log('Successfully started express application!');
});