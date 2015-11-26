var express 		= 	require("express"),
	app				= 	express(),
	puerto 			= 	process.env.PORT || 3000,
	db   			= 	require('./modulos/database'),
	cons 			=	require("consolidate"),
	rutas			=	require('./modulos/rutas'),
	bodyParser  	=   require('body-parser');


	db.conectaDatabase();


	app.engine("html", cons.swig); 
	app.set("view engine", "html");
	app.set("views", __dirname + "/vistas");
	
	app.use(express.static('public'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.get("/", function(req, res)
	{
		res.render("index");
	});



	app.get('/getQuestions', rutas.getQuestions);

	app.post('/isValid', rutas.isValid);


	app.get("*", rutas.notFound404);

	var server = app.listen(puerto, function(err) {

	   if(err) throw err;

	   var message = 'Servidor corriendo en @ http://localhost:' + server.address().port;
		console.log(message);
	});
