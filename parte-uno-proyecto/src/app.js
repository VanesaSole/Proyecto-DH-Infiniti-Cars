const express= require ('express');
const path = require ('path');
const methodOverride = require('method-override');
const session = require('express-session');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
let app =express();
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath) );
app.set('view engine', 'ejs');

app.use(session({
    secret : 'topSecret',
    resave: false,
    saveUninitialized: false,
}))

app.use(userLoggedMiddleware);

const rutasUsers = require('./routes/users');
//rutas disponibles para el ADM  valga la redundancia
const rutasAdmin = require('./routes/formularioAdmin');
//rutas disponibles para todos los usuarios y visitantes home , productos etc
const rutasViews = require('./routes/views');
//construccion APIS productos
const rutasApis = require('./routes/productosApis');
//API usuarios
const rutasApisUsers = require('./routes/usuariosApis')



// lineas para que funciones POST
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use(methodOverride('_method'));

app.listen(process.env.PORT || 3050 , function (){
    console.log("Server up and running port 3050");
})

app.use( rutasUsers);

app.use( rutasViews);

app.use( rutasAdmin);

app.use( rutasApis);

app.use( rutasApisUsers);

app.use((req,res,next)=> {
    res.status(404).render('views/not-found');
})


