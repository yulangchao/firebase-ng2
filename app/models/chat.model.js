// ```
// chat.model.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// chat.model.js may be freely distributed under the MIT license
// ```

// */app/models/chat.model.js*

// ## Chat Model

// Note: MongoDB will autogenerate an _id for each Chat object created

// Grab the Mongoose module
const mongoose= require('mongoose');

// Create a `schema` for the `Chat` object
let chatSchema = new mongoose.Schema({
  text: { type : String },
  name: {type: String} ,
  date: {type: String}
});

// Expose the model so that it can be imported and used in
// the controller (to search, delete, etc.)
module.exports = mongoose.model('Chat', chatSchema);
