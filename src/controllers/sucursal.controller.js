const Sucursal = require('../models/sucursal.model');

function agregarSucursal(req, res){

    const parametros = req.body;
    const modeloSucursal = new Sucursal();

    if(parametros.nombreSucursal, parametros.ubicacionSucursal){

        modeloSucursal.nombreSucursal = parametros.nombreSucursal;
        modeloSucursal.ubicacionSucursal = parametros.ubicacionSucursal;

        modeloSucursal.save((err, sucursalGuardad) =>{

            if(err) return res.status(400).send({mensaje: "erro en la peticion"})
            if(!sucursalGuardad) return res.status(400).send({mensaje:"erro al agregar la sucursal"})

            return res.status(200).send({sucursal: sucursalGuardad});
        })

    }else{
        return res.status(400).send({mensaje: 'Tienes que ingresar el nombre de la sucursal'});
    }

}

function editarSucursal(req, res){
    var idSucursal = req.params.idSucursal;
    var parametros = req.body;
 
    Sucursal.findByIdAndUpdate(idSucursal, parametros, {new: true}, (err, sucursalEditada) =>{
   
         if(err) return res.status(500).send({ mensaje: "error en la petcion"})
         if(!sucursalEditada) return res.status(500). send({mensaje: "erro al editar la sucursal"});
 
         return res.status(200).send({ sucursal: sucursalEditada})
     })

}

function eliminarSucursal(req, res){

    var idSucursal = req.params.idSucursal;

    Sucursal.findByIdAndDelete(idSucursal, (err, sucursalEliminada)=>{
        if(err) return res.status(400).send({ mensaje: "error en la peticion"});
        if(!sucursalEliminada) return res.status(400).send({mensaje: "error al eliminar la sucursal"});

        return res.status(200).send({sucursal: sucursalEliminada})
    })

}

function agregarProductoASucursal(req, res) {
    var sucursalId = req.params.idSucursal;
    var parametros = req.body;

    if( parametros.nombreProducto && parametros.cantidad ) {

        Sucursal.findByIdAndUpdate(sucursalId, { $push: { productosEmpresas: { nombreProducto: parametros.nombreProducto, 
            cantidad: parametros.cantidad } } }, {new: true}, (err, productoAgregado)=>{
                if(err) return res.status(500).send({ mensaje: 'Error en  la peticion'});
                if(!productoAgregado) return res.status(500).send({ mensaje: 'Error al agregar el producto a la sucursal'});

                return res.status(200).send({ sucursal: productoAgregado })

            })

    } else {
        return res.status(500).send({ mensaje: 'Debe enviar los parametros necesarios.' })
    }

}

function obtenerSucursal(req, res){
     
    Sucursal.find({}, (err, sucursalEncontrada) =>{
        if(err) return res.status(500).send({ mensaje: "error al obtener"});
        if(!sucursalEncontrada) return res.status(500).send({mensaje : "error al obtener sucursal"});

        return res.status(200).send({ sucursal: sucursalEncontrada})
    })
}

function obtenerSucursalId(req, res){
    
    const idSucursal = req.params.idSucursal;

    Sucursal.find({_id : idSucursal}, (err, sucursalEncontrada) =>{
        if(err) return res.status(500).send({ mensaje: "error al obtener"});
        if(!sucursalEncontrada) return res.status(500).send({mensaje : "error al obtener sucursal"});

        return res.status(200).send({ sucursal: sucursalEncontrada[0]})
    })
}

module.exports = {
    agregarSucursal,
    editarSucursal,
    eliminarSucursal,
    agregarProductoASucursal,
    obtenerSucursal,
    obtenerSucursalId
}