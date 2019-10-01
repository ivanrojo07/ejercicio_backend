var router = require('express').Router();
var Nave = require('../models/nave')

router.post('/',(req,res,next)=>{
    // console.log(req.body)
    var nombre = req.body.nombre;
    var modelo = req.body.modelo;
    var velocidad = req.body.velocidad;
    var nave = new Nave();
    nave.nombre = nombre;
    nave.modelo = modelo;
    nave.velocidad = velocidad;
    nave.save((err,nave)=>{
        if (err) {
            res.status(500).json(err.errors);
        } else {
            res.status(201).json({'nave':nave});
        }
    });
});

router.get('/',(req,res,next)=>{
    Nave.find().exec((err,naves)=>{
        if(err){
            res.status(500).json(err.errors);
        }
        else{
            res.status(200).json({'naves': naves });
        }
    })
})
router.get('/:id',(req,res,next)=>{
    var id = req.params.id;
    Nave.find({_id:id}).exec((err,nave)=>{
        if(err){
            res.status(500).json(err.errors);
        }
        else{
            res.status(200).json({'nave': nave });
        }
    })
})

module.exports = router;