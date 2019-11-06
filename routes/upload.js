var express = require('express');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var app = express();

var Usuario = require('../models/usuario');
var Patient = require('../models/patient');

// default options
app.use(fileUpload());

app.post('/:tipo/:id', (req, res, next) => {
    
    var tipo = req.params.tipo;
    var id = req.params.id;

    // tipos de colección
    var tiposValidos = ['admin', 'therapist', 'patient'];

    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de colección no es válida',
            errors: { message: 'Tipo de colección no es válida' }
        });
    }


    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No selecciono nada',
            errors: { message: 'Debe de seleccionar una imagen' }
        });
    }

    // Obtener nombre del archivo
    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Sólo estas extensiones aceptamos
    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extension no válida',
            errors: { message: 'Las extensiones válidas son ' + extensionesValidas.join(', ') }
        });
    }

    // Nombre de archivo personalizado
    var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extensionArchivo }`;

    // Mover el archivo del temporal a un path
    var path = `./uploads/${ tipo }/${ nombreArchivo }`;

    archivo.mv(path, err => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: err
            });
        }

        subirPorTipo(tipo, id, nombreArchivo, res);

    });

});

function subirPorTipo(tipo, id, nombreArchivo, res) {

    if (tipo === 'therapist') {

        Usuario.findById(id, (err, usuario) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el Usuario',
                    errors: err
                });
            }

            if (!usuario) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Usuario no existe',
                    errors: { message: 'Usuario no existe' }
                });
            }

            var pathViejo = './uploads/therapist/' + usuario.img;

            // Si existe, elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo);
            }

            usuario.img = nombreArchivo;

            usuario.save((err, usuarioActualizado) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al subir la imagen',
                        errors: err
                    });
                }

                usuarioActualizado.password = ':)';

                return res.status(200).json(usuarioActualizado);

            });

        });

    }

    if (tipo === 'patient') {
 
        Patient.findById(id, (err, patient) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el Paciente',
                    errors: err
                });
            }

            if (!patient) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Paciente no existe',
                    errors: { message: 'Paciente no existe' }
                });
            }

            var pathViejo = './uploads/patient/' + patient.img;

            // Si existe, elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo);
            }

            patient.img = nombreArchivo;

            patient.save((err, patientActualizado) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al subir la imagen',
                        errors: err
                    });
                }

                return res.status(200).json(patientActualizado);

            });

        });

    }

    if (tipo === 'admin') {

        Usuario.findById(id, (err, admin) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el Administrador',
                    errors: err
                });
            }

            if (!admin) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Administrador no existe',
                    errors: { message: 'Administrador no existe' }
                });
            }

            var pathViejo = './uploads/admin/' + admin.img;

            // Si existe, elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo);
            }

            admin.img = nombreArchivo;

            admin.save((err, adminActualizado) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al subir la imagen',
                        errors: err
                    });
                }

                return res.status(200).json(adminActualizado);

            })

        });
    }

}



module.exports = app;