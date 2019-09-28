var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Medidor = new Schema({
  medidorId: { type: String },
  piso: { type: Number },
  depto: { type: String },
  clienteId: {type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
},{
    collection: 'medidores'
});

module.exports = mongoose.model('Medidor', Medidor);

