const medidorRoutes = require('express').Router();

// Require Item model in our routes module
var Medidor = require('../models/Medidor');

// Defined store route
medidorRoutes.route('/add').post((req, res, next) => {
    var medidor = new Item(req.body);
    medidor.save()
    .then(medidor => {
      res.status(200).json({'medidor': 'Item added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
  });

// Defined get data(index or listing) route
medidorRoutes.route('/').get(function (req, res) {
  Medidor.find(function (err, medidores){
    if(err){
      console.log(err);
    }
    else {
      res.json(medidores);
    }
  });
});

// Defined edit route
medidorRoutes.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Medidor.findById(id, function (err, medidor){
      res.json(item);
  });
});

//  Defined update route
medidorRoutes.route('/update/:id').post(function (req, res) {
  Medidor.findById(req.params.id, function(err, medidor) {
    if (!medidor)
      return next(new Error('Could not load Document'));
    else {
      medidor.medidorId = req.body.medidorId;
      medidor.piso = req.body.piso;
      medidor.depto = req.body.depto;
      medidor.clienteId = req.body.clienteId;

      medidor.save().then(medidor => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
medidorRoutes.route('/delete/:id').get(function (req, res) {
  Medidor.findByIdAndRemove({_id: req.params.id}, function(err, medidor){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = medidorRoutes;
