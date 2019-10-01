var router = require('express').Router();
var Request = require('request');
var rp = require('request-promise');


router.get('/movies',(req,res,next)=>{
    Request.get('https://swapi.co/api/films',(error,response,body)=>{
        if(error && response.statusCode != 200){
            res.status(500).json({'error':error});
        }
        else{
            var results = [];
            var movies = [];
            results = JSON.parse(body).results;
            movies = results.map(movie => {
                return {
                    'titulo':movie.title,
                    'sinopsis':movie.opening_crawl,
                    'director':movie.director,
                    'producer':movie.producer,
                    'fecha':movie.release_date,
                    'id': parseInt(movie.url.substring(27,28))

                };
            }).sort((a, b) => { return a.id - b.id; });
            res.status(200).json({'movies':movies});
        }
    });
});

router.get('/movies/:id',(req,res,next)=>{
    var id = req.params.id;
    var options = {
        uri: `https://swapi.co/api/films/${id}`,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };

    rp(options)
        .then(function (result) {
            var starships_url = result.starships;
            var promises = [];
            starships_url.forEach((url)=>{
                promises.push(getNave(url))
            });
            return Promise.all(promises);
        }).
        then(response=>{
            // var result = JSON.parse(response)
            var naves = response.map(nave=>{
                return {
                    'nombre': nave.name,
                    'modelo': nave.model,
                    'manufacturera': nave.manufacturer,
                    'precio': nave.cost_in_credits,
                    'velocidad_maxima': nave.max_atmosphering_speed,
                    'equipo': nave.crew,
                    'pasajeros':nave.passengers,
                    'capacidad_carga':nave.cargo_capacity,
                    'consumibles':nave.consumables,
                    'hiperimpulso':nave.hyperdrive_rating,
                    'MGLT': nave.MGLT,
                    'clase':nave.starship_class,
                    'id': parseInt(nave.url.substring(31))

                };
            }).sort((a, b) => {return a.id - b.id;});
            res.status(200).json({'naves':naves});
        })
        .catch(function (err) {
            console.log(err)
        });

});

router.get('/starships/:id', (req, res, next) => {
    var id = req.params.id;
    Request.get(`https://swapi.co/api/starships/${id}`, (error, response, body) => {
        if (error && response.statusCode != 200) {
            res.status(500).json({ 'error': error });
        }
        else {
            var result = JSON.parse(body);
            if (result.detail == "Not found"){
                res.status(404).json({'error':result.detail})
            }
            else{
                var nave = {
                    'nombre': result.name,
                    'modelo': result.model,
                    'manufacturera': result.manufacturer,
                    'precio': result.cost_in_credits,
                    'longitud': result.length,
                    'velocidad_maxima': result.max_atmosphering_speed,
                    'equipo': result.crew,
                    'pasajeros': result.passengers,
                    'capacidad_carga': result.cargo_capacity,
                    'consumibles': result.consumables,
                    'hiperimpulso': result.hyperdrive_rating,
                    'MGLT': result.MGLT,
                    'clase': result.starship_class,
                    'id': parseInt(result.url.substring(31))
    
                };
                res.status(200).json({'nave':nave})

            }
        }
    })
})

function getNave(url) {
    return rp({uri:url,
        json: true});
}
module.exports = router