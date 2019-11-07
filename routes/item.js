let express = require('express');
let app = express();
let Item = require('../models/item');


// ==========================================
// Crear item
// ==========================================
app.post('/create', (req, res, nex) =>{

    let body = req.body;

    let item  = new Item({
        product_id: body.product_id,
        tenant_id: body.tenant_id,
        quantity: body.quantity,
        unit_value: body.unit_value,
        item_value: body.item_value,
    });

    item.save((err, itemGuardado) =>{
        if(err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al agregar item',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            item: itemGuardado,
        });
    })
})

// ==========================================
// Obtener items
// ==========================================
app.get('/', (req, res, next) =>{
    Item.find({})
    .populate('product_id')
    .exec((err, items) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Al obtenr los items',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            items
        })
    })
})


module.exports = app;
