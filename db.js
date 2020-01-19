const db = require('mongoose');

//url example
// mongodb+srv://<user>:<password>@atlastar-vkqae.mongodb.net/<name_database>?retryWrites=true&w=majority

//'mongodb+srv://atlas-admin:admintavo@atlastar-vkqae.mongodb.net/Telegrom?retryWrites=true&w=majority'

// esto es para usar las promesas que nos ofrece js
db.Promise = global.Promise;

async function connect(url) {
    await db.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true }
        );
   console.log('[db] Conectada con éxito');
}

module.exports = connect;