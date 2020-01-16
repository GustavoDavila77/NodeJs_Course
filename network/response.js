exports.success = function(req, res, message, status){
    //en caso que no venga ningun status, por defecto es 200
    res.status(status || 200).send({
        error: "", //si el error viene vacio sabemos que todo va bien
        body: message
    });
}

exports.error = function(req, res, message, status, details){
    //hay que tener mucho cuidado con la info de los errores que se le mustra  al cliente
    //si hay un error con la conexión con la base de datos
    //estos se ingresa dentro de un log mas no se le muestra al cliente
    console.log('[response error]'+ details)
    res.status(status || 500).send({
        error: message,
        body: ""
    });
}