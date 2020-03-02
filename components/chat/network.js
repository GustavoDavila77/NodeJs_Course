const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

// ejem query
// http://localhost:3000/message?user=Carlos
// router.get('/:userId', function(req,res){ otra op
router.get('/:userId', function(req,res){
    
    //const filterMessages = req.query.userId || null;
    controller.getChats(req.params.userId)
        .then((users) => {
            response.success(req, res, users, 200);
        })
        .catch(e =>{
            response.error(req, res, 'unexpected Error', 500, e);
        })
});


router.post('/', function(req,res){

    controller.addArrayUser(req.body.users)
        .then(listUsers =>{
            response.success(req, res, listUsers, 201);
        })
        .catch(e => {
            response.error(req, res, 'Info invalida', 400, 'Error en el controller');
        })
    
});



module.exports = router; 