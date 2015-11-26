    db   		    = 	require('./database'),
    db.conectaDatabase();



var getQuestions =  function(req, res)
{
	db.queryMysql("SELECT numpregunta,pregunta,opcion1,opcion2,opcion3,opcion4 FROM preguntas ORDER BY rand();", function(err,data){
		
		if (err) throw err;
		res.json(data);
	});
		
};


var isValid =  function(req, res)
{
	db.queryMysql("SELECT correcta FROM preguntas WHERE numpregunta = " + req.body.numPregunta , function(err,data){
	
	if (err) throw err;
	
	res.json({
		
					respuestaCorrecta : data[0].correcta,
					correcto	:       data[0].correcta === req.body.respuesta ? true : false
		});
	});

};



var notFound404 = function(req, res)
{
	
	res.status(404).send("Página no encontrada :( en el momento");
};


module.exports.getQuestions = getQuestions;
module.exports.isValid = isValid;
module.exports.notFound404 = notFound404;
