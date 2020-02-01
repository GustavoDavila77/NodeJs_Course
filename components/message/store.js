const Model = require('./model');

function addMessage(message){
    const myMessage = new Model(message);
    myMessage.save(); //guardar en la base
}

async function getMessage(filterChat){
    return new Promise((resolve, reject) => {
        let filter = {};
        if (filterChat != null){
            filter = { chat: filterChat};
        }
        
        Model.find(filter)
            .populate('user') //nombre del campo que queremos obtener, ubicado en el model
            .exec((error, populated) =>{ //hay que ejecutar el populate
                if(error) {
                    reject(error);
                    return false;
                }

                resolve(populated);
            });

    });
    
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