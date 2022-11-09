const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const User = require('../models/User');
const db = require('../database/models');
const sequelize= db.sequelize;

const {validationResult, body}=require('express-validator');

const usuariosJSON =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'../database/users.json')));
const users = {
    register: (req, res) => {
        res.render('users/register');
    },
    newUser: (req, res) => {
        const resultValidation = validationResult (req);
        if (resultValidation.errors.length > 0){
            return res.render('users/register',{
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        let userToLogin=db.Usuarios.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(function(userInDB){
            
            if (userInDB){
                return res.render('users/register',{
                    errors: {
                        email:{
                            msg:'El email ya esta registrado'
                        }
                    
                    },
                    oldData: req.body
                });
            }
            let userToCreate = {
                ...req.body,
                avatar:req.file.filename
            }
            let userCreate=User.create(userToCreate);
            res.redirect('/login');  
        })
    },
    formEditar: (req, res) => {
        db.Usuarios.findByPk(req.session.userLogged.id)
        .then(function(usuarioEdit){

            res.render('users/perfilEdit' , {usuarioEdit})
        })}
        ,
    editarPerfil:(req, res) => {
        const resultValidation = validationResult (req);
        console.log(resultValidation)
        if (resultValidation.errors.length > 0){
            return res.render('users/perfilEdit',{
                errors: resultValidation.mapped(),
                old: req.body  
            });
        }
        let userInDB = User.findByField('email', req.body.email);
        if (userInDB){
            return res.render('users/perfilEdit',{
                errors: {
                    email:{
                        msg:'El email ya esta registrado'
                    }
                
                },
                oldData: req.body
            });
        }
        db.Usuarios.update({
            full_name: req.body.nombreCompleto ,
            user: req.body.usuario ,
            password: bcryptjs.hashSync(req.body.password, 10) ,
            date_birth: req.body.fechadenacimiento ,
            image:  (req.file  ? req.file.filename : req.body.oldImage) ,
            email: req.body.email ,
            phone: req.body.celular ,
            roll_id: 1,
            }
            ,{
                where:{id: req.session.userLogged.id}
            })
            .then(function (){
            db.Usuarios.findByPk(req.session.userLogged.id)
            .then(function(usuario){
            req.session.userLogged.fullname = usuario.fullname ;
            req.session.userLogged.user = usuario.user ;
            req.session.userLogged.date_birth = usuario.date_birth ;
            req.session.userLogged.email = usuario.email  ;
            req.session.userLogged.phone = usuario.phone ;
            req.session.userLogged.roll_id = usuario.roll_id ;
            req.session.userLogged.image = usuario.image ;
            req.session.userLogged.state = usuario.state ;
            res.redirect('/'); 
        })
            })
            

    },
    shopCar: (req, res) => {
        res.render('users/shop-car');
    },

    login: (req, res) => {
        res.render('users/login')
    },

    loginProcess:(req, res)=>{
        const resultValidation = validationResult (req);
        if (resultValidation.errors.length > 0){
            return res.render('users/login',{
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        let userToLogin=db.Usuarios.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(function(usuario){
            if(usuario){
            let isOkThePassword = bcryptjs.compareSync(req.body.password, usuario.password);
            if(isOkThePassword){
                    delete usuario.password;
                        req.session.userLogged = usuario;
                            return res.redirect('/login');} 
            
                return res.render('users/login',{
                    errors:{
                        password:{
                            msg: 'Contraseñas invalidas'
                        }
                    }
                });}
                return res.render('users/login',{
                    errors:{
                        email:{
                            msg: 'Usuario no registrado'
                        }
                    }
                });
        })
        
    },
    profile: (req, res)=>{
        db.Productos.findAll(  
        {   where: {
            name: req.session.userLogged.email
        },
            include:[{association:"brands"}, {association:"models"}, {association:"categories"}, {association:"colors"}, {association:"years"}, {association:"km_intervals"}]
        })
            .then(function(vehiculos) {
                let user=req.session.userLogged
                let info={user,vehiculos}
                res.render("users/perfil",{info})
            })
    },
    logout: (req, res) =>{
        req.session.destroy();
        return res.redirect('/');
    }

};

module.exports = users