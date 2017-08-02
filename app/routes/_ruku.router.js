// ```
// _ruku.js
// (c) 2016 David Newman
// david.r.niciforovic@gmail.com
// _ruku.js may be freely distributed under the MIT license
// ```

// */app/routes/_ruku.router.js*

// ## Ruku API object

// HTTP Verb  Route                 Description

// GET        /api/ruku             Get all of the ruku rukus
// GET        /api/ruku/:ruku_id    Get a single ruku ruku by ruku ruku id
// POST       /api/ruku             Create a single ruku ruku
// DELETE     /api/ruku/:ruku_id    Delete a single ruku ruku
// PUT        /api/ruku/:ruku_id    Update a ruku ruku with new info

// Load the ruku model
const Ruku = require('../models/ruku.model');

module.exports = (app, router) => {

  // ### Ruku API Routes

  // Define routes for the ruku ruku API

  router.route('/ruku/:localuser')

    // ### Create a ruku ruku

    // Accessed at POST http://localhost:8080/api/ruku

    // Create a ruku ruku
    .post((req, res) => {

      Ruku.create({
        name : req.body.name,
        price : req.body.price,
        saleprice : req.body.saleprice,
        number : req.body.number,
        text : req.body.text,
        user : req.body.user,
        location : req.body.location,
        date : req.body.date,
        localuser: req.params.localuser

      }, (err, ruku) => {

        if (err)
          res.send(err);

        // DEBUG
        console.log(`Ruku created: ${ruku}`);

        Ruku.find({
          localuser: req.params.localuser
        },(err, rukus) => {
          if(err)
            res.send(err);

          res.json(rukus);
        });
      });
    })

    // ### Get all of the ruku rukus

    // Accessed at GET http://localhost:8080/api/ruku
    .get((req, res) => {

      // Use mongoose to get all ruku rukus in the database
      Ruku.find({
         localuser: req.params.localuser
      },(err, ruku) => {

        if(err)
          res.send(err);

        else
          res.json(ruku);
      });
    });

  router.route('/ruku/:localuser/:ruku_id')

    // ### Get a ruku ruku by ID

    // Accessed at GET http://localhost:8080/api/ruku/:ruku_id
    .get((req, res) => {

      // Use mongoose to a single ruku ruku by id in the database
      Ruku.findOne({
        $and : [
            { _id: req.params.ruku_id },
            { localuser: req.params.localuser }
        ]
        }, (err, ruku) => {

        if(err)
          res.send(err);

        else
          res.json(ruku);
      });
    })

    // ### Update a ruku ruku by ID

    // Accessed at PUT http://localhost:8080/api/ruku/:ruku_id
    .put((req, res) => {

      // use our ruku model to find the ruku ruku we want
      Ruku.findOne({

        '_id' : req.params.ruku_id

      }, (err, ruku) => {

        if (err)
          res.send(err);

        // Only update a field if a new value has been passed in
        if (req.body.name)
          ruku.name = req.body.name;
        if (req.body.price)
          ruku.price = req.body.price;
        if (req.body.saleprice)
          ruku.saleprice = req.body.saleprice;
        if (req.body.number)
          ruku.number = req.body.number;
        if (req.body.date)
          ruku.date = req.body.date;
        if (req.body.location)
          ruku.location = req.body.location;
        if (req.body.user)
          ruku.user = req.body.user;
        // save the ruku ruku

        ruku.text = req.body.text;
        return ruku.save((err) => {

          if (err)
            res.send(err);

          return res.send(ruku);

        });
      });
    })

    // ### Delete a ruku ruku by ID

    // Accessed at DELETE http://localhost:8080/api/ruku/:ruku_id
    .delete((req, res) => {

      // DEBUG
      console.log(`Attempting to delete ruku with id: ${req.params.ruku_id}`);

      Ruku.remove({

        _id : req.params.ruku_id
      }, (err, ruku) => {

        if(err)
          res.send(err);

        console.log('Ruku successfully deleted!');

        Ruku.find({
          localuser: req.params.localuser
        },(err, rukus) => {
          if(err)
            res.send(err);

          res.json(rukus);
        });
      });
    });
};
