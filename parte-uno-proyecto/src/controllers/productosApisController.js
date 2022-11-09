const db = require('../database/models');
const sequelize= db.sequelize;


const pruductosApis ={
    list: (req, res) =>  {
        let categories=[];
        db.Categorias.findAll()
        .then(function(categorias) { 
            for(let i=0; i<categorias.length ;i++){
                categories.push({
                    id: categorias[i].id,
                    category: categorias[i].type_auto,
                    count: 0,
                })
                }

                const products=[];
        
        db.Productos.findAll({       
            order : [["categories_id","ASC"]],    
            include:[{association:"brands"}, {association:"models"}, {association:"categories"}, {association:"colors"}, {association:"years"}, {association:"km_intervals"}]
        })
            .then(function(vehiculos) {
                for(let i=0; i<vehiculos.length ;i++){ 
                    products.push({
                        id: vehiculos[i].id,
                        name: vehiculos[i].brands.brand +" "+vehiculos[i].models.model,
                        categories: vehiculos[i].categories.type_auto,
                        description: vehiculos[i].descripcion,
                        imagen:"http://localhost:3050/images/autos/"+vehiculos[i].image_filename,
                        detail: "http://localhost:3050/api/products/"+vehiculos[i].id ,
                    }) 
                categories[vehiculos[i].categories_id].count++;
                }
                
                categories=categories.filter((cero)=> cero.count!=0 )

                    return res.status(200).json({
                        // conteo de los productos
                        total: products.length,
                        // conteo de los productos por categoria
                        countByCategory: categories,
                        // resultado de find 
                        data : products,
                        // resultado de estado
                        status:200
            })
        })
        
        

            })

        
        

            

    },
    show: (req, res) =>  {
        db.Productos.findByPk(req.params.id,{include:[{association:"brands"}, {association:"models"}, {association:"categories"}, {association:"colors"}, {association:"years"}, {association:"km_intervals"}]})
        .then(function(vehiculo) {
            vehiculo.image_filename="http://localhost:3050/images/autos/"+vehiculo.image_filename;
            vehiculo.image_filename2="http://localhost:3050/images/autos/"+vehiculo.image_filename2;
            vehiculo.image_filename3="http://localhost:3050/images/autos/"+vehiculo.image_filename3;
            vehiculo.image_filename4="http://localhost:3050/images/autos/"+vehiculo.image_filename4;
            vehiculo.image_filename5="http://localhost:3050/images/autos/"+vehiculo.image_filename5;
            return res.status(200).json({
                data: vehiculo,
                status:200
            });
        })

    },
    raw: (req, res) =>  {
        db.Productos.findAll({           
                include:[{association:"brands"}, {association:"models"}, {association:"categories"}, {association:"colors"}, {association:"years"}, {association:"km_intervals"}]
        })
            .then(function(vehiculos) {  
                return res.status(200).json({
                // conteo de los productos
                total: vehiculos.length,
                // resultado de find 
                data : vehiculos,
                // resultado de estado
                status:200
    })
})
},

    create: (req, res) =>  {
        db.Productos.create(req.body) 
        .then(vehiculo=> {
            return res.status(200).json({
                data:vehiculo,
                status:200,
                check:"ok",
            })
        })
    },
    delete:  (req, res) =>  {
        db.Productos.destroy(req.body) ({
            where : {
                id: req.params.id
            }
        })
        .then(response=> {
            return res.json(response)
        })

    },
    listModels : (req, res) =>  {
        let modelos=db.Modelos.findAll()
        let categorias =db.Categorias.findAll()
        Promise.all([modelos,categorias])
        .then(function(info) {
            return res.status(200).json({
                data:info[0],
                categories: info[1],
                status:200,
                check:"ok",
            });
        })

    }
    /* Find
    search : (req, res) =>{ 
        db.Productos.findAll({
            where :{
                model: { [Op.like]: '%' + req.query.keyword + '%'}
            }
        })
        .then(function(vehiculos) {
            return res.status(200).json({

            });
        })
    }
        */

}

module.exports = pruductosApis;