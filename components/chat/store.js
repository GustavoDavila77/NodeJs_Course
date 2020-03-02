const Model = require('./model');

async function getChats(userId){
    return new Promise((resolve, reject) => {
        let filter = {};
        if (userId){
            filter = { 
                users: userId,
            }
        }
        
        Model.find(filter)
            .populate('users') //nombre del campo que queremos obtener, ubicado en el model
            .exec((error, populated) =>{ //hay que ejecutar el populate
                if(error) {
                    reject(error);
                    return false;
                }

                resolve(populated);
                console.log('pase el resolve(populated');
            });

    });  
}

function addChat(chat){
    const myChat = new Model(chat);
    return myChat.save(); //guardar en la base
}

//se exporta las funciones 
// nombre_por_fuera : nombre_interno
module.exports = {
    addChat,
    getChats,
}