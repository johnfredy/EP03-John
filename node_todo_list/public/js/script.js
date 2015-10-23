window.onload = function()
{
	//Para los servicios que se consumirán...
var nomServicios = [
                        {
                            servicio 	: 	"Trae todas las tareas",
                            urlServicio	: 	"getAllTask",
                            metodo		: 	"GET"
                        },
                        {
                            servicio 	: 	"Crear una nueva tarea",
                            urlServicio	: 	"createTask",
                            metodo		: 	"POST"
                        },
                        {
                            servicio 	: 	"Editar una tarea",
                            urlServicio	: 	"updateTask",
                            metodo		: 	"PUT"
                        },
                        {
                            servicio 	: 	"Eliminar Tarea",
                            urlServicio	: 	"deleteTask",
                            metodo		: 	"DELETE"
                        },
                        {
                            servicio 	: 	"Trae una sola tarea",
                            urlServicio	: 	"getTask",
                            metodo		: 	"GET"
                        }
                    ];

var consumeServicios = function(tipo, val, callback)
{
    var servicio = {
                        url 	: nomServicios[tipo - 1].urlServicio,
                        metodo	: nomServicios[tipo - 1].metodo,
                        datos 	: ""
                    };
    if(tipo === 4 || tipo === 5)
    {
        servicio.url += "/" + val;
    }
    else
    {
        servicio.datos = val !== "" ? JSON.stringify(val) : "";
    }
    //Invocar el servicio...
    $.ajax(
    {
        url 		: servicio.url,
        type 		: servicio.metodo,
        data 		: servicio.datos,
        dataType 	: "json",
        contentType: "application/json; charset=utf-8"
    }).done(function(data)
    {
		listaTareas = data;
        callback(data);
    });
};
///////////////////////////////////////////////////////////////////////////////////
	listadoPersonas = [];
	var indEdita = -1; //El índice de Edición...
	var elementos = [ "nombre"];
	//Constructor Persona...
	function persona(pn,ac)
	{
		this.primernombre = pn;
		this.activo = ac;
		//Para devolver los datos del usuario a ser impresos...
		this.imprime = function()
		{
			return [
						this.primernombre,
						this.activo
					];
		}
	}


	var todos = [];
		consumeServicios(1, "", function(data){
		    todos = data;
		    imprimeUsuarios();
		});
	var imprimeUsuarios = function ()
	{
		
		var listaTareas = todos;
		var txt = "<table class = 'table-fill'>" + 
					"<tbody class = 'table-hover'>";
		for(var i = 0; i < listaTareas.length; i++)
		{

			var datosPersona = listaTareas[i];
			if (listaTareas[i].finish===false) {
				txt += "<div class='lista'><center>"+(listaTareas[i].task)+"</center>";
			
				//Editar...
				txt += "<img src = 'img/activo1.png' border = '0' id = 'e_"+i+"'/>";
				//Eliminar...
				txt += "<img src = 'img/eliminar1.png' align='right' border = '0' id = 'd_"+i+"'/>"+"</div>";
			}
			else{
				txt += "<div class='lista1'><center>"+(datosPersona.task)+"</center>";
			
				//activar...
				txt += "<img src = 'img/activo2.png' border = '0' id = 'e_"+i+"'/>";
				//Eliminar...
				txt += "<img src = 'img/eliminar2.png' align='right' border = '0' id = 'd_"+i+"'/>"+"</div>";
			
			}
		}
		txt += "</tbody></table>";
		nom_div("imprime").innerHTML = txt;
		//Poner las acciones de editar y eliminar...
		for(var i = 0; i < todos.length; i++)
		{
			//Editar...
			nom_div("e_" + i).addEventListener('click', function(event)
			{
				var ind = event.target.id.split("_")[1];
				var idUser = listaTareas[ind].task;
				console.log("Valor de idUser: ", idUser);
				ind = buscaIndice(idUser);

				var tareas = {
				  "id": ind,
			      "field": "finish",
			      "data": true,
			      "finish": true
				};


				consumeServicios(3,tareas,function(data)
						{
							consumeServicios(1, "", function(data)
							{
						    	todos = data;
						    	imprimeUsuarios();
							});
						});

					limpiarCampos();
			});
			//Eliminar...
			nom_div("d_" + i).addEventListener('click', function(event)
			{
				
				var ind = event.target.id.split("_")[1];
				var idUser = listaTareas[ind].task;
				if(confirm("¿Está segur@ de realizar está acción?"))
				{
					ind = buscaIndice(idUser);

					consumeServicios(4,ind,function(data)
					{
						consumeServicios(1, "", function(data)
						{
					    	todos = data;
					    	imprimeUsuarios();
						});
					});
				}
			});
		}
		return imprimeUsuarios;
	};
	//Dada la identificación, buscar la posición donde se encuentra almacenado...
	var buscaIndice = function(id)
	{
		var indice = -1;
		for(var i in listaTareas)
		{
			if(listaTareas[i].task === id)
			{
				indice = listaTareas[i].id;
				break;
			}
		}
		return indice;
	}

	//Limpia los campos del formulario...
	var limpiarCampos = function()
	{
		indEdita = -1; //No se está editando nada...
		for(var i = 0; i < elementos.length; i++)
		{
			nom_div(elementos[i]).value = "";	
		}
	}

	//Saber si un usuario ya existe, bien por identificación o por e-mail...
	function existeUsuario(pn)
	{
		var existe = 0; //0 Ningún campo existe...
		for(var i in listadoPersonas)
		{
			//Cédula...
			if(i !== indEdita)
			{
				if(listaTareas[ind].task === pn)
				{
					existe = 1; // la cédula existe...
					break;
				}
				
			}
		}
		return existe;
	}

	//Acciones sobre el botón guardar...
	nom_div("guarda").addEventListener('click', function(event)
	{
		var correcto = true;
		var valores = [];
		for(var i = 0; i < elementos.length; i++)
		{
			if(nom_div(elementos[i]).value === "")
			{
				alert("Digite todos los campos");
				nom_div(elementos[i]).focus();
				correcto = false;
				break;
			}
			else
			{
				valores[i] = nom_div(elementos[i]).value;
			}
		}
		//Si correcto es verdadero...
		if(correcto)
		{


			var existeDatos = existeUsuario(valores[0]);
			if(existeDatos === 0) //No existe...
			{
				
					//No se estaba editando...
					if(indEdita < 0)
					{
						var tarea = {
						  "task": valores[0],
						  "finish": false
						};

						consumeServicios(2,tarea,"");
						consumeServicios(1,"","");
						//var nuevaPersona = new persona(valores[0],1);
						//listadoPersonas.push(nuevaPersona);
					}

					//localStorage.setItem("listado1", JSON.stringify(listadoPersonas));
					consumeServicios(1, "", function(data){
						    todos = data;
						    imprimeUsuarios();
						});
					limpiarCampos();
				
			}
			else
			{
				if(existeDatos == 1)
				{
					alert("La tarea: " + valores[0] + " Ya existe");
					nom_div(elementos[0]).focus();
				}
			}
		}
	});

	//Función que valida que un e-mail se encuentre "sintácticamente" bien escrito...
	function ValidaEmail(email)
	{
		var correcto = true;
		var emailReg = /^([\da-zA-Z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		if(!emailReg.test(email))
		{
			correcto =  false;
		}
		return correcto;
	}

	//Accedera los elementos de HTML...
	function nom_div(div)
	{
		return document.getElementById(div);
	}
}