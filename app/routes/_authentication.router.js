// ```
// _authentication.router.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// _authentication.router.js may be freely distributed under the MIT license
// ```

// */app/routes/_authentication.router.js*

// GET    */api/auth/user*        Get user data = require(session object in
//                                Node

// GET    */api/auth/loggedin*    Route to test if the user is logged in
//                                or not

// POST   */api/auth/login*       Route to login

// POST   */api/auth/logout*      Route to logout and redirect to the
//                                appropriate view

// ## Authentication API object

// Load user model
const User = require('../models/user.model.js');

// Load the Mongoose ObjectId function to cast string as
// ObjectId
let ObjectId= require('mongoose').Types.ObjectId;

module.exports = (app, router, passport, auth, admin) => {

  // ### Authentication API Routes

  // Route to test if the user is logged in or not
  router.get('/auth/loggedIn', (req, res) => {

    // If the user is authenticated, return a user object
    // else return 0

    res.send(req.isAuthenticated() ? req.user : '0');
  });

  // Route to log a user in
  router.post('/auth/login', (req, res, next) => {

    // Call `authenticate()` = require(within the route handler, rather than
    // as a route middleware. This gives the callback access to the `req`
    // and `res` object through closure.

    // If authentication fails, `user` will be set to `false`. If an
    // exception occured, `err` will be set. `info` contains a message
    // set within the Local Passport strategy.
    passport.authenticate('local-login', (err, user, info) => {

      if (err)
        return next(err);

      // If no user is returned...
      if (!user) {

        // Set HTTP status code `401 Unauthorized`
        res.status(401);

        // Return the info message
        return next(info.loginMessage);
      }

      // Use login function exposed by Passport to establish a login
      // session
      req.login(user, (err) => {

        if (err)
          return next(err);

        // Set HTTP status code `200 OK`
        res.status(200);

        // Return the user object
        res.send(req.user);
      });

    }) (req, res, next);
  });

  router.post('/auth/signup', (req, res, next) => {

    // Call `authenticate()` = require(within the route handler, rather than
    // as a route middleware. This gives the callback access to the `req`
    // and `res` object through closure.

    // If authentication fails, `user` will be set to `false`. If an
    // exception occured, `err` will be set. `info` contains a message
    // set within the Local Passport strategy.
    passport.authenticate('local-signup', (err, user, info) => {

      if (err)
        return next(err);

      // If no user is returned...
      if (!user) {

        // Set HTTP status code `401 Unauthorized`
        res.status(401);

        // Return the info message
        return next(info.signupMessage);
      }

      // Set HTTP status code `204 No Content`
      res.sendStatus(204);

    }) (req, res, next);
  });

  // Route to log a user out
  router.post('/auth/logout', (req, res) => {

    req.logOut();

    // Even though the logout was successful, send the status code
    // `401` to be intercepted and reroute the user to the appropriate
    // page
    res.sendStatus(401);
  });

  // Route to get the current user
  // The `auth` middleware was passed in to this function = require(`routes.js`
  router.get('/auth/user', auth, (req, res) => {

    // Send response in JSON to allow disassembly of object by functions
    res.json(req.user);
  });

  // Route to delete a user. Accepts a url parameter in the form of a
  // username, user email, or mongoose object id.
  // The `admin` Express middleware was passed in = require(`routes.js`
  router.delete('/auth/delete/:uid', admin, (req, res) => {

    User.remove({

      // Model.find `$or` Mongoose condition
      $or : [

        { 'local.username' : req.params.uid },

        { 'local.email' : req.params.uid },

        { '_id' : ObjectId(req.params.uid) }
      ]
    }, (err) => {

      // If there are any errors, return them
      if (err)
        return next(err);

      // HTTP Status code `204 No Content`
      res.sendStatus(204);
    });
  });

        router.route('/profile/:profile_id')

              // ### Get a profile item by ID

              // Accessed at GET http://localhost:8080/api/profile/:profile_id
                  .get((req, res) => {

                  // Use mongoose to a single profile item by id in the database
                  User.findOne({

                  'local.email' : req.params.profile_id

              }, (err, user) => {

                  if(err)
                  res.send(err);

          else
              res.json(user);
          });
          })

    // ### Update a profile item by ID

    // Accessed at PUT http://localhost:8080/api/profile/:profile_id
        .put((req, res) => {

                // use our profile model to find the profile item we want
                User.findOne({

                'local.email' : req.params.profile_id

            }, (err, user) => {

                if (err)
                res.send(err);

            // Only update a field if a new value has been passed in
            if (req.body.name)
                user.local.name = req.body.name;
            if (req.body.email)
                user.local.email = req.body.email;
            if (req.body.phone)
                user.local.phone = req.body.phone;
            // if (req.body.type)
            //     user.type = req.body.type;
            // if (req.body.logo)
            //     user.logo = req.body.logo;


            // save the profile item
            return user.save((err) => {

                    if (err)
                    res.send(err);

            return res.send(user);

        });
        });
        });
};
