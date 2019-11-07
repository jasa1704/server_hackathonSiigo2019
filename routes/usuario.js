let express = require('express');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

let mdAutenticacion = require('../middlewares/autenticacion');

let app = express();

let Usuario = require('../models/usuario');

// ==========================================
// Obtener todos los usuarios
// ==========================================
app.get('/', (req, res, next) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    Usuario.find({}, 'nombre email img role google')
        .skip(desde)
        .limit(5)
        .exec(
            (err, usuarios) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuario',
                        errors: err
                    });
                }

                Usuario.count({}, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        usuarios: usuarios,
                        total: conteo
                    });

                })




            });
});

// ==========================================
// Crear un nuevo usuario
// ==========================================
app.post('/', (req, res) => {

    debugger

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        celular: body.celular,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });
    debugger
    usuario.save((err, usuarioGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el usuario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuariotoken: req.usuario
        });


    });

});

// ==========================================
// Actualizar Contraseña
// ==========================================
app.post('/updatepassword/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_o_MismoUsuario], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Usuario.findById(id, (err, usuario) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }
        bcrypt.compare(body.password1, usuario.password, function (err, response) {
            
            usuario.password = bcrypt.hashSync(body.password2, 10);

            if (response === true) {
                usuario.save((err, usuarioGuardado) => {
                    usuarioGuardado.password = ':)';

                    res.status(200).json({
                        ok: true,
                        usuario: usuarioGuardado
                    });
                });
            } else {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Contraseña antigua incorrecta',
                    errors: err
                });
            }

        });
    });
});

// ==========================================
// Actualizar usuario
// ==========================================
app.post('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_o_MismoUsuario], (req, res) => {
   
    let id = req.params.id;
    let body = req.body;

    debugger

    Usuario.findById(id, (err, usuario) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }

        usuario.nombre = body.nombre;

        usuario.save((err, usuarioGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = ':)';

            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });

        });

    });

});

// ============================================
//   Borrar un usuario por el id
// ============================================
// app.delete('/:id', [mdAutenticacion.verificaToken, mdAutenticacion.verificaADMIN_ROLE], (req, res) => {

//     let id = req.params.id;

//     Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

//         if (err) {
//             return res.status(500).json({
//                 ok: false,
//                 mensaje: 'Error borrar usuario',
//                 errors: err
//             });
//         }

//         if (!usuarioBorrado) {
//             return res.status(400).json({
//                 ok: false,
//                 mensaje: 'No existe un usuario con ese id',
//                 errors: { message: 'No existe un usuario con ese id' }
//             });
//         }

//         res.status(200).json({
//             ok: true,
//             usuario: usuarioBorrado
//         });

//     });

// });


module.exports = app;