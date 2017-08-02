// ```
// _chat.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// _chat.js may be freely distributed under the MIT license
// ```

// */app/routes/_chat.router.js*

// ## Chat API object

// HTTP Verb  Route                 Description

// GET        /api/chat             Get all of the chat items
// GET        /api/chat/:chat_id    Get a single chat item by chat item id
// POST       /api/chat             Create a single chat item
// DELETE     /api/chat/:chat_id    Delete a single chat item
// PUT        /api/chat/:chat_id    Update a chat item with new info

// Load the chat model
const Chat = require('../models/chat.model');

module.exports = (app, router) => {

  // ### Chat API Routes

  // Define routes for the chat item API

  router.route('/chat')

    // ### Create a chat item

    // Accessed at POST http://localhost:8080/api/chat

    // Create a chat item
    .post((req, res) => {

      Chat.create({

        text : req.body.text,
        name : req.body.name,
        date : req.body.date

      }, (err, chat) => {

        if (err)
          res.send(err);

        // DEBUG
        console.log(`Chat created: ${chat}`);

        Chat.find((err, chats) => {
          if(err)
            res.send(err);

          res.json(chats);
        });
      });
    })

    // ### Get all of the chat items

    // Accessed at GET http://localhost:8080/api/chat
    .get((req, res) => {

      // Use mongoose to get all chat items in the database
      Chat.find((err, chat) => {

        if(err)
          res.send(err);

        else
          res.json(chat);
      });
    });

  router.route('/chat/:chat_id')

    // ### Get a chat item by ID

    // Accessed at GET http://localhost:8080/api/chat/:chat_id
    .get((req, res) => {

      // Use mongoose to a single chat item by id in the database
      Chat.findOne({

        '_id' : req.params.chat_id

      }, (err, chat) => {

        if(err)
          res.send(err);

        else
          res.json(chat);
      });
    })

    // ### Update a chat item by ID

    // Accessed at PUT http://localhost:8080/api/chat/:chat_id
    .put((req, res) => {

      // use our chat model to find the chat item we want
      Chat.findOne({

        '_id' : req.params.chat_id

      }, (err, chat) => {

        if (err)
          res.send(err);

        // Only update a field if a new value has been passed in
        if (req.body.text)
          chat.text = req.body.text;
        if (req.body.name)
          chat.name = req.body.name;
        if (req.body.date)
          chat.date = req.body.date;

        // save the chat item
        return chat.save((err) => {

          if (err)
            res.send(err);

          return res.send(chat);

        });
      });
    })

    // ### Delete a chat item by ID

    // Accessed at DELETE http://localhost:8080/api/chat/:chat_id
    .delete((req, res) => {

      // DEBUG
      console.log(`Attempting to delete chat with id: ${req.params.chat_id}`);
      console.log(req.params.chat_id);
      Chat.remove({

        _id : req.params.chat_id
      }, (err, chat) => {

        if(err)
          res.send(err);

        console.log('Chat successfully deleted!');

        Chat.find((err, chats) => {
          if(err)
            res.send(err);

          res.json(chats);
        });
      });
    });
};
