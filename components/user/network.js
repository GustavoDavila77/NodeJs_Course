const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

//TODO Hacer para obtener la lista de users 
router.get('/', function(req, res){

    controller.userList()
        .then((username) =>{
            response.success(req, res, username, 200);
        })
        .catch(err =>{
            response.error(req, res, 'Error no se encontró user', 400, err);
        })
});

router.post('/', function(req, res){
    //enviamos el name recibido del request del cliente(insomnia)
    //nos devuelve una promesa
    controller.addUser(req.body.name)
        // si la respuesta es correcta la almacenamos en data
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch( err => {
            response.error(req, res, 'Internal error', 500, err);
        })
})

module.exports = router;