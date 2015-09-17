window.onload = function()
{
    var sierpinski = false;

    var trianguloPascal = function(niveles)
    {
        var pascal = [];
        var numero=1;
        var multi=1;
        
        for(var j = 1; j <= niveles; j++){
            var resul=multi*multi;
            var texto=multi+" x "+multi+" = "+resul;
            pascal.push(texto);
            numero=numero*10;
            multi+=numero;
        }
        return pascal;

    };

    //Imprimir el triángulo de Pascal...
    var imprimeTriangulo = (function imprimeTriangulo(nivel)
    {
        var txt = "";
        var capicua = trianguloPascal(nivel);
        var colorCelda = "";
        nom_div("pascal").innerHTML = "";
        for(var i = 0; i < capicua.length; i++)
        {
            txt += "<div align = 'center' class = 'nivel' style = 'padding-bottom: "+10+"px;'>"+capicua[i];
            /*for(var c = 0; c < 1; c++)
            {
                txt += "<div style = 'display: inline-block; background-color: blue' class = 'celda'>" + 
                            capicua[i][c] + 
                        "</div>";
            }
            txt += "</div>";*/
        }
        nom_div("pascal").innerHTML = txt;
        return imprimeTriangulo;
    })(2);

    //Para cambiar el rango del triángulo...
    nom_div("rango").addEventListener('change', function(event)
    {
        nom_div("txtrango").innerHTML = this.value;
        imprimeTriangulo(Number(this.value));
    });

    //Para imprir elementos en el HTML...
    function nom_div(div)
    {
        return document.getElementById(div);
    }
};