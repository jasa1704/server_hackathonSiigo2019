var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var patientSchema = new Schema({

    tpdoc: { 
        type: String, 
        required: [true, 'El tipo de documento es necesario'] 
    },
    numdoc: { 
        type: Number, 
        required: [true, 'El numero del documento es necesario'],
        unique: true 
    },
    nombre1: { 
        type: String, 
        required: [true, 'El primer nombre es necesario'] 
    },
    nombre2: { 
        type: String, 
        required: [true, 'El segundo nombre es necesario'] 
    },
    apellido1: { 
        type: String,
        required: [true, 'El primer apellido es necesario'] 
    },
    apellido2: { 
        type: String, 
        required: [true, 'El segundo apellido es necesario'] 
    },
    sexo: { 
        type: String, 
        required: [true, 'El sexo es necesario'] 
    },
    raza: { 
        type: String, 
        required: [true, 'La raza es necesaria']  
    },
    estadoCivil: { 
        type: String, 
        required: [true, 'El estado civil es necesario']  
    },
    hijos: { 
        type: String, 
        required: [true, 'La cantidad de hijos es necesaria'] 
    },
    celular: { 
        type: String, 
        required: [true, 'El numero es necesario'] 
    },
    correo: { 
        type: String, 
        required: [true, 'El correo es necesario'],
        unique: true  
    },
    fechaN: { 
        type: String, 
        required: [true, 'La fecha de nacimiento es necesaria'] 
    },
    fechaC: { 
        type: String, 
        required: [true, 'La fecha de creacion es necesaria']  
    },
    direccion: { 
        type: String, 
        required: [true, 'La direccion es necesaria'] 
    },
    zona: { 
        type: String, 
        required: [true, 'La zona es necesaria'] 
    },
    departamento: { 
        type: String, 
        required: [true, 'El departamento es necesario']  
    },
    municipio: { 
        type: String, 
        required: [true, 'El municipio es necesario']  
    },
    nivelEducativo: { 
        type: String, 
        required: [true, 'El nivel educativo es necesario']  
    },
    regimenSS: { 
        type: String, 
        required: [true, 'El regimen de seguridad social es necesario']  
    },
    entidad: { 
        type: String, 
        required: [true, 'La entidad es necesaria']  
    },
    nombreAcudiente: { 
        type: String, 
        required: [true, 'El nombre del acudiente es necesario']  
    },
    celularAcudiente: { 
        type: String, 
        required: [true, 'El celular del acudiente es necesario']  
    },
    correoAcudiente: { 
        type: String, 
        required: [true, 'El correo del acudiente es necesario']  
    },
    img: { 
        type: String, 
        required: false,
        default: null, 
    },
    role: { 
        type: String, 
        required: true, 
        default: 'patient', 
    }
});

patientSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Patient', patientSchema);