const fs = require ('fs');
const db = require('../database/models');
const sequelize= db.sequelize;
const bcryptjs = require('bcryptjs');

const User ={
    /*
    fileName : './database/users.json',
    */
    getData: function(){
/* JSON
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
        */
        db.Usuarios.findAll({
            include:[{association:"roles"}]
        })  
    },
    generateId: function (){
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if(lastUser){
            return lastUser.id +1;
        }
        return 1;
    },
    findAll: function(){
        return this.getData();
    },
    findByPk: function (id){
        /*
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound;
         */
        
        db.Usuarios.findByPk(id)
        .then(function(userFound) {
                return userFound;
            })


    },
    findByField: function (field, text){
        
/*
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
*/
        

    },
    create: function (userData){
/* JSON 
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return newUser;
        
*/
db.Usuarios.create({
    full_name: userData.nombreCompleto ,
    user: userData.usuario ,
    password: bcryptjs.hashSync(userData.password, 10) ,
    date_birth: userData.fechaDeNacimiento ,
    email: userData.email ,
    phone: userData.celular ,
    roll_id: 1,
    image: userData.avatar,
    state: 1 , }) 
    .then (function (user){
        return user;
    }) 
    
    },
    delete:function (idEliminar){
/* JSON
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true;
*/
        
        db.Usuarios.destroy({
            where: {
                id: idEliminar
            }
        })
        .then (function (){
            return true
        })
    },
    edit: function(idEditar){

        db.Usuarios.update({
            full_name: idEditar.nombreCompleto ,
            user: idEditar.usuario ,
            password: bcryptjs.hashSync(idEditar.password, 10) ,
            date_birth: idEditar.fechadenacimiento ,
            email: idEditar.email ,
            phone: idEditar.celular ,
            roll_id: 1,
            image: idEditar.avatar,
            state: 1 , }
            ,{
                where:{id: req.session.userLogged.id}
            }) 
            .then (function (user){
                return user;
            }) 
        
}
}
module.exports= User;
