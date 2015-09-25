window.onload = function()
{
    /*
    ------------------------------------------------------------------------
    Parte 01: Conversión de nímeros decimales a fraccionarios...
    ------------------------------------------------------------------------
    */
    //Para los rangos de los valores de la conversión de fraccionarios...
    var datosDecimal = {
                            entero  : 0,
                            decimal : 0
                       };
    //Para el slider de entero...
    nom_div("entero").addEventListener('change', function(event)
    {
        datosDecimal.entero = nom_div("valEntero").innerHTML = Number(this.value);
        decimalFraccionario(datosDecimal);
    });

    //Para el slider de decimal...
    nom_div("decimal").addEventListener('change', function(event)
    {
        datosDecimal.decimal = nom_div("valDecimal").innerHTML = Number(this.value);
        decimalFraccionario(datosDecimal);
    });

    //Función que realizará la conversión...
    var decimalFraccionario = function(datosDecimal)
    {
        /*
        Entregar el valor fraccionario de la forma numerador/denominador
        la respuesta debe ser un número fraccionario simplificado...
        Tip: Convertir un número a un string : String(numero)
        */

        var m =Math.pow(10,String(datosDecimal.decimal).length);
        var b=datosDecimal.entero*m+datosDecimal.decimal;

        var numerador = b;
        var denominador = m;
        
        var maximo = numerador <= denominador ? numerador : denominador;
        var cont = 2;
        do
        {
            if(numerador % cont === 0 && denominador % cont === 0)
            {
                numerador /= cont; // numerador = numerador / cont;
                denominador /= cont;
                maximo = numerador <= denominador ? numerador : denominador;
            }
            else
            {
                cont++;
                if(cont > maximo)
                {
                    break;
                }
            }
        }while(1);
        var respuesta = numerador + "/" + denominador;
        if(denominador === 1)
        {
            respuesta = numerador;
        }

        //console.log(b+"/"+m);
        //Imprime la respuesta en la vista (HTML)...
        nom_div("resFraccionario").innerHTML =respuesta ;
    };

    /*
    ------------------------------------------------------------------------
    Parte 02: Conversión de binario a decimal...
    ------------------------------------------------------------------------
    */
    //Para poner los inputs relacionados a los valores binarios...
    var numeroInputs = 8;
    var crearInputsBinario = function()
    {
        var txtInput = "";
        for(var veces = 1; veces <= 2; veces++)
        {
            for(var i = 1; i <= numeroInputs; i++)
            {
                if(veces === 1)
                {
                    txtInput += "<input type = 'number' min = '0' max = '1' value = '0' class = 'campoTexto' id = 'valor_"+(i)+"'>";
                }
                else
                {
                    nom_div("valor_" + i).addEventListener('change', function(event)
                    {
                        //var ind = Number(this.id.split("_")[1]);
                        //console.log("Numero input: ", ind, "Valor:", this.value);
                        binarioDecimal(numeroInputs);
                    });
                }
            }
            if(veces === 1)
            {
                nom_div("binarioDecimal").innerHTML = txtInput + "<span class = 'txtValor'> = </span><span class = 'txtValor' id = 'resDecimal'>?</div>";
            }
        }
    }();

    //Función que realizará el proceso de conversión de decimal a binario...
    var binarioDecimal = function(numeroInputs)
    {
        /*
            Se deberá vaidar que los valores ingresados sean 1 ó 0...
            Tip: Math.pow(2, exponente);
            El recorrido de los valores se realiza de derecha a izquierda...
        */
        var z=nom_div("valor_6").value*1+nom_div("valor_5").value*2+
        nom_div("valor_4").value*4+nom_div("valor_3").value*8+
        nom_div("valor_2").value*16+nom_div("valor_1").value*32;
        
        var n=true;
        var m=1;
        var p=0;
        for(var j = numeroInputs; j >=1 ; j--){
            p+=nom_div("valor_" + j).value*m;
            m=m*2;
        }
        console.log(numeroInputs);
        //Imprime la respuesta en la vista (HTML)...
        nom_div("resDecimal").innerHTML = p;
    };

    /*
    ------------------------------------------------------------------------
    Parte 03: Si una lista de todos los números naturales por debajo de 10 (no incluyente) que son múltiplos de 3 o 5, se obtiene 3, 5, 6 y 9. La suma de estos múltiplos es 23
    Hallar al sumatoria de valores múltiplos de 3 y 5 de acuerdo al valor del valor dando en el rabge...
    ------------------------------------------------------------------------
    */

    //Para el slider de valor máximo...
    nom_div("maximo").addEventListener('change', function(event)
    {
        var rangoMultiplos = nom_div("valMaximo").innerHTML = Number(this.value);
        console.log("Rango máximo es: ", rangoMultiplos);
        var suma=0;
        for(var x=0; x<rangoMultiplos; x++){
            if(x%3===0){
                suma+=x;
                console.log(x);
            }
            else{
                if(x%5==0){
                    suma+=x;
                    console.log(x);
                }
            }
        }
        console.log(suma);
        //Imprime la respuesta en la vista (HTML)...
        nom_div("resSumatoria").innerHTML = suma;
    });

    //Accederá los elementos de HTML...
    function nom_div(div)
    {
        var suma=0;
        for(var x=0; x<div; x++){
            if(x%3===0){
                suma+=x;
                console.log(x);
            }
            else{
                if(x%5==0){
                    suma+=x;
                    console.log(x);
                }
            }
        }
        console.log(suma);
        return document.getElementById(div);
    }
};
