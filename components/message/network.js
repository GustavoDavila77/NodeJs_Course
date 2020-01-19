const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

// ejem query
// http://localhost:3000/message?user=Carlos
router.get('/', function(req,res){
    //se optiene el usuario a buscar, sino esta será null
    const filterMessages = req.query.user || null; 
    controller.getMessage(filterMessages)
        .then((MessageList) => {
            response.success(req, res, MessageList, 200);
        })
        .catch(e =>{
            response.error(req, res, 'unexpected Error', 500, e);
        })
    //cabeceras para visualizar que es lo que nos esta viniendo
    //console.log(req.headers);
    //tambien podemos setear headers
    /*res.header({
        "custom-header": "Nuestro valor personalizado"
    })
    response.success(req, res, 'solicitud aprobada', 200);*/
});

router.post('/', function(req,res){

    controller.addMessage(req.body.user, req.body.message)
        .then((fullMessage) =>{
            response.success(req, res, fullMessage, 201);
        })
        .catch(e => {
            response.error(req, res, 'Info invalida', 400, 'Error en el controller');
        })
    
    /*
    if(req.query.error == 'ok'){
        response.error(req, res, 'Error inesperado', 500, 'Es solo una simulación');
    } else {
        response.success(req, res, 'Creado correctamente', 201);
    }*/
    //obtenemos la query que se ha hecho
    //console.log(req.query); 
    //observamos lo que nos envian en formato json
    //console.log(req.body);
    //la respuesta puede ser vacia, o con objetos mas complejos como arrays 
    //response.success(req, res, 'Creado correctamente', 201);
});

router.patch('/:id', function(req, res) {

    //req.params.id permite obtener el id de la petición
    //req.body.message permite obtener el mensaje que nos envian
    //como lo que nos devulve es una promesa, utilizamos then y catch 
    controller.updateMessage(req.params.id, req.body.message)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });

})

router.delete('/:id', function(req,res){  
    controller.deleteMessage(req.params.id)
        .then(() => {
            response.success(req, res, `Mensaje ${req.params.id} eliminado`, 200);
        })
        .catch(e =>{
            response.error(req, res, 'Error interno', 500, e); 
        })
});
//  '/' significa que accedo desde cualquier ruta
// request, response --> parametros que tiene cualquier función http

//se exporta router para que pueda ser utilizado 
// en este caso desde server
module.exports = router; 