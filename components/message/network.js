const express = require('express');
const path = require('path');
const multer = require('multer'); //permite gestionar la transmisión de archivos, gestión de tipos, guardar archivos en disco
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

/* intento fallido de guardar imagen con identificador unico y nombre original
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/files')
    },
    filename: (req, file, cb) => {
        console.log('antes filename');
        cb(null, file.filename + path.extname(file.originalname));
        console.log('despues filename');
    }
});

const upload = multer({storage: storage}); */

// los archivos que se carguen van a la carpeta public, donde se sirven los estaticos, para poder acceder a ellos 
//se crea una instancia de multer
const upload = multer({
    dest: 'public/files',
}); 

// ejem query
// http://localhost:3000/message?user=Carlos
router.get('/', function(req,res){
    //se optiene el usuario a buscar, sino esta será null
    const filterMessages = req.query.chat || null; 
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


//upload.single('file') es un middleware, el cual es un punto 
//por donde se va a pasar antes de entrar a nuestra función
//como sabe multer de donde sacar el archivo?
//para eso se especifica upload.single('nombre_archivo_en_multipart_insomnia')
router.post('/', upload.single('file'), function(req,res){

    //console.log(req.file); info de la imagen 

    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
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