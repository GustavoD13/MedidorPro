const clienteRoutes = require('express').Router();

// Require Item model in our routes module
var Item = require('../models/Item');

// Defined store route
clienteRoutes.route('/add').post((req, res, next) => {
    var item = new Item(req.body);
    item.save()
    .then(item => {
      res.status(200).json({'item': 'Item added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
  });

// Defined get data(index or listing) route
clienteRoutes.route('/').get(function (req, res) {
  Item.find(function (err, items){
    if(err){
      console.log(err);
    }
    else {
      res.json(items);
    }
  });
});

// Defined edit route
clienteRoutes.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Item.findById(id, function (err, item){
      res.json(item);
  });
});

//  Defined update route
clienteRoutes.route('/update/:id').post(function (req, res) {
  Item.findById(req.params.id, function(err, item) {
    if (!item)
      return next(new Error('Could not load Document'));
    else {
      item.clienteId = req.body.clienteId;
      item.edificio = req.body.edificio;
      item.direccion = req.body.direccion;
      item.lectura = req.body.lectura;
      item.fechainstalacion = req.body.fechainstalacion;

      item.save().then(item => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
clienteRoutes.route('/delete/:id').get(function (req, res) {
  Item.findByIdAndRemove({_id: req.params.id}, function(err, item){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = clienteRoutes;
