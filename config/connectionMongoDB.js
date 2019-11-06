require('./configServer');
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

module.exports = {
    conectar : async (app) =>{
        try {
            await mongoose.connect("mongodb://localhost:27017/HackathonSiigo",{useNewUrlParser:true, useCreateIndex : true});
            app.listen(process.env.PORT, ()=>{
             console.log('HackathonSiigo Server esta corriendo en el puerto: \x1b[32m%s\x1b[0m', `${process.env.PORT} online`);
            }) 
        } catch (error) {
            console.log({msg:"Error al conectar mongo y el servidor nodejs"},error);
        }                                                                                                                                                                                                                                                                                                                                                       
    }
}