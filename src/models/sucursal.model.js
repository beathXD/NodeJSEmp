const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sucursalesSchema = new Schema({
    nombreSucursal: String,
    ubicacionSucursal: String, 
    productosEmpresas:[{
        nombreProducto: String,
        cantidad: Number
    }]
})

module.exports = mongoose.model('Sucursales', sucursalesSchema);