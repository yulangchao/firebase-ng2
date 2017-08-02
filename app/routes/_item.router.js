// ```
// _item.js
// (c) 2016 David Newman
// david.r.niciforovic@gmail.com
// _item.js may be freely distributed under the MIT license
// ```

// */app/routes/_item.router.js*

// ## Item API object

// HTTP Verb  Route                 Description

// GET        /api/item             Get all of the item items
// GET        /api/item/:item_id    Get a single item item by item item id
// POST       /api/item             Create a single item item
// DELETE     /api/item/:item_id    Delete a single item item
// PUT        /api/item/:item_id    Update a item item with new info

// Load the item model
const Item = require('../models/item.model');

module.exports = (app, router) => {

  // ### Item API Routes

  // Define routes for the item item API

  router.route('/item/:user')

  // ### Create a item item

  // Accessed at POST http://localhost:8080/api/item

  // Create a item item
  .post((req, res) => {

    Item.findOne({
      'name': req.body.name
    }, (err, item) => {

      if (err)
        res.send(err);

      if (item) {
        res.send(500, req.body.name + " is existed");
        console.log(`Item existed: ${item}`);
      } else {
        Item.create({
          name: req.body.name,
          price: req.body.price,
          saleprice: req.body.saleprice,
          number: req.body.number,
          text: req.body.text,
          user: req.params.user

        }, (err, item) => {

          if (err)
            res.send(err);

          // DEBUG
          console.log(`Item created: ${item}`);

          Item.find({
            user: req.params.user
          },(err, items) => {
            if (err)
              res.send(err);

            res.json(items);
          });
        });
      }
    });


  })

  // // ### Get all of the item items

  // // Accessed at GET http://localhost:8080/api/item
  .get((req, res) => {

    // Use mongoose to get all item items in the database
    Item.find({
         user: req.params.user
    },(err, item) => {

      if (err)
        res.send(err);

      else
        res.json(item);
    });
  });

  router.route('/item/:user/:item_id')

  // ### Get a item item by ID

  // Accessed at GET http://localhost:8080/api/item/:item_id
  .get((req, res) => {

    // Use mongoose to a single item item by id in the database
    Item.findOne({
    $and : [
        { _id: req.params.item_id },
        { user: req.params.user }
    ]
    }, (err, item) => {

      if (err)
        res.send(err);

      else
        res.json(item);
    });
  })

  // ### Update a item item by ID

  // Accessed at PUT http://localhost:8080/api/item/:item_id
  .put((req, res) => {

    // use our item model to find the item item we want
    Item.findOne({

      _id: req.params.item_id

    }, (err, item) => {

      if (err)
        res.send(err);

      // Only update a field if a new value has been passed in
      if (req.body.name)
        item.name = req.body.name;
      if (req.body.price)
        item.price = req.body.price;
      if (req.body.saleprice)
        item.saleprice = req.body.saleprice;
      if (req.body.number)
        item.number = req.body.number;
      if (req.body.text || req.body.text == "")
        item.text = req.body.text;

      // save the item item
      return item.save((err) => {

        if (err)
          res.send(err);

        return res.send(item);

      });
    });
  })

  // ### Delete a item item by ID

  // Accessed at DELETE http://localhost:8080/api/item/:item_id
  .delete((req, res) => {

    // DEBUG
    console.log(`Attempting to delete item with id: ${req.params.item_id}`);

    Item.remove({

      _id: req.params.item_id
    }, (err, item) => {

      if (err)
        res.send(err);

      console.log('Item successfully deleted!');

      Item.find({
         user: req.params.user
      },(err, items) => {
        if (err)
          res.send(err);

        res.json(items);
      });
    });
  });
};
