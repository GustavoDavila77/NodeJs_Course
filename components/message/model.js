const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    user: String,
    message: {
        type: String,
        required: true,
    },
    date: Date
});

// el model permite que lo que se vaya almacenar tenga el schema que definimos
//como parametro esta el nombre que le vamos a dar a la colección y el esquema
const model = mongoose.model('messages', mySchema); 
module.exports = model; 