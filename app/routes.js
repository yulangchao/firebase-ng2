// ```
// routes.js
// (c) 2015 David Newman
// david.r.niciforovic@gmail.com
// routes.js may be freely distributed under the MIT license
// ```

// */app/routes.js*

// ## Node API Routes

// Define routes for the Node backend

// Load our API routes for user authentication
const authRoutes = require('./routes/_authentication.router.js');

// Load our API routes for the `todo` component
const todoRoutes = require('./routes/_todo.router.js');
const itemRoutes = require('./routes/_item.router.js');
const rukuRoutes = require('./routes/_ruku.router.js');
const chukuRoutes = require('./routes/_chuku.router.js');
const chatRoutes = require('./routes/_chat.router.js');
// Load our API routes for the `recipe` component
const recipeRoutes = require('./routes/_recipe.router.js');

module.exports = (app, router, passport) => {

  // ### Express Middlware to use for all requests
  router.use((req, res, next) => {

    console.log('I sense a disturbance in the force...'); // DEBUG

    // Make sure we go to the next routes and don't stop here...
    next();
  });

  // Define a middleware function to be used for all secured routes
  let auth = (req, res, next) => {

    if (!req.isAuthenticated())
      res.send(401);

    else
      next();
  };

  // Define a middleware function to be used for all secured administration
  // routes
  let admin = (req, res, next) => {

    if (!req.isAuthenticated() || req.user.role !== 'admin')
      res.send(401);

    else
      next();
  };

  // ### Server Routes

  // Handle things like API calls,

  // #### Authentication routes

  // Pass in our Express app and Router.
  // Also pass in auth & admin middleware and Passport instance
  authRoutes(app, router, passport, auth, admin);

  // #### RESTful API Routes

  // Pass in our Express app and Router
  todoRoutes(app, router);
    itemRoutes(app, router);
    rukuRoutes(app, router);
    chukuRoutes(app, router);
    chatRoutes(app, router);
	recipeRoutes(app, router);

	// All of our routes will be prefixed with /api
	app.use('/api', router);

  // ### Frontend Routes

  // Route to handle all Angular requests
  app.get('*', (req, res) => {

    // Load our src/app.html file
    //** Note that the root is set to the parent of this folder, ie the app root **
    res.sendFile('/dist/index.html', { root: __dirname + "/../"});
  });
};
