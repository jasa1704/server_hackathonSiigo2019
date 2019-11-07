let express = require('express');
let app = express();
let Bill = require('../models/bill');


// ==========================================
// Obtener todas las facturas
// ==========================================


// ==========================================
// Crear Factura
// ==========================================
app.post('/create', (req, res)=>{
    let body  = req.body;

    let bill = new Bill({
        item_id: body.item_id,
        doc_date: body.doc_date,
        doc_number: body.doc_number,
        customer_id: body.customer_id,
        total_discount: body.total_discount,
        total_tax: body.total_tax,
        total_value: body.total_value
    })

    bill.save((err, billGuardada) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al agregar factura',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            bill: billGuardada,
        });
    })
})

module.exports = app;




