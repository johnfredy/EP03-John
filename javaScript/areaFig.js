//area de la circuferencia
function circulo(r){
	var pi=3.14;	
	var a=pi*r*r;
	console.log("area del circulo: "+a);
	return a;
}
var a=circulo(5);

//area del triangulo
function triangulo(b ,h){
	var a=b*h/2;
	console.log("area del triangulo: "+a);
	return a;
}
var a=triangulo(2, 5);

//area del cuadrado
function cuadrado(l){
	var a=l*l;
	console.log("area de un cuadrado: "+a);
	return a;
}
var a=cuadrado(4);

