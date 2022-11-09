module.exports = (sequelize, dataTypes)=>{
    let alias = "Colores";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        color:{
            type: dataTypes.STRING
        },
        
    };
    let config = {
        tableName: "colors",
        timestamps: false
    }
    const Color= sequelize.define(alias, cols, config);

    Color.associate= function(models){
        Color.hasMany(models.Productos, {
            as:"products",
            foreignKey:"color_id"
        }) 

    }

    return Color;
}