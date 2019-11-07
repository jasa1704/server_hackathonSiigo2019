let express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var parse = require('csv-parse');

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
// // Obtener producto por cedula
// // ==========================================
app.get('/:id', (req, res) => {

    debugger

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
// // Eliminar producto
// // ==========================================

app.post('/delete/:id', (req, res) => {
    let id = req.params.id;

    Producto.findByIdAndDelete(id, (err, productoBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar el producto',
                errors: err
            });
        }

        if (!productoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un producto con ese id',
                errors: { message: 'No existe un producto con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            producto: productoBorrado
        });
    })
})

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
        nombre: body.nombre,
        precio: body.precio,
        tenant_id: body.tenant_id
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
            producto: productoGuardado,
        });
    })
})

app.post('/upload/csv', (req, res) => {

    var form = new formidable.IncomingForm();
    let file;

    form.parse(req, function (err, fields) {

        let fileCSV = fs.readFileSync(__dirname + '/uploads/' + file.name, "utf8")
        fs.unlinkSync(__dirname + '/uploads/' + file.name)

        if (fields.type === "productos") {

            let campos = [0, 1];

            const parser = parse(fileCSV, { trim: true, delimiter: ';', relax_column_count: true }
                , function (err, data) {
                    if (err) {
                        console.log("Error csv.parse", err);
                    }
                    data = data.map(function (row) {
                        let res = [];
                        campos.forEach(i => {
                            res.push(row[i])
                        });
                        return res
                    })
                    data.splice(0, 1);
                    data.forEach(function (row) {

                        let body = row;

                        let producto = new Producto({
                            nombre: body[0],
                            precio: body[1],
                            tenant_id: fields.tenant_id
                        })
                        
                        producto.save();
                    })
                })
            parser.on('error', function (err) {
                console.error(err.message)
            })
            parser.on('end', function (err) {
                const { lines, records } = parser.info
                console.info(`There ${lines} lines with ${records} records.`);
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
            parser.end();
        }
    });

    form.on('fileBegin', function (name, f) {
        f.path = __dirname + '/uploads/' + f.name;
        file = f
    });

});

module.exports = app;