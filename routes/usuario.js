//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, postUsuario, putUsuario, deleteUsuario } = require('../controllers/usuario');
const { esRoleValido } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


router.get('/mostrar', getUsuarios);

router.post('/agregar',[
    //validacion para que el nombre no este vacio
    check('nombre', 'el nombre del usuario es obligatorio').not().isEmpty(),
    //validacion para que el email sea valido
    check('correo', 'el correo no es valido').isEmail(),
    //validando que la contra sea de 6 digitos
    check('password', 'deben ser 6 digitos').isLength({ min : 6}),
    // check('rol', 'no existe el rol').isIn([]), ejemplo de validacion de rol
    check('rol').custom(esRoleValido),
    validarCampos
], postUsuario);

router.put('/editar/:id', putUsuario);

router.delete('/eliminar/:id', deleteUsuario);



module.exports = router;


// ROUTES