var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var clientSchema = new Schema({

    identification_type: { 
        type: String, 
        required: [true, 'El tipo de documento es obligatorio'] 
    },
    identification_number: { 
        type: Number, 
        required: [true, 'El numero es obligatorio'] 
    },
    first_name: { 
        type: String,
        required: [true, 'El primer nombre es obligatorio'] 
    },
    second_name: { 
        type: String, 
        required: false
    },
    surname: { 
        type: String, 
        required: [true, 'El primer apellido es obligatorio']  
    },
    second_surname: { 
        type: String, 
        required: false
    },
    phone: { 
        type: String, 
        required: false 
    },
    email: { 
        type: String,  
        required: [true, 'El correo es obligatorio'] 
    },
    tenant_id: { 
        type: String, 
        required: [true, 'El tenant_id es obligatorio'] 
    }
    
});

clientSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Client', clientSchema);