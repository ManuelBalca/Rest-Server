const { response, request } = require('express');
const bcrypt = require('bcryptjs');

//importacion modelo
const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');

const getUsuarios = async (req = request, res = response) => {


    //condiciones del get
    const query = { estado: true };

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),//devolviendo el numero de usuarios qur sean true
        Usuario.find(query) //encontrando aquellos que sean true desde cual y cuantos va a mostrar
    ]);



    res.json({
        msg: 'get Api - Controlador Usuario',
        listaUsuarios
    });
}

const postUsuario = async (req = request, res = response) => {



    // se guarda como objeto
    // const usuario = req.body;

    //Desestructuración
    const { nombre, correo, password, rol } = req.body;
    const usuarioGuardadoDB = new Usuario({ nombre, correo, password, rol });

    //encryptando password
    const salt = bcrypt.genSaltSync();
    usuarioGuardadoDB.password = bcrypt.hashSync(password, salt);

    //guardando en base
    await usuarioGuardadoDB.save();


    res.json({
        msg: 'POST',
        usuarioGuardadoDB
    });
}


const putUsuario = async (req = request, res = response) => {

    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;
    const { _id, img, rol, estado, google, ...resto } = req.body;


    if (resto.password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    // editar por id
    const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
        msg: 'PUT editar user',
        id,
        usuarioEditado
    });
}

const deleteUsuario = async(req = request, res = response) => {
    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;
// const usuarioEliminado = await Usuario.findByIdAndDelete(id);
 const usuarioEliminado = await Usuario.findByIdAndUpdate(id, {estado: false});
    res.json({
        msg: 'DELETE eliminar user',
        id
    });
}

module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario
}


// CONTROLADOR