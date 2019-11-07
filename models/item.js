var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    product_id:{
        type: Schema.Types.ObjectId, ref:'Producto',
        required: [true, 'Producto es requerido']
    },
    tenant_id: { 
        type: String, 
        required: [true, 'El tenant_id es obligatorio'] 
    },
    quantity:{
        type: Number,
        required: [false]
    },
    unit_value:{
        type: Number,
        required: [false]
    },
    item_value:{
        type: Number,
        required: [false]
    }
})


module.exports = mongoose.model('Item', itemSchema);