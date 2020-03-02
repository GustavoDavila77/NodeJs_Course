const store = require('./store');

function addArrayUser(listUser){
    
    if (!listUser ||  !Array.isArray(listUser)) {
        return Promise.reject('Invalid user list');
    }

    const chat = {
        users: listUser,
    };
    return store.addChat(chat);

    //otra op, con creación de promesa desde el principio
    /*store.addListUser(listUser)
    resolve(listUser);*/       
}

function getChats(userId){
    return store.getChats(userId);
}
/*
function getChats(filterUser) {
    return new Promise((resolve, reject) => {
        resolve(store.getChats(filterUser)); 
    })
}*/


module.exports = {
    addArrayUser,
    getChats,
};