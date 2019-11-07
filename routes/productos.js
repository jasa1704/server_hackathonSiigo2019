let express = require('express');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');


let app = express();

let Producto = require('../models/producto');

// ==========================================
// Obtener todos los productos
// ==========================================
app.get('/', (req, res, next) => {

    Producto.find((err, productos) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando productos',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            productos
        })
    })

})

// // ==========================================
// // Obtener paciente por cedula
// // ==========================================
app.get('/:id', (req, res) => {

    let nombre = req.params.id;

    Producto.findOne({ nombre }, (err, producto) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el producto',
                errors: err
            });
        }

        if (!producto) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El producto no existe',
                errors: { message: 'El producto no existe' }
            });
        }
        res.status(200).json({
            ok: true,
            producto
        });
    })
});

// // ==========================================
// // Actualizar producto
// // ==========================================
app.post('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Producto.findById(id, (err, producto) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el producto',
                errors: err
            });
        }

        if (!producto) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El producto no existe',
                errors: { message: 'El producto no existe' }
            });
        }

        producto.nombre = body.nombre,
        producto.precio = body.precio,

        producto.save((err, productoGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al agregar producto',
                    errors: err
                });
            }
            res.status(201).json({
                ok: true,
                paciente: productoGuardado,
            });
        })
    })
})


// // ==========================================
// // Crear un nuevo producto
// // ==========================================

app.post('/', (req, res) => {

    let body = req.body;

    let producto = new Producto({
        tenant_id: '1234',
        nombre: body.nombre,
        precio: body.precio
    })

    producto.save((err, productoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al agregar producto',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            paciente: productoGuardado,
        });
    })
})

module.exports = app;