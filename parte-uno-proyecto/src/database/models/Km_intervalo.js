module.exports = (sequelize, dataTypes)=>{
    let alias = "Km_intervalos";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        intervals:{
            type: dataTypes.DECIMAL
        },
        
    };
    let config = {
        tableName: "km_intervals",
        timestamps: false
    }
    const Km_intervalo= sequelize.define(alias, cols, config);

    Km_intervalo.associate= function(models){
        Km_intervalo.hasMany(models.Productos, {
            as:"products",
            foreignKey:"km_id"
        }) 

    }

    return Km_intervalo;
}