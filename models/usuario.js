const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'nombre obligatorio']

    },
    correo:{
        type: String,
        required: [true, 'correo obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'password obligatorio']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        // enum: ['admin_role', 'user_role']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});



module.exports = model('Usuario', UsuarioSchema);