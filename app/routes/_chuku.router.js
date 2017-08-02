// ```
// _chuku.js
// (c) 2016 David Newman
// david.r.niciforovic@gmail.com
// _chuku.js may be freely distributed under the MIT license
// ```

// */app/routes/_chuku.router.js*

// ## Chuku API object

// HTTP Verb  Route                 Description

// GET        /api/chuku             Get all of the chuku chukus
// GET        /api/chuku/:chuku_id    Get a single chuku chuku by chuku chuku id
// POST       /api/chuku             Create a single chuku chuku
// DELETE     /api/chuku/:chuku_id    Delete a single chuku chuku
// PUT        /api/chuku/:chuku_id    Update a chuku chuku with new info

// Load the chuku model
const Chuku = require('../models/chuku.model');

module.exports = (app, router) => {

  // ### Chuku API Routes

  // Define routes for the chuku chuku API

  router.route('/chuku/:localuser')

    // ### Create a chuku chuku

    // Accessed at POST http://localhost:8080/api/chuku

    // Create a chuku chuku
    .post((req, res) => {

      Chuku.create({
        name : req.body.name,
        price : req.body.price,
        saleprice : req.body.saleprice,
        number : req.body.number,
        text : req.body.text,
        user : req.body.user,
        kuaidi : req.body.kuaidi,
        date : req.body.date,
        localuser: req.params.localuser

      }, (err, chuku) => {

        if (err)
          res.send(err);

        // DEBUG
        console.log(`Chuku created: ${chuku}`);

        Chuku.find({
          localuser: req.params.localuser
        },(err, chukus) => {
          if(err)
            res.send(err);

          res.json(chukus);
        });
      });
    })

    // ### Get all of the chuku chukus

    // Accessed at GET http://localhost:8080/api/chuku
    .get((req, res) => {

      // Use mongoose to get all chuku chukus in the database
      Chuku.find({
          localuser: req.params.localuser
        },(err, chuku) => {

        if(err)
          res.send(err);

        else
          res.json(chuku);
      });
    });

  router.route('/chuku/:localuser/:chuku_id')

    // ### Get a chuku chuku by ID

    // Accessed at GET http://localhost:8080/api/chuku/:chuku_id
    .get((req, res) => {

      // Use mongoose to a single chuku chuku by id in the database
      Chuku.findOne({
        $and : [
            { _id: req.params.chuku_id },
            { localuser: req.params.localuser }
        ]
        }, (err, chuku) => {

        if(err)
          res.send(err);

        else
          res.json(chuku);
      });
    })

    // ### Update a chuku chuku by ID

    // Accessed at PUT http://localhost:8080/api/chuku/:chuku_id
    .put((req, res) => {

      // use our chuku model to find the chuku chuku we want
      Chuku.findOne({

        '_id' : req.params.chuku_id

      }, (err, chuku) => {

        if (err)
          res.send(err);

        // Only update a field if a new value has been passed in
        if (req.body.name)
          chuku.name = req.body.name;
        if (req.body.price)
          chuku.price = req.body.price;
        if (req.body.saleprice)
          chuku.saleprice = req.body.saleprice;
        if (req.body.number)
          chuku.number = req.body.number;

        if (req.body.date)
          chuku.date = req.body.date;
        if (req.body.kuaidi)
          chuku.kuaidi = req.body.kuaidi;
        if (req.body.user)
          chuku.user = req.body.user;
        // save the chuku chuku
        chuku.text = req.body.text;
        return chuku.save((err) => {

          if (err)
            res.send(err);

          return res.send(chuku);

        });
      });
    })

    // ### Delete a chuku chuku by ID

    // Accessed at DELETE http://localhost:8080/api/chuku/:chuku_id
    .delete((req, res) => {

      // DEBUG
      console.log(`Attempting to delete chuku with id: ${req.params.chuku_id}`);

      Chuku.remove({

        _id : req.params.chuku_id
      }, (err, chuku) => {

        if(err)
          res.send(err);

        console.log('Chuku successfully deleted!');

        Chuku.find({
          localuser: req.params.localuser
        },(err, chukus) => {
          if(err)
            res.send(err);

          res.json(chukus);
        });
      });
    });
};
