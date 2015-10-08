window.onload = function()
{
	listadoPersonas = [];
	var indEdita = -1; //El índice de Edición...
	var elementos = [ "nombre"];
	//Constructor Persona...
	function persona(pn)
	{
		this.primernombre = pn;
		//Para devolver los datos del usuario a ser impresos...
		this.imprime = function()
		{
			return [
						this.primernombre
					];
		}
	}

	//Para cargar la información de localStorage...
	if(localStorage.getItem("listado1"))
	{
		var objTMP = eval(localStorage.getItem("listado1"));
		var pn = "";
		for(var i in objTMP)
		{
			var pn = objTMP[i].primernombre;
			var nuevaPersona = new persona(pn);
			listadoPersonas.push(nuevaPersona);
		}
	}
	//imprimeUsuarios();
	//Imprimer usuarios en pantalla...
	var imprimeUsuarios = (function imprimeUsuarios()
	{
		var txt = "<table class = 'table-fill'>" + 
					"<thead><tr>" + 
					"<th>Nombre</th>" +
					"<th>Editar</th>" + 
					"<th>Eliminar</th></tr></thead>" + 
					"<tbody class = 'table-hover'>";
		for(var i = 0; i < listadoPersonas.length; i++)
		{
			txt += "<tr>";
			var datosPersona = listadoPersonas[i].imprime();
			for(var c = 0; c < datosPersona.length; c++)
			{
				txt += "<td><center>"+(datosPersona[c])+"</center></td>";
			}
			//Editar...
			txt += "<td><center>";
			txt += "<img src = 'img/editar.png' border = '0' id = 'e_"+i+"'/>";
			txt += "</center</td>";
			//Eliminar...
			txt += "<td><center>";
			txt += "<img src = 'img/eliminar.png' border = '0' id = 'd_"+i+"'/>";
			txt += "</center</td>";
			txt += "</tr>";
		}
		txt += "</tbody></table>";
		nom_div("imprime").innerHTML = txt;
		//Poner las acciones de editar y eliminar...
		for(var i = 0; i < listadoPersonas.length; i++)
		{
			
			//Editar...
			nom_div("e_" + i).addEventListener('click', function(event)
			{
				var ind = event.target.id.split("_")[1];
				var idUser = listadoPersonas[ind].identificacion;
				console.log("Valor de idUser: ", idUser);
				ind = buscaIndice(idUser);
				if(ind >= 0)
				{
					nom_div("identifica").value = listadoPersonas[ind].identificacion;
					nom_div("nombre").value = listadoPersonas[ind].primernombre;
					nom_div("apellido").value = listadoPersonas[ind].primerapellido;
					nom_div("email").value = listadoPersonas[ind].email;
					nom_div("fechanace").value = listadoPersonas[ind].fechanacimiento;
					indEdita = ind;
				}
				else
				{
					alert("No existe el ID");
				}
			});
			//Eliminar...
			nom_div("d_" + i).addEventListener('click', function(event)
			{
				var ind = event.target.id.split("_")[1];
				var idUser = listadoPersonas[ind].identificacion;
				if(confirm("¿Está segur@ de realizar está acción?"))
				{
					ind = buscaIndice(idUser);
					if(ind >= 0)
					{
						listadoPersonas.splice(ind, 1);
						localStorage.setItem("listado1", JSON.stringify(listadoPersonas));
						indEdita = -1;
						imprimeUsuarios();
					}
				}
			});
		}
		return imprimeUsuarios;
	})();
	//Dada la identificación, buscar la posición donde se encuentra almacenado...
	var buscaIndice = function(id)
	{
		var indice = -1;
		for(var i in listadoPersonas)
		{
			if(listadoPersonas[i].identificacion === id)
			{
				indice = i;
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
				if(listadoPersonas[i].primernombre === pn)
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
						var nuevaPersona = new persona(valores[0]);
						listadoPersonas.push(nuevaPersona);
					}

					localStorage.setItem("listado1", JSON.stringify(listadoPersonas));
					imprimeUsuarios();
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