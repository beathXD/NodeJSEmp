const empresa = require('../models/empresa.model');
const Producto = require('../models/productos.model')
function agregarEmpresa(req, res){

    const parametros = req.body;
    const modeloEmpresa = new empresa();

    if(parametros.nombreEmpresa){

        modeloEmpresa.nombreEmpresa = parametros.nombreEmpresa;
        modeloEmpresa.idAdmin = req.user.sub;

        modeloEmpresa.save((err, empresaGuardad) =>{

            if(err) return res.status(400).send({mensaje: "erro en la peticion"})
            if(!empresaGuardad) return res.status(400).send({mensaje:"erro al agregar empresa"})

            return res.status(200).send({empresa: empresaGuardad});
        })

    }else{
        return res.status(400).send({mensaje: 'Tienes que ingresar el parametro nombreEmpresa'});
    }

}


function editarEmpresa(req, res){
    var idempresa = req.params.idempresa;
    var parametros = req.body;
 
    delete parametros.password;
    delete parametros.rol;
 
    empresa.findByIdAndUpdate(idempresa, parametros, {new: true}, (err, empresaEditado) =>{
   
         if(err) return res.status(500).send({ mensaje: "error en la petcion"})
         if(!empresaEditado) return res.status(500). send({mensaje: "erro al editar la empresa"});
 
         return res.status(200).send({ empresa: empresaEditado})
     })

}

function eliminarEmpresa(req, res){

    var idEmpresa = req.params.idempresa;

    empresa.findByIdAndDelete(idEmpresa, (err, empresaEliminada)=>{
        if(err) return res.status(400).send({ mensaje: "error en la peticion"});
        if(!empresaEliminada) return res.status(400).send({mensaje: "erro al eliminar la empresa"});

        return res.status(200).send({empresa: empresaEliminada})
    })

}

function obtenerEmpresa(req, res){
     
    empresa.find({}, (err, empresaEncontrada) =>{
        if(err) return res.status(500).send({ mensaje: "error al obtener"});
        if(!empresaEncontrada) return res.status(500).send({mensaje : "erro al obtener empresa"});

        return res.status(200).send({ empresa: empresaEncontrada})
    })
}

function obtenerEmpresaId(req, res){
    const idEmpresa = req.params.idEmpresa; 

    empresa.find({_id: idEmpresa}, (err, empresaEncontrada)=>{
        if(err) return res.status(500).send({mensaje: "Error en la peticion"})
        if(!empresaEncontrada) return res.status(404).send({mensaje: 'Error al obtener la empresa'})

        return res.status(200).send({empresa: empresaEncontrada[0]})
    })

}

function obtenerProductos(req, res){
    Producto.find({}, (err, productosEncontrados)=>{
        if(err) return res.status(500).send({mensaje: 'Hubo un error en la peticion'})
        if(!productosEncontrados) return res.status(404).send({mensaje: 'Hubo un error al obtener los productos'})

        return res.status(200).send({producto: productosEncontrados})
    })
}
function agregarProductos(req, res){
    const modeloProducto = new Producto; 
    const parametros = req.body; 


    modeloProducto.nombreProducto = parametros.nombreProducto; 
    modeloProducto.cantidad = parametros.cantidad;
    modeloProducto.precio = parametros.precio;

    modeloProducto.save((err, productoGuardado=>{
        if(err) return res.status(500).send({mensaje: 'Hubo un error en la peticion'})
        if(!productoGuardado) return res.status(404).send({mensaje: 'Hubo un error al agregar el producto'})
        return res.status(200).send({producto: productoGuardado})
    }))

}

module.exports ={
    obtenerEmpresa,
    agregarEmpresa,
    editarEmpresa,
    eliminarEmpresa,
    obtenerEmpresaId,
    agregarProductos,
    obtenerProductos
}