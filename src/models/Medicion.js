var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Medicion = new Schema({
  fechaMedicion: { type: String },
  nroMedidor: { type: Number },
  totalConsumido: { type: String },
  consumoMesAnterior: { type: String },
  consumoMesActual: { type: String },
  medidorId: {type: mongoose.Schema.Types.ObjectId, ref: 'Medidor'}
},{
    collection: 'mediciones'
});

module.exports = mongoose.model('Medicion', Medicion);


