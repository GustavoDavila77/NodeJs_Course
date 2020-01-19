const Model = require('./model');

function addMessage(message){
    const myMessage = new Model(message);
    myMessage.save(); //guardar en la base
}

async function getMessage(filterUser){
    let filter = {};
    if (filterUser != null){
        filter = { user: filterUser};
    }
    const messages = await Model.find(filter);
    return messages;
}

async function updateText(id, message) {
    const foundMessage = await Model.findOne({
        _id:id
    });

    //encuentra el objeto con el id especificado
    // y cambia el mensaje por el nuevo
    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;
}

function removeMessage(id){
    return Model.deleteOne({
        _id: id
    });
}

//se exporta las funciones 
// nombre_por_fuera : nombre_interno
module.exports = {
    add: addMessage,
    list: getMessage,
    updateText: updateText,
    remove: removeMessage,
    //get
    //post
    //update
    //delete
}