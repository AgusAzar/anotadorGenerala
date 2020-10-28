var cantidadEquipos = 2;
var punteroid;
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
var router = mainView.router;

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
        }
      },
      {
        text:'Dos',
        onClick: function(){
          puntosDados(2);
        }
      },
      {
        text:'Tres',
        onClick: function(){
          puntosDados(3);
        }
      },
      {
        text:'Cuatro',
        onClick: function(){
          puntosDados(4);
        }
      },
      {
        text:'Cinco',
        onClick: function(){
          puntosDados(5);
        }
      },
      {
        text:'Seis',
        onClick: function(){
          puntosDados(6);
        }
      },
    ],
    [
      {
        text:'Tachar',
        onClick: function(){
          puntosDados('x');
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
        }
      }, {
        text:'Servida',
        onClick: function(){
            anotarJuegos('servida')
        }
      },
    ],
    [
      {
        text:'Tachar',
        onClick: function(){
            anotarJuegos('tachar')
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
})

$$(document).on('page:init', '.page[data-name="anotador"]', function (e) {
    for(var i = 1; i <= cantidadEquipos; i++){
        console.log('adentro')
        equipo[i-1] = $$("#Jugador"+i+"TXT").val() || 'equipo '+i;   
    }
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
    $$('#BTNTerminar').on('click',function(){
        terminar();
    })
    $$('#BTNLimpiar').on('click',function(){
        limpar();
    })
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
    if(cantidadDados=="x")
    {
      $$('#'+punteroid).text('X');
    }
    else
    {
      var texto = parseInt(punteroid[4])*cantidadDados;
      $$('#'+punteroid).text(texto);
    }
    calcularTotal();
}

function anotarJuegos(estado){
    if(estado=="tachar")
    {
        $$('#'+punteroid).text('X');
    }
    else
    {
      var juego=punteroid.split('-');
      var puntosTotales=puntosJuegos[juego[1]]
      if(estado=="servida")
      {
        puntosTotales+=5;
        if(punteroid.includes('G'))
        {
          generalaServida();
            puntosTotales='Ganador'
        }
      }
      $$('#'+punteroid).text(puntosTotales);
    }
    calcularTotal();
}
function generalaServida(){
    var numeroJugador = punteroid[1]
    alert('El jugador '+equipo[numeroJugador - 1]+' ha ganado')
    terminar();
}

function calcularTotal(){
  var x=punteroid[1];
  var suma=0, puntos;
    for(var i=0;i<columnasDados.length;i++){
      puntos=$$('#j'+x+'p'+columnasDados[i]).text();
      if(puntos=="-"||puntos=="X")
      {
        suma+=0;
      }
      else
      {
        suma+=parseInt(puntos);
      }
      console.log(suma)
    }
    for(var i=0;i<columnasJuegos.length;i++){
      puntos=$$('#j'+x+'p'+columnasJuegos[i]).text();
      if(puntos=="-"||puntos=="X")
      {
        suma+=0;
      }
      else
      {
        suma+=parseInt(puntos);
      }
      console.log(suma)
    }
  $$('#j'+x+'-T').text(suma);
}

function terminar(){
    router.back();
    $$("#Jugador1TXT").val("");
    $$("#Jugador2TXT").val("");
    equipo = [];
  }
function limpar(){
    router.refreshPage();
}
