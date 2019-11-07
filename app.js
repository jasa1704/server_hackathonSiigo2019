const express = require('express');
const bodyParser = require('body-parser');
const mongo  = require("./config/connectionMongoDB");

// Inicializar constiables
const app = express();

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

// Body Parser
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));

// Importar rutas
const appRoutes = require('./routes/app');
const usuarioRoutes = require('./routes/usuario');
const loginRoutes = require('./routes/login');
const uploadRoutes = require('./routes/upload');
const imagenesRoutes = require('./routes/imagenes');
const productosRoutes = require('./routes/productos');
const itemsRoutes = require('./routes/item');
const billsRoutes = require('./routes/bill');
const clientRoutes = require('./routes/client');

// Rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);
app.use('/productos', productosRoutes);
app.use('/clientes', clientRoutes);
app.use('/items', itemsRoutes);
app.use('/bills', billsRoutes);
app.use('/', appRoutes);

//  ======= Inicio Servidor -- Excuchar Peticiones=======
mongo.conectar(app);