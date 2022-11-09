const db = require('../database/models');
db.Productos.increment(
    {  views:+1 },
    { where: { id:req.params.id} }
);