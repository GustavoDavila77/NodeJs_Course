const store = require('./store');
const path = require('path');

function addMessage(chat, user, message, file){
    return new Promise((resolve, reject) =>{
        if (!chat || !user || !message) {
            console.error('[messageController] No hay usuario o mensaje');
            reject('Los datos son incorrectos');
            return false; 
        }
        let fileUrl = '';
        if(file) {
            //este link nos permite descargar el archivo, una vez este en el server
            fileUrl = 'http://localhost:3000/app/files/' +  file.filename;//en app es donde se sirven los archivos estaticos
        }

        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            file: fileUrl,

        };

        //console.log(fullMessage);
        store.add(fullMessage)
        resolve(fullMessage);
    })    
}

function getMessage(filterChat) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterChat)); 
    })
}

function updateMessage(id, message) {
    return new Promise(async (resolve, reject) => {
        if(!id || !message){
            reject('Invalid data');
            return false;
        }
        
        const result = await store.updateText(id, message);
        resolve(result);
    })
}

function deleteMessage(id){
    return new Promise((resolve, reject) =>{
        if(!id){
            reject('Id invalido');
            return false;
        }

        store.remove(id)
        .then(()=> {
            resolve();
        })
            .catch(e =>{
                reject(e);
            })
    });
}

module.exports = {
    addMessage,
    getMessage,
    updateMessage,
    deleteMessage,
};