const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    nombreProducto: String,
    cantidad: Number,
    precio: Number
})

module.exports = mongoose.model('Productos', productoSchema);