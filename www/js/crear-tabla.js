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

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="anotador"]', function (e) {
    dibujarColumna(1);    
})


const dibujarColumna = function(numero){
    idColumna = 'columna'+numero
    $$('#tabla').append('<div id="'+idColumna+'" class="col-20"></div>');
    $$('#'+idColumna).append('<div id="j'+numero+'" class="row">'+nombres[numero-1]+'</div>')
    for(i = 0; i<columnasDados.length; i++){
        $$('#'+idColumna).append('<div id="j'+numero+'p'+columnasDados[i]+'" class="row dado">dado</div>')
    } 
    for(i = 0; i<columnasJuegos.length; i++){
        $$('#'+idColumna).append('<div id="j'+numero+'p'+columnasJuegos[i]+'" class="row juego">juego</div>')
    } 
}
