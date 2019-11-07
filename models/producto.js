let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

let rolesValidos = {
    values: ['admin', 'client'],
    message: '{VALUE} no es un rol permitido'
};

let productoSchema = new Schema({
    tenant_id: {
        type: String,
        required: [true, 'Tenant es necesario']
    },
    nombre: {
        type:String,
        required: [true, 'El nombre es necesario']
    },
    precio:{
        type: Number,
        required: [true, 'El precio es requerido']
    }
});

productoSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único'})

module.exports = mongoose.model('Producto', productoSchema);