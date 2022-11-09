const db = require('../database/models');
const sequelize= db.sequelize;

const controller ={
    list: (req, res) => {
    const users=[];
        db.Usuarios.findAll({
            attributes: ['id', 'full_name', 'user', 'date_birth','email', 'phone','image']
    })
            .then(usuarios => {
                
                for(let i=0; i<usuarios.length ;i++){ 
                    users.push({
                        id: usuarios[i].id,
                        full_name: usuarios[i].full_name,
                        user: usuarios[i].user,
                        date_birth: usuarios[i].date_birth,
                        email: usuarios[i].email,
                        phone: usuarios[i].phone,
                        image: usuarios[i].image ,
                        URL: "http://localhost:3050/api/users/"+usuarios[i].id ,

                    })
                }

    
            let response = {
                info: {
                    status: 200,
                    count: usuarios.length,
                },
                data: users
            }
            res.json(response)
            })

    },
    user: (req, res) => {
        db.Usuarios.findByPk(req.params.id,{
            attributes: ['id', 'full_name', 'user', 'date_birth','email', 'phone','image']
    })
            .then(usuario => {
                usuario.image="http://localhost:3050/images/usuarios/"+usuario.image;
            let response = {
                info: {
                    status: 200,
                },
                data: usuario
            }
            res.json(response)
            })
    }


}
module.exports = controller;