// let express = require('express');
// let mdAutenticacion = require('../middlewares/autenticacion');
// let app = express();

// let Patient = require('../models/patient');

// // ==========================================
// // Crear un nuevo paciente
// // ==========================================
// app.post('/', [mdAutenticacion.verificaToken], (req, res) => {
//     let body = req.body;

//     let patient = new Patient({
//         tpdoc: body.tpdoc,
//         numdoc: body.numdoc,
//         nombre1: body.nombre1,
//         nombre2: body.nombre2,
//         apellido1: body.apellido1,
//         apellido2: body.apellido2,
//         sexo: body.sexo,
//         raza: body.raza,
//         estadoCivil: body.estadoCivil,
//         hijos: body.hijos,
//         celular: body.celular,
//         correo: body.correo,
//         fechaN: body.fechaN,
//         fechaC: body.fechaC,
//         direccion: body.direccion,
//         zona: body.zona,
//         departamento: body.departamento,
//         municipio: body.municipio,
//         nivelEducativo: body.nivelEducativo,
//         regimenSS: body.regimenSS,
//         entidad: body.entidad,
//         nombreAcudiente: body.nombreAcudiente,
//         celularAcudiente: body.celularAcudiente,
//         correoAcudiente: body.correoAcudiente,
//     });
//     patient.save((err, patientGuardado) => {

//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 mensaje: 'error al crear el paciente',
//                 errors: err
//             });
//         }

//         res.status(201).json({
//             ok: true,
//             paciente: patientGuardado,
//         });
//     });

// });

// // ==========================================
// // Obtener todos los pacientes
// // ==========================================
// app.get('/', [mdAutenticacion.verificaToken], (req, res) => {

//     Patient.find((err, patient) => {
//         if (err) {
//             return res.status(500).json({
//                 ok: false,
//                 mensaje: 'Error al cargando los pacientes',
//                 errors: err
//             });
//         } else {
//             res.status(200).json({
//                 ok: true,
//                 patient: patient,
//             });
//         }
//     });
// });

// // ==========================================
// // Obtener paciente por cedula
// // ==========================================
// app.get('/:numdoc', [mdAutenticacion.verificaToken], (req, res) => {

//     let numdoc = req.params.numdoc;

//     Patient.findOne({numdoc}, (err, patient) => {

//         if (err) {
//             return res.status(500).json({
//                 ok: false,
//                 mensaje: 'Error al buscar el paciente',
//                 errors: err
//             });
//         }

//         if (!patient) {
//             return res.status(400).json({
//                 ok: false,
//                 mensaje: 'El paciente con la cedula ' + numdoc + ' no existe',
//                 errors: { message: 'El paciente no existe' }
//             });
//         }
//         res.status(200).json({
//             ok: true,
//             patient: patient
//         });
//     })
// });

// // ==========================================
// // Actualizar paciente
// // ==========================================
// app.post('/:id', [mdAutenticacion.verificaToken], (req, res) => {

//     let id = req.params.id;
//     let body = req.body;

//     Patient.findById(id, (err, patient) => {

//         if (err) {
//             return res.status(500).json({
//                 ok: false,
//                 mensaje: 'Error al buscar el paciente',
//                 errors: err
//             });
//         }

//         if (!patient) {
//             return res.status(400).json({
//                 ok: false,
//                 mensaje: 'El paciente con el id ' + id + ' no existe',
//                 errors: { message: 'No existe un paciente con ese ID' }
//             });
//         }

//         patient.nombre1 = body.nombre1,
//         patient.nombre2 = body.nombre2,
//         patient.apellido1 = body.apellido1,
//         patient.apellido2 = body.apellido2,
//         patient.sexo = body.sexo,
//         patient.raza = body.raza,
//         patient.estadoCivil = body.estadoCivil,
//         patient.hijos = body.hijos,
//         patient.celular = body.celular,
//         patient.correo = body.correo,
//         patient.direccion = body.direccion,
//         patient.zona = body.zona,
//         patient.departamento = body.departamento,
//         patient.municipio = body.municipio,
//         patient.nivelEducativo = body.nivelEducativo,
//         patient.nombreAcudiente = body.nombreAcudiente,
//         patient.celularAcudiente = body.celularAcudiente,
//         patient.correoAcudiente = body.correoAcudiente

//         patient.save((err, patientGuardado) => {

//             if (err) {
//                 return res.status(400).json({
//                     ok: false,
//                     mensaje: 'Error al actualizar el paciente',
//                     errors: err
//                 });
//             }

//             res.status(200).json({
//                 ok: true,
//                 patient: patientGuardado
//             });

//         });

//     });

// });

// // ============================================
// //   Borrar un usuario por el id
// // ============================================
// // app.delete('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {

// //     let id = req.params.id;

// //     Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

// //         if (err) {
// //             return res.status(500).json({
// //                 ok: false,
// //                 mensaje: 'Error borrar usuario',
// //                 errors: err
// //             });
// //         }

// //         if (!usuarioBorrado) {
// //             return res.status(400).json({
// //                 ok: false,
// //                 mensaje: 'No existe un usuario con ese id',
// //                 errors: { message: 'No existe un usuario con ese id' }
// //             });
// //         }

// //         res.status(200).json({
// //             ok: true,
// //             usuario: usuarioBorrado
// //         });

// //     });

// // });


// module.exports = app;