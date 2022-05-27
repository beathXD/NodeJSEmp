const express = require('express');
const controlSucursal = require('../controllers/sucursal.controller');


const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/agregarSucursal', controlSucursal.agregarSucursal);
api.put('/editarSucursal/:idSucursal', controlSucursal.editarSucursal)
api.delete('/eliminarSucursal/:idSucursal', controlSucursal.eliminarSucursal)
api.put('/agregarProducto/:idSucursal', controlSucursal.agregarProductoASucursal)
api.get('/obtenerSucursal', controlSucursal.obtenerSucursal)
api.get('/obtenerSucursalId/:idSucursal', controlSucursal.obtenerSucursalId)

module.exports = api;