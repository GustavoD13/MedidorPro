var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*
var Item = new Schema({
  name: { type: String },
  price: { type: Number }
},{
    collection: 'items'
});

module.exports = mongoose.model('Item', Item);


const mongoose = require('mongoose');
const { Schema } = mongoose;
*/
const Cliente = new Schema({
    clienteId: { type: String },
    edificio: { type: String },
    direccion: { type: String },
    lectura: { type: String },
    fechainstalacion: { type: String }
},{
  collection: 'clientes'
});

module.exports = mongoose.model('Cliente', Cliente);