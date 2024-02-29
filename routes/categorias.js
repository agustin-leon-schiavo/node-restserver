const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validarJWT, 
    validarCampos, 
    esAdminRole 
} = require('../middlewares');

const { 
    crearCategoria, 
    obtenerCategorias, 
    obtenerCategoriaPorId, 
    actualizarCategoria,
    borrarCategoria} = require('../controllers/categorias');

const { existeCategoria } = require('../helpers/db-validators');




const router = Router();


// Obtener todas las categorias - publico
router.get('/', obtenerCategorias );

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], obtenerCategoriaPorId);

// Crear categoria - privado - cualquiera con un token valido
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria );

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoria ),
    validarCampos
], actualizarCategoria );

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], borrarCategoria);

module.exports = router;
