// ```
// server.conf.js
// (c) 2016 David Newman
// david.r.niciforovic@gmail.com
// server.conf.js may be freely distributed under the MIT license
// ```

// *server.conf.js*

//  This is the file where we will:
//  - Configure our application
//  - Connect to our database
//  - Create our Mongoose models
//  - Define routes for our RESTful API
//  - Define routes for our frontend Angular application
//  - Set the app to listen on a port so we can view it in our browser


// # Modules

// Load Express
const express =require('express');
// Load Node http module
// Create our app with Express
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let user = [];
let context = [];
io.on('connection', (socket) => {
  console.log('user connected!');

  socket.on('disconnect', function(){
    console.log('user disconnected!');
    let tpu = user[context.indexOf(socket.client.id)];
    user.splice(context.indexOf(socket.client.id), 1);
    context.splice(context.indexOf(socket.client.id), 1);
      //      console.log(user.toString());
      //  console.log(context.toString());
      console.log(tpu + " disconnected!");
       io.emit('message', {type:'userlist', text: user.toString(), event: tpu + " left the room"});
  });

  socket.on('add-message', (message) => {
    if(message.indexOf("added!!!") >=0){
       if (user.indexOf(message.split(' ')[0]) < 0){
          user.push(message.split(' ')[0]);
          context.push(socket.client.id);
       }
      //  console.log(user.toString());
      //  console.log(context.toString());
      console.log(message.split(' ')[0] + " connected!");
       io.emit('message', {type:'userlist', text: user.toString(), event: message.split(' ')[0] + " join the room"});
    }
    // else if(message.indexOf("left!!!") >=0){
    //     //  user.splice(user.indexOf(message.split(' ')[0]), 1);
    //     //  io.emit('message', {type:'userlist', text: user.toString(), event: message});
    // }
    else {
       io.emit('message', {type:'new-message', text: message});
    }
  });
});



// Load Mongoose for MongoDB interactions
const mongoose =require('mongoose');
// Log requests to the console (Express 4)
const morgan =require('morgan');
// Pull information =require(HTML POST (express 4)
const bodyParser =require('body-parser');
// Simulate DELETE and PUT (Express 4)
const methodOverride =require('method-override');
// PassportJS
const passport =require('passport');
const cookieParser =require('cookie-parser');
const session =require('express-session');

// # Configuration
process.env.MONGO_URI = "mongodb://localhost:27017/daigou";

// Set the port for this app
let port = process.env.PORT || 3000;

// Load Mongoose config file for connecting to MongoDB instance
const mongooseConf =require('./config/mongoose.conf.js');

// Pass Mongoose configuration Mongoose instance
mongooseConf(mongoose);

// const PassportJS configuration
const passportConf =require('./config/passport.conf.js');

// Pass Passport configuration our PassportJS instance
passportConf(passport);

if (process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test')
  // Log every request to the console
  app.use(morgan('dev'));

// Read cookies (needed for authentication)
app.use(cookieParser());

// ## Get all data/stuff of the body (POST) parameters

// Parse application/json
app.use(bodyParser.json());
// Parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Override with the X-HTTP-Method-Override header in the request. Simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));
// Set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/dist'));

// ## Passport JS
process.env.SESSION_SECRET = "355FC4FE9348639B4E4FED1B8E93C";
// Session secret
app.use(session({

  secret : process.env.SESSION_SECRET,

  resave : true,

  saveUninitialized : true
}));

app.use(passport.initialize());

// Persistent login sessions
app.use(passport.session());

// ## Routes

// Get an instance of the express Router
let router = express.Router();

// Load our application API routes
// Pass in our express and express router instances
const routes =require('./app/routes');

// Pass in instances of the express app, router, and passport
routes(app, router, passport);

// ### Ignition Phase

http.listen(port);

// Shoutout to the user
console.log(`Wizardry is afoot on port ${port}`);

// Expose app
module.exports = app;
