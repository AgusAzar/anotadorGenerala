var cantidadEquipos = 2;
var equipo1, equipo2, punteroid;
var equipo = [];
var columnasDados=['-1','-2','-3','-4','-5','-6'];
var columnasJuegos=['-E','-F','-P','-G','-DG'];
var puntosJuegos={E:20,F:30,P:40,G:50,DG:100}
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/about/',
        url: 'about.html',
      },
      {
        path: '/anotador/',
        url: 'anotador.html',
      },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

var actionDados = app.actions.create({
  buttons: [
    [
      {
        text:'Dado',
        label: true
      },
      {
        text:'Uno',
        onClick: function(){
        puntosDados(1);
        calcularTotal();
        }
      },
      {
        text:'Dos',
        onClick: function(){
          puntosDados(2);
          calcularTotal();
        }
      },
      {
        text:'Tres',
        onClick: function(){
          puntosDados(3);
          calcularTotal();
        }
      },
      {
        text:'Cuatro',
        onClick: function(){
          puntosDados(4);
          calcularTotal();
        }
      },
      {
        text:'Cinco',
        onClick: function(){
          puntosDados(5);
          calcularTotal();
        }
      },
      {
        text:'Seis',
        onClick: function(){
          puntosDados(6);
          calcularTotal();
        }
      },
    ],
    [
      {
        text:'Tachar',
        onClick: function(){
          puntosDados('x');
          calcularTotal();
        }
      }
    ]
  ]
});

var actionJuegos = app.actions.create({
  buttons: [
    [
      {
        text:'Juego',
        label: true
      },
      {
        text:'Armada',
        onClick: function(){
            anotarJuegos('armada')
            calcularTotal();
        }
      }, {
        text:'Servida',
        onClick: function(){
            anotarJuegos('servida')
            calcularTotal();
        }
      },
    ],
    [
      {
        text:'Tachar',
        onClick: function(){
            anotarJuegos('tachar')
            calcularTotal();
        }
      }
    ]
  ]
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    $$('#BTNJugar').on('click', function(){
        console.log("Entro");
        equipo1 = $$("#Jugador1TXT").val();   
        equipo[0] = equipo1;
        equipo2 = $$("#Jugador2TXT").val();   
        equipo[1] = equipo2;
    });
})

$$(document).on('page:init', '.page[data-name="anotador"]', function (e) {
    $$("#j1").val(equipo1);
    $$("#j2").val(equipo2);       
    for(var i=0;i<cantidadEquipos;i++){
        dibujarColumna(i+1);    
        console.log(i)
    }
    $$('.dado').on('click', function(){
      punteroid=$$(this).attr("id");
      actionDados.open();
    });
    $$('.juego').on('click', function(){
      punteroid=$$(this).attr("id");
      actionJuegos.open();
    });
})


const dibujarColumna = function(numero){
    idColumna = 'columna'+numero
    $$('#tabla').append('<div id="'+idColumna+'" class="col-20"></div>');
    $$('#'+idColumna).append('<div id="j'+numero+'" class="row">'+equipo[numero-1]+'</div>')
    for(var i = 0; i<columnasDados.length; i++){
        $$('#'+idColumna).append('<a href="#" id="j'+numero+'p'+columnasDados[i]+'" class="row dado">-</div>')
    } 
    for(var i = 0; i<columnasJuegos.length; i++){
        $$('#'+idColumna).append('<a href="#" id="j'+numero+'p'+columnasJuegos[i]+'" class="row juego">-</div>')
    } 
    $$('#'+idColumna).append('<div id="j'+numero+'-T" class="row">0</div>')
}

function puntosDados(cantidadDados){
    console.log(cantidadDados)
    var texto = parseInt(punteroid[4])*cantidadDados;
    $$('#'+punteroid).text(texto);
}

function anotarJuegos(estado){
    if(estado == "tachar")
    {
        $$('#'+punteroid).text('x');
    }
    else{
        var juego = punteroid.split('-');
        var puntosBase = puntosJuegos[juego[1]]
        if(estado =="armada")
        {
            var puntosTotales = puntosBase;
        }
        else
        {
            if(punteroid.includes('G'))
            {
                generalaServida();
            }
            else{
                var puntosTotales = puntosBase + 5;
                $$('#'+punteroid).text(puntosTotales);
            }
        }
    }
}
function generalaServida(){
    var numeroJugador = punteroid[1]
    alert('El jugador '+equipo[numeroJugador - 1]+' ha ganado')
}

function calcularTotal(){

  var total1 = 0;
  var total2 = 0;
  var final = 0;
  for(var i = 0;i<columnasDados.length;i++)
  {
    if($$('#j1p' + columnasDados[i]).text() == "-" || $$('#j2p' + columnasDados[i]).text() == "-")
      final++;
      
      if($$('#j1p' + columnasDados[i]).text() != "-")
      {
         var suma1 = $$('#j1p' + columnasDados[i]).text();
      }
      if($$('#j2p' + columnasDados[i]).text() != "-")
      {
         var suma2 = $$('#j2p' + columnasDados[i]).text();
      }
  }
  for(var i = 0;i<columnasJuegos.length;i++)
  {
    if($$('#j1p' + columnasJuegos[i]).text() == "-" || $$('#j2p' + columnasJuegos[i]).text() == "-")
      final++;
      
      if($$('#j1p' + columnasJuegos[i]).text() != "-")
      {
         var suma1 = $$('#j1p' + columnasJuegos[i]).text();
      }
      if($$('#j2p' + columnasJuegos[i]).text() != "-")
      {
         var suma2 = $$('#j2p' + columnasJuegos[i]).text();
      }
  }
  if(final == 0)
  {
    for(var i = 0;i<columnasDados.length;i++)
    {
      if($$('#j1p' + columnasDados[i]).text() != "X")
      {
         var suma1 = $$('#j1p' + columnasDados[i]).text();
         var suma2 = $$('#j2p' + columnasDados[i]).text();
         total1 += Number(suma1);
         total2 += Number(suma2);
      }
    }
    for(var i = 0;i<columnasJuegos.length;i++)
    {
      if($$('#j2p' + columnasDados[i]).text() != "X")
      {
         var suma1 = $$('#j1p' + columnasJuegos[i]).text();
         var suma2 = $$('#j2p' + columnasJuegos[i]).text();
         total1 += Number(suma1);
         total2 += Number(suma2);
      }
    }
    $$('#j1p-T').text(total1);
    $$('#j2p-T').text(total2);
  }

  console.log("total 1" + total1);

}