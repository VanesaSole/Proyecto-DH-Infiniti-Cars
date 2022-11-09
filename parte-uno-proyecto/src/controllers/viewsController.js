const path = require('path');
const fs = require('fs');
const db = require('../database/models');
const sequelize= db.sequelize;

const vehiculosDelArchivoJSON =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','database','vehiculos.json')));

const views = {
    home: (req, res) => {
        db.Productos.findAll({
            order : [["views","DESC"]],
            limit: 3 ,  
            include:[{association:"brands"}, {association:"models"}, {association:"categories"}, {association:"colors"}, {association:"years"}, {association:"km_intervals"}]
        })
            .then(function(vehiculos) {
                res.render('views/home',{vehiculos:vehiculos})
            })
    },
    productos: (req, res) => {
                res.render('views/productos',)

        /*let vehiculosDelArchivoJSON =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','database','vehiculos.json')));
        res.render('views/productos',{vehiculos: vehiculosDelArchivoJSON})*/
    },
    detalle: (req, res) => {
        db.Productos.increment(
            {  views:+1 },
            { where: { id:req.params.id} }
        );
        db.Productos.findByPk(req.params.id,{include:[{association:"brands"}, {association:"models"}, {association:"categories"}, {association:"colors"}, {association:"years"}, {association:"km_intervals"}]})
            .then(function(vehiculos){
                res.render('views/detalle',{vehiculos:vehiculos})
            })

        /*let vehiculosDelArchivoJSON =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','database','vehiculos.json')));
        res.render('views/detalle',{vehiculos: vehiculosDelArchivoJSON[req.params.id-1]})*/
    },
    nosotros: (req, res) =>{
        res.render('views/nosotros')
    }

}

module.exports = views;