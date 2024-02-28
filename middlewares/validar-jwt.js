const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // Leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( uid );

        // Verificar que exista el usuario
        if ( !usuario ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario inexistente'
            });
        }


        // Verificar si el usuario está activo
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario inactivo'
            });
        }

        req.usuario = usuario;
        next();

    } catch (error) {
        
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }

}






module.exports = {
    validarJWT,
}


