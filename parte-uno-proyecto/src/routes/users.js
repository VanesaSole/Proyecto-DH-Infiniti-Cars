const express = require('express');
const router = express.Router();
const path = require('path');

const guestMiddleware = require('../middlewares/guestMiddleware');
const permisosMiddleware =require('../middlewares/permisosMiddleware');

const controller = require('../controllers/usuarioController');


router.get('/profile', permisosMiddleware, controller.profile);

router.get('/logout', permisosMiddleware, controller.logout);

router.get('/shop-cart', controller.shopCar)

//multer
const multer= require ('multer');
const { body } = require('express-validator');



const validations = [  
    body('nombreCompleto').notEmpty().withMessage('Ingrese su Nombre completo'),
    body('usuario').isLength({min: 1
        }).withMessage('Ingrese un Usuario'),
    body('password').notEmpty().withMessage('Ingrese una contraseña').isLength({
        min: 8
        }).withMessage('Ingrese un minimo de 8 caracteres'),
    body('email')
        .notEmpty().withMessage('Agregar un email').bail()
        .isEmail().withMessage('Ingresar un formato de correo electrónico'),
    body('celular').isLength({min: 10}).withMessage('Ingrese un minimo de 10 caracteres'),
    body('categoria').notEmpty().withMessage('Elija una opcion'),
    body('avatar').custom((value, {req})=>{
        let file= req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

        if(!file){
            throw new Error('Seleccione una imagen');
        }else{
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Extensiones permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        
        return true;
    }),
      //Aquí obligo a que el usuario seleccione su avatar
    ]

    const validationsEdit = [  
        body('nombreCompleto').notEmpty().withMessage('Ingrese su Nombre completo'),
        body('usuario').isLength({min: 1
            }).withMessage('Ingrese un Usuario'),
        body('password').notEmpty().withMessage('Ingrese una contraseña').isLength({
            min: 8
            }).withMessage('Ingrese un minimo de 8 caracteres'),
        body('email')
            .notEmpty().withMessage('Agregar un email').bail()
            .isEmail().withMessage('Ingresar un formato de correo electrónico'),
        body('celular').isLength({min: 10}).withMessage('Ingrese un minimo de 10 caracteres'),
        body('avatar').custom((value, {req})=>{
            let file= req.file;
            let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    
            if(!file){
                return true;
            }else{
                let fileExtension = path.extname(file.originalname);
                if(!acceptedExtensions.includes(fileExtension)){
                    throw new Error(`Extensiones permitidas son ${acceptedExtensions.join(', ')}`);
                }
            }
            
            return true;
        }),
          //Aquí obligo a que el usuario seleccione su avatar
        ]


const storage= multer.diskStorage(
    {
        destination: (req,file,cb)=> {
            let folder = path.join(__dirname, "../../public/images/usuarios");
            cb (null , folder);
        },
        filename: function (req,file, cb){
            let fileName= `${Date.now()}_img${path.extname(file.originalname)}`;
            cb( null, fileName);
        }
    }
)

const uploadFile =multer ( { storage});
// formulario de creación
router.get('/register',guestMiddleware, controller.register);
// procesamiento del formulario de creación
router.post('/register', uploadFile.single("avatar"), validations,controller.newUser);
// formulario de edit
router.get('/editarPerfil', permisosMiddleware  , controller.formEditar);
// procesamiento del formulario de edit
router.put('/editarPerfil', uploadFile.single("avatar"),validationsEdit, controller.editarPerfil);

router.get('/login', guestMiddleware, controller.login);

router.post('/login',[
    body('email')
    .notEmpty().withMessage('Agregar un email').bail()
    .isEmail().withMessage('Ingresar un formato de correo electrónico'),
    body('password').notEmpty().withMessage('Ingrese una contraseña').isLength({
        min: 8
        }).withMessage('Ingrese un minimo de 8 caracteres, letra mayúscula, numero, caracter'),
    ] ,controller.loginProcess);




module.exports = router