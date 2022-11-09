const path = require('path');
const fs = require('fs');
const {validationResult}=require('express-validator');
const db = require('../database/models');
const sequelize= db.sequelize;
let vehiculosDelArchivoJSON =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','database','vehiculos.json')));

const admin = {
    panel: (req, res) => {
        db.Productos.findAll({
            include:[{association:"brands"}, {association:"models"}, {association:"categories"}, {association:"colors"}, {association:"years"}, {association:"km_intervals"}]
        })
            .then(function(vehiculos) {
                res.render('admin/detalleAdministrar',{vehiculos:vehiculos})
            })


/*LINEAS JSON
let vehiculosDelArchivoJSON =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','database','vehiculos.json')));
        res.render('admin/detalleAdministrar' , {vehiculosDelArchivoJSON})
*/
    },
    formCrear: (req, res) => {           
                let marcas =db.Marcas.findAll() 
                let modelos =db.Modelos.findAll()
                let categorias =db.Categorias.findAll()
                let uso =db.Km_intervalos.findAll()
                let edad =db.Antiguedad.findAll({
                    order : [["year","DESC"]]}
                )
                let color =db.Colores.findAll()
                Promise.all([marcas,modelos,categorias,uso,edad,color])
                .then(function(bases){
                    res.render('admin/formularioVenta' , {bases})
                })
                .catch(function(error){
                    console.log(error);
                })         
            },
    crear: (req, res) => {
        let errors= validationResult(req)
        
        if (errors.isEmpty()) {
            db.Productos.create({
                name:req.session.userLogged.email,
                brand_id:req.body.marca,         
                model_id:req.body.modelo,
                categories_id:req.body.categoria,
                color_id: req.body.color,
                year_id: req.body.year,
                km_id:  req.body.kilometraje ,
                prices: req.body.precio,
                type_fuel:req.body.combustible,
                image_filename: req.files.imagen[0].filename,
                image_filename2: req.files.imagen2[0].filename,
                image_filename3: req.files.imagen3[0].filename,
                image_filename4: req.files.imagen4[0].filename,
                image_filename5: req.files.imagen5[0].filename,
                transmission: req.body.transmision,
                conditions: req.body.condicion,
                discount:"Disponible",
                stock: "Disponible",
                views: 0,
                descripcion: req.body.descripcion,
                })
                    .then(function(){
                        console.log("se creo el producto")
                })
                    res.redirect ('productos/1')  
        
            } else {
                let marcas =db.Marcas.findAll() 
                let modelos =db.Modelos.findAll()
                let categorias =db.Categorias.findAll()
                let uso =db.Km_intervalos.findAll()
                let edad =db.Antiguedad.findAll()
                let color =db.Colores.findAll()
                Promise.all([marcas,modelos,categorias,uso,edad,color])
                .then(function(bases){
                    res.render('admin/formularioVenta' , {bases,errors: errors.mapped(), old: req.body})
                })
            }

                    
/* LINEAS DE CODIGO JSON 
                // validacion img
                if(req.file!=undefined){
                let vehiculosDelArchivoJSON =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','database','vehiculos.json')));
                //guardar los datos del formulario
                let nuevoAuto={
                        id: (vehiculosDelArchivoJSON.length+1),
                        nombre: (req.body.marca+" "+req.body.modelo),
                        año: req.body.year,
                        kilometraje:req.body.kilometraje,
                        precio: req.body.precio,
                        transmision: req.body.transmision,
                        imagen:req.file.filename,
                } 
                // los agrego al JSON
                vehiculosDelArchivoJSON.push(nuevoAuto);
                // no estoy seguro de si es necesario , 
                let nuevaLista=JSON.stringify( vehiculosDelArchivoJSON);
                fs.writeFileSync(path.resolve(__dirname,'..','database','vehiculos.json'),nuevaLista);
                res.render('views/productos',{vehiculos: vehiculosDelArchivoJSON});
                  //en caso de que la validacion de img sea negativa , vuelve al formulario
                }else {
                    res.render('admin/formularioVenta');
                }
*/
        
    },    formEdit: (req, res) => {
        let vehEditar=db.Productos.findByPk(req.params.id)
        let marcas =db.Marcas.findAll() 
        let modelos =db.Modelos.findAll()
        let categorias =db.Categorias.findAll()
        let uso =db.Km_intervalos.findAll()
        let edad =db.Antiguedad.findAll()
        let color =db.Colores.findAll()
        Promise.all([marcas,modelos,categorias,uso,edad,color,vehEditar])
        .then(function(bases){
            res.render('admin/formularioEdit' , {bases})
        })


        
/* JSON
        const vId=req.params.id;
        let archivoV =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','database','vehiculos.json')));
        let vehiculoEditar= archivoV.find(vehiculo=>vehiculo.id==vId);
        res.render('admin/formularioEdit',{vehiculoEditar})
 */
    },

    edit: (req, res) => {
    
        let errors= validationResult(req)
        
        if (errors.isEmpty()) {
                db.Productos.update({
                    name:req.session.userLogged.email,
                    brand_id:req.body.marca,         
                    model_id:req.body.modelo,
                    categories_id:req.body.categoria,
                    color_id: req.body.color,
                    year_id: req.body.year,
                    km_id:  req.body.kilometraje ,
                    prices: req.body.precio,
                    type_fuel:req.body.combustible,
                    image_filename:  (req.files.imagen  ? req.files.imagen[0].filename  : req.body.oldImage) ,
                    image_filename2: (req.files.imagen2 ? req.files.imagen2[0].filename : req.body.oldImage2) ,
                    image_filename3: (req.files.imagen3 ? req.files.imagen3[0].filename : req.body.oldImage3) ,
                    image_filename4: (req.files.imagen4 ? req.files.imagen4[0].filename : req.body.oldImage4) ,
                    image_filename5: (req.files.imagen5 ? req.files.imagen5[0].filename : req.body.oldImage5) ,
                    transmission: req.body.transmision,
                    conditions: req.body.condicion,
                    descripcion: req.body.descripcion,
                    stock: "disponible",
            },{
                where:{id:req.params.id}
            })
            res.redirect ('/productos/1')
        } else {
            let vehEditar=db.Productos.findByPk(req.params.id)
            let marcas =db.Marcas.findAll() 
            let modelos =db.Modelos.findAll()
            let categorias =db.Categorias.findAll()
            let uso =db.Km_intervalos.findAll()
            let edad =db.Antiguedad.findAll()
            let color =db.Colores.findAll()
            Promise.all([marcas,modelos,categorias,uso,edad,color,vehEditar])
                .then(function(bases){
                    res.render('admin/formularioEdit' , {bases,errors: errors.mapped(), old: req.body})
                })
        }
                
    /* JSON EDIT 

        // validacion img
        if(req.file!=undefined){
        let vehiculosDelArchivoJSON =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','database','vehiculos.json')));
        //modifico el auto con los datos ingresados
        vehiculosDelArchivoJSON[req.params.id-1].nombre=(req.body.marca+" "+req.body.modelo);
        vehiculosDelArchivoJSON[req.params.id-1].año=req.body.year;
        vehiculosDelArchivoJSON[req.params.id-1].kilometraje=req.body.kilometraje;
        vehiculosDelArchivoJSON[req.params.id-1].precio=req.body.precio;
        vehiculosDelArchivoJSON[req.params.id-1].transmision=req.body.transmision;
        vehiculosDelArchivoJSON[req.params.id-1].imagen=req.file.filename;
        // no estoy seguro de si es necesario , 
        let nuevaLista=JSON.stringify( vehiculosDelArchivoJSON);
        fs.writeFileSync(path.resolve(__dirname,'..','database','vehiculos.json'),nuevaLista);
        res.render('views/productos',{vehiculos: vehiculosDelArchivoJSON});
          //en caso de que la validacion de img sea negativa , vuelve al formulario
        }else {
            res.render('views/home');
        }     
*/

    }  ,    formDelete: (req, res) => {

        db.Productos.findByPk(req.params.id,{include:[{association:"brands"}, {association:"models"}, {association:"categories"}, {association:"colors"}, {association:"years"}, {association:"km_intervals"}]})
            .then(function(vehiculos){
                res.render('admin/formularioDelete',{vehiculos:vehiculos})
            }) 
        /*

    */
        
        /* JSON
        const vId=req.params.id;
        let archivoV =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','database','vehiculos.json')));
        let vehiculoEliminar= archivoV.find(vehiculo=>vehiculo.id==vId);
        res.render('admin/formularioDelete',{vehiculoEliminar})
        */
    },
    delete: (req, res) => {
        /*
        db.Productos.findByPk(req.params.id) 
        .then(function(vehiculo){
    
            fs.unlinkSync(path.resolve(__dirname,'..','public/images/autos',vehiculo.image_filename));
            fs.unlinkSync(path.resolve(__dirname,'..','public/images/autos',vehiculo.image_filename2));
            fs.unlinkSync(path.resolve(__dirname,'..','public/images/autos',vehiculo.image_filename3));
            fs.unlinkSync(path.resolve(__dirname,'..','public/images/autos',vehiculo.image_filename4));
            fs.unlinkSync(path.resolve(__dirname,'..','public/images/autos',vehiculo.image_filename5));
            
        })
        */

        db.Productos.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(
            res.redirect ('/administrar')
        )
        

/* JSON
        const vId=req.params.id;
        let archivoV =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','database','vehiculos.json')));
        //elimino el auto con los datos ingresados
        let listaFinal= archivoV.filter(vehiculo=>vehiculo.id!=vId);
        // no estoy seguro de si es necesario , 
        listaFinal=JSON.stringify(listaFinal);
        fs.writeFileSync(path.resolve(__dirname,'..','database','vehiculos.json'),listaFinal);
        let vehiculosDelArchivoJSON =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','database','vehiculos.json')));
        res.render('views/productos',{vehiculos: vehiculosDelArchivoJSON});
*/
    }


}

module.exports = admin