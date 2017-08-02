// ```
// chuku.model.js
// (c) 2016 David Newman
// david.r.niciforovic@gmail.com
// chuku.model.js may be freely distributed under the MIT license
// ```

// */app/models/chuku.model.js*

// ## Chuku Model

// Note: MongoDB will autogenerate an _id for each Chuku object created

// Grab the Mongoose module
const mongoose= require('mongoose');

// Create a `schema` for the `Chuku` object
let chukuSchema = new mongoose.Schema({
  user: { type : String},
  name: { type : String},
  price: Number,
  date: String,
  kuaidi: String,
  number: Number,
  text: String,
  localuser: String
});

// Expose the model so that it can be imported and used in
// the controller (to search, delete, etc.)
module.exports = mongoose.model('Chuku', chukuSchema);
