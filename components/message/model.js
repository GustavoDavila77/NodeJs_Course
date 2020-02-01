const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    chat: {
        type: Schema.ObjectId,
        ref: 'Chat',
    },
    // relación con colección user
    user: {
        type: Schema.ObjectId,
        ref: 'User', //nombre de la colección, instanciada en el store del componente user
    },
    message: {
        type: String,
        required: true,
    },
    date: Date,
    file: String,
});

// el model permite que lo que se vaya almacenar tenga el schema que definimos
//como parametro esta el nombre que le vamos a dar a la colección y el esquema
const model = mongoose.model('messages', mySchema); 
module.exports = model; 