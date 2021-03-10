/* 
    Como queremos que lusca la info en la DB 
    {
        nombre: 'xxx',
        correo: 'xxx@xxx.xx',
        password: 'xx12345',
        role: '231561465',
        isActive: false,
        googleUser: true
    }
*/


const {Schema, model} = require('mongoose');
const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true //para que mongo verifique que no sea un correo ya existente
    },
    password:{
        type: String,
        required: [true, 'El password es obligatorio'],
        unique: true
    },
    img:{
        type: String,
        //required: [true, 'La imagen es obligatorio']
    },
    rol:{
        type: String,
        required: [true, 'El role es obligatorio'],
        enum: ['ROL_owner', 'ROL_adminBar', 'ROL_user']
    },
    isActive:{
        type: Boolean,
        default: true
    },
    googleUser:{
        type: Boolean,
        default: false
    },
    
});
//ocultar o quitar campos de modelo para no ser mostrados como respuesta al usuario
UsuarioSchema.methods.toJSON = function () {
    const {__v, password, _id, ...user} = this.toObject(); //operador rest => ...user    
    user['uid'] = _id    
    return user;
}



module.exports = model('Usuario', UsuarioSchema);