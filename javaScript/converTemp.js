//grados centigraoos a grados fahrenheit
function centiFahren(c){
	var f=(9/5)*c+32;
	console.log("grados fahrenheit: "+f);	
	return f;
}

//grados fahrenheit a grados centigraoos
function fahrenCenti(f){
	var c=(5*(f/32))/9;	
	console.log("grados centigrados: "+c);
	return c;
}

//grados centigraoos a grados kelvin
function centiKelvin(c){
	var k=c+273.15;
	console.log("grados kelvin: "+k);		
	return k;
}

//grados kelvin a grados centigraoos
function kelvinCenti(k){
	var ck=k-273.15;
	console.log("grados centigrados: "+ck);
	return ck;
}

var f=centiFahren(40);			//grados fahrenheit
var c=fahrenCenti(104);			//grados centigrados
var k=centiKelvin(40);			//grados kelvin
var ck=kelvinCenti(313.15);		//grados centigrados