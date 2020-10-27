var cantidadEquipos = 2;
var equipo1, equipo2, punteroid;
var equipo = [];
var columnasDados=['-1','-2','-3','-4','-5','-6'];
var columnasJuegos=['-E','-F','-P','-G','-DG','-T'];
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

var ac1 = app.actions.create({
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

var ac2 = app.actions.create({
  buttons: [
    [
      {
        text:'Juego',
        label: true
      },
      {
        text:'Armada',
        onClick: function(){
          console.log("Funciona");
        }
      },
      {
        text:'Servida',
        onClick: function(){
          console.log("Funciona");
        }
      },
    ],
    [
      {
        text:'Tachar',
        onClick: function(){
          console.log("Funciona");
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
      ac1.open();
    });
    $$('.juego').on('click', function(){
      punteroid=$$(this).attr("id");
      ac2.open();
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
}

function puntosDados(cantidadDados){
  console.log(cantidadDados);
}