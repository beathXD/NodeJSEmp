// IMPORTACIONES
const express = require('express');
const cors = require('cors');
var app = express();

// IMPORTACIONES RUTAS

const EmpresaRoutes = require('./src/routes/empresa.routes');
const UsuarioRoutes = require('./src/routes/usuario.router')
const SucursalesRoutes = require('./src/routes/sucursal.routes')


// MIDDLEWARES -> INTERMEDIARIOS
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/obtenerProductos
app.use('/api',  EmpresaRoutes, UsuarioRoutes, SucursalesRoutes);


module.exports = app;