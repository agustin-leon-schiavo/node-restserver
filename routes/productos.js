const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validarJWT, 
    validarCampos, 
    esAdminRole 
} = require('../middlewares');

const { 
    crearProducto, 
    obtenerProductos, 
    obtenerProductoPorId, 
    actualizarProducto,
    borrarProducto} = require('../controllers/productos');

const { existeCategoria, existeProductoPorId } = require('../helpers/db-validators');


const router = Router();


// Obtener todas los productos - publico
router.get('/', obtenerProductos );

// Obtener un producto por id - publico
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], obtenerProductoPorId);

// Crear producto - privado - cualquiera con un token valido
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID válido').isMongoId(),
    check('categoria').custom( existeCategoria ),
    validarCampos
], crearProducto );

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarProducto );

// Borrar un producto - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], borrarProducto);

module.exports = router;
