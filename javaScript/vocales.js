//numero de vocales en un frase
function vocales(frase){
	var a=0,e=0,i=0,o=0,u=0;
	frase=frase.toLowerCase();
	for (var n = 0; n < frase.length; n++) {
		switch(frase.charAt(n)){
			case 'a': a++; break;
			case 'e': e++; break;
			case 'i': i++; break;
			case 'o': o++; break;
			case 'u': u++; break;
		}
	}
	console.log("numero de vocales: a="+a+" e="+e+" i="+i+" o="+o+" u="+u);
}
vocales("HolA MundO");