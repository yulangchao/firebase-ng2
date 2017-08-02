// ```
// item.model.js
// (c) 2016 David Newman
// david.r.niciforovic@gmail.com
// item.model.js may be freely distributed under the MIT license
// ```

// */app/models/item.model.js*

// ## Item Model

// Note: MongoDB will autogenerate an _id for each Item object created

// Grab the Mongoose module
const mongoose= require('mongoose');

// Create a `schema` for the `Item` object
let itemSchema = new mongoose.Schema({
  name: { type : String , unique : true},
  price: Number,
  saleprice: Number,
  number: Number,
  text: String,
  user: String
});

// Expose the model so that it can be imported and used in
// the controller (to search, delete, etc.)
module.exports = mongoose.model('Item', itemSchema);
