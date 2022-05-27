const express = require('express');
const controlEmpresas = require('../controllers/empresa.controller');


const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');

const api = express.Router();

api.post('/agregarempresa', md_autenticacion.Auth ,controlEmpresas.agregarEmpresa);
api.put('/editarempresa/:idempresa', md_autenticacion.Auth, controlEmpresas.editarEmpresa);
api.delete('/eliminarempresa/:idempresa', md_autenticacion.Auth,  controlEmpresas.eliminarEmpresa);
api.get('/obtenerempresa',controlEmpresas.obtenerEmpresa)
api.get('/obtenerEmpresaId/:idEmpresa', md_autenticacion.Auth, controlEmpresas.obtenerEmpresaId)
api.post('/agregarProducto', md_autenticacion.Auth ,controlEmpresas.agregarProductos);
api.post('/obtenerProductos', controlEmpresas.obtenerProductos)

module.exports = api;