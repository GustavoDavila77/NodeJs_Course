const Model = require('./model');

function addUser(user){
    const myUser = new Model(user);
    return myUser.save(); //retornamos el objeto creado(usuario)
}

async function getUser(){
    const getName = await Model.find();
    return getName;
}

module.exports = {
    //nombre_archivos_externos: nombre_local
    add: addUser,
    getUser,
}