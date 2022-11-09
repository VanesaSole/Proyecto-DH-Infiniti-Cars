module.exports = (sequelize, dataTypes)=>{
    let alias = "Roles";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category:{
            type: dataTypes.STRING
        },
        
    };
    let config = {
        tableName: "roles",
        timestamps: false
    }
    const Rol= sequelize.define(alias, cols, config);
    return Rol;
}