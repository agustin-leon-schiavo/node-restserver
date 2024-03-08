const { 
    Categoria,
    Producto, 
    Role, 
    Usuario 
} = require('../models');


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

const existeCategoria = async( id = '' ) => {

    const existeCategoria = await Categoria.findById( id );
    if ( !existeCategoria ) {
        throw new Error(`El ID ${ id } no se corresponde con ninguna categoria existente en base de datos`);
        };
}

const existeProductoPorId = async( id ) => {

    const existeProducto = await Producto.findById( id );
    if ( !existeProducto ) {
        throw new Error(`El ID ${ id } no existe`);
        };
}

const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {

    const incluida = colecciones.includes( coleccion );
    if ( !incluida ) {
        throw new Error(`La colección ${ coleccion } no es permitida`)
    }
    return true;
}


module.exports = {
    coleccionesPermitidas,
    esRoleValido,
    existeEmail,
    existeUsuarioPorId,
    existeCategoria,
    existeProductoPorId,
}
