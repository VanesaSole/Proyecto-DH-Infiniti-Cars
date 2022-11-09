
const fs = require('fs');
const { check ,body} = require("express-validator");
const express = require('express');
const path = require('path');

const validateForm = [
    check('precio').notEmpty().withMessage('Debes completar el Precio del vehiculo'),
    check('precio').not().equals(0).withMessage('El precio debe ser diferencia a $0'),
    body('image').custom((value, {req})=>{
        let file= req.files.imagen;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    
        if(!file){
            return true;;
        }else{
            let fileExtension = path.extname(file[0].originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                fs.unlink(file[0].path, (err) => {
                    if (err) {
                        console.log(err)
                    }
                })
                throw new Error(`Extensiones permitidas son `+acceptedExtensions);
            }
        }
        
        return true;
    }),
    body('image2').custom((value, {req})=>{
        let file2= req.files.imagen2;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    
        if(!file2){
            return true;
        }else{
            let fileExtension = path.extname(file2[0].originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                fs.unlink(file2[0].path, (err) => {
                    if (err) {
                        console.log(err)
                    }
                })
                throw new Error(`Extensiones permitidas son `+acceptedExtensions);
            }
        }
        
        return true;
    }),
    body('image3').custom((value, {req})=>{
        let file3= req.files.imagen3;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    
        if(!file3){
            return true;
        }else{
            let fileExtension = path.extname(file3[0].originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                fs.unlink(file3[0].path, (err) => {
                    if (err) {
                        console.log(err)
                    }
                })
                throw new Error(`Extensiones permitidas son `+acceptedExtensions);
            }
        }
        
        return true;
    }),
    body('image4').custom((value, {req})=>{
        let file4= req.files.imagen4;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    
        if(!file4){
            return true;
        }else{
            let fileExtension = path.extname(file4[0].originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                fs.unlink(file4[0].path, (err) => {
                    if (err) {
                        console.log(err)
                    }
                })
                throw new Error(`Extensiones permitidas son `+acceptedExtensions);
            }
        }
        
        return true;
    }),
    body('image5').custom((value, {req})=>{
        let file5= req.files.imagen5;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        if(!file5){
            return true;
        }else{
            let fileExtension = path.extname(file5[0].originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                fs.unlink(file5[0].path, (err) => {
                    if (err) {
                        console.log(err)
                    }
                })
                throw new Error(`Extensiones permitidas son `+acceptedExtensions);
            }
        }
        
        return true;
    }),
    
    
    
    ]
    

    module.exports = validateForm;