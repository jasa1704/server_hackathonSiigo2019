let express = require('express');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');


let app = express();

let Client = require('../models/client');

// // ==========================================
// // Crear un cliente
// // ==========================================

app.post('/', (req, res) => {

    let body = req.body;

    let cliente = new Client({
        identification_type: body.identification_type,
        identification_number: body.identification_number,
        first_name: body.first_name,
        second_name: body.second_name,
        surname: body.surname,
        second_surname: body.second_surname,
        phone: body.phone,
        email: body.email,
        tenant_id: body.tenant_id
    })

    cliente.save((err, clienteGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al agregar el cliente',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            cliente: clienteGuardado,
        });
    })
})

// ==========================================
// Obtener todos los clientes
// ==========================================
app.get('/', (req, res, next) => {

    debugger

    Client.find((err, clients) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Al cargar los clientes',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            clients
        })
    })

})

// // ==========================================
// // Obtener un cliente
// // ==========================================
app.get('/:id', (req, res) => {

    let id = req.params.id;

    Client.findById(id, (err, client) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el cliente',
                errors: err
            });
        }

        if (!client) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El cliente no existe',
                errors: { message: 'El cliente no existe' }
            });
        }
        res.status(200).json({
            ok: true,
            client
        });
    })
});

// // ==========================================
// // Actualizar cliente
// // ==========================================
app.post('/:id', (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Client.findById(id, (err, client) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el cliente',
                errors: err
            });
        }

        if (!client) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El cliente no existe',
                errors: { message: 'El cliente no existe' }
            });
        }

        client.first_name = body.first_name,
        client.second_name = body.second_name,
        client.surname = body.surname,
        client.second_surname = body.second_surname,
        client.phone = body.phone,

        client.save((err, clienteGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al agregar el cliente',
                    errors: err
                });
            }
            res.status(201).json({
                ok: true,
                cliente: clienteGuardado,
            });
        })
    })
})

// ============================================
//   Borrar un cliente por el id
// ============================================
app.delete('/:id', (req, res) => {

    let id = req.params.id;

    Client.findByIdAndRemove(id, (err, clienteBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar el cliente',
                errors: err
            });
        }

        if (!clienteBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un cliente con ese id',
                errors: { message: 'No existe un cliente con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            cliente: clienteBorrado
        });

    });

});

module.exports = app;