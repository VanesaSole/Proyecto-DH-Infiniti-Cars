module.exports = (sequelize, dataTypes)=>{
    let alias = "Productos";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING
        },
        prices:{
            type:dataTypes.BIGINT
        },
        image_filename:{
            type:dataTypes.STRING
        },
        image_filename2:{
            type:dataTypes.STRING
        },
        image_filename3:{
            type:dataTypes.STRING
        },
        image_filename4:{
            type:dataTypes.STRING
        },
        image_filename5:{
            type:dataTypes.STRING
        },
        transmission:{
            type:dataTypes.STRING
        },
        conditions:{
            type:dataTypes.STRING
        },
        type_fuel:{
            type:dataTypes.STRING
        },
        discount: {
			type: dataTypes.INTEGER
		},
        descripcion: {
			type: dataTypes.TEXT('long')
		},
        views : {
			type: dataTypes.INTEGER
		},
        stock:{
            type:dataTypes.STRING
        },
        
    };
    let config = {
        tableName: "products",
        timestamps: false
    }
    const Producto= sequelize.define(alias, cols, config);

    Producto.associate= function(models){
        Producto.belongsTo(models.Marcas, {
            as:"brands",
            foreignKey:"brand_id"
        }),
        Producto.belongsTo(models.Modelos,{
            as:"models",
            foreignKey:"model_id"
        }),
        Producto.belongsTo(models.Categorias,{
            as:"categories",
            foreignKey:"categories_id"
        }),
        Producto.belongsTo(models.Colores,{
            as:"colors",
            foreignKey:"color_id"
        }),
        Producto.belongsTo(models.Antiguedad,{
            as:"years",
            foreignKey:"year_id"
        }),
        Producto.belongsTo(models.Km_intervalos,{
            as:"km_intervals",
            foreignKey:"km_id"
        })
    }
    return Producto;
}