module.exports = (sequelize, dataTypes)=>{
    let alias = "Modelos";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        model:{
            type: dataTypes.STRING
        },
        
    };
    let config = {
        tableName: "models",
        timestamps: false
    }
    const Modelo= sequelize.define(alias, cols, config);
    Modelo.associate= function(models){
        Modelo.hasMany(models.Productos, {
            as:"products",
            foreignKey:"model_id"
        })
        Modelo.belongsTo(models.Marcas, {
            as:"brands",
            foreignKey:"brand_id"
        }),
        Modelo.belongsTo(models.Categorias,{
            as:"categories",
            foreignKey:"categories_id"
        }),
        Modelo.belongsTo(models.Antiguedad,{
            as:"years",
            foreignKey:"year_id"
        }) 
        

    }

    return Modelo;
}