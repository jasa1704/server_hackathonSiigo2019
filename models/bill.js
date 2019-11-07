var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

let billSchema = new Schema({
    item_id:{
        type: Schema.Types.ObjectId, ref:'Item'
    },
    doc_date:{
        type: String,
        required: [true, 'La fecha es requerida']
    },
    doc_number: {
        type: Number,
        required: [true, 'Numero de factura es requerido']
    },
    customer_id: {
        type: Schema.Types.ObjectId, ref:'Client',
        require: [true, 'El id del cliente es referido']
    },
    total_discount:{
        type: Number,
        required:[true]
    },
    total_tax:{
        type: Number,
        required:[true]
    },
    total_value:{
        type: Number,
        required:[true]
    }
});

billSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único'});

module.exports = mongoose.model('BillSchema', billSchema);