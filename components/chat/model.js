const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// TODO crear post que reciba un array de usuarios y cree un nuevo chat 
// TODO ruta post donde podamos listar todos los chats
const mySchema = new Schema({
    users: [ {
        type: Schema.ObjectId,
        ref: 'User',
    }    
    ],
});

// el model permite que lo que se vaya almacenar tenga el schema que definimos
//como parametro esta el nombre que le vamos a dar a la colección y el esquema
const model = mongoose.model('Chat', mySchema); 
module.exports = model;  