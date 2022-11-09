module.exports = (sequelize, dataTypes)=>{
    let alias = "Marcas";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        brand:{
            type: dataTypes.STRING
        },
        
    };
    let config = {
        tableName: "brands",
        timestamps: false
    }
    const Marca= sequelize.define(alias, cols, config);

    Marca.associate= function(models){
        Marca.hasMany(models.Productos, {
            as:"products",
            foreignKey:"brand_id"
        }) ,
        Marca.hasMany(models.Modelos, {
            as:"models",
            foreignKey:"brand_id"
        }) 

    }
    return Marca;
} 