const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: String
});

// el model permite que lo que se vaya almacenar tenga el schema que definimos
//como parametro esta el nombre que le vamos a dar a la colección y el esquema
const model = mongoose.model('User', mySchema); 
module.exports = model; 