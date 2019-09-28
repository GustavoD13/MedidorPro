const medicionRoutes = require('express').Router();

// Require Item model in our routes module
var Medicion = require('../models/Medicion');

// Defined store route
medicionRoutes.route('/add').post((req, res, next) => {
    var medicion = new Medicion(req.body);
    medicion.save()
    .then(item => {
      res.status(200).json({'medicion': 'Item added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
  });

// Defined get data(index or listing) route
medicionRoutes.route('/').get(function (req, res) {
  Medicion.find(function (err, mediciones){
    if(err){
      console.log(err);
    }
    else {
      res.json(mediciones);
    }
  });
});

// Defined edit route
medicionRoutes.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Medicion.findById(id, function (err, medicion){
      res.json(medicion);
  });
});

//  Defined update route
medicionRoutes.route('/update/:id').post(function (req, res) {
  Medicion.findById(req.params.id, function(err, medicion) {
    if (!medicion)
      return next(new Error('Could not load Document'));
    else {
      medicion.fechaMedicion = req.body.fechaMedicion;
      medicion.nroMedidor = req.body.nroMedidor;
      medicion.totalConsumido = req.body.totalConsumido;
      medicion.consumoMesAnterior = req.body.consumoMesAnterior;
      medicion.consumoMesActual = req.body.consumoMesActual;
      medicion.medidorId = req.body.medidorId;

      medicion.save().then(medicion => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
medicionRoutes.route('/delete/:id').get(function (req, res) {
  Medicion.findByIdAndRemove({_id: req.params.id}, function(err, medicion){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = medicionRoutes;
