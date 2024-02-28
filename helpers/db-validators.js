const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async( role = '' ) => {
    const existeRole = await Role.findOne({ role });
    if ( !existeRole ) {
        throw new Error(`El rol ${role} no está registrado en la BD`);
    }
}

const existeEmail = async( correo = '' ) => {

    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo ${ correo } ya está registrado`);
        };
}

const existeUsuarioPorId = async( id = '' ) => {

    const existeUsuario = await Usuario.findById( id );
    if ( !existeUsuario ) {
        throw new Error(`El ID ${ id } no se corresponde con ningún usuario existente en base de datos`);
        };
}


module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId,
}
