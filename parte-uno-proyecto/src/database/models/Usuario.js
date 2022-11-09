module.exports = (sequelize, dataTypes)=>{
    let alias = "Usuarios";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        full_name:{
            type: dataTypes.STRING
        },
        user:{
            type: dataTypes.INTEGER
        },
        password:{
            type:dataTypes.INTEGER
        },
        date_birth:{
            type:dataTypes.DATE
        },
        email:{
            type:dataTypes.STRING
        },
        phone:{
            type:dataTypes.STRING
        },
        roll_id:{
            type:dataTypes.INTEGER
        },
        image:{
            type:dataTypes.STRING
        },
        state:{
            type:dataTypes.INTEGER
        },
        
    };
    let config = {
        tableName: "users",
        timestamps: false
    }
    const Usuario= sequelize.define(alias, cols, config);
    return Usuario;
}