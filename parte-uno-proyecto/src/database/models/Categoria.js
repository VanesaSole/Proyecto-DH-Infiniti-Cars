module.exports = (sequelize, dataTypes)=>{
    let alias = "Categorias";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type_auto:{
            type: dataTypes.DECIMAL
        },
        
    };
    let config = {
        tableName: "categories",
        timestamps: false
    }
    const Categoria= sequelize.define(alias, cols, config);

    Categoria.associate= function(models){
        Categoria.hasMany(models.Productos, {
            as:"products",
            foreignKey:"categories_id"
        }) ,
        Categoria.hasMany(models.Modelos, {
            as:"models",
            foreignKey:"categories_id"
        }) 

    }

    return Categoria;
}